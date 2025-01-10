import { IoCloseCircle } from 'react-icons/io5'
import { Button } from '@/common/Button'
import { invoiceDetails } from '@/api/apiConfig';
import { useEffect, useState } from 'react';

interface InvoicePopupProps {
    closePopup: () => void;
    appointmentId: number;
}

interface InvoiceData {
    user: {
        name: string;
        phone: string;
        address: string;
    };
    appointment: {
        date: string;
        time: string;
    };
    payment: {
        amount: number;
        cgst: number;
        sgst: number;
        grand_total: number;
        coupon_code: string;
        coupon_amount: number;
        payment_mode: string;
        payment_status: string;
    };
    services: Array<{
        name: string;
        price: string;
    }>;
}

const numberToWords = (num: number): string => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

    const convertLessThanThousand = (n: number): string => {
        if (n === 0) return '';

        if (n < 10) return ones[n];
        if (n < 20) return teens[n - 10];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');

        return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + convertLessThanThousand(n % 100) : '');
    };

    if (num === 0) return 'Zero';

    const thousands = Math.floor((num % 100000) / 1000);
    const hundreds = num % 1000;

    let words = '';
    if (thousands) words += convertLessThanThousand(thousands) + ' Thousand ';
    if (hundreds) words += convertLessThanThousand(hundreds);

    return words.trim() + ' Only';
};

export const InvoicePopup: React.FC<InvoicePopupProps> = ({ closePopup, appointmentId }) => {

    const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInvoiceDetails = async () => {
            setLoading(true)
            try {
                const data = await invoiceDetails(appointmentId);
                console.log("Invoice details data log:", data);
                if (data.status === "success") {
                    setInvoiceData(data.invoice);
                } else {
                    setError("Failed to fetch invoice details");
                }
            } catch (error) {
                setError("Error fetching invoice data");
            } finally {
                setLoading(false);
            }
        };

        fetchInvoiceDetails();
    }, [appointmentId]);

    return (
        <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
            <div className="container mx-auto">
                <div className="relative bg-white rounded-[5px] w-6/12 mx-auto px-20 py-10">
                    {/* Close Button */}
                    <div onClick={closePopup} className="absolute top-5 right-5 w-fit cursor-pointer">
                        <IoCloseCircle className="text-mindfulGrey text-[32px]" />
                    </div>

                    <div className="">
                        {/* Invoice to & Payment Details */}
                        <div className="grid grid-cols-2 gap-x-5 items-center mb-10">
                            {/* Grid Column One */}
                            <div className="space-y-5">
                                {/* Invoice to: */}
                                <div className="">
                                    <h5 className="text-md text-mindfulBlack font-semibold mb-5">
                                        Invoice to:
                                    </h5>
                                    <p className="text-md text-mindfulBlack">
                                        {invoiceData?.user.name} | {invoiceData?.user.phone}
                                    </p>
                                    <p className="text-md text-mindfulBlack">
                                        {invoiceData?.user.address}
                                    </p>
                                </div>
                            </div>

                            {/* Grid Column two */}
                            <div className="space-y-5">
                                {/* Payment Details: */}
                                <div className="">
                                    <h5 className="text-md text-mindfulBlack font-semibold mb-5">
                                        Payment Details:
                                    </h5>
                                    <table className="w-full">
                                        <tbody>
                                            <tr>
                                                <td>Total Due:</td>
                                                <td>
                                                    <span className="text-md text-mindfulBlack font-bold text-end">
                                                        Rs. {invoiceData?.payment.grand_total}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Payment Mode:</td>
                                                <td>
                                                    <span className="text-md text-mindfulBlack uppercase text-end">
                                                        {invoiceData?.payment.payment_mode}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Payment Status:</td>
                                                <td>
                                                    <span className="text-md text-mindfulBlack uppercase text-end">
                                                        {invoiceData?.payment.payment_status}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Coupon:</td>
                                                <td>
                                                    <span className="text-md text-mindfulBlack uppercase text-end">
                                                        {invoiceData?.payment.coupon_code || 'NIL'}
                                                    </span>
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
                                        {invoiceData?.services.map((service, index) => (
                                            <tr key={index}>
                                                <td className="font-semibold px-2 py-2">{service.name}</td>
                                                <td>
                                                    <span className="text-md text-mindfulBlack font-semibold text-end px-2 py-2">
                                                        Rs. {service.price}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="w-3/4 mx-auto">
                                    <table className="w-full">
                                        <tr className="border-b-2">
                                            <td className="text-lg text-mindfulBlack font-semibold px-2 py-2">Sub total:</td>
                                        </tr>
                                        <tbody>
                                            <tr className="border-b-2">
                                                <td className="px-2 py-3">SGST Tax:</td>
                                                <td className="px-2 py-3">Rs. {invoiceData?.payment.sgst}</td>
                                            </tr>
                                            <tr className="border-b-2">
                                                <td className="px-2 py-3">CGST Tax:</td>
                                                <td className="px-2 py-3">Rs. {invoiceData?.payment.cgst}</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td className="text-md text-mindfulBlack font-semibold uppercase px-2 py-5">Total:</td>
                                                <td className="text-md text-mindfulBlack font-semibold px-2 py-5">
                                                    Rs. {invoiceData?.payment.grand_total}
                                                </td>
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
                                <p className="col-span-3 text-md text-mindfulBlack font-semibold">
                                    {invoiceData?.payment.grand_total ? numberToWords(invoiceData.payment.grand_total) : 'ZERO'}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p>1. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            {/* <p>2. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */}
                            {/* <p>3. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
