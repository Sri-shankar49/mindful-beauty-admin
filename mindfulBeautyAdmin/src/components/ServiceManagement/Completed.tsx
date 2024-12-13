import { useEffect, useState } from "react";
// import deleteButton from "../../assets/icons/deleteButton.png"
// import rectangleBlack from "../../assets/images/rectangleBlack.png"
import Select, { SingleValue } from 'react-select';
import stylist from "../../assets/images/stylist.png"
import { StylistPopup } from "../Dashboard/DashBoardData/StylistPopup";
import { SelectField } from "@/common/SelectField";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { PaymentDetailsPopup } from "./Completed/PaymentDetailsPopup";
import { InvoicePopup } from "./Completed/InvoicePopup";
import { Pagination } from "@/common/Pagination";
import { completedList } from "@/api/apiConfig";

// Define the type for each option
interface StylistOption {
  value: number;
  text: string;
  icon: string; // URL or path to the image
}

interface Service {
  name: string;
  price: number;
}


interface CompletedListProps {
  id?: string;
  date: string;
  time: string;
  location: string;
  name: string;
  phone: string;
  services: Service[];
  amount: string;
  status: string;
  modify_status: string;
}

export const Completed = () => {


  const stylistData: StylistOption[] = [
    {
      value: 1,
      text: 'Swetha',
      icon: `${stylist}`
    },
    {
      value: 2,
      text: 'Swetha',
      icon: `${stylist}`
    },
    {
      value: 3,
      text: 'Swetha',
      icon: `${stylist}`
    },
    {
      value: 4,
      text: 'Swetha',
      icon: `${stylist}`
    }
  ];


  // State declaration for Stylist Popup
  const [showStylistPopup, setShowStylistPopup] = useState(false);


  // const openStylistPopup = () => {
  //   setShowStylistPopup(true);
  // }

  const closeStylistPopup = () => {
    setShowStylistPopup(false);
  }
  const [selectedStylistOption, setSelectedStylistOption] = useState<SingleValue<StylistOption>>(null);


  // handle onChange event of the dropdown
  const handleStylistOption = (option: SingleValue<StylistOption>) => {
    setSelectedStylistOption(option);

    // Open Stylist Popup
    setShowStylistPopup(true);
  };

  // State Declaration for Payment Details Popup
  const [showPaymentDetailsPopup, setShowPaymentDetailsPopup] = useState(false);

  const openPaymentDetailsPopup = () => {
    setShowPaymentDetailsPopup(!showPaymentDetailsPopup)
  }

  const closePaymentDetailsPopup = () => {
    setShowPaymentDetailsPopup(false)
  }

  // State Declaration for Invoice Popup
  const [showInvoicePopup, setShowInvoicePopup] = useState(false);

  const openInvoicePopup = () => {
    setShowInvoicePopup(!showInvoicePopup)
  }

  const closeInvoicePopup = () => {
    setShowInvoicePopup(false)
  }


  const [completedListData, setCompletedListData] = useState<CompletedListProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchCompletedListData = async () => {
      setLoading(true);
      setError(null);

      // Login Provider ID
      const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
      console.log("Login Provider ID from session storage", sessionLoginProviderID);

      try {
        // const data = await bookingsList(Number(sessionLoginProviderID));
        const data = await completedList(1, 3);
        setCompletedListData(data.results);
        console.log("Fetched Completed List data log:", data);
      }
      catch (error: any) {
        setError(error.message || 'Failed to fetch completed list');
      } finally {
        setLoading(false); // Ensure loading is false after fetching
      }
    }

    fetchCompletedListData();

  }, []);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>

      {/* Sub Heading */}
      <div>
        <h5 className="text-3xl font-semibold py-5">Completed</h5>
      </div>

      <div>
        <table className="w-full">
          <thead className="bg-mindfulLightgrey">
            <tr className="">
              <th className="text-start px-2 py-3">#</th>
              <th className="text-start px-2 py-3">Date</th>
              <th className="text-start px-2 py-3">Booking Time</th>
              <th className="text-start px-2 py-3">Branch</th>
              <th className="text-start px-2 py-3">Customer Name</th>
              <th className="text-start px-2 py-3">Customer Mobile</th>
              <th className="text-start px-2 py-3">Service</th>
              <th className="text-start px-2 py-3">Amount</th>
              <th className="text-start px-2 py-3">Assign Stylist</th>
              <th className="text-start px-2 py-3">Payment Status</th>
              <th className="text-start px-2 py-3">Invoice</th>
            </tr>
          </thead>

          <tbody>
            {/* Content */}
            {completedListData.length > 0 ? (
              completedListData.map((completed) => (
                <tr key={completed.id} className="border-b-2">
                  {/* <td className="text-start px-2 py-5">{index + 1}</td> */}
                  <td className="text-start px-2 py-5">{completed.id}</td>
                  <td className="text-start px-2 py-5">{completed.date}</td>
                  <td className="text-start px-2 py-5">{completed.time}</td>
                  <td className="text-start px-2 py-5">{completed.location}</td>
                  <td className="text-start px-2 py-5">{completed.name}</td>
                  <td className="text-start px-2 py-5">{completed.phone}</td>

                  <td className="text-start px-2 py-5">
                    <ul>
                      {completed.services.map((service, index) => (
                        <li key={index}>{service.name}</li>
                      ))}
                    </ul>
                  </td>

                  {/* <td className="text-start px-2 py-5">
                    <ul>
                      <li>Eyesbrows Threading</li>
                      <li>Forehead Threading</li>
                    </ul>
                  </td> */}

                  <td className="text-start px-2 py-5">{completed.amount}</td>

                  <td className="text-start px-2 py-5">
                    <div>
                      <Select
                        placeholder="Select Option"
                        value={selectedStylistOption}
                        options={stylistData}
                        onChange={handleStylistOption}
                        getOptionLabel={(option) => option.text} // Use `text` as the string label for accessibility and filtering
                        formatOptionLabel={(option) => (
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={option.icon} alt={option.text} style={{ width: 16, height: 16 }} />
                            <span style={{ marginLeft: 5 }}>{option.text}</span>
                          </div>
                        )}
                        getOptionValue={(option) => option.value.toString()}
                      />
                    </div>
                  </td>

                  <td>
                    <SelectField
                      label={''}
                      name="status"
                      id="status"
                      options={[
                        { value: "scheduled", label: "Scheduled" },
                        { value: "inprogress", label: "Inprogress" },
                        { value: "completed", label: "Completed" },
                      ]}
                      className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                    />
                  </td>

                  <td className="text-start px-2 py-5">
                    <div className="flex items-center space-x-2">
                      {/* Eye Button */}
                      <div
                        onClick={openInvoicePopup}
                        className="border-[1px] border-mindfulBlack rounded-sm px-2 py-1.5 cursor-pointer">
                        <MdOutlineRemoveRedEye className="text-[20px] text-mindfulBlack" />
                      </div>

                      {/* Download Button */}
                      <div className="border-[1px] border-mindfulGreen rounded-sm px-2 py-1.5 cursor-pointer">
                        <FiDownload className="text-[18px] text-mindfulGreen" />
                      </div>
                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="text-center py-5">
                  No Completed Booking data available.
                </td>
              </tr>
            )}

            {/* <tr className="border-b-2">
              <td className="text-start px-2 py-5">1</td>
              <td className="text-start px-2 py-5">18 Aug 2024</td>
              <td className="text-start px-2 py-5">
                <div className="flex items-center space-x-3">
                  <div>
                    <img src={rectangleBlack} alt="rectangle black" />
                  </div>

                  <p className="text-md text-mindfulBlack">Full Face Threading</p>
                </div>
              </td>
              <td className="text-start px-2 py-5">10.00 - 11.00</td>
              <td className="text-start px-2 py-5">Chottanikkara</td>
              <td className="text-start px-2 py-5">Ramya</td>
              <td className="text-start px-2 py-5">97347196578</td>

              <td className="text-start px-2 py-5">
                <ul>
                  <li>Eyesbrows Threading</li>
                  <li>Forehead Threading</li>
                </ul>
              </td>

              <td className="text-start px-2 py-5">250</td>

              <td className="text-start px-2 py-5">
                <div>
                  <Button
                    buttonType="button"
                    buttonTitle={"Completed"}
                    className="bg-[#e5ffec] text-md text-mindfulGreen font-semibold rounded-sm px-3 py-1"
                  />
                </div>
              </td>

              <td className="text-start px-2 py-5">
                <div>
                  <Select
                    placeholder="Select Option"
                    value={selectedStylistOption}
                    options={stylistData}
                    onChange={handleStylistOption}
                    getOptionLabel={(option) => option.text} // Use `text` as the string label for accessibility and filtering
                    formatOptionLabel={(option) => (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={option.icon} alt={option.text} style={{ width: 16, height: 16 }} />
                        <span style={{ marginLeft: 5 }}>{option.text}</span>
                      </div>
                    )}
                    getOptionValue={(option) => option.value.toString()}
                  />
                </div>
              </td>

              <td>
                <SelectField
                  label={''}
                  name="status"
                  id="status"
                  options={[
                    { value: "paid", label: "Paid" },
                    { value: "partlypaid", label: "Partly Paid" },
                    { value: "notpaid", label: "Not Paid" },
                  ]}
                  className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                  onChange={openPaymentDetailsPopup}
                />
              </td>

              <td className="text-start px-2 py-5">
                <button
                onClick={openEditService}
                >
                  <img src={editButton} alt="editButton" />
                </button>
                <div className="flex items-center space-x-2">
                  Eye Button
                  <div
                    onClick={openInvoicePopup}
                    className="border-[1px] border-mindfulBlack rounded-sm px-2 py-1.5 cursor-pointer">
                    <MdOutlineRemoveRedEye className="text-[20px] text-mindfulBlack" />
                  </div>

                  Download Button
                  <div className="border-[1px] border-mindfulGreen rounded-sm px-2 py-1.5 cursor-pointer">
                    <FiDownload className="text-[18px] text-mindfulGreen" />
                  </div>
                </div>
              </td>


            </tr> */}

            {/* Content */}
            <tr className="border-b-2">
              <td className="text-start px-2 py-5">1</td>
              <td className="text-start px-2 py-5">18 Aug 2024</td>
              {/* <td className="text-start px-2 py-5">
                <div className="flex items-center space-x-3">
                  <div>
                    <img src={rectangleBlack} alt="rectangle black" />
                  </div>

                  <p className="text-md text-mindfulBlack">Full Face Threading</p>
                </div>
              </td> */}
              <td className="text-start px-2 py-5">10.00 - 11.00</td>
              <td className="text-start px-2 py-5">Chottanikkara</td>
              <td className="text-start px-2 py-5">Ramya</td>
              <td className="text-start px-2 py-5">97347196578</td>

              <td className="text-start px-2 py-5">
                <ul>
                  <li>Eyesbrows Threading</li>
                  <li>Forehead Threading</li>
                </ul>
              </td>

              <td className="text-start px-2 py-5">250</td>

              {/* <td className="text-start px-2 py-5">
                <div>
                  <Button
                    buttonType="button"
                    buttonTitle={"Schedule"}
                    className="bg-[#fff8e5] text-md text-mindfulYellow font-semibold rounded-sm px-3 py-1"
                  />
                </div>
              </td> */}

              <td className="text-start px-2 py-5">
                <div>
                  <Select
                    placeholder="Select Option"
                    value={selectedStylistOption}
                    options={stylistData}
                    onChange={handleStylistOption}
                    getOptionLabel={(option) => option.text} // Use `text` as the string label for accessibility and filtering
                    formatOptionLabel={(option) => (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={option.icon} alt={option.text} style={{ width: 16, height: 16 }} />
                        <span style={{ marginLeft: 5 }}>{option.text}</span>
                      </div>
                    )}
                    getOptionValue={(option) => option.value.toString()}
                  />
                </div>
              </td>

              <td>
                <SelectField
                  label={''}
                  name="status"
                  id="status"
                  options={[
                    { value: "scheduled", label: "Scheduled" },
                    { value: "inprogress", label: "Inprogress" },
                    { value: "completed", label: "Completed" },
                  ]}
                  className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                />
              </td>

              <td className="text-start px-2 py-5">
                <div className="flex items-center space-x-2">
                  {/* Eye Button */}
                  <div
                    onClick={openInvoicePopup}
                    className="border-[1px] border-mindfulBlack rounded-sm px-2 py-1.5 cursor-pointer">
                    <MdOutlineRemoveRedEye className="text-[20px] text-mindfulBlack" />
                  </div>

                  {/* Download Button */}
                  <div className="border-[1px] border-mindfulGreen rounded-sm px-2 py-1.5 cursor-pointer">
                    <FiDownload className="text-[18px] text-mindfulGreen" />
                  </div>
                </div>
              </td>


            </tr>

            {/* Content */}
            <tr className="border-b-2">
              <td className="text-start px-2 py-5">1</td>
              <td className="text-start px-2 py-5">18 Aug 2024</td>

              <td className="text-start px-2 py-5">10.00 - 11.00</td>
              <td className="text-start px-2 py-5">Chottanikkara</td>
              <td className="text-start px-2 py-5">Ramya</td>
              <td className="text-start px-2 py-5">97347196578</td>

              <td className="text-start px-2 py-5">
                <ul>
                  <li>Eyesbrows Threading</li>
                  <li>Forehead Threading</li>
                </ul>
              </td>

              <td className="text-start px-2 py-5">250</td>

              {/* <td className="text-start px-2 py-5">
                <div>
                  <Button
                    buttonType="button"
                    buttonTitle={"Inprogress"}
                    className="bg-[#e6f2ff] text-md text-mindfulSecondaryBlue font-semibold rounded-sm px-3 py-1"
                  />
                </div>
              </td> */}

              <td className="text-start px-2 py-5">
                <div>
                  <Select
                    placeholder="Select Option"
                    value={selectedStylistOption}
                    options={stylistData}
                    onChange={handleStylistOption}
                    getOptionLabel={(option) => option.text} // Use `text` as the string label for accessibility and filtering
                    formatOptionLabel={(option) => (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={option.icon} alt={option.text} style={{ width: 16, height: 16 }} />
                        <span style={{ marginLeft: 5 }}>{option.text}</span>
                      </div>
                    )}
                    getOptionValue={(option) => option.value.toString()}
                  />
                </div>
              </td>

              <td>
                <SelectField
                  label={''}
                  name="status"
                  id="status"
                  options={[
                    { value: "scheduled", label: "Scheduled" },
                    { value: "inprogress", label: "Inprogress" },
                    { value: "completed", label: "Completed" },
                  ]}
                  className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                />
              </td>

              <td className="text-start px-2 py-5">
                <div className="flex items-center space-x-2">
                  {/* Eye Button */}
                  <div
                    onClick={openInvoicePopup}
                    className="border-[1px] border-mindfulBlack rounded-sm px-2 py-1.5 cursor-pointer">
                    <MdOutlineRemoveRedEye className="text-[20px] text-mindfulBlack" />
                  </div>

                  {/* Download Button */}
                  <div className="border-[1px] border-mindfulGreen rounded-sm px-2 py-1.5 cursor-pointer">
                    <FiDownload className="text-[18px] text-mindfulGreen" />
                  </div>
                </div>
              </td>


            </tr>
          </tbody>
        </table>
      </div >

      {showStylistPopup && <StylistPopup closePopup={closeStylistPopup} />}
      {showPaymentDetailsPopup && <PaymentDetailsPopup closePopup={closePaymentDetailsPopup} />}
      {showInvoicePopup && <InvoicePopup closePopup={closeInvoicePopup} />}


      {/* Pagination */}
      <div>
        <Pagination />
      </div>

    </div >
  )
}
