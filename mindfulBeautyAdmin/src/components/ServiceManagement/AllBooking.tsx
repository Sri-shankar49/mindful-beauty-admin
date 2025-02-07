import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import editButton from "../../assets/icons/editButton.png"
// import deleteButton from "../../assets/icons/deleteButton.png"
// import rectangleBlack from "../../assets/images/rectangleBlack.png"
import { Button } from "@/common/Button";
import Select, { SingleValue } from 'react-select';
// import stylist from "../../assets/images/stylist.png"
import { StylistPopup } from "../Dashboard/DashBoardData/StylistPopup";
// import { SelectField } from "@/common/SelectField";
import { Pagination } from "@/common/Pagination";
import { beauticiansList, fetchStatus, modifyStatus } from "@/api/apiConfig";
import { ShimmerTable } from "shimmer-effects-react";
import stylist from "../../assets/images/stylist.png"
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchBookingList, setCurrentPage, setError, setLoading } from '@/redux/allbookingSlice';
import { EditAppAllBookingPopup } from "./EditAppAllBookingPopup";
import { useNavigate } from "react-router-dom";



interface StatusListDataProps {
  status_id?: number;
  status_name: string;
}

// Define the type for each option
interface StylistOption {
  value: number;
  text: string;
  icon: string; // URL or path to the image
}

// interface Service {
//   name: string;
//   price: number;
// }

// interface BookingListProps {
//   id: string;
//   date: string;
//   time: string;
//   location: string;
//   name: string;
//   phone: string;
//   services: Service[];
//   amount: string;
//   status: string;
//   status_id?: string;
//   modify_status: string;
//   stylist: string;
//   stylist_id?: string;
// }

interface BeauticiansDataProps {
  // id?: any;
  // name: string;
  // role: string;
  // years_of_experience?: string;
  // rating: string;
  // profile_image: string;
  // provider: string;

  staff?: any;
  name: string;
  role_name: string;
  branch_name: string;
  status: string;
  role_id: string;
  branch_id: string;
  phone: string;
}

export const AllBooking = () => {


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

  // Navigate from react router dom
  const navigate = useNavigate();


  // State declaration for Stylist Popup
  const [showStylistPopup, setShowStylistPopup] = useState(false);


  // const openStylistPopup = () => {
  //   setShowStylistPopup(true);
  // }

  const closeStylistPopup = () => {
    setShowStylistPopup(false);
    setSelectedStylist(null);
  }
  // const [selectedStylistOption, setSelectedStylistOption] = useState<SingleValue<StylistOption>>(null);


  // handle onChange event of the dropdown
  // const handleStylistOption = (option: SingleValue<StylistOption>) => {
  //   setSelectedStylistOption(option);

  //   // Open Stylist Popup
  //   setShowStylistPopup(true);
  // };

  // Handle change events for the Select component
  // const handleStylistOption = (newValue: SingleValue<StylistOption>) => {
  //   if (newValue) {
  //     // Access the beautician ID
  //     const selectedBeauticianId = newValue.value;

  //     console.log("Selected Beautician ID:", selectedBeauticianId);

  //     // Perform additional actions, e.g., opening a popup or saving the state
  //     // setShowStylistPopup(true); // Example
  //   } else {
  //     console.log("No option selected.");
  //   }
  // };

  // Already Working Function
  // const handleStylistOption = (newValue: SingleValue<StylistOption>) => {
  //   if (newValue) {
  //     const selectedBeautician = beauticiansListData.find(
  //       (beautician) => beautician.staff === newValue.value
  //     );

  //     console.log("Selected Beautician ID:", selectedBeautician);


  //     if (selectedBeautician) {
  //       setSelectedStylist(selectedBeautician);
  //       setShowStylistPopup(true);
  //     }
  //   } else {
  //     console.log("No option selected.");
  //   }
  // };

  // Function Handler for Stylist Option while Changing the Stylist Value on API call
  const handleStylistOption = async (
    newValue: SingleValue<StylistOption>,
    appointmentID: string,
    // statusID: string
  ) => {
    if (!newValue) {
      console.log("No stylist  selected.");
      return;
    }

    const selectedBeautician = beauticiansListData.find(
      (beautician) => beautician.staff === Number(newValue.value)
    );

    console.log("Selected Beautician:", selectedBeautician);

    if (selectedBeautician) {
      setSelectedStylist(selectedBeautician);
      setShowStylistPopup(true);

      // Dispatch loading state before calling API
      // dispatch(setLoading(true));

      try {
        // Call modifyStatus API to update the stylist
        const data = await modifyStatus(
          Number(appointmentID),      // Keep the same appointment ID
          Number("0"), // Keep the same status
          Number(selectedBeautician.staff) // New stylist ID
        );

        console.log("Modify Stylist status data log:", data);

        // Refresh the booking list after the update
        await fetchRefreshedBookingListData();
      } catch (error: any) {
        console.error("Failed to update stylist:", error.message);
      } finally {
        // dispatch(setLoading(false)); // Reset loading state
      }
    }
  };


  // Function to get default stylist from API response
  // const getDefaultStylist = () => {
  //   const defaultStylist = beauticiansListData.find(
  //     (beautician) => beautician.id === bookingData.stylist
  //   );

  //   if (defaultStylist) {
  //     return {
  //       value: defaultStylist.id,
  //       text: defaultStylist.name,
  //       icon: defaultStylist.profile_image,
  //     };
  //   }
  //   return null;
  // };

  // const [showEditServicePopup, setShowEditServicePopup] = useState(false);

  // const openEditService = () => {
  //   setShowEditServicePopup(!showEditServicePopup)
  // }

  // const closeEditService = () => {
  //   setShowEditServicePopup(false)
  // }

  // const [bookingListData, setBookingListData] = useState<BookingListProps[]>([]);
  const [statusListData, setStatusListData] = useState<StatusListDataProps[]>([]);
  const [beauticiansListData, setBeauticiansListData] = useState<BeauticiansDataProps[]>([]);
  const [selectedStylist, setSelectedStylist] = useState<BeauticiansDataProps | null>(null);

  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  // const [totalItems, setTotalItems] = useState(0);

  // Pagination state
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // State Declaration for Edit Appointment Popup
  const [showEditAppointmentPopup, setShowEditAppointmentPopup] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null); // State to hold selected appointment details

  const openEditAppointmentPopup = (appointmentDetails: any) => {
    setSelectedAppointment(appointmentDetails); // Store appointment details
    setShowEditAppointmentPopup(true);
    console.log("All Booking appointment ID:", appointmentDetails);

  }

  const closeEditAppointmentPopup = () => {
    setShowEditAppointmentPopup(false);
    setSelectedAppointment(null); // Clear the selected data when closing
  }

  // Login Provider ID
  const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
  console.log("Login Provider ID from session storage", sessionLoginProviderID);


  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const { bookingListData, loading, error, searchQuery, currentPage, totalItems } = useSelector((state: RootState) => state.allbooking);

  // Fetch inprogress list on mount and when dependencies change
  useEffect(() => {
    dispatch(setLoading(true)); // Ensure UI updates before fetching
    dispatch(fetchBookingList({ providerID: Number(sessionLoginProviderID), searchQuery, currentPage })).catch((error) => {
      dispatch(setError(error.message));
    });;
  }, [dispatch, searchQuery, currentPage]);


  useEffect(() => {

    const fetchBookingListData = async () => {
      // setLoading(true);
      // setError(null);

      try {
        // const data = await bookingsList(Number(sessionLoginProviderID), currentPage);

        const beauticiansData = await beauticiansList(Number(sessionLoginProviderID));

        const statusData = await fetchStatus();

        setBeauticiansListData(beauticiansData.data);


        setStatusListData(statusData);

        // const data = await bookingsList(
        //   1,
        //   currentPage,
        //   // {
        //   //   page: currentPage,
        //   //   limit: itemsPerPage,
        //   // }
        // );
        // setBookingListData(data.results);

        // setTotalItems(data.count);

        // console.log("Fetched Booking List data log:", data);
        // console.log("Fetched Booking List pagination count data log :", data.count);
      }
      catch (error: any) {
        // setError(error.message || 'Failed to fetch booking list');
      } finally {
        // setLoading(false); // Ensure loading is false after fetching
      }
    }

    fetchBookingListData();

  }, [currentPage, itemsPerPage]);



  // Function call to get the updated booking list
  const fetchRefreshedBookingListData = async () => {
    // setLoading(true);
    // setError(null);

    try {
      // const data = await bookingsList(Number(sessionLoginProviderID), currentPage);
      const beauticiansData = await beauticiansList(Number(sessionLoginProviderID));
      const statusData = await fetchStatus();

      setBeauticiansListData(beauticiansData.data);
      setStatusListData(statusData);
      // setBookingListData(data.results);
      // setTotalItems(data.count);

      // console.log("Fetched Refreshed Booking List data log:", data);
      // console.log("Fetched Refreshed Booking List pagination count data log :", data.count);
    } catch (error: any) {
      // setError(error.message || "Failed to fetch booking list");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefreshedBookingListData();
  }, [currentPage, itemsPerPage]);


  // Function handler on Changing the status for the appointment
  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>, appointmentID: string, stylistID?: string) => {
    const newStatusId = e.target.value;
    console.log(`Status changed for booking ID ${appointmentID} to ${newStatusId} and stylist ID ${stylistID}`);

    // Optional: Update the status in the backend or state
    // API call or local state update logic here
    try {
      // setLoading(true);

      const data = await modifyStatus(Number(appointmentID), Number(newStatusId), Number(stylistID));

      console.log("Modify status data log:", data);

      if (data?.status === "success") {
        // toast.success("Status updated successfully");
        navigate(0);
      }


      // Refresh the booking list data after status update
      await fetchRefreshedBookingListData();



    } catch (error: any) {
      // setError(error.message || "Failed to fetch booking list for the selected status");
    }
    finally {
      // setLoading(false);

    }
  };

  const handlePageChange = (page: number) => {
    // setCurrentPage(page);
    dispatch(setCurrentPage(page));

  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to the first page when items per page changes
  };


  // if (loading) return <div>Loading...</div>;
  // if (loading) return <div>
  //   <div>
  //     <ShimmerTable
  //       mode="light"
  //       row={2}
  //       col={4}
  //       border={1}
  //       borderColor={"#cbd5e1"}
  //       rounded={0.25}
  //       rowGap={16}
  //       colPadding={[15, 5, 15, 5]}
  //     />
  //   </div>
  // </div>;
  // if (error) return <div>{error}</div>;


  return (
    <div>

      {/* Sub Heading */}
      <div>
        <h5 className="text-3xl font-semibold py-5">Booking List</h5>
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
              <th className="text-start px-2 py-3">Status</th>
              <th className="text-start px-2 py-3">Assign Stylist</th>
              <th className="text-start px-2 py-3">Modify Status</th>
              <th className="text-start px-2 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* Content */}
            {loading ? (
              <tr>
                <td colSpan={12} className="text-center px-2 py-5">
                  <ShimmerTable
                    mode="light"
                    row={bookingListData.length + 1} // Adjust based on expected staff rows
                    col={12} // Matches table columns
                    border={1}
                    borderColor={"#cbd5e1"}
                    rounded={0.25}
                    rowGap={16}
                    colPadding={[15, 5, 15, 5]}
                  />
                </td>
              </tr>
            ) : error ? (
              /* Error State */
              <tr>
                <td colSpan={12} className="text-center text-red-600 py-5">
                  Error: {error}
                </td>
              </tr>
            ) :
              bookingListData.length > 0 ? (
                bookingListData.map((bookingData) => (
                  <tr key={bookingData.id} className="border-b-2">
                    {/* <td className="text-start px-2 py-5">{index + 1}</td> */}
                    <td className="text-start px-2 py-5">{bookingData.id}</td>
                    <td className="text-start px-2 py-5">{bookingData.date}</td>
                    <td className="text-start px-2 py-5">{bookingData.time}</td>
                    <td className="text-start px-2 py-5">{bookingData.location || null}</td>
                    <td className="text-start px-2 py-5">{bookingData.name}</td>
                    <td className="text-start px-2 py-5">{bookingData.phone}</td>

                    {/* <td className="text-start px-2 py-5">{bookingData.services}</td> */}

                    <td className="text-start px-2 py-5">
                      <ul>
                        {bookingData.services.map((service, index) => (
                          <li key={index}>{service.name}</li>
                        ))}
                      </ul>
                    </td>

                    {/* <td className="text-start px-2 py-5">
                    {bookingData.services.map((service, index) => (
                      <ul key={index}>
                        <li>{service}</li>
                      </ul>
                    ))}
                  </td> */}

                    <td className="text-start px-2 py-5">{bookingData.amount}</td>

                    <td className="text-start px-2 py-5">
                      {bookingData.status === "Completed" ? (
                        <div>
                          <Button
                            buttonType="button"
                            buttonTitle={"Completed"}
                            className="bg-[#e5ffec] text-md text-mindfulGreen font-semibold rounded-sm px-3 py-1"
                          />
                        </div>
                      ) : bookingData.status === "Inprogress" ? (
                        <div>
                          <Button
                            buttonType="button"
                            buttonTitle={"Inprogress"}
                            className="bg-[#e6f2ff] text-md text-mindfulSecondaryBlue font-semibold rounded-sm px-3 py-1"
                          />
                        </div>
                      ) : bookingData.status === "Schedule" ? (
                        <div>
                          <Button
                            buttonType="button"
                            buttonTitle={"Schedule"}
                            className="bg-[#fff8e5] text-md text-mindfulYellow font-semibold rounded-sm px-3 py-1"
                          />
                        </div>
                      ) : bookingData.status === "Cancelled" ? (
                        <div>
                          <Button
                            buttonType="button"
                            buttonTitle={"Cancelled"}
                            className="bg-[#ffe1e1] text-md text-mindfulRed font-semibold rounded-sm px-3 py-1"
                          />
                        </div>

                      ) : "Not Available"}

                    </td>

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
                            value: beautician.staff,
                            text: beautician.name,
                            // icon: beautician.profile_image,
                            icon: stylist,
                          }))}
                          onChange={(e) => handleStylistOption(e, bookingData.id)}
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
                                value: beautician.staff,
                                text: beautician.name,
                                // icon: beautician.profile_image,
                                icon: stylist,
                              }))
                              .find((option) => option.value === bookingData.stylist_id) || null // Set default value
                          }
                        />
                      </div>
                    </td>

                    <td>
                      {/* <SelectField
                      label={''}
                      name="status"
                      id="status"
                      options={[
                        { value: "scheduled", label: "Scheduled" },
                        { value: "inprogress", label: "Inprogress" },
                        { value: "completed", label: "Completed" },
                      ]}
                      className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                    /> */}
                      <select
                        // name=""
                        id=""
                        className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                        // value={selectedBranch}
                        // onChange={handleBranchChange} // Call on change
                        value={bookingData.status_id} // Set default value from the API response
                        onChange={(e) => handleStatusChange(e, bookingData.id, String(bookingData.stylist_id))} // Handle status change

                      >
                        {/* <option value="" disabled>
                        Select Status
                      </option> */}

                        {/* {statusListData.map((status) => (
                        <option key={status.status_id} value={status.status_id}>
                          {status.status_name}
                        </option>
                      ))} */}

                        {statusListData
                          .filter((status) => status.status_id !== 0) // Exclude the option with status_id = 0
                          .map((status) => (
                            <option key={status.status_id} value={status.status_id}>
                              {status.status_name}
                            </option>
                          ))}
                      </select>
                    </td>

                    <td className="text-start px-2 py-5">
                      {/* <Link
                      to="/ServiceManagement/EditServices"
                      aria-current="page"
                    > */}
                      <button
                        // onClick={openEditService}
                        onClick={() => openEditAppointmentPopup(bookingData)}
                        type="button"
                        aria-label="Edit Services" // Accessibility improvement
                        className="edit-button"  // Optional: Add a class for better styling control
                      >
                        <img src={editButton} alt="editButton" />
                      </button>

                      {/* </Link> */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={12} className="text-center py-5">
                    No Booking data available.
                  </td>
                </tr>
              )}


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
                    { value: "scheduled", label: "Scheduled" },
                    { value: "inprogress", label: "Inprogress" },
                    { value: "completed", label: "Completed" },
                  ]}
                  className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                />
              </td>

              <td className="text-start px-2 py-5">
                <Link
                  to="/ServiceManagement/EditServices"
                  aria-current="page"
                >
                  <button
                    // onClick={openEditService}
                    type="button"
                    aria-label="Edit Services" // Accessibility improvement
                    className="edit-button"  // Optional: Add a class for better styling control
                  >
                    <img src={editButton} alt="editButton" />
                  </button>
                </Link>
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
                <Link
                  to="/ServiceManagement/EditServices"
                  aria-current="page"
                >
                  <button
                    // onClick={openEditService}
                    type="button"
                    aria-label="Edit Services" // Accessibility improvement
                    className="edit-button"  // Optional: Add a class for better styling control
                  >
                    <img src={editButton} alt="editButton" />
                  </button>
                </Link>
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
                <Link
                  to="/ServiceManagement/EditServices"
                  aria-current="page"
                >
                  <button
                    // onClick={openEditService}
                    type="button"
                    aria-label="Edit Services" // Accessibility improvement
                    className="edit-button"  // Optional: Add a class for better styling control
                  >
                    <img src={editButton} alt="editButton" />
                  </button>
                </Link>
              </td>


            </tr> */}
          </tbody>
        </table>
      </div>

      {/* {showDenialPopup && <DenialPopup closePopup={closeDenialPopup} />} */}
      {/* {showStylistPopup && <StylistPopup closePopup={closeStylistPopup} />} */}
      {showStylistPopup && selectedStylist && (
        <StylistPopup closePopup={closeStylistPopup} stylistDetails={selectedStylist} />
      )}

      {showEditAppointmentPopup &&
        <EditAppAllBookingPopup
          closePopup={closeEditAppointmentPopup}
          appointmentDetails={selectedAppointment} // Pass selected data 
        />}


      {/* Pagination */}
      <div>
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  )
}
