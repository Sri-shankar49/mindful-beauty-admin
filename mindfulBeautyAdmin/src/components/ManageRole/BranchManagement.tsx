import React, { useEffect, useState } from "react"
import { Button } from '@/common/Button'
import { BranchCard } from "./BranchManagement/BranchCard"
import { TbHomePlus } from "react-icons/tb";
import { AddBranchPopup } from "./BranchManagement/AddBranchPopup"
import { branchList } from "@/api/apiConfig";

// Define the type for BranchCardProps if it's not imported
interface BranchCardProps {
    branch_id: string;
    branch_name: string;
    phone: string;
    location: string;
    logo: string;
}

export const BranchManagement: React.FC<BranchCardProps> = () => {

    // State Declaration for branch popup
    const [showBranchPopup, setShowBranchPopup] = useState(false);

    const [branchListData, setBranchListdata] = useState<BranchCardProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const openBranchPopup = () => {
        setShowBranchPopup(true);
    }

    const closeBranchPopup = () => {
        setShowBranchPopup(false);
    }


    useEffect(() => {
        // Fetch data from API
        const fetchBranchListData = async () => {
            try {
                setLoading(true);
                // const data: BranchCardProps[] = await branchList();
                const data = await branchList();
                setBranchListdata(data.data || []);
                console.log("Fetched Branch List data log:", data.data);
            } catch (error: any) {
                setError(error.message || "Failed to fetch branch list data.");
            } finally {
                setLoading(false);
            }
        };

        fetchBranchListData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-3xl font-semibold py-5">Branches (4)</h5>
                </div>

                {/* Add New Branch */}
                <div
                    onClick={openBranchPopup}
                    className="flex items-center bg-mindfulBlue border-[1px] border-mindfulBlue rounded-[5px] px-3 py-1.5 cursor-pointer hover:bg-mindfulWhite hover:border-mindfulBlue group"
                >
                    <div>
                        <TbHomePlus className="text-[18px] text-mindfulWhite group-hover:text-mindfulBlue" />
                    </div>

                    <Button
                        buttonType="button"
                        buttonTitle="Add New Branch"
                        className="bg-mindfulBlue text-mindfulWhite pl-2 group-hover:bg-mindfulWhite group-hover:text-mindfulBlue"
                    />
                </div>

            </div>

            {/* Branch Card */}
            <div className="grid grid-cols-4 gap-5">
                {branchListData.length > 0 ? (
                    branchListData.map((branch) => (
                        <BranchCard
                            branchID={branch.branch_id}
                            branchName={branch.branch_name}
                            phone={branch.phone}
                            location={branch.location}
                            logo={branch.logo}
                        />
                    ))
                ) : (
                    <div className="text-gray-500">No branches available.</div>
                )}
                {/* <BranchCard />
                <BranchCard />
                <BranchCard /> */}
            </div>

            {showBranchPopup && <AddBranchPopup closePopup={closeBranchPopup} />}
        </div>
    )
}
