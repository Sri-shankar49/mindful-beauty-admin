import React, { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { InputField } from '@/common/InputField'
// import { SelectField } from '@/common/SelectField'
import { Button } from '@/common/Button'
import { MdFormatListBulletedAdd } from 'react-icons/md'
import rectangleBlack from "../../assets/images/rectangleBlack.png"
import "./ServiceListing.css";
import editButton from "../../assets/icons/editButton.png";
import deleteButton from "../../assets/icons/deleteButton.png";
import { EditPackagesPopup } from './EditPackagesPopup';
import { packageStatusAction, staffBranchList } from '@/api/apiConfig';
import { Pagination } from '@/common/Pagination';
import { DeletePackagesPopup } from './DeletePackagesPopup';
import { ShimmerTable } from 'shimmer-effects-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchPackagesList, setCurrentPage, setLoading, setSearchQuery } from '@/redux/packagesListSlice';
import { NotifyError } from '@/common/Toast/ToastMessage';

interface StaffBranchListDataProps {
    branch_id?: number;
    branch_name: string;
}

// interface PackagesListProps {
//     service_id: number;
//     service_name: string;
//     price: string;
//     package_services: string;
//     status: string;
// }

export const PackagesList = () => {

    // const [packagesData, setPackagesData] = useState<PackagesListProps[]>([]);
    // const [loading, setLoading] = useState<boolean>(false);
    // const [error, setError] = useState<string | null>(null);

    // Pagination state
    // const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    // const [totalItems, setTotalItems] = useState(0);


    const [showDeletePackagePopup, setShowDeletePackagePopup] = useState(false);
    const [selectedPackageID, setSelectedPackageID] = useState<number | null>(null);

    const [staffBranchListData, setStaffBranchListData] = useState<StaffBranchListDataProps[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<string>("");

    // const [isActive, setIsActive] = useState(false); // State to track the toggle status

    const [activeStates, setActiveStates] = useState<{ [key: number]: string }>({});

    // const handleToggle = (service_id: number) => {
    //     setIsActive(!isActive); // Toggle the state on click
    // };

    const handleToggle = async (provider_service_id: number, currentStatus: string) => {

        // Toggle between "Active" and "Inactive"
        const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

        // Optimistically update the state
        setActiveStates((prevState) => ({
            ...prevState,
            [provider_service_id]: newStatus,
        }));

        console.log("Package ID: ", provider_service_id);
        console.log("Package Status: ", newStatus);


        try {
            const response = await packageStatusAction(provider_service_id, newStatus);
            console.log("Status updated successfully", response);
        } catch (error: any) {
            console.error("Error updating status:", error.message);

            // Revert the state if API call fails
            setActiveStates((prevState) => ({
                ...prevState,
                [provider_service_id]: currentStatus,
            }));
        }
    };

    const [showEditPackagesPopup, setShowEditPackagesPopup] = React.useState(false);

    // Trigger the Edit Packages Popup
    const openEditPackagesPopup = (providerPackageID: number) => {
        setShowEditPackagesPopup(true);
        setSelectedPackageID(providerPackageID)
        console.log("Edit the selected package with ID:", providerPackageID);
    }

    const closeEditPackagesPopup = () => {
        setShowEditPackagesPopup(false);
    }

    // Trigger the Delete Packages Popup
    const openDeletePackagePopup = (providerPackageID: number) => {
        setShowDeletePackagePopup(true);
        setSelectedPackageID(providerPackageID);
        console.log("Delete the selected package with ID:", providerPackageID);
    }

    const closeDeletePackagePopup = () => {
        setShowDeletePackagePopup(false);
    }

    // Login Provider ID
    const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
    console.log("Login Provider ID from session storage", sessionLoginProviderID);

    const dispatch = useDispatch();

    const { packageListData, loading, searchQuery, currentPage, totalItems } = useSelector((state: RootState) => state.package);

    // Getting Freelancer state from Redux
    const { loginBranchID, freelancer, mainBranch } = useSelector((state: RootState) => state.login);
    console.log("Freelancer boolean Status  & loginBranchID & Main Branch", freelancer, loginBranchID, mainBranch);

    // Determine the correct branch ID based on mainBranch state
    const branchIDToUse = mainBranch ? selectedBranch : loginBranchID;

    // Fetch package data
    useEffect(() => {
        dispatch(setLoading(true)); // Ensure UI updates before fetching
        dispatch(fetchPackagesList({
            providerID: Number(sessionLoginProviderID), branchID: String(branchIDToUse), searchQuery, currentPage
        }) as any)
            .catch((error: any) => {
                // console.error("Error fetching package list:", error.message);
                // dispatch(setError(error.message));
                NotifyError(error.message || "Failed to fetch package list. Please try again."); // ✅ Show error via toast
            });
    }, [dispatch, searchQuery, currentPage, sessionLoginProviderID, branchIDToUse]);


    // useEffect(() => {
    //     // setLoading(true);
    //     // setError(null);

    //     const fetchPackagesListData = async () => {
    //         try {
    //             // const data = await packagesList(Number(sessionLoginProviderID), currentPage);

    //             const branchdata = await staffBranchList();

    //             // setPackagesData(data.results.data);

    //             setStaffBranchListData(branchdata.data || []);

    //             // console.log("Packages List data log:", data);

    //             console.log("Branch List data log:", branchdata.data);

    //             // console.log("Fetched Booking List pagination count data log :", data.count);

    //             // setTotalItems(data.count);
    //         }

    //         catch (error: any) {
    //             // setError(error.message || "Failed to fetch package list data.");
    //         } finally {
    //             // setLoading(false);
    //         }
    //     };
    //     fetchPackagesListData();

    // }, [currentPage, itemsPerPage]);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const branchData = await staffBranchList();
                setStaffBranchListData(branchData.data || []);
            } catch (error: any) {
                console.error("Error fetching branches:", error);
                NotifyError(error.message); // ✅ Show error via toast

            }
        };
        fetchBranches();
    }, []);

    // Function call on changing the branch
    const handleBranchChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBranchId = event.target.value;
        setSelectedBranch(selectedBranchId);
        console.log("Packages Branch ID", selectedBranchId);
    };



    const handlePageChange = (page: number) => {
        // setCurrentPage(page);
        dispatch(setCurrentPage(page));
    };

    const handleItemsPerPageChange = (items: number) => {
        setItemsPerPage(items);
        // setCurrentPage(1);        // Reset to the first page when items per page changes
        dispatch(setCurrentPage(1)); // Reset to the first page when items per page changes
    };

    // Handle search
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
    };


    // const refreshPackagesListData = async () => {
    //     try {
    //         const data = await packagesList(Number(sessionLoginProviderID), currentPage);
    //         setPackagesData(data.results.data);
    //         console.log("Packages List data log:", data);

    //         console.log("Packages data refreshed: ", data);

    //     } catch (error: any) {
    //         console.error("Error refreshing Packages list data:", error.message);
    //     }
    // };

    // ✅ Redux-based refresh function
    // const refreshPackagesListData = () => {
    //     dispatch(fetchPackagesList({ providerID: Number(sessionLoginProviderID), branchID: selectedBranch, searchQuery, currentPage }) as any);
    // };

    const refreshPackagesListData = async () => {
        try {
            dispatch(setLoading(true)); // ✅ Show loading state before fetching

            await dispatch(fetchPackagesList({ providerID: Number(sessionLoginProviderID), branchID: selectedBranch, searchQuery, currentPage }) as any);

            console.log("Packages data refreshed.");
        } catch (error: any) {
            console.error("Error refreshing Packages data:", error.message);
            // dispatch(setError(error.message)); // ✅ Handle errors correctly
            NotifyError("Failed to refresh data. Please try again."); // ✅ Show error via toast
        }
    };
    // if (loading) return <div>Loading...</div>;
    // if (loading) return <div>
    //     <div>
    //         <ShimmerTable
    //             mode="light"
    //             row={2}
    //             col={4}
    //             border={1}
    //             borderColor={"#cbd5e1"}
    //             rounded={0.25}
    //             rowGap={16}
    //             colPadding={[15, 5, 15, 5]}
    //         />
    //     </div>
    // </div>;

    // if (error) return <div>Error: {error}</div>;


    return (
        <div>
            <div>
                <div className="">
                    <div className="flex items-center justify-between">
                        <div>
                            <h5 className="text-3xl font-semibold py-5">Packages List ({totalItems})</h5>
                        </div>

                        {/* Select, Add Service & Search */}
                        <div className="flex items-center space-x-5 ">

                            {/* Branch Select Field */}
                            {freelancer !== true && mainBranch &&
                                (<div>
                                    {/* <SelectField
                                   label=""
                                   name="branch"
                                   // required
                                   className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                   options={[
                                       { value: "kochi", label: "Kochi" },
                                       { value: "trivandrum", label: "Trivandrum" },
                                       { value: "kollam", label: "Kollam" },
                                       { value: "thrissur", label: "Thrissur" },
                                   ]}
                               // error="This field is required."
                               /> */}

                                    <select
                                        // name=""
                                        id=""
                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                        value={selectedBranch}
                                        onChange={handleBranchChange} // Call on change

                                    >
                                        <option value="" disabled>
                                            Select Branch
                                        </option>

                                        {staffBranchListData.map((branch) => (
                                            <option key={branch.branch_id} value={branch.branch_id}>
                                                {branch.branch_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>)
                            }


                            {/* Add Service */}
                            <Link to="/ServiceListing/PackagesList/AddPackages">
                                <div
                                    // onClick={openBranchPopup}
                                    className="flex items-center bg-mindfulBlue border-[1px] border-mindfulBlue rounded-[5px] px-3 py-1.5 cursor-pointer hover:bg-mindfulWhite hover:border-mindfulBlue group"
                                >
                                    <div>
                                        <MdFormatListBulletedAdd className="text-[18px] text-mindfulWhite group-hover:text-mindfulBlue" />
                                    </div>

                                    <Button
                                        buttonType="button"
                                        buttonTitle="Add Package"
                                        className="bg-mindfulBlue text-mindfulWhite pl-2 group-hover:bg-mindfulWhite group-hover:text-mindfulBlue"
                                    />
                                </div>
                            </Link>

                            {/* Search Field */}
                            <div className="flex items-center ">
                                <InputField
                                    label={''}
                                    placeholder="Search packages..."
                                    className="w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                                {/* <MdSearch className="text-[22px] text-mindfulBlack absolute top-2 right-1 cursor-pointer" /> */}
                            </div>

                        </div>


                    </div>

                    <div className="my-5 overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-mindfulLightgrey">
                                <tr className="">
                                    <th className="text-start px-2 py-3">Package Title</th>
                                    <th className="text-start px-2 py-3">Services</th>
                                    <th className="text-start px-2 py-3">Pricing</th>
                                    <th className="text-start px-2 py-3">Status</th>
                                    <th className="text-start px-2 py-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* Content */}
                                {/* {packageListData.length > 0 ? (
                                    packageListData.map((packageData) => (
                                        <tr key={packageData.service_id} className="border-b-2">
                                            <td className="w-96 text-start px-2 py-5">
                                                <div className="flex items-center space-x-3">
                                                    <div>
                                                        <img src={rectangleBlack} alt="rectangle black" />
                                                    </div>

                                                    <p className="text-md text-mindfulBlack">{packageData.service_name}</p>
                                                </div>
                                            </td>
                                            <td className="w-[36rem] text-start px-2 py-5">
                                                <p>Bridal Glow Facial, Full Arm Waxing, Hair Spa, Aroma Pedicure, Aroma Manicure</p>
                                                <p>{packageData.package_services}</p>
                                            </td>
                                            <td className="w-72 text-start px-2 py-5">{packageData.price}</td>
                                            <td className="w-52 text-start px-2 py-5">
                                                <div className="flex items-center">
                                                    Service Online
                                                    <div>
                                                        <p className={`text-md font-semibold
                                                    ${isActive ? "text-mindfulBlack" : "text-mindfulgrey"}
                                            `}>
                                                            {isActive ? 'Active' : 'Inactive'}
                                                        </p>
                                                    </div>

                                                    Toggle Button
                                                    <div>
                                                        <div className={`toggle-switch-pkg ${isActive ? 'active' : 'inactive'}`}>
                                                            <input
                                                                className="toggle-input-pkg"
                                                                id="toggle-pkg"
                                                                type="checkbox"
                                                                checked={isActive}
                                                                onChange={handleToggle}
                                                            />

                                                            <label className="toggle-label-pkg" htmlFor="toggle-pkg"></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-start px-2 py-5">
                                                <div className="flex items-center space-x-5">
                                                    <button
                                                        onClick={openEditPackagesPopup}
                                                    >
                                                        <img src={editButton} alt="Edit" />
                                                    </button>
                                                    <button
                                                        onClick={() => openDeletePackagePopup(Number(packageData.service_id))}
                                                    >
                                                        <img src={deleteButton} alt="Delete" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={15} className="text-center py-5">
                                            No packages data available.
                                        </td>
                                    </tr>
                                )} */}

                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-5">
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
                                        </td>
                                    </tr>
                                    // ) : error ? (
                                    //     <tr>
                                    //         <td colSpan={5} className="text-center py-5">Error: {error}</td>
                                    //     </tr>
                                ) : packageListData.length > 0 ? (
                                    packageListData.map((packageData) => {

                                        // const isActiveAPI = packageData.status; // Ensure it's correctly defined

                                        const isActiveAPI = packageData.status; // Initial status from API
                                        const isActive = activeStates[packageData.provider_service_id] ?? isActiveAPI; // Use state if changed

                                        return (
                                            <tr key={packageData.provider_service_id} className="border-b-2">
                                                <td className="w-96 text-start px-2 py-5">
                                                    <div className="flex items-center space-x-3">
                                                        <img src={rectangleBlack} alt="rectangle black" />
                                                        <p className="text-md text-mindfulBlack">{packageData.service_name}</p>
                                                    </div>
                                                </td>
                                                <td className="w-[36rem] text-start px-2 py-5">
                                                    <p>{packageData.package_services}</p>
                                                </td>
                                                <td className="w-72 text-start px-2 py-5">{packageData.price}</td>
                                                <td className="w-52 text-start px-2 py-5">
                                                    {/* <div className="flex items-center">
                                                        <p className={`text-md font-semibold ${isActive ? "text-mindfulBlack" : "text-mindfulgrey"}`}>
                                                            {isActive ? 'Active' : 'Inactive'}
                                                        </p>
                                                        <div className={`toggle-switch-pkg ${isActive ? 'Active' : 'Inactive'}`}>
                                                            <input
                                                                className="toggle-input-pkg"
                                                                id={`toggle-${packageData.service_id}`}
                                                                type="checkbox"
                                                                checked={isActive}
                                                                onChange={() => handleToggle(Number(packageData.service_id), isActive)}
                                                            // onChange={handleToggle}
                                                            />
                                                            <label className="toggle-label-pkg" htmlFor={`toggle-${packageData.service_id}`}></label>
                                                        </div>
                                                    </div> */}

                                                    <div className="flex items-center">
                                                        <p className={`text-md font-semibold ${isActive === "Active" ? "text-mindfulBlack" : "text-mindfulgrey"}`}>
                                                            {isActive}
                                                        </p>
                                                        <div className={`toggle-switch-pkg ${isActive}`}>
                                                            <input
                                                                className="toggle-input-pkg"
                                                                id={`toggle-${packageData.provider_service_id}`}
                                                                type="checkbox"
                                                                checked={isActive === "Active"}
                                                                onChange={() => handleToggle(packageData.provider_service_id, isActive)}
                                                            />
                                                            <label className="toggle-label-pkg" htmlFor={`toggle-${packageData.provider_service_id}`}></label>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-start px-2 py-5">
                                                    <div className="flex items-center space-x-5">
                                                        <button
                                                            className="flex-shrink-0"
                                                            onClick={() => openEditPackagesPopup(packageData.provider_service_id)}
                                                        // onClick={openEditPackagesPopup}
                                                        >
                                                            <img className="w-16" src={editButton} alt="Edit" />
                                                        </button>
                                                        <button
                                                            className="flex-shrink-0"

                                                            onClick={() => openDeletePackagePopup(packageData.provider_service_id)}>
                                                            <img className="w-16" src={deleteButton} alt="Delete" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center py-5">
                                            No packages data available.
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div>
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />
                </div>

                {showEditPackagesPopup && <EditPackagesPopup
                    closePopup={closeEditPackagesPopup}
                    providerPackageID={Number(selectedPackageID)}
                />}

                {showDeletePackagePopup && <DeletePackagesPopup
                    closePopup={closeDeletePackagePopup}
                    providerPackageID={Number(selectedPackageID)}
                    refreshPackagesData={refreshPackagesListData}
                />}
            </div>
        </div>
    )
}
