import React from "react";
import { Button } from "@/common/Button";
import { IoCloseCircle } from "react-icons/io5";

interface WalletPopupProps {
  closePopup: () => void;
  errorMessage: string | null;
}

export const WalletPopup: React.FC<WalletPopupProps> = ({ errorMessage, closePopup }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-1/3 p-6 relative shadow-lg">

        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          <IoCloseCircle className="text-3xl" />
        </button>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600">⚠️ Insufficient Wallet Balance</h2>
          <p className="text-gray-700 mt-5">
            Your wallet balance is too low to proceed. Please recharge to continue.
          </p>
        </div>

        {/* Error Message (if any) from API Response */}
        {errorMessage && (
          <p className="text-center text-red-500 font-semibold mt-2">{errorMessage}</p>
        )}

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          {/* Close Popup Button */}
          <Button
            onClick={closePopup}
            buttonType="button"
            buttonTitle="Cancel"
            className="bg-gray-300 text-md text-black px-4 py-2 rounded-md hover:bg-gray-400"
          />

          {/* Recharge Button */}
          <Button
            onClick={() => {
              closePopup(); // Close popup before redirecting
              window.location.href = "/MyAccount/Wallet"; // Example recharge page
            }}
            buttonType="button"
            buttonTitle="Recharge Now"
            className="bg-blue-600 text-md text-white px-4 py-2 rounded-md hover:bg-blue-700"
          />
        </div>
      </div>
    </div>
  );
};
