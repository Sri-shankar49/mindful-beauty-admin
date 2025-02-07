import { Button } from '@/common/Button'
import React from 'react'
import { CreditsPopup } from './CreditsPopup';
import { fetchProviderTransactions, getWalletCredits } from '@/api/apiConfig';
import { ShimmerTable } from 'shimmer-effects-react';

interface Credits {
    available_credits: number;
    total_credits: number;
    used_credits: number;
}

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
    // const [creditsData, setCreditsData] = React.useState<Credits[]>([]);
    const [creditsData, setCreditsData] = React.useState<Credits | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const sessionProviderID = sessionStorage.getItem("loginProviderID");

    React.useEffect(() => {
        if (!sessionProviderID) {
            setError("Session Provider ID not found. Please log in again.");
            setLoading(false);
            return;
        }
        const getTransactions = async () => {
            try {
                const data = await fetchProviderTransactions(Number(sessionProviderID));
                const response = await getWalletCredits(Number(sessionProviderID));
                setTransactions(data);
                setCreditsData(response);

                console.log("Transactions data log: ", data);
                console.log("Credit data log: ", response);


            } catch (error: any) {
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

    const refreshWalletListData = async () => {
        try {
            const data = await fetchProviderTransactions(Number(sessionProviderID));
            const response = await getWalletCredits(Number(sessionProviderID));
            setTransactions(data);
            setCreditsData(response);

            console.log("Transactions data refreshed: ", data);
            console.log("Credit data log refreshed: ", response);

        } catch (error: any) {
            console.error("Error refreshing Branch list data:", error.message);
        }
    };

    return (
        <div>
            <div className="py-8">

                {/* {error && (
                    <div className="text-red-600 text-center mb-4">{error}</div>
                )} */}

                <div className="grid grid-cols-4 gap-5">

                    {loading ? (
                        <div>
                            <ShimmerTable
                                mode="light"
                                row={6}
                                col={1}
                                border={1}
                                borderColor={"#cbd5e1"}
                                rounded={0.25}
                                rowGap={16}
                                colPadding={[15, 5, 15, 5]}
                            />
                        </div>
                    ) : (
                        creditsData ? (
                            <div className="space-y-5">
                                {/* Available Credits */}
                                <div className="border-[1px] border-mindfulgrey rounded-md px-5 py-5">
                                    <div className="border-b-[1px] border-b-mindfulgrey pb-2">
                                        <p>Available Credits</p>
                                    </div>
                                    <div className="pt-3">
                                        <h6 className="text-4xl text-mindfulGreen font-semibold">
                                            {creditsData?.available_credits ?? 0}
                                        </h6>
                                    </div>
                                </div>

                                {/* Used Credits */}
                                <div className="border-[1px] border-mindfulgrey rounded-md px-5 py-5">
                                    <div className="border-b-[1px] border-b-mindfulgrey pb-2">
                                        <p>Used Credits</p>
                                    </div>
                                    <div className="pt-3">
                                        <h6 className="text-4xl text-main font-semibold">
                                            {creditsData?.used_credits ?? 0}
                                        </h6>
                                    </div>
                                </div>

                                {/* Total Credits */}
                                <div className="border-[1px] border-mindfulgrey rounded-md px-5 py-5">
                                    <div className="border-b-[1px] border-b-mindfulgrey pb-2">
                                        <p>Total Credits</p>
                                    </div>
                                    <div className="pt-3">
                                        <h6 className="text-4xl text-mindfulBlack font-semibold">
                                            {creditsData?.total_credits ?? 0}
                                        </h6>
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
                        ) : (
                            <div className="text-center col-span-1">
                                <p className="text-center py-5">Loading credit data...</p>
                            </div>
                        )

                    )}


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
                                            <td colSpan={6} className="text-center px-2 py-5">
                                                <ShimmerTable
                                                    mode="light"
                                                    row={transactions.length + 1} // Adjust based on expected staff rows
                                                    col={6} // Matches table columns
                                                    border={1}
                                                    borderColor={"#cbd5e1"}
                                                    rounded={0.25}
                                                    rowGap={16}
                                                    colPadding={[15, 5, 15, 5]}
                                                />
                                            </td>
                                        </tr>
                                    ) : error ? (
                                        <tr>
                                            <td colSpan={6} className="text-center text-red-600 py-5">
                                                Error: {error}
                                            </td>
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


            </div>

            {showCreditsPopup && <CreditsPopup closePopup={closeCreditsPopup} refreshWalletData={refreshWalletListData} />}
        </div >
    )
}
