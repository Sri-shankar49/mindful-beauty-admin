import { Button } from '@/common/Button'
import { InputField } from '@/common/InputField'
import { SelectField } from '@/common/SelectField';
import React from 'react'
import { IoCloseCircle } from 'react-icons/io5'

interface EditPackagesPopupProps {
    closePopup: () => void;
}

export const EditPackagesPopup: React.FC<EditPackagesPopupProps> = ({ closePopup }) => {
    return (
        <div>
            <div>
                <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                    <div className="container mx-auto">

                        <div className="relative bg-white rounded-[5px] w-7/12 mx-auto px-10 py-10">


                            <div className="relative mb-5">

                                <div className="">
                                    <h2 className="text-2xl text-mindfulBlack font-semibold">Edit Package</h2>
                                </div>
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

                            <form method="post">
                                <div className="py-5">
                                    <div className="bg-mindfulLightgrey rounded-sm px-5 py-5">
                                        <div className="grid grid-cols-2 gap-5">

                                            {/* Grid Column One */}
                                            <div className="space-y-5">
                                                {/* City */}
                                                <div>
                                                    <label
                                                        htmlFor="city"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        City
                                                    </label>

                                                    <SelectField
                                                        label={''}
                                                        // name="city"
                                                        id="city"
                                                        options={[
                                                            { value: "kochi", label: "Kochi" },
                                                            { value: "trivandrum", label: "Trivandrum" },
                                                            { value: "kollam", label: "Kollam" },
                                                            { value: "thrissur", label: "Thrissur" },
                                                        ]}
                                                        className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    />

                                                </div>

                                                {/* Package Title */}
                                                <div>
                                                    <label
                                                        htmlFor="packageTitle"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Package Title
                                                    </label>

                                                    <InputField
                                                        label={''}
                                                        name="packageTitle"
                                                        id="packageTitle"
                                                        placeholder=""
                                                        className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    />

                                                </div>
                                            </div>

                                            {/* Grid Column Two */}
                                            <div className="space-y-5">

                                                {/* Branch */}
                                                <div>
                                                    <label
                                                        htmlFor="branch"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Branch
                                                    </label>


                                                    <select
                                                        // name=""
                                                        id=""
                                                        className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    // value={selectedBranch}
                                                    // onChange={handleBranchChange} // Call on change

                                                    >
                                                        <option value="" disabled>
                                                            Select Branch
                                                        </option>

                                                        {/* {staffBranchListData.map((branch) => (
                                                        <option key={branch.branch_id} value={branch.branch_id}>
                                                            {branch.branch_name}
                                                        </option>
                                                    ))} */}
                                                    </select>

                                                </div>

                                                {/* Price */}
                                                <div>
                                                    <label
                                                        htmlFor="Price"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Price (Rs.)
                                                    </label>

                                                    <InputField
                                                        label={''}
                                                        type="number"
                                                        name="Price"
                                                        id="Price"
                                                        placeholder="7000"
                                                        className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    />

                                                </div>
                                            </div>

                                        </div>
                                    </div>


                                    {/* Category & Sub Category */}
                                    <div className="px-5 py-5">
                                        <div className="grid grid-cols-2 gap-5">

                                            {/* Grid Column One */}
                                            <div className="space-y-5">
                                                {/* Category */}
                                                <div>
                                                    <label
                                                        htmlFor="category"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Category
                                                    </label>

                                                    <SelectField
                                                        label={''}
                                                        // name="category"
                                                        id="category"
                                                        options={[
                                                            { value: "hair", label: "Hair" },
                                                            { value: "skin", label: "Skin" },
                                                        ]}
                                                        className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    />

                                                </div>
                                            </div>


                                            {/* Grid Column One */}
                                            <div className="space-y-5">
                                                {/* Sub Category */}
                                                <div>
                                                    <label
                                                        htmlFor="subCategory"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Sub Category
                                                    </label>

                                                    <SelectField
                                                        label={''}
                                                        // name="subCategory"
                                                        id="subCategory"
                                                        options={[
                                                            { value: "facials", label: "Facials" },
                                                            { value: "waxing", label: "Waxing" },
                                                        ]}
                                                        className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-5 pb-5">
                                        {/* Services */}
                                        <div>

                                            <div>
                                                <h5 className="text-lg font-semibold pb-5">Services</h5>
                                            </div>

                                            <div className="space-y-5">

                                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">

                                                    {/* Grid Column One */}
                                                    <div className="space-y-5">
                                                        {/* Acne Facial */}
                                                        <div>
                                                            <label htmlFor='acneFacial' className="custom-checkbox">
                                                                <input id='acneFacial' name="dummy" type="checkbox" />
                                                                <span className="checkmark"></span>Acne Facial
                                                            </label>
                                                        </div>

                                                        {/* Bridal Glow Facial */}
                                                        <div>
                                                            <label htmlFor='bridalGlowFacial' className="custom-checkbox">
                                                                <input id='bridalGlowFacial' name="dummy" type="checkbox" />
                                                                <span className="checkmark"></span>Bridal Glow Facial
                                                            </label>
                                                        </div>

                                                        {/* Diamond Facial */}
                                                        <div>
                                                            <label htmlFor='diamondFacial' className="custom-checkbox">
                                                                <input id='diamondFacial' name="dummy" type="checkbox" />
                                                                <span className="checkmark"></span>Diamond Facial
                                                            </label>
                                                        </div>
                                                    </div>

                                                    {/* Grid Column Two */}
                                                    <div className="space-y-5">
                                                        {/* Anti Acne Facial */}
                                                        <div>
                                                            <label htmlFor='antiAcneFacial' className="custom-checkbox">
                                                                <input id='antiAcneFacial' name="dummy" type="checkbox" />
                                                                <span className="checkmark"></span>Anti Acne Facial
                                                            </label>
                                                        </div>

                                                        {/* De-Pigmentation Treatment */}
                                                        <div>
                                                            <label htmlFor='dePigmentation' className="custom-checkbox">
                                                                <input id='dePigmentation' name="dummy" type="checkbox" />
                                                                <span className="checkmark"></span>De-Pigmentation Treatment
                                                            </label>
                                                        </div>

                                                        {/* D-Tan Cleanup */}
                                                        <div>
                                                            <label htmlFor='dTanCleanup' className="custom-checkbox">
                                                                <input id='dTanCleanup' name="dummy" type="checkbox" />
                                                                <span className="checkmark"></span>D-Tan Cleanup
                                                            </label>
                                                        </div>
                                                    </div>

                                                    {/* Grid Column Three */}
                                                    <div className="space-y-5">
                                                        {/* Anti Aging Facial */}
                                                        <div>
                                                            <label htmlFor='antiAgingFacial' className="custom-checkbox">
                                                                <input id='antiAgingFacial' name="dummy" type="checkbox" />
                                                                <span className="checkmark"></span>Anti Aging Facial
                                                            </label>
                                                        </div>

                                                        {/* Dermalite Fairness Facial */}
                                                        <div>
                                                            <label htmlFor='dermalite' className="custom-checkbox">
                                                                <input id='dermalite' name="dummy" type="checkbox" />
                                                                <span className="checkmark"></span>Dermalite Fairness Facial
                                                            </label>
                                                        </div>

                                                        {/* D-Tan Facial */}
                                                        <div>
                                                            <label htmlFor='dTanFacial' className="custom-checkbox">
                                                                <input id='dTanFacial' name="dummy" type="checkbox" />
                                                                <span className="checkmark"></span>D-Tan Facial
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-5">
                                        <div>
                                            <textarea
                                                rows={3}
                                                name=""
                                                id=""
                                                value="Bridal Glow Facial, Full Arm Waxing, Hair Spa, Aroma Pedicure, Aroma Manicure"
                                                className="w-full rounded-sm bg-blue-50 border-[1px] border-mindfulgrey px-3 py-3 focus-within:outline-none"
                                            ></textarea>

                                            <p className="text-sm text-mindfulRed italic">Note: Use comma (,) to type more services</p>

                                        </div>
                                    </div>
                                </div>


                                {/* Button */}
                                <div className="px-5 text-center">
                                    {/* Submit Button */}
                                    <Button
                                        buttonType="submit"
                                        buttonTitle="Update"
                                        className="bg-main text-md text-mindfulWhite font-semibold rounded-sm px-8 py-2.5 focus-within:outline-none"
                                    />

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
