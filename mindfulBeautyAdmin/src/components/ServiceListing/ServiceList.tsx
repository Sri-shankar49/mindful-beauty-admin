import { useEffect, useState } from "react";
import editButton from "../../assets/icons/editButton.png"
import deleteButton from "../../assets/icons/deleteButton.png"
import rectangleBlack from "../../assets/images/rectangleBlack.png"
import { EditServicePopup } from "./AddServices/EditServicePopup";
import { Button } from "@/common/Button";
import { Pagination } from "@/common/Pagination";
import { Link, NavLink } from "react-router-dom";
// import { SelectField } from "@/common/SelectField";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { InputField } from "@/common/InputField";
import { servicesList, staffBranchList } from "@/api/apiConfig";
import { DeleteServicesPopup } from "./DeleteServicesPopup";
import { ShimmerTable } from "shimmer-effects-react";



interface StaffBranchListDataProps {
    branch_id?: number;
    branch_name: string;
}

interface ServiceListProps {
    service_id?: number;
    provider_service_id?: number;
    service_name: string;
    category: string;
    category_id?: number;
    subcategory: string;
    subcategory_id?: string;
    price?: string;
    service_time: string;
    status: string;
    sku_value: string;
    branch_id?: number;
}


export const ServiceList: React.FC<ServiceListProps> = () => {

    const defaultEditServiceData = {
        service_id: undefined,
        provider_service_id: undefined,
        service_name: '',
        category: '',
        price: '',
        service_time: '',
        status: '',
        sku_value: '',
    };

    const [showEditServicePopup, setShowEditServicePopup] = useState(false);
    const [showDeleteServicePopup, setShowDeleteServicePopup] = useState(false);

    const [serviceListData, setServiceListData] = useState<ServiceListProps[]>([]);
    const [staffBranchListData, setStaffBranchListData] = useState<StaffBranchListDataProps[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<string>("");


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedServiceID, setSelectedServiceID] = useState<number | null>(null);
    const [totalItems, setTotalItems] = useState(0);

    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);


    const openEditService = (providerServiceID: number) => {
        setShowEditServicePopup(!showEditServicePopup);
        setSelectedServiceID(providerServiceID);
        console.log("Edit the selected service with ID:", providerServiceID);
    }

    const closeEditService = () => {
        setShowEditServicePopup(false)
    }

    const openDeleteServicePopup = (providerServiceID: number) => {
        setShowDeleteServicePopup(true);
        setSelectedServiceID(providerServiceID);
        console.log("Delete the selected service with ID:", providerServiceID);

    }

    const closeDeleteServicePopup = () => {
        setShowDeleteServicePopup(false);
    }


    // Login Provider ID
    const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
    console.log("Login Provider ID from session storage", sessionLoginProviderID);

    useEffect(() => {
        // Fetch data from API
        const fetchServiceListData = async () => {

            try {
                setLoading(true);
                // const data: BranchCardProps[] = await branchList();

                const data = await servicesList(Number(sessionLoginProviderID), 0, currentPage);

                const branchdata = await staffBranchList();
                setStaffBranchListData(branchdata.data || []);
                console.log("Fetched Services List --> Branch List data log:", branchdata.data);

                // const data = await servicesList(Number(1), currentPage);

                setServiceListData(data.results || []);
                setTotalItems(data.count);

                console.log("Fetched Service List data log:", data);
                console.log("Fetched Booking List pagination count data log :", data.count);

            } catch (error: any) {
                setError(error.message || "Failed to fetch service list data.");
            } finally {
                setLoading(false);
            }
        };

        fetchServiceListData();
    }, [currentPage, itemsPerPage]);


    // Function call on changing the branch
    const handleBranchChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBranchId = event.target.value; // Get the selected branch ID
        setSelectedBranch(selectedBranchId); // Update branch selection state

        console.log("Hello Branch ID", selectedBranchId);



        try {
            setLoading(true);


            // Fetch Services List for the selected branch
            const servicesListdata = await servicesList(Number(sessionLoginProviderID), Number(selectedBranchId), currentPage);


            // Take a deep copy of the service list data and update
            const updatedServiceList = [...servicesListdata.results]; // Assuming results is an array

            // Update the services data based on the branch
            setServiceListData(updatedServiceList || []);
            setTotalItems(servicesListdata.count);

            console.log("Updated Services Data for Branch:", servicesListdata);
        } catch (error: any) {
            setError(error.message || "Failed to fetch active services for the selected branch");
        } finally {
            setLoading(false);

        }
    };


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (items: number) => {
        setItemsPerPage(items);
        setCurrentPage(1); // Reset to the first page when items per page changes
    };


    // if (loading) return <div>Loading...</div>;
    if (loading) return <div>
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

    if (error) return <div>{error}</div>;

    return (
        <div>
            <div>
                <div className="bg-mindfulLightPink px-5 py-5">

                    <div className="bg-mindfulWhite px-5 py-5">

                        <div className="pb-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <NavLink to="ServiceList">
                                        {/* <h5 className="text-3xl font-semibold">Services List (85)</h5> */}
                                        <h5 className="text-3xl font-semibold">Services List ({totalItems})</h5>
                                    </NavLink>
                                </div>

                                {/* Select, Add Service & Search */}
                                <div className="flex items-center space-x-5">

                                    {/* Branch Select Field */}
                                    <div>
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
                                    </div>

                                    {/* Add Service */}
                                    <Link to="/ServiceListing/AddServices">
                                        <div
                                            // onClick={openBranchPopup}
                                            className="flex items-center bg-mindfulBlue border-[1px] border-mindfulBlue rounded-[5px] px-3 py-1.5 cursor-pointer hover:bg-mindfulWhite hover:border-mindfulBlue group"
                                        >
                                            <div>
                                                <MdFormatListBulletedAdd className="text-[18px] text-mindfulWhite group-hover:text-mindfulBlue" />
                                            </div>

                                            <Button
                                                buttonType="button"
                                                buttonTitle="Add Service"
                                                className="bg-mindfulBlue text-mindfulWhite pl-2 group-hover:bg-mindfulWhite group-hover:text-mindfulBlue"
                                            />
                                        </div>
                                    </Link>

                                    {/* Search Field */}
                                    <div className="flex items-center ">
                                        <InputField
                                            label={''}
                                            placeholder="Search"
                                            className="w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                                        />
                                        {/* <MdSearch className="text-[22px] text-mindfulBlack absolute top-2 right-1 cursor-pointer" /> */}
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div>
                            <table className="w-full">
                                <thead className="bg-mindfulLightgrey">
                                    <tr className="">
                                        <th className="text-start px-2 py-3">SKU ID</th>
                                        <th className="text-start px-2 py-3">Service</th>
                                        <th className="text-start px-2 py-3">Category</th>
                                        <th className="text-start px-2 py-3">Sub Category</th>
                                        <th className="text-start px-2 py-3">Pricing</th>
                                        <th className="text-start px-2 py-3">Duration</th>
                                        <th className="text-start px-2 py-3">Status</th>
                                        <th className="text-start px-2 py-3">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {serviceListData.length > 0 ? (
                                        serviceListData.map((service) => (
                                            <tr key={service.service_id} className="border-b-2">
                                                <td className="text-start px-2 py-5">{service.sku_value}</td>
                                                <td className="text-start px-2 py-5">
                                                    <div className="flex items-center space-x-3">
                                                        <div>
                                                            <img src={rectangleBlack} alt="rectangle black" />
                                                        </div>

                                                        <p className="text-md text-mindfulBlack">{service.service_name}</p>
                                                    </div>
                                                </td>
                                                <td className="text-start px-2 py-5">{service.category}</td>
                                                <td className="text-start px-2 py-5">{service.subcategory}</td>
                                                <td className="text-start px-2 py-5">{service.price}</td>
                                                <td className="text-start px-2 py-5">{service.service_time}</td>
                                                <td className="text-start px-2 py-5">
                                                    {service.status === "Active" ? (
                                                        <Button
                                                            buttonType="button"
                                                            buttonTitle={"Active"}
                                                            className="text-md text-mindfulGreen font-semibold border-[1px] border-mindfulGreen rounded-sm px-3 py-1"
                                                        />
                                                    ) : (<Button
                                                        buttonType="button"
                                                        buttonTitle={"InActive"}
                                                        className="text-md text-mindfulRed font-semibold border-[1px] border-mindfulRed rounded-sm px-3 py-1"
                                                    />)}

                                                </td>
                                                <td className="px-2 py-5">
                                                    <div className="flex items-center space-x-5">
                                                        <button onClick={() => openEditService(Number(service.provider_service_id))}>
                                                            <img src={editButton} alt="editButton" />
                                                        </button>
                                                        <button onClick={() => openDeleteServicePopup(Number(service.provider_service_id))}>
                                                            <img src={deleteButton} alt="deleteButton" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={8} className="text-center py-5">
                                                No service data available.
                                            </td>
                                        </tr>
                                    )}

                                    {/* Content */}
                                    {/* <tr className="border-b-2">
                                        <td className="text-start px-2 py-5">MB94873</td>
                                        <td className="text-start px-2 py-5">
                                            <div className="flex items-center space-x-3">
                                                <div>
                                                    <img src={rectangleBlack} alt="rectangle black" />
                                                </div>

                                                <p className="text-md text-mindfulBlack">Full Face Threading</p>
                                            </div>
                                        </td>
                                        <td className="text-start px-2 py-5">Skin</td>
                                        <td className="text-start px-2 py-5">Threading</td>
                                        <td className="text-start px-2 py-5">200</td>
                                        <td className="text-start px-2 py-5">15 mins</td>
                                        <td className="text-start px-2 py-5">
                                            <Button
                                                buttonType="button"
                                                buttonTitle={"Active"}
                                                className="text-md text-mindfulGreen font-semibold border-[1px] border-mindfulGreen rounded-sm px-3 py-1"
                                            />
                                        </td>

                                        <td className="px-2 py-5">
                                            <div className="flex items-center space-x-5">
                                                <button onClick={openEditService}>
                                                    <img src={editButton} alt="editButton" />
                                                </button>
                                                <button>
                                                    <img src={deleteButton} alt="deleteButton" />
                                                </button>
                                            </div>
                                        </td>


                                    </tr> */}

                                    {/* Content */}
                                    {/* <tr className="border-b-2">
                                        <td className="text-start px-2 py-5">MB94873</td>
                                        <td className="text-start px-2 py-5">
                                            <div className="flex items-center space-x-3">
                                                <div>
                                                    <img src={rectangleBlack} alt="rectangle black" />
                                                </div>

                                                <p className="text-md text-mindfulBlack">Anti-aging Facial</p>
                                            </div>
                                        </td>
                                        <td className="text-start px-2 py-5">Skin</td>
                                        <td className="text-start px-2 py-5">Facials</td>
                                        <td className="text-start px-2 py-5">2,200</td>
                                        <td className="text-start px-2 py-5">30 mins</td>
                                        <td className="text-start px-2 py-5">
                                            <Button
                                                buttonType="button"
                                                buttonTitle={"InActive"}
                                                className="text-md text-mindfulRed font-semibold border-[1px] border-mindfulRed rounded-sm px-3 py-1"
                                            />
                                        </td>

                                        <td className="px-2 py-5">
                                            <div className="flex items-center space-x-5">
                                                <button onClick={openEditService}>
                                                    <img src={editButton} alt="editButton" />
                                                </button>
                                                <button>
                                                    <img src={deleteButton} alt="deleteButton" />
                                                </button>
                                            </div>
                                        </td>

                                    </tr> */}
                                </tbody>
                            </table>
                        </div>

                        {/* // Inside your JSX, where you're conditionally rendering the EditServicePopup: */}
                        {showEditServicePopup && selectedServiceID && (
                            <EditServicePopup
                                closePopup={closeEditService}
                                // Ensure that the serviceListData is filtered correctly, and defaultEditServiceData is used safely
                                editServiceData={serviceListData.find((service) => service.provider_service_id === selectedServiceID) || defaultEditServiceData}
                            />
                        )}

                        {showDeleteServicePopup && <DeleteServicesPopup closePopup={closeDeleteServicePopup} providerServiceID={Number(selectedServiceID)} />}

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
                    </div>

                </div>
            </div>
        </div>
    )
}
