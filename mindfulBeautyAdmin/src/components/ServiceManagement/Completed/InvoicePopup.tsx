import { IoCloseCircle } from 'react-icons/io5'
import { Button } from '@/common/Button'

interface InvoicePopupProps {
    closePopup: () => void;
}

export const InvoicePopup: React.FC<InvoicePopupProps> = ({ closePopup }) => {
    return (
        <div>
            <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                <div className="container mx-auto">

                    <div className="relative bg-white rounded-[5px] w-6/12 mx-auto px-20 py-10">


                        {/* <div className="relative mb-16">
                            <h2 className="text-2xl text-mindfulBlack font-semibold">Payment Details</h2>
                            <div className="absolute inset-x-0 bottom-[-20px] mx-auto bg-mindfulgrey rounded-md w-full h-0.5">
                            </div>
                        </div> */}

                        {/* Close Button */}
                        <div
                            onClick={closePopup}
                            className="absolute top-5 right-5 w-fit cursor-pointer"
                        >
                            <IoCloseCircle className="text-mindfulGrey text-[32px]" />
                        </div>

                        <div className="">

                            {/* Invoice to & Payment Details */}
                            <div className="grid grid-cols-2 gap-x-5 items-center mb-10">

                                {/* Grid Column One */}
                                <div className="space-y-5">

                                    {/* Invoice to: */}
                                    <div className="">
                                        <h5
                                            className="text-md text-mindfulBlack font-semibold mb-5"
                                        >
                                            Invoice to:
                                        </h5>

                                        <p className="text-md text-mindfulBlack">
                                            Priyanka | +91 9586589785
                                        </p>

                                        <p className="text-md text-mindfulBlack">
                                            No. 285, Second Street, Alwarpet, Chennai - 600028
                                        </p>
                                    </div>

                                    {/* Invoice to: */}
                                    <div className="">
                                        <label
                                            htmlFor="price"
                                            className="text-md text-mindfulBlack font-semibold mb-1"
                                        >
                                            Invoice to:
                                        </label>
                                        {/* <InputField
                                                label={''}
                                                type="number"
                                                name="price"
                                                id="price"
                                                placeholder="1500"
                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                            /> */}

                                        <p></p>
                                    </div>

                                </div>

                                {/* Grid Column two */}
                                <div className="space-y-5">
                                    {/* Payment Details: */}
                                    <div className="">
                                        <h5
                                            className="text-md text-mindfulBlack font-semibold mb-5"
                                        >
                                            Payment Details:
                                        </h5>

                                        {/* <p className="text-md text-mindfulBlack">
                                                Priyanka | +91 9586589785
                                            </p>

                                            <p className="text-md text-mindfulBlack">
                                                No. 285, Second Street, Alwarpet, Chennai - 600028
                                            </p> */}
                                        <table className="w-full">
                                            <tbody>
                                                <tr>
                                                    <td>Total Due:</td>
                                                    <td>
                                                        <span className="text-md text-mindfulBlack font-bold text-end">Rs. 5170</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Payment Mode:</td>
                                                    <td>
                                                        <span className="text-md text-mindfulBlack uppercase text-end">Cash</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Payment Status:</td>
                                                    <td>
                                                        <span className="text-md text-mindfulBlack uppercase text-end">paid</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Coupon:</td>
                                                    <td>
                                                        <span className="text-md text-mindfulBlack uppercase text-end">nil</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>

                            {/* Description & Charges */}
                            <div>
                                <div className="w-3/4 mx-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-mindfulLightgrey">
                                                <th className="text-lg text-mindfulBlack font-normal text-start px-2 py-2">Description</th>
                                                <th className="text-lg text-mindfulBlack font-normal text-start px-2 py-2">Charges</th>
                                            </tr>
                                        </thead>

                                        <tbody className="border-b-2">
                                            <tr>
                                                <td className="font-semibold px-2 py-2">Bridal Glow Facial</td>
                                                <td>
                                                    <span className="text-md text-mindfulBlack font-semibold text-end px-2 py-2">Rs. 3500</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold px-2 py-2">Hair Spa</td>
                                                <td>
                                                    <span className="text-md text-mindfulBlack font-semibold text-end px-2 py-2">Rs. 1000</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold px-2 py-2">Gel Extension</td>
                                                <td>
                                                    <span className="text-md text-mindfulBlack font-semibold text-end px-2 py-2">Rs. 500</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="w-3/4 mx-auto">
                                        <table className="w-full">
                                            <tr className="border-b-2">
                                                <td className="text-lg text-mindfulBlack font-semibold px-2 py-2">Sub total:</td>
                                            </tr>

                                            <tbody className="border-b-2">
                                                <tr>
                                                    <td className=" px-2 py-3">SGST Tax:</td>
                                                    <td className=" px-2 py-3">Rs. 85</td>
                                                </tr>

                                                <tr>
                                                    <td className=" px-2 py-3">SGST Tax:</td>
                                                    <td className=" px-2 py-3">Rs. 85</td>
                                                </tr>
                                            </tbody>

                                            <tfoot>
                                                <tr>
                                                    <td className="text-md text-mindfulBlack font-semibold uppercase px-2 py-5">Total:</td>
                                                    <td className="text-md text-mindfulBlack font-semibold px-2 py-5">Rs. 5170</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>

                                    {/* Download Button */}
                                    <div className="text-center py-5">
                                        <Button
                                            buttonType="button"
                                            buttonTitle="Download"
                                            className="bg-main text-lg text-mindfulWhite rounded-sm px-8 py-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='pb-5'>
                                {/* Rupees in words */}
                                <div className="grid grid-cols-4">
                                    <p>Rupees in words:</p>
                                    <p className="col-span-3 text-md text-mindfulBlack font-semibold">Five Thousand One Hundred Seventy Only</p>
                                </div>
                            </div>

                            <div>
                                <p>1. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <p>2. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <p>3. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
