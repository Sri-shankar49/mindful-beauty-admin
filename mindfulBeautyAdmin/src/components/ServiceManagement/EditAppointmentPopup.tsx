import { IoCloseCircle } from 'react-icons/io5'
import { InputField } from '@/common/InputField'
// import { Button } from '@/common/Button'
import React from 'react';
import { SelectField } from '@/common/SelectField';

interface EditAppointmentPopupProps {
    closePopup: () => void;
    appointmentDetails: {
        id: string;
        date: string;
        time: string;
        location: string;
        name: string;
        phone: string;
        services: Service[];
        amount: string;
        status: string;
        status_id?: string;
        modify_status: string;
        stylist: string;
        stylist_id?: string;
    }
}

interface Service {
    name: string;
    price: number;
}


export const EditAppointmentPopup: React.FC<EditAppointmentPopupProps> = ({ closePopup }) => {
    return (
        <div>
            <div>
                <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                    <div className="container mx-auto">

                        <div className="relative bg-white rounded-[5px] w-7/12 mx-auto px-10 py-10">


                            <div className="relative mb-10">
                                <h2 className="text-2xl text-mindfulBlack font-semibold">Edit Appointment</h2>
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



                            <div className="">
                                <form action="" method="post">

                                    <div className="bg-mindfulLightgrey rounded-sm px-5 py-5">
                                        <div className="grid grid-cols-2 gap-5">

                                            {/* Appointment ID */}
                                            <div className="space-y-5">
                                                {/* Appointment ID */}
                                                <div className="">
                                                    <label
                                                        htmlFor="appID"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Appointment ID
                                                    </label>
                                                    <InputField
                                                        label={''}
                                                        // type="number"
                                                        // name="appID"
                                                        id="appID"
                                                        placeholder="appointment ID"
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        readOnly
                                                    // {...register("appID")}

                                                    />
                                                    {/* {errors.appID && (
                                                    <p className="text-sm text-red-600">{errors.appID.message}</p>
                                                )} */}
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="space-y-5">
                                                {/* Price */}
                                                <div className="">
                                                    <label
                                                        htmlFor="price"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Price
                                                    </label>
                                                    <InputField
                                                        label={''}
                                                        // type="number"
                                                        // name="price"
                                                        id="price"
                                                        placeholder="price"
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    // {...register("price")}

                                                    />
                                                    {/* {errors.price && (
                                                    <p className="text-sm text-red-600">{errors.price.message}</p>
                                                )} */}
                                                </div>
                                            </div>


                                            {/* Grid Column One */}
                                            <div className="space-y-5">
                                                {/* City */}
                                                {/* <div>
                                                                                <label
                                                                                    htmlFor="city"
                                                                                    className="text-md text-mindfulBlack font-semibold mb-1"
                                                                                >
                                                                                    City
                                                                                </label>
                                                                                <SelectField
                                                                                    label={''}
                                                                                    name="city"
                                                                                    id="city"
                                                                                    options={[
                                                                                        { value: "kochi", label: "Kochi" },
                                                                                        { value: "trivandrum", label: "Trivandrum" },
                                                                                        { value: "kollam", label: "Kollam" },
                                                                                        { value: "thrissur", label: "Thrissur" },
                                                                                    ]}
                                                                                    className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                                                />
                                                                            </div> */}

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
                                                        name="category"
                                                        id="category"
                                                        options={[
                                                            { value: "skin", label: "Skin" },
                                                            { value: "hair", label: "Hair" },

                                                        ]}
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    />
                                                </div>
                                            </div>

                                            {/* Grid Column Two */}
                                            <div className="space-y-5">

                                                {/* Branch */}
                                                {/* <div>
                                                                                <label
                                                                                    htmlFor="branch"
                                                                                    className="text-md text-mindfulBlack font-semibold mb-1"
                                                                                >
                                                                                    Branch
                                                                                </label>
                                                                                <SelectField
                                                                                    label={''}
                                                                                    name="branch"
                                                                                    id="branch"
                                                                                    options={[
                                                                                        { value: "branch1", label: "Branch 1" },
                                                                                        { value: "branch2", label: "Branch 2" },
                                                                                    ]}
                                                                                    className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                                                />
                                                                            </div> */}

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
                                                        name="subCategory"
                                                        id="subCategory"
                                                        options={[
                                                            { value: "facials", label: "Facials" },
                                                            { value: "waxing", label: "Waxing" },
                                                        ]}
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Services */}
                                    <div>

                                        <div>
                                            <h5 className="text-lg font-semibold py-5">Services</h5>
                                        </div>

                                        <div className="grid grid-cols-3">

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

                                    <div className="pt-5">
                                        <div>
                                            <textarea
                                                rows={3}
                                                name=""
                                                id=""
                                                // value={selectedCheckboxNames.join(", ")}
                                                className="w-full rounded-sm bg-blue-50 border-[1px] border-mindfulgrey px-3 py-3 focus-within:outline-none"
                                            ></textarea>

                                            <p className="text-sm text-mindfulRed italic">Note: Use comma (,) to type more services</p>

                                        </div>
                                    </div>


                                    {/* Add Service Button */}
                                    <div className="text-center mt-10">
                                        <button className="bg-main text-lg text-mindfulWhite rounded-sm px-8 py-2">
                                            Update Service
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
