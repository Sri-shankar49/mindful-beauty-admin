import { InputField } from '@/common/InputField'
import { Button } from '@/common/Button';
import { IoCloseCircle } from 'react-icons/io5'

interface CopyServicesPopupProps {
    closePopup: () => void;
}

export const CopyServicesPopup: React.FC<CopyServicesPopupProps> = ({ closePopup }) => {
    return (
        <div>
            <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                <div className="container mx-auto">

                    <div className="relative bg-white rounded-[5px] w-7/12 mx-auto px-10 py-10">


                        <div className="relative mb-16">
                            <h2 className="text-2xl text-mindfulBlack font-semibold">Copy Services</h2>
                            <div className="absolute inset-x-0 bottom-[-20px] mx-auto bg-mindfulgrey rounded-md w-full h-0.5">
                            </div>
                        </div>

                        {/* Close Button */}
                        <div
                            onClick={closePopup}
                            className="absolute top-5 right-5 w-fit cursor-pointer"
                        >
                            <IoCloseCircle className="text-mindfulGrey text-[32px]" />
                        </div>


                        {/* Chosen Branch */}
                        <div className="pb-5">
                            <label
                                htmlFor="city"
                                className="text-md text-mindfulBlack font-semibold mb-1"
                            >
                                Chosen Branch
                            </label>
                            {/* <InputField
                                label={''}
                                type="text"
                                name="city"
                                id="city"
                                placeholder="City"
                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                            /> */}

                            <p className="text-lg text-mindfulBlack">Kollam</p>
                        </div>

                        <div className="">

                            <h5
                                className="text-md text-mindfulBlack font-semibold mb-1"
                            >
                                Select Branches to Copy
                            </h5>

                            <form action="" method="post">

                                {/* Grid Column One */}
                                <div className="grid grid-cols-4 gap-5 items-center">

                                    {/* <div className="space-y-5"> */}

                                    {/* branch1 */}
                                    <div className="flex items-center space-x-3">
                                        <InputField
                                            label={''}
                                            type="checkbox"
                                            name="branch1"
                                            id="branch1"
                                        // placeholder="branch1"
                                        // className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                        />
                                        <label
                                            htmlFor="branch1"
                                            className="text-md text-mindfulBlack mb-1"
                                        >
                                            Branch 1
                                        </label>
                                    </div>

                                    {/* branch2 */}
                                    <div className="flex items-center space-x-3">
                                        <InputField
                                            label={''}
                                            type="checkbox"
                                            name="branch2"
                                            id="branch2"
                                        // placeholder="branch1"
                                        // className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                        />
                                        <label
                                            htmlFor="branch2"
                                            className="text-md text-mindfulBlack mb-1"
                                        >
                                            Branch 2
                                        </label>
                                    </div>

                                    {/* branch3 */}
                                    <div className="flex items-center space-x-3">
                                        <InputField
                                            label={''}
                                            type="checkbox"
                                            name="branch3"
                                            id="branch3"
                                        // placeholder="branch1"
                                        // className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                        />
                                        <label
                                            htmlFor="branch3"
                                            className="text-md text-mindfulBlack mb-1"
                                        >
                                            Branch 3
                                        </label>
                                    </div>

                                    {/* branch4 */}
                                    <div className="flex items-center space-x-3">
                                        <InputField
                                            label={''}
                                            type="checkbox"
                                            name="branch4"
                                            id="branch4"
                                        // placeholder="branch1"
                                        // className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                        />
                                        <label
                                            htmlFor="branch4"
                                            className="text-md text-mindfulBlack mb-1"
                                        >
                                            Branch 4
                                        </label>
                                    </div>
                                    
                                    {/* branch5 */}
                                    <div className="flex items-center space-x-3">
                                        <InputField
                                            label={''}
                                            type="checkbox"
                                            name="branch5"
                                            id="branch5"
                                        // placeholder="branch1"
                                        // className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                        />
                                        <label
                                            htmlFor="branch5"
                                            className="text-md text-mindfulBlack mb-1"
                                        >
                                            Branch 5
                                        </label>
                                    </div>
                                   
                                    {/* branch6 */}
                                    <div className="flex items-center space-x-3">
                                        <InputField
                                            label={''}
                                            type="checkbox"
                                            name="branch6"
                                            id="branch6"
                                        // placeholder="branch1"
                                        // className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                        />
                                        <label
                                            htmlFor="branch6"
                                            className="text-md text-mindfulBlack mb-1"
                                        >
                                            Branch 6
                                        </label>
                                    </div>

                                    {/* </div> */}


                                </div>


                                {/* Buttons */}
                                <div className="pt-10">
                                    <div className="flex items-center justify-center space-x-5">
                                        {/* Cancel Button */}
                                        <Button
                                            onClick={closePopup}
                                            buttonType="button"
                                            buttonTitle="Cancel"
                                            className="bg-mindfulWhite text-md text-mindfulBlack rounded-sm px-4 py-1.5 focus-within:outline-none"
                                        />

                                        {/* Submit Button */}
                                        <Button
                                            buttonType="submit"
                                            buttonTitle="Copy"
                                            className="bg-mindfulBlue text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none"
                                        />
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
