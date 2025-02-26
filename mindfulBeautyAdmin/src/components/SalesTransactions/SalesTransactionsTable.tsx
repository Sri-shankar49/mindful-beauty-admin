import { useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { InvoicePopup } from '../ServiceManagement/Completed/InvoicePopup';
import { Button } from '@/common/Button';
import { InputField } from '@/common/InputField';
import { salesTransactionsList, fetchSalesTransactionsByFilters, salesTransactionsInvoice, salesTransactionsCSV } from "@/api/apiConfig";
import { Pagination } from "@/common/Pagination";
import { ShimmerTable } from "shimmer-effects-react";

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
    // const [loading1, setLoading1] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [salesTransactionsData, setSalesTransactionsData] = useState<SalesTransactionProps[]>([]);
    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
    // Add state variables to hold the input values
    const [orderID, setOrderID] = useState<string>("");
    const [customerMobile, setCustomerMobile] = useState<string>("");
    const [providerName, setProviderName] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    // Login Provider ID
    const sessionLoginProviderID = sessionStorage.getItem("loginProviderID") as string | null;
    console.log("Login Provider ID from session storage", sessionLoginProviderID);

    useEffect(() => {
        // Fetch data from API
        const fetchServiceListData = async () => {
            try {
                setLoading(true);
                const data = await salesTransactionsList(Number(sessionLoginProviderID), currentPage);
                setSalesTransactionsData(data.results || []);
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
    // if (loading) {
    //     return (
    //         <div>
    //             <div>
    //                 <ShimmerTable
    //                     mode="light"
    //                     row={2}
    //                     col={4}
    //                     border={1}
    //                     borderColor={"#cbd5e1"}
    //                     rounded={0.25}
    //                     rowGap={16}
    //                     colPadding={[15, 5, 15, 5]}
    //                 />
    //             </div>
    //         </div>
    //     );
    // }


    // if (error) return <div>{error}</div>;

    // Add the handleOnSubmit method
    const handleOnSubmit = async () => {
        try {
            setLoading(true);
            const response = await fetchSalesTransactionsByFilters({
                providerID: Number(sessionLoginProviderID),
                orderID,
                customerMobile,
                providerName,
                startDate,
                endDate,
            });
            console.log("Filtered Sales Transactions:", response);
            setSalesTransactionsData(response.results || []);
        } catch (error: any) {
            setError(error.message || "Failed to fetch filtered sales transactions.");
        } finally {
            setLoading(false);
        }
    }

    const handleClearFields = async () => {
        setOrderID("");
        setCustomerMobile("");
        setProviderName("");
        setStartDate("");
        setEndDate("");
        // Fetch default sales transactions without filters
        try {
            setLoading(true);
            const response = await salesTransactionsList(Number(sessionLoginProviderID), currentPage);
            setSalesTransactionsData(response.results || []);
        } catch (error: any) {
            setError(error.message || "Failed to fetch default sales transactions.");
        } finally {
            setLoading(false);
        }
    };



    // Function Handler for downloading the sales transactions CSV
    const handleDownloadCSV = async () => {

        try {
            const blob = await salesTransactionsCSV(Number(sessionLoginProviderID));

            // Create a link and trigger the download
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "sales_transactions.csv");
            document.body.appendChild(link);
            link.click();

            // Cleanup
            link.remove();
            window.URL.revokeObjectURL(url);

            console.log("CSV file downloaded successfully.");

        }
        catch (error: any) {
            setError(error.message || "Failed to download CSV file.");
        }
        finally {
            setLoading(false);// Reset the loading state
        }
    }



    // Function Handler for downloading the sales transactions invoice
    const handleDownloadInvoice = async (appointmentID: number) => {

        try {
            // setLoading(true);
            const blob = await salesTransactionsInvoice(appointmentID);

            // Create a link element and trigger download
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `invoice_${appointmentID}.pdf`); // Assuming it's a PDF
            document.body.appendChild(link);
            link.click();

            // Cleanup
            link.remove();
            window.URL.revokeObjectURL(url);

            console.log("Sales & transactions invoice downloaded successfully.");

        }
        catch (error: any) {
            setError(error.message || "Failed to download sales & transactions Invoice.");
        }
        finally {
            setLoading(false);// Reset the loading state
        }
    }

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
                                    <div className="flex items-end space-x-10 2xl:flex-wrap 2xl:gap-4 2xl:space-x-0">
                                        {/* Order ID */}
                                        <div>
                                            <label
                                                htmlFor="orderID"
                                                className="text-lg text-mindfulBlack font-semibold">
                                                Order ID
                                            </label>
                                            <InputField
                                                type="number"
                                                label=""
                                                name="orderID"
                                                id="orderID"
                                                value={orderID}
                                                onChange={(e) => setOrderID(e.target.value)}
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
                                                value={customerMobile}
                                                onChange={(e) => setCustomerMobile(e.target.value)}
                                                className="w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                                            />
                                        </div>
                                        {/* Provider Name / Mobile */}
                                        <div>
                                            <label
                                                htmlFor="providerName"
                                                className="text-lg text-mindfulBlack font-semibold">
                                                Branch Name / Mobile
                                            </label>
                                            <InputField
                                                label=""
                                                id="providerName"
                                                name="providerName"
                                                value={providerName}
                                                onChange={(e) => setProviderName(e.target.value)}
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
                                            {/* <div className="relative"> */}
                                            <InputField
                                                type="date"
                                                label=""
                                                id="startDate"
                                                name="startDate"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                className="w-40 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                                            />
                                            {/* <BiCalendar className="text-[20px] text-mindfulBlack absolute top-2 right-1.5 cursor-pointer" />
                                            </div> */}
                                        </div>
                                        {/* End Date */}
                                        <div>
                                            <label
                                                htmlFor="endDate"
                                                className="text-lg text-mindfulBlack font-semibold">
                                                End Date
                                            </label>
                                            {/* <div className="relative"> */}
                                            <InputField
                                                type="date"
                                                label=""
                                                id="endDate"
                                                name="endDate"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                className="w-40 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                                            />
                                            {/* <BiCalendar className="text-[20px] text-mindfulBlack absolute top-2 right-1.5 cursor-pointer" />
                                            </div> */}
                                        </div>
                                        <div className="">
                                            <div className="flex items-center space-x-3">
                                                <Button
                                                    buttonType="button"
                                                    buttonTitle="Show Orders"
                                                    onClick={handleOnSubmit}
                                                    className="bg-mindfulBlue text-mindfulWhite border-[1px] border-mindfulBlue rounded-[5px] px-5 py-1.5 cursor-pointer hover:bg-mindfulWhite hover:border-mindfulBlue hover:text-mindfulBlue"
                                                />
                                                <Button
                                                    buttonType="button"
                                                    buttonTitle="Clear"
                                                    onClick={handleClearFields}
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
                                    onClick={() => handleDownloadCSV()}
                                    buttonType="button"
                                    buttonTitle="Download CSV"
                                    className="bg-main text-lg text-mindfulWhite border-[1px] rounded-sm px-8 py-2 cursor-pointer hover:bg-mindfulWhite hover:text-main hover:border-main"
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
                                {loading ? (
                                    <tr>
                                        <td colSpan={14} className="text-center px-2 py-5">
                                            <ShimmerTable
                                                mode="light"
                                                row={salesTransactionsData.length + 1} // Adjust based on expected staff rows
                                                col={11} // Matches table columns
                                                border={1}
                                                borderColor={"#cbd5e1"}
                                                rounded={0.25}
                                                rowGap={16}
                                                colPadding={[15, 5, 15, 5]}
                                            />
                                        </td>
                                    </tr>
                                ) : error ? (
                                    /* Error State */
                                    <tr>
                                        <td colSpan={14} className="text-center text-red-600 py-5">
                                            Error: {error}
                                        </td>
                                    </tr>
                                ) : (
                                    salesTransactionsData.length > 0 ? (
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
                                                        <div
                                                            onClick={() => handleDownloadInvoice(transaction.order_id)}
                                                            className="group border-[1px] border-mindfulGreen rounded-sm px-2 py-1.5 cursor-pointer hover:bg-mindfulGreen transition-all duration-200">
                                                            <FiDownload className="text-[18px] text-mindfulGreen group-hover:text-mindfulWhite transition-all duration-200" />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={14} className="text-center py-5">
                                                No transactions available.
                                            </td>
                                        </tr>
                                    )
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
