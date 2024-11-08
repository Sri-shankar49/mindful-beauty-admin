import { useState } from "react"
import { Button } from '@/common/Button'
import { BranchCard } from "./BranchManagement/BranchCard"
import { TbHomePlus } from "react-icons/tb";
import { AddBranchPopup } from "./BranchManagement/AddBranchPopup"

export const BranchManagement = () => {

    // State Declaration for branch popup
    const [showBranchPopup, setShowBranchPopup] = useState(false);

    const openBranchPopup = () => {
        setShowBranchPopup(true);
    }

    const closeBranchPopup = () => {
        setShowBranchPopup(false);
    }

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
                <BranchCard />
                <BranchCard />
                <BranchCard />
                <BranchCard />
            </div>

            {showBranchPopup && <AddBranchPopup closePopup={closeBranchPopup} />}
        </div>
    )
}
