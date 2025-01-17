import { Button } from "@/common/Button"
import { InputField } from "@/common/InputField"
import { SelectField } from "@/common/SelectField"
import { IoCloseCircle } from "react-icons/io5"

export const AddPackages = () => {
  return (
    <div>
      {/* <div className="bg-mindfulLightPink px-5 py-5"> */}

      {/* <div className="bg-mindfulWhite px-5 py-5"> */}
      <div>
        <div>
          <div className="">
            <div>
              <h5 className="text-3xl font-semibold py-5">Add Package </h5>
            </div>


            <div className="grid grid-cols-2 gap-5">
              {/* Whole Grid Column One */}
              <div className="">
                <form action="" method="post">

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

                  {/* Services */}
                  <div className="px-5 py-5">

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
                        value="Bridal Glow Facial, Full Arm Waxing, Hair Spa, Aroma Pedicure, Aroma Manicure"
                        className="w-full rounded-sm bg-blue-50 border-[1px] border-mindfulgrey px-3 py-3 focus-within:outline-none"
                      ></textarea>

                      <p className="text-sm text-mindfulRed italic">Note: Use comma (,) to type more services</p>

                    </div>
                  </div>


                  {/* Add Service Button */}
                  <div className="text-center mt-20">
                    <button className="bg-main text-lg text-mindfulWhite rounded-sm px-8 py-2">Add Package</button>
                  </div>
                </form>
              </div>

              {/* Whole Grid Column Two */}
              <div className="border-l-2 pl-5">

                <div className="border-b-2 mb-4">
                  <div className="flex items-center justify-between">

                    <div>
                      <h5 className="text-2xl font-semibold py-3">Active Packages</h5>
                    </div>

                    <div className="flex items-center space-x-5">
                      {/* Copy Services
                      <div
                        // onClick={openBranchPopup}
                        className="flex items-center bg-mindfulBlue border-[1px] border-mindfulBlue rounded-[5px] px-3 py-1.5 cursor-pointer hover:bg-mindfulWhite hover:border-mindfulBlue group"
                      >
                        <div>
                          <PiCopySimpleLight className="text-[18px] text-mindfulWhite group-hover:text-mindfulBlue" />
                        </div>

                        <Button
                          buttonType="button"
                          buttonTitle="Copy Services"
                          className="bg-mindfulBlue text-mindfulWhite pl-2 group-hover:bg-mindfulWhite group-hover:text-mindfulBlue"
                        />
                      </div> */}

                      {/* Branch Select Field */}
                      <div>
                        <SelectField
                          label=""
                          name="branch"
                          // required
                          className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                          options={[
                            { value: "kochi", label: "Kochi" },
                            { value: "trivandrum", label: "Trivandrum" },
                            { value: "kollam", label: "Kollam" },
                            { value: "thrissur", label: "Thrissur" },
                          ]}
                        // error="This field is required."
                        />
                      </div>
                    </div>
                  </div>
                </div>


                {/* Content */}
                <div>
                  {/* <div className="border-b-[1px] py-3">
                    <div className="w-full flex items-center justify-between">
                      <h5 className="text-md text-mindfulBlack font-semibold">Bridal Pack</h5>

                      <div className="">
                        <IoCloseCircle className="text-[28px] text-mindfulRed" />
                      </div>
                    </div>
                  </div> */}

                  <div className="border-b-2 pb-5">
                    {/* Heading */}
                    <div className="bg-mindfulLightgrey px-3 py-3">
                      <div className="flex items-center justify-between">
                        <p className="text-md text-mindfulBlack font-semibold">Bridal Pack</p>

                        <div className="cursor-pointer">
                          <IoCloseCircle className="text-[28px] text-mindfulRed" />
                        </div>
                      </div>
                    </div>


                    {/* Pricing Table */}
                    <div>
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-[1px] border-dashed">
                            <th className="w-10/12 text-sm text-start text-mindfulgrey font-normal px-2 py-2">Service</th>
                            <th className="text-sm text-start text-mindfulgrey font-normal px-2 py-2">Pricing (Rs)</th>
                          </tr>
                        </thead>

                        <tbody>

                          <tr className="border-b-2 border-dashed">
                            <td className="px-2 py-5">
                              <p>Bridal Glow Facial, Full Arm Waxing, Hair Spa, Aroma Pedicure, Aroma Manicure</p>
                            </td>
                            <td className="px-2 py-5">
                              <div>
                                <InputField
                                  label={''}
                                  placeholder="250"
                                  className="w-32 text-sm text-mindfulBlack border-2 rounded-sm px-2 py-1 focus-within:outline-none"
                                />
                              </div>
                            </td>
                       
                          </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>


                  {/* Update Button */}
                  <div className="my-5">
                    <Button
                      buttonTitle={'Update'}
                      className="bg-main text-lg text-mindfulWhite rounded-sm px-8 py-2"
                    />
                  </div>

                </div>


              </div>

            </div>
          </div>
        </div>
      </div>

      {/* </div> */}

      {/* </div> */}
    </div>
  )
}
