import React, { useEffect, useState } from "react";
import salonChair from "../assets/icons/salonChair.svg";
import { useNavigate } from 'react-router-dom';
import { InputField } from '@/common/InputField';
import { Button } from '@/common/Button';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { bankAccInfo } from "@/api/apiConfig";
import { NotifyError } from "@/common/Toast/ToastMessage";

// Define Zod schema for validation
const bankAccInfoSchema = zod.object({
    // bankAccHolderName: zod.string().min(3, "Bank Account Holder Name is required"),
    // bankName: zod.string().min(3, "Bank Name is required"),
    // bankAccountNumber: zod.string().regex(/^[0-9]{12}$/, { message: "Bank Account Number must be 12 digits" }),
    // accountType: zod.string().min(1, "Account Type is required"),
    // bankBranch: zod.string().optional(),
    // ifscCode: zod.string().optional(),

    bankAccHolderName: zod.string().optional(),
    bankName: zod.string().optional(),
    bankAccountNumber: zod.string().optional(),
    accountType: zod.string().optional(),
    bankBranch: zod.string().optional(),
    ifscCode: zod.string().optional(),
});

type BankAccInfoFormData = zod.infer<typeof bankAccInfoSchema>;


export const BankAccInfoForm: React.FC<BankAccInfoFormData> = () => {

    const navigate = useNavigate();

    // const location = useLocation();

    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState<string | null>(null);


    // const handleBackButton = () => {
    //     navigate("/GeneralInfoForm");
    // }

    // const handleBackButton = () => {
    //     console.log("Location State:", location.state); // Debugging: Check what’s inside location.state

    //     if (location.state?.from === "GeneralInfoFreelanceForm") {
    //         navigate("/GeneralInfoFreelanceForm");
    //     } else {
    //         navigate("/GeneralInfoForm");
    //     }
    // };



    // React Hook Form setup with Zod validation
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<BankAccInfoFormData>({
        resolver: zodResolver(bankAccInfoSchema),
        defaultValues: {
            // ownersName: registartionFormData.name || '',
            // salonName: registartionFormData.name || '',
            // contactNumber: registartionFormData.phone || '',
            // emailAddress: registartionFormData.email || '',
            bankAccHolderName: sessionStorage.getItem("bankAccHolderName") || '',
            bankName: sessionStorage.getItem("bankName") || '',
            bankAccountNumber: sessionStorage.getItem("bankAccountNumber") || '',
            accountType: sessionStorage.getItem("accountType") || '',
            bankBranch: sessionStorage.getItem("bankBranch") || "",
            ifscCode: sessionStorage.getItem("ifscCode") || "",
        },
    });


    // Sync form fields with sessionStorage on change
    useEffect(() => {
        const fields = ["bankAccHolderName", "bankName", "bankAccountNumber", "accountType", "bankBranch", "ifscCode"];
        fields.forEach(field => {
            const storedValue = sessionStorage.getItem(field);
            if (storedValue) setValue(field as keyof BankAccInfoFormData, storedValue);
        });
    }, [setValue]);


    const onSubmit = async (data: BankAccInfoFormData) => {
        setLoading(true);
        // setError(null);

        console.log("Bank Account Info Form Submitted Data", data);

        try {

            // Getting the ProviderID from session storage
            const sessionProviderID = sessionStorage.getItem("providerID");
            if (!sessionProviderID) {
                throw new Error("Provider ID is missing from session storage.");
            }

            const bankAccInfoData = await bankAccInfo(
                parseInt(sessionProviderID),
                data.bankAccHolderName || "",
                data.bankName || "",
                data.bankAccountNumber || "",
                data.accountType || "",
                data.bankBranch || "", // Provide default value
                data.ifscCode || "", // Provide default value
            );

            console.log("Bank Account Info Data", bankAccInfoData);

            // Store provider ID in sessionStorage
            sessionStorage.setItem("bankAccHolderName", bankAccInfoData.data.account_holder_name);
            sessionStorage.setItem("bankName", bankAccInfoData.data.bank_name);
            sessionStorage.setItem("bankAccountNumber", bankAccInfoData.data.bank_account_number);
            sessionStorage.setItem("accountType", bankAccInfoData.data.account_type);
            sessionStorage.setItem("bankBranch", data.bankBranch || "");
            sessionStorage.setItem("ifscCode", data.ifscCode || "");

            // Navigate to the next step
            // navigate("/TaxInfoForm");
            navigate("/Thankyou");

        }

        catch (error: any) {
            // setError(error.message || "Something went wrong");
            NotifyError(error.message || "Something went wrong.");

        }

        finally {
            setLoading(false)
        }
    }


    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>{error}</div>;

    return (

        <div>
            <div className="bg-SignInBgImg bg-cover bg-no-repeat h-dvh">

                <div className="w-3/4 mx-auto h-dvh flex items-center">
                    <div className="w-full flex justify-center items-center bg-mindfulWhite rounded-lg shadow-lg z-0">
                        {/* <div className="bg-mindfulWhite rounded-lg drop-shadow-md"> */}

                        <div className="w-full px-5 py-5">
                            <div className="">

                                {/* Heading */}
                                <div className="w-full text-center bg-main rounded-md px-5 py-5 flex items-center justify-center space-x-5">
                                    <div className="bg-mindfulWhite rounded-full px-2 py-2">
                                        <img
                                            src={salonChair}
                                            alt="Salon chair"
                                        />
                                    </div>

                                    <h5 className="text-3xl text-mindfulWhite">Salon Service Registration Forms</h5>
                                </div>

                                {/* Steps Indicator */}
                                <div>
                                    {/* Numbers Div */}
                                    <div className="my-10">
                                        <div className="w-3/4 mx-auto relative flex justify-between items-center">

                                            {/* Back Line */}
                                            <div className="w-full absolute top-5 left-0 z-[-1]">
                                                <div className="w-full h-[2px] bg-mindfulgrey rounded-lg"></div>
                                            </div>

                                            {/* One Icon */}
                                            {/* <Link to="/GeneralInfoForm"> */}
                                            <div
                                                className="bg-mindfulAsh text-mindfulWhite w-[40px] h-[40px] rounded-full flex justify-center items-center z-10 cursor-pointer"
                                            >
                                                1
                                            </div>
                                            {/* </Link> */}

                                            {/* Two Icon */}
                                            <div
                                                className="bg-mindfulAsh text-mindfulWhite w-[40px] h-[40px] rounded-full z-10 flex justify-center items-center"
                                            >
                                                2
                                            </div>

                                            {/* Three Icon */}
                                            <div
                                                className="bg-mindfulBlue text-mindfulWhite w-[40px] h-[40px] rounded-full flex justify-center items-center"
                                            >
                                                3
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Sub Heading */}
                                <div className="text-center py-2">
                                    <h5 className="text-lg text-mindfulBlack font-semibold">Bank Account Information</h5>
                                </div>

                                <div>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="grid grid-cols-3 gap-5">

                                            {/* Bank Account Holder Name */}
                                            <div>
                                                <label
                                                    htmlFor="accHolderName"
                                                    className="text-lg text-mindfulBlack">
                                                    Bank Account Holder Name
                                                    {/* <span className="text-main"> *</span> */}
                                                </label>
                                                <InputField
                                                    label={''}
                                                    // name="accHolderName"
                                                    id="accHolderName"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("bankAccHolderName")}
                                                />

                                                {errors.bankAccHolderName && <p className="text-sm text-red-600">{errors.bankAccHolderName.message}</p>}
                                            </div>

                                            {/* Bank Name */}
                                            <div>
                                                <label
                                                    htmlFor="bankName"
                                                    className="text-lg text-mindfulBlack">
                                                    Bank Name
                                                    {/* <span className="text-main"> *</span> */}
                                                </label>
                                                <InputField
                                                    label={''}
                                                    // name="bankName"
                                                    id="bankName"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("bankName")}
                                                />

                                                {errors.bankName && <p className="text-sm text-red-600">{errors.bankName.message}</p>}
                                            </div>

                                            {/* Bank Account Number */}
                                            <div>
                                                <label
                                                    htmlFor="bankAccountNumber"
                                                    className="text-lg text-mindfulBlack">
                                                    Bank Account Number
                                                    {/* <span className="text-main"> *</span> */}
                                                </label>
                                                <InputField
                                                    label={''}
                                                    type="number"
                                                    // name="bankAccountNumber"
                                                    id="bankAccountNumber"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("bankAccountNumber")}

                                                />
                                                {errors.bankAccountNumber && <p className="text-sm text-red-600">{errors.bankAccountNumber.message}</p>}

                                            </div>

                                            {/* Account Type */}
                                            <div>
                                                <label
                                                    htmlFor="accountType"
                                                    className="text-lg text-mindfulBlack">
                                                    Account Type
                                                    {/* <span className="text-main"> *</span> */}
                                                </label>
                                                <InputField
                                                    label={''}
                                                    // type="email"
                                                    // name="accountType"
                                                    id="accountType"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("accountType")}
                                                />
                                                {errors.accountType && <p className="text-sm text-red-600">{errors.accountType.message}</p>}

                                            </div>

                                            {/* Bank Branch */}
                                            <div>
                                                <label
                                                    htmlFor="bankBranch"
                                                    className="text-lg text-mindfulBlack">
                                                    Bank Branch
                                                </label>
                                                <InputField
                                                    label={''}
                                                    // name="bankBranch"
                                                    id="bankBranch"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("bankBranch")}
                                                />
                                            </div>

                                            {/* IFSC Code or equivalent */}
                                            <div>
                                                <label
                                                    htmlFor="ifscCode"
                                                    className="text-lg text-mindfulBlack">
                                                    IFSC Code or equivalent
                                                </label>
                                                <InputField
                                                    label={''}
                                                    // name="ifscCode"
                                                    id="ifscCode"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("ifscCode")}
                                                />
                                            </div>


                                        </div>

                                        {/* {error && <p className="text-sm text-red-600">{error}</p>} */}

                                        {/* Buttons */}
                                        <div className="text-center pt-60 pb-10">
                                            <div className="flex items-center justify-center space-x-5">
                                                {/* Reset Button */}
                                                <Button
                                                    onClick={() => window.location.reload()}
                                                    buttonType="button"
                                                    buttonTitle="Reset"
                                                    className="bg-mindfulWhite text-md text-mindfulBlack font-semibold rounded-sm px-8 py-2.5 focus-within:outline-none"
                                                />

                                                {/* Back Button */}
                                                {/* <Link to="/GeneralInfoForm"> */}
                                                <Button
                                                    // onClick={handleBackButton}
                                                    onClick={() => navigate('/TaxInfoForm')}
                                                    buttonType="button"
                                                    buttonTitle="Back"
                                                    className="bg-mindfulWhite text-md text-mindfulBlack border-[1px] border-mindfulBlack font-semibold rounded-sm px-8 py-2 focus-within:outline-none"
                                                />
                                                {/* </Link> */}

                                                {/* Next Button */}
                                                {/* <Link to="/TaxInfoForm"> */}
                                                <Button
                                                    buttonType="submit"
                                                    buttonTitle={loading ? "Submitting" : "Submit"}
                                                    className="bg-main text-md text-mindfulWhite  font-semibold rounded-sm px-8 py-2.5 focus-within:outline-none"
                                                />
                                                {/* </Link> */}

                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
