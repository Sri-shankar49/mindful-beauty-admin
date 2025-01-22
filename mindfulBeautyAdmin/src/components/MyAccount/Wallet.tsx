import { Button } from '@/common/Button'
import React from 'react'
import { CreditsPopup } from './CreditsPopup';
import { fetchProviderTransactions } from '@/api/apiConfig';

interface Transaction {
    id: number;
    date: string;
    amount: string;
    type: string;
    payment_type: string;
    transaction_id: string;
}

export const Wallet = () => {
    const [showCreditsPopup, setShowCreditsPopup] = React.useState(false);
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const [loading, setLoading] = React.useState(true);
    const sessionProviderID = sessionStorage.getItem("loginProviderID");

    React.useEffect(() => {
        const getTransactions = async () => {
            try {
                const data = await fetchProviderTransactions(Number(sessionProviderID));
                setTransactions(data);
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
            } finally {
                setLoading(false);
            }
        };

        getTransactions();
    }, [sessionProviderID]);

    const openCreditsPopup = () => {
        setShowCreditsPopup(true);
    }

    const closeCreditsPopup = () => {
        setShowCreditsPopup(false);
    }

    return (
        <div>
            <div className="py-8">
                <div className="grid grid-cols-4 gap-5">

                    {/* Credits */}
                    <div className="space-y-5">
                        {/* Available Credits */}
                        <div className="border-[1px] border-mindfulgrey rounded-md px-5 py-5">
                            <div className="border-b-[1px] border-b-mindfulgrey pb-2">
                                <p>Available Credits</p>
                            </div>
                            <div className="pt-3">
                                <h6 className="text-4xl text-mindfulGreen font-semibold">5000</h6>
                            </div>
                        </div>

                        {/* Available Credits */}
                        <div className="border-[1px] border-mindfulgrey rounded-md px-5 py-5">
                            <div className="border-b-[1px] border-b-mindfulgrey pb-2">
                                <p>Used Credits</p>
                            </div>
                            <div className="pt-3">
                                <h6 className="text-4xl text-main font-semibold">25000</h6>
                            </div>
                        </div>

                        {/* Total Credits */}
                        <div className="border-[1px] border-mindfulgrey rounded-md px-5 py-5">
                            <div className="border-b-[1px] border-b-mindfulgrey pb-2">
                                <p>Total Credits</p>
                            </div>
                            <div className="pt-3">
                                <h6 className="text-4xl text-mindfulBlack font-semibold">30000</h6>
                            </div>
                        </div>
                    </div>

                    {/* Transactions History */}
                    <div className="col-span-3">
                        <div>
                            <h5 className="text-2xl font-semibold pb-5">Transactions History</h5>
                        </div>
                        <div>
                            <table className="w-full border-[1px] rounded-lg px-2 py-2">
                                <thead className="bg-mindfulLightgrey border-b-[1px]">
                                    <tr className="">
                                        <th className="px-2 py-3">#</th>
                                        <th className="text-start px-2 py-3">Date</th>
                                        <th className="text-start px-2 py-3">Amount</th>
                                        <th className="text-start px-2 py-3">Type</th>
                                        <th className="text-start px-2 py-3">Payment Type</th>
                                        <th className="text-start px-2 py-3">Transaction ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={6} className="text-center py-5">Loading...</td>
                                        </tr>
                                    ) : transactions.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="text-center py-5">No transactions found.</td>
                                        </tr>
                                    ) : (
                                        transactions.map((transaction, index) => (
                                            <tr key={transaction.id}>
                                                <td className="text-center px-2 py-5">{index + 1}</td>
                                                <td className="text-start px-2 py-5">{transaction.date}</td>
                                                <td className="text-start px-2 py-5">{transaction.amount}</td>
                                                <td className="text-start px-2 py-5">{transaction.type}</td>
                                                <td className="text-start px-2 py-5">{transaction.payment_type}</td>
                                                <td className="text-start px-2 py-5">{transaction.transaction_id}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="pt-5">
                    {/* Wallet Balance */}
                    <Button
                        onClick={openCreditsPopup}
                        buttonType="button"
                        buttonTitle={"Buy Credits"}
                        className="bg-main text-md text-mindfulWhite font-semibold rounded-sm px-8 py-2.5 focus-within:outline-none"
                    />
                </div>
            </div>

            {showCreditsPopup && <CreditsPopup closePopup={closeCreditsPopup} />}
        </div>
    )
}
