import { useState } from "react";
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
// import { Pagination } from '@/common/Pagination';

export const SalesTransactionsTable = () => {

    // State Declaration for Invoice Popup
    const [showInvoicePopup, setShowInvoicePopup] = useState(false);

    const openInvoicePopup = () => {
        setShowInvoicePopup(!showInvoicePopup)
    }

    const closeInvoicePopup = () => {
        setShowInvoicePopup(false)
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
                                    <th className="text-start px-2 py-3">#</th>
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
                                <tr className="border-b-2">
                                    <td className="text-start px-2 py-5">1</td>
                                    <td className="text-start px-2 py-5">MB65541</td>
                                    <td className="text-start px-2 py-5">20-08-2024</td>
                                    <td className="text-start px-2 py-5">Chottanikkara</td>
                                    <td className="text-start px-2 py-5">Ramya</td>
                                    <td className="text-start px-2 py-5">97347196578</td>
                                    <td className="text-start px-2 py-5">
                                        <ul>
                                            <li>Eyesbrows Threading</li>
                                            <li>Forehead Threading</li>
                                        </ul>
                                    </td>
                                    <td className="text-start px-2 py-5">1200</td>
                                    <td className="text-start px-2 py-5">30</td>
                                    <td className="text-start px-2 py-5">20</td>
                                    <td className="text-start px-2 py-5">1250</td>
                                    <td className="text-start px-2 py-5">Gpay</td>
                                    <td className="text-start px-2 py-5">Paid</td>
                                    <td className="text-start px-2 py-5">Completed</td>

                                    {/* <td className="text-start px-2 py-5">
                                        <div>
                                        <Button
                                            buttonType="button"
                                            buttonTitle={"Completed"}
                                            className="bg-[#e5ffec] text-md text-mindfulGreen font-semibold rounded-sm px-3 py-1"
                                        />
                                        </div>
                                    </td> */}

                                    <td className="text-start px-2 py-5">
                                        <div className="flex items-center space-x-2">
                                            {/* Eye Button */}
                                            <div
                                                onClick={openInvoicePopup}
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

                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div>
                        {/* <Pagination
                            currentPage={0}
                            totalItems={0}
                            itemsPerPage={0}
                            onPageChange={function (page: number): void {
                                throw new Error('Function not implemented.');
                            }}
                            onItemsPerPageChange={function (items: number): void {
                                throw new Error('Function not implemented.');
                            }}
                        /> */}
                    </div>
                </div>
            </div>

            {showInvoicePopup && <InvoicePopup closePopup={closeInvoicePopup} />}

        </div>
    )
}
