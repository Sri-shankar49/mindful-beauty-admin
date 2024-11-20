import { SelectField } from './SelectField'
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";

export const Pagination = () => {
    return (
        <div>
            <div className="flex items-center justify-end space-x-10 py-5">

                {/* Items text & select field */}
                <div className="flex items-center space-x-5">
                    <div>
                        <p>Items per page:</p>
                    </div>
                    <div>
                        <SelectField
                            label={""}
                            options={[
                                { value: "10", label: "10" },
                                { value: "20", label: "20" },
                                { value: "30", label: "30" },
                            ]}
                            className="w-full rounded-[5px] border-2 border-mindfulgrey px-3 py-1 focus-within:outline-none"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-5">
                    <div>
                        <p>1 - 10 of 100</p>
                    </div>

                    <div className="flex items-center space-x-5">
                        <BiSolidLeftArrow className="text-[12px] text-mindfulBlack cursor-pointer" />
                        <BiSolidRightArrow className="text-[12px] text-mindfulBlack cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    )
}
