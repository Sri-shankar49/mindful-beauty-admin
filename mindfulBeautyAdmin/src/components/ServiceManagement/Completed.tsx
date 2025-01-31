import { useEffect, useState } from "react";
// import deleteButton from "../../assets/icons/deleteButton.png"
// import rectangleBlack from "../../assets/images/rectangleBlack.png"
import Select, { SingleValue } from 'react-select';
// import stylist from "../../assets/images/stylist.png"
import { StylistPopup } from "../Dashboard/DashBoardData/StylistPopup";
// import { SelectField } from "@/common/SelectField";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { PaymentDetailsPopup } from "./Completed/PaymentDetailsPopup";
import { InvoicePopup } from "./Completed/InvoicePopup";
import { Pagination } from "@/common/Pagination";
import { beauticiansList, completedList } from "@/api/apiConfig";
import { ShimmerTable } from "shimmer-effects-react";
import { SelectField } from "@/common/SelectField";

// interface StatusListDataProps {
//   status_id?: number;
//   status_name: string;
// }


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
  id: string;
  date: string;
  time: string;
  location: string;
  name: string;
  phone: string;
  services: Service[];
  amount: string;
  status: string;
  modify_status: string;
  stylist: string;
  stylist_id?: string;
}

interface BeauticiansDataProps {
  id?: any;
  name: string;
  role: string;
  years_of_experience?: string;
  rating: string;
  profile_image: string;
  provider: string;
}

export const Completed = () => {


  // const stylistData: StylistOption[] = [
  //   {
  //     value: 1,
  //     text: 'Swetha',
  //     icon: `${stylist}`
  //   },
  //   {
  //     value: 2,
  //     text: 'Swetha',
  //     icon: `${stylist}`
  //   },
  //   {
  //     value: 3,
  //     text: 'Swetha',
  //     icon: `${stylist}`
  //   },
  //   {
  //     value: 4,
  //     text: 'Swetha',
  //     icon: `${stylist}`
  //   }
  // ];


  // State declaration for Stylist Popup
  const [showStylistPopup, setShowStylistPopup] = useState(false);


  // const openStylistPopup = () => {
  //   setShowStylistPopup(true);
  // }

  const closeStylistPopup = () => {
    setShowStylistPopup(false);
  }
  // const [selectedStylistOption, setSelectedStylistOption] = useState<SingleValue<StylistOption>>(null);


  // handle onChange event of the dropdown
  // const handleStylistOption = (option: SingleValue<StylistOption>) => {
  //   setSelectedStylistOption(option);

  //   // Open Stylist Popup
  //   setShowStylistPopup(true);
  // };


  const handleStylistOption = (newValue: SingleValue<StylistOption>) => {
    if (newValue) {
      const selectedBeautician = beauticiansListData.find(
        (beautician) => beautician.id === newValue.value
      );

      console.log("Selected Beautician ID:", selectedBeautician);


      if (selectedBeautician) {
        setSelectedStylist(selectedBeautician);
        setShowStylistPopup(true);
      }
    } else {
      console.log("No option selected.");
    }
  };

  // State Declaration for Payment Details Popup
  const [showPaymentDetailsPopup, setShowPaymentDetailsPopup] = useState(false);

  // const openPaymentDetailsPopup = () => {
  //   setShowPaymentDetailsPopup(!showPaymentDetailsPopup)
  // }

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
  // const [statusListData, setStatusListData] = useState<StatusListDataProps[]>([]);
  const [beauticiansListData, setBeauticiansListData] = useState<BeauticiansDataProps[]>([]);
  const [selectedStylist, setSelectedStylist] = useState<BeauticiansDataProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);


  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {

    const fetchCompletedListData = async () => {
      setLoading(true);
      setError(null);

      // Login Provider ID
      const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
      console.log("Login Provider ID from session storage", sessionLoginProviderID);

      try {
        const data = await completedList(Number(sessionLoginProviderID), 3, currentPage);

        const beauticiansData = await beauticiansList(Number(sessionLoginProviderID));

        // const statusData = await fetchStatus();

        setBeauticiansListData(beauticiansData.data);

        // setStatusListData(statusData);
        // const data = await completedList(1, 3, currentPage);
        setCompletedListData(data.results);

        setTotalItems(data.count);
        console.log("Fetched Completed List data log:", data);
        console.log("Fetched Completed List pagination count data log :", data.count);

      }
      catch (error: any) {
        setError(error.message || 'Failed to fetch completed list');
      } finally {
        setLoading(false); // Ensure loading is false after fetching
      }
    }

    fetchCompletedListData();

  }, [currentPage, itemsPerPage]);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to the first page when items per page changes
  };


  // if (loading) return <div>Loading...</div>;
  if (loading) return <div>
    <div>
      <ShimmerTable
        mode="light"
        row={2}
        col={4}
        border={1}
        borderColor={"#cbd5e1"}
        rounded={0.25}
        rowGap={16}
        colPadding={[15, 5, 15, 5]}
      />
    </div>
  </div>;
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
                      {/* <Select
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
                      /> */}

                      <Select
                        placeholder="Select Option"
                        // value={selectedStylistOption}
                        // options={stylistData}
                        options={beauticiansListData.map((beautician) => ({
                          value: beautician.id,
                          text: beautician.name,
                          icon: beautician.profile_image,
                        }))}
                        onChange={handleStylistOption}
                        getOptionLabel={(option) => option.text} // Use `text` as the string label for accessibility and filtering
                        formatOptionLabel={(option) => (
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={option.icon} alt={option.text} style={{ width: 16, height: 16 }} />
                            <span style={{ marginLeft: 5 }}>{option.text}</span>
                          </div>
                        )}
                        getOptionValue={(option) => option.value.toString()}
                        value={
                          beauticiansListData
                            .map((beautician) => ({
                              value: beautician.id,
                              text: beautician.name,
                              icon: beautician.profile_image,
                            }))
                            .find((option) => option.value === completed.stylist_id) || null // Set default value
                        }
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
                        { value: "partlyPaid", label: "Partly Paid" },
                        { value: "notPaid", label: "Not Paid" },
                      ]}
                      className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                    />
                    {/* <select
                      // name=""
                      id=""
                      className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                    // value={selectedBranch}
                    // onChange={handleBranchChange} // Call on change

                    >
                      <option value="" disabled>
                        Select Branch
                      </option>

                      {statusListData.map((status) => (
                        <option key={status.status_id} value={status.status_id}>
                          {status.status_name}
                        </option>
                      ))}
                    </select> */}
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
                    buttonTitle={"Schedule"}
                    className="bg-[#fff8e5] text-md text-mindfulYellow font-semibold rounded-sm px-3 py-1"
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
                    { value: "scheduled", label: "Scheduled" },
                    { value: "inprogress", label: "Inprogress" },
                    { value: "completed", label: "Completed" },
                  ]}
                  className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                />
              </td>

              <td className="text-start px-2 py-5">
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
            {/* <tr className="border-b-2">
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

              <td className="text-start px-2 py-5">
                <div>
                  <Button
                    buttonType="button"
                    buttonTitle={"Inprogress"}
                    className="bg-[#e6f2ff] text-md text-mindfulSecondaryBlue font-semibold rounded-sm px-3 py-1"
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
                    { value: "scheduled", label: "Scheduled" },
                    { value: "inprogress", label: "Inprogress" },
                    { value: "completed", label: "Completed" },
                  ]}
                  className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                />
              </td>

              <td className="text-start px-2 py-5">
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

          </tbody>
        </table>
      </div >

      {/* {showStylistPopup && <StylistPopup closePopup={closeStylistPopup} />} */}
      {showStylistPopup && selectedStylist && (
        <StylistPopup closePopup={closeStylistPopup} stylistDetails={selectedStylist} />
      )}
      {showPaymentDetailsPopup && <PaymentDetailsPopup closePopup={closePaymentDetailsPopup} />}
      {showInvoicePopup && <InvoicePopup closePopup={closeInvoicePopup} appointmentId={0} />}


      {/* Pagination */}
      <div>
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange} />
      </div>

    </div >
  )
}
