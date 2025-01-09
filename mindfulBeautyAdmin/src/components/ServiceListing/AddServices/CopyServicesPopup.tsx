import { useEffect, useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import { Button } from '@/common/Button';
import { staffBranchList, copyServices } from '@/api/apiConfig';
import { ShimmerTable } from 'shimmer-effects-react';

interface CopyServicesPopupProps {
    closePopup: () => void;
    selectedBranch?: string;
    selectedBranchName?: string;
}

interface StaffBranchListDataProps {
    branch_id: number;
    branch_name: string;
}

export const CopyServicesPopup: React.FC<CopyServicesPopupProps> = ({
    closePopup,
    selectedBranch,
    selectedBranchName
}) => {
    const [branchListData, setBranchListData] = useState<StaffBranchListDataProps[]>([]);
    const [selectedBranches, setSelectedBranches] = useState<number[]>([]);
    const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
    const [isCopyingServices, setIsCopyingServices] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBranches = async () => {
            setIsInitialLoading(true);
            setError(null);

            try {
                const response = await staffBranchList();
                const filteredBranches = response.data.filter(
                    (branch: StaffBranchListDataProps) =>
                        branch.branch_id !== Number(selectedBranch)
                );
                setBranchListData(filteredBranches);
            } catch (error: any) {
                setError(error.message || 'Failed to fetch branch list');
            } finally {
                setIsInitialLoading(false);
            }
        };

        fetchBranches();
    }, [selectedBranch]);

    // Handle checkbox change with branch_id
    const handleCheckboxChange = (branchId: number) => {
        setSelectedBranches(prev => {
            if (prev.includes(branchId)) {
                return prev.filter(id => id !== branchId);
            }
            return [...prev, branchId];
        });
    };

    const handleSubmit = async () => {
        if (selectedBranches.length === 0) {
            setError('Please select at least one branch');
            return;
        }
        setIsCopyingServices(true);
        setError(null);
        try {
            const sessionProviderID = sessionStorage.getItem("loginProviderID");
            const targetBranchesString = selectedBranches.join(',');

            // Call the copy services API
            const response = await copyServices(
                Number(selectedBranch),
                targetBranchesString,
                Number(sessionProviderID)
            );

            if (response?.status === 'success') {
                closePopup();
                window.location.reload();
            } else {
                throw new Error(response?.message || 'Failed to copy services');
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to copy services';
            console.error("Error copying services:", errorMessage);
            setError(errorMessage);
        } finally {
            setIsCopyingServices(false);
        }
    };

    // Show loading state while fetching initial data
    if (isInitialLoading) {
        return (
            <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-10 py-10">
                    <ShimmerTable
                        mode="light"
                        row={2}
                        col={4}
                        border={1}
                        borderColor={"#cbd5e1"}
                        rounded={0.25}
                        rowGap={16}
                        colPadding={[15, 5, 15, 5]}
                    />
                </div>
            </div>
        );
    }

    if (isCopyingServices) return <div>
        <div>
            <ShimmerTable
                mode="light"
                row={2}
                col={4}
                border={1}
                borderColor={"#cbd5e1"}
                rounded={0.25}
                rowGap={16}
                colPadding={[15, 5, 15, 5]}
            />
        </div>
    </div>;

    return (
        <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-10 py-10">
                {/* Close Button */}
                <div className="relative mb-16">
                    <h2 className="text-2xl text-mindfulBlack font-semibold">Copy Services</h2>
                    <div className="absolute inset-x-0 bottom-[-20px] mx-auto bg-mindfulgrey rounded-md w-full h-0.5">
                    </div>
                </div>
                {/* Close Button */}
                <div
                    onClick={closePopup}
                    className="absolute top-5 right-5 w-fit cursor-pointer"
                >
                    <IoCloseCircle className="text-mindfulGrey text-[32px]" />
                </div>
                {/* Chosen Branch */}
                <div className="pb-5">
                    <label
                        htmlFor="city"
                        className="text-md text-mindfulBlack font-semibold mb-1"
                    >
                        Chosen Branch
                    </label>
                    <p className="text-lg text-mindfulBlack">{selectedBranchName}</p>
                </div>

                {/* Branch List */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Select Branches to Copy to:</h3>
                    <div className="max-h-60 overflow-y-auto space-y-3">
                        {branchListData.map((branch) => (
                            <div key={branch.branch_id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`branch-${branch.branch_id}`}
                                    checked={selectedBranches.includes(branch.branch_id || 0)}
                                    onChange={() => handleCheckboxChange(branch.branch_id || 0)}
                                    className="mr-3"
                                />
                                <label htmlFor={`branch-${branch.branch_id}`}>
                                    {branch.branch_name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Error Message - Make it more visible */}
                {error && (
                    <div className="text-mindfulRed text-sm mb-4 text-center font-semibold bg-red-50 p-3 rounded">
                        {error}
                    </div>
                )}

                {/* Buttons */}
                <div className="flex justify-center space-x-4">
                    <Button
                        onClick={closePopup}
                        buttonType="button"
                        buttonTitle="Cancel"
                        className="bg-mindfulWhite text-mindfulBlack px-6 py-2 rounded-sm"
                        disabled={isCopyingServices}
                    />
                    <Button
                        onClick={handleSubmit}
                        buttonType="button"
                        buttonTitle={"Copy"}
                        className="bg-mindfulBlue text-mindfulBlack px-6 py-2 rounded-sm"
                        disabled={isCopyingServices}
                    />
                </div>
            </div>
        </div>
    );
};
