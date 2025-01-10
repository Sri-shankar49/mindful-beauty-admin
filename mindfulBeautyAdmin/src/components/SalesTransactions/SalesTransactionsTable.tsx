import { useEffect, useState } from "react";
// import deleteButton from "../../assets/icons/deleteButton.png"
// import rectangleBlack from "../../assets/images/rectangleBlack.png"
// import Select, { SingleValue } from 'react-select';
// import stylist from "../../assets/images/stylist.png"
// import { StylistPopup } from "../Dashboard/DashBoardData/StylistPopup";
// import { SelectField } from "@/common/SelectField";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
// import { PaymentDetailsPopup } from "./Completed/PaymentDetailsPopup";
import { InvoicePopup } from '../ServiceManagement/Completed/InvoicePopup';
import { Button } from '@/common/Button';
import { InputField } from '@/common/InputField';
import { BiCalendar } from "react-icons/bi";
import { salesTransactionsList } from "@/api/apiConfig";
import { Pagination } from "@/common/Pagination";
import { ShimmerTable } from "shimmer-effects-react";
// import { Pagination } from '@/common/Pagination';

interface SalesTransactionProps {
    amount: number;
    appointment_date: string;
    appointment_status: string;
    cgst: number;
    city: string;
    order_id: number;
    paymode: string;
    paystatus: string;
    phone: string;
    services: string;
    sgst: number;
    total: number;
    user_name: string;
}

export const SalesTransactionsTable: React.FC = () => {
    // State Declaration for Invoice Popup
    const [showInvoicePopup, setShowInvoicePopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [salesTransactionsData, setSalesTransactionsData] = useState<SalesTransactionProps[]>([]);
    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

    // Login Provider ID
    const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
    console.log("Login Provider ID from session storage", sessionLoginProviderID);

    useEffect(() => {
        // Fetch data from API
        const fetchServiceListData = async () => {

            try {
                setLoading(true);
                // const data: BranchCardProps[] = await branchList();

                const data = await salesTransactionsList(Number(sessionLoginProviderID), currentPage);


                // const data = await servicesList(Number(1), currentPage);

                setSalesTransactionsData(data.results || []);
                // setTotalItems(data.count);

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

    const openInvoicePopup = (orderId: number) => {
        setSelectedOrderId(orderId);
        setShowInvoicePopup(true);
    }

    const closeInvoicePopup = () => {
        setShowInvoicePopup(false)
    }

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
            <div className="bg-mindfulLightPink px-5 py-5" >

                <div className="bg-mindfulWhite px-5 py-5">

                    {/* Search Tab */}
                    <div>
                        <form action="" method="post">
                            <div>
                                <fieldset className="border-2 border-main rounded-[5px] px-5 py-5">
                                    <legend className="text-lg text-main font-semibold px-2">Search</legend>
                                    {/* <div className="border-2 border-main rounded-[5px] px-5 py-5"> */}
                                    <div className="flex items-end space-x-10">

                                        {/* Order ID */}
                                        <div>
                                            <label
                                                htmlFor="orderID"
                                                className="text-lg text-mindfulBlack font-semibold">
                                                Order ID
                                            </label>

                                            <InputField
                                                label=""
                                                name="orderID"
                                                id="orderID"
                                                className="w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                                            />
                                        </div>

                                        {/* Customer Name / Mobile */}
                                        <div>
                                            <label
                                                htmlFor="customerMobile"
                                                className="text-lg text-mindfulBlack font-semibold">
                                                Customer Name / Mobile
                                            </label>

                                            <InputField
                                                label=""
                                                id="customerMobile"
                                                name="customerMobile"
                                                className="w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                                            />
                                        </div>

                                        {/* Provider Name / Mobile */}
                                        <div>
                                            <label
                                                htmlFor="providerName"
                                                className="text-lg text-mindfulBlack font-semibold">
                                                Provider Name / Mobile
                                            </label>

                                            <InputField
                                                label=""
                                                id="providerName"
                                                name="providerName"
                                                className="w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                                            />
                                        </div>

                                        {/* Start Date */}
                                        <div>
                                            <label
                                                htmlFor="startDate"
                                                className="text-lg text-mindfulBlack font-semibold">
                                                Start Date
                                            </label>

                                            <div className="relative">
                                                <InputField
                                                    label=""
                                                    id="startDate"
                                                    name="startDate"
                                                    className="w-40 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                                                />
                                                <BiCalendar className="text-[20px] text-mindfulBlack absolute top-2 right-1.5 cursor-pointer" />
                                            </div>
                                        </div>

                                        {/* End Date */}
                                        <div>
                                            <label
                                                htmlFor="endDate"
                                                className="text-lg text-mindfulBlack font-semibold">
                                                End Date
                                            </label>

                                            <div className="relative">
                                                <InputField
                                                    label=""
                                                    id="endDate"
                                                    name="endDate"
                                                    className="w-40 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                                                />
                                                <BiCalendar className="text-[20px] text-mindfulBlack absolute top-2 right-1.5 cursor-pointer" />

                                            </div>
                                        </div>

                                        <div className="">
                                            <div className="flex items-center space-x-3">
                                                <Button
                                                    buttonType="button"
                                                    buttonTitle="Show Orders"
                                                    className="bg-mindfulBlue text-mindfulWhite border-[1px] border-mindfulBlue rounded-[5px] px-5 py-1.5 cursor-pointer hover:bg-mindfulWhite hover:border-mindfulBlue hover:text-mindfulBlue"
                                                />
                                                <Button
                                                    buttonType="button"
                                                    buttonTitle="Clear"
                                                    className="bg-mindfulWhite text-mindfulBlack border-[1px] border-mindfulBlack rounded-[5px] px-5 py-1.5 cursor-pointer hover:bg-mindfulBlack hover:border-mindfulBlack hover:text-mindfulWhite"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* </div> */}
                                </fieldset>
                            </div>
                        </form>
                    </div>

                    <div className="pb-5">
                        <div className="flex items-center justify-between">
                            {/* Sub Heading */}
                            <div>
                                <h5 className="text-3xl font-semibold py-5">Sales & Transactions</h5>
                            </div>

                            {/* Download CSV Button */}
                            <div>
                                <Button
                                    buttonType="button"
                                    buttonTitle="Download CSV"
                                    className="bg-main text-lg text-mindfulWhite rounded-sm px-8 py-2"
                                />
                            </div>
                        </div>
                    </div>


                    <div>
                        <table className="w-full">
                            <thead className="bg-mindfulLightgrey">
                                <tr className="">
                                    {/* <th className="text-start px-2 py-3">#</th> */}
                                    <th className="text-start px-2 py-3">Order ID</th>
                                    <th className="text-start px-2 py-3">Date of Service</th>
                                    <th className="text-start px-2 py-3">Branch</th>
                                    <th className="text-start px-2 py-3">Customer</th>
                                    <th className="text-start px-2 py-3">Phone</th>
                                    <th className="text-start px-2 py-3">Service</th>
                                    <th className="text-start px-2 py-3">Amount</th>
                                    <th className="text-start px-2 py-3">SGST</th>
                                    <th className="text-start px-2 py-3">CGST</th>
                                    <th className="text-start px-2 py-3">Total</th>
                                    <th className="text-start px-2 py-3">Pay Mode</th>
                                    <th className="text-start px-2 py-3">Pay Status</th>
                                    <th className="text-start px-2 py-3">Order Status</th>
                                    <th className="text-start px-2 py-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* Content */}
                                {salesTransactionsData.length > 0 ? (
                                    salesTransactionsData.map((transaction) => (
                                        <tr key={transaction.order_id} className="border-b-2">
                                            {/* <td className="text-start px-2 py-5">1</td> */}
                                            <td className="text-start px-2 py-5">{transaction.order_id}</td>
                                            <td className="text-start px-2 py-5">{transaction.appointment_date}</td>
                                            <td className="text-start px-2 py-5">{transaction.city}</td>
                                            <td className="text-start px-2 py-5">{transaction.user_name}</td>
                                            <td className="text-start px-2 py-5">{transaction.phone}</td>
                                            <td className="text-start px-2 py-5">
                                                {transaction.services}
                                            </td>
                                            <td className="text-start px-2 py-5">{transaction.amount}</td>
                                            <td className="text-start px-2 py-5">{transaction.sgst}</td>
                                            <td className="text-start px-2 py-5">{transaction.cgst}</td>
                                            <td className="text-start px-2 py-5">{transaction.total}</td>
                                            <td className="text-start px-2 py-5">{transaction.paymode}</td>
                                            <td className="text-start px-2 py-5">{transaction.paystatus}</td>
                                            <td className="text-start px-2 py-5">{transaction.appointment_status}</td>


                                            <td className="text-start px-2 py-5">
                                                <div className="flex items-center space-x-2">
                                                    {/* Eye Button */}
                                                    <div
                                                        onClick={() => openInvoicePopup(transaction.order_id)}
                                                        className="border-[1px] border-mindfulBlack rounded-sm px-2 py-1.5 cursor-pointer">
                                                        <MdOutlineRemoveRedEye className="text-[20px] text-mindfulBlack" />
                                                    </div>

                                                    {/* Download Button */}
                                                    <div className="border-[1px] border-mindfulGreen rounded-sm px-2 py-1.5 cursor-pointer">
                                                        <FiDownload className="text-[18px] text-mindfulGreen" />
                                                    </div>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={15} className="text-center py-5">
                                            No transactions available.
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div>
                        <Pagination
                            currentPage={currentPage}
                            totalItems={salesTransactionsData.length}
                            itemsPerPage={itemsPerPage}
                            onPageChange={(page: number) => setCurrentPage(page)}
                            onItemsPerPageChange={(items: number) => setItemsPerPage(items)}
                        />
                    </div>
                </div>
            </div>

            {showInvoicePopup && selectedOrderId && (
                <InvoicePopup
                    closePopup={closeInvoicePopup}
                    appointmentId={selectedOrderId}
                />
            )}

        </div>
    )
}
