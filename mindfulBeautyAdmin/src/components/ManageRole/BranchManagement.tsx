import addUser from "../../assets/icons/addUser.svg"
import { Button } from '@/common/Button'
import React from 'react'
import { BranchCard } from "./BranchManagement/BranchCard"
import { TbHomePlus } from "react-icons/tb";

export const BranchManagement = () => {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-3xl font-semibold py-5">Branches (4)</h5>
                </div>

                {/* Add New Branch */}
                <div className="flex items-center bg-mindfulBlue border-[1px] border-mindfulBlue rounded-[5px] px-3 py-1.5 cursor-pointer hover:bg-mindfulWhite hover:border-mindfulBlue group">
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
        </div>
    )
}
