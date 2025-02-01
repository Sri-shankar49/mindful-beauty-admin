import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import editButton from "../../assets/icons/editButton.png";
// import deleteButton from "../../assets/icons/deleteButton.png";
// import rectangleBlack from "../../assets/images/rectangleBlack.png";
import Select, { SingleValue } from 'react-select';
// import stylist from "../../assets/images/stylist.png";
import { StylistPopup } from "../Dashboard/DashBoardData/StylistPopup";
// import { SelectField } from "@/common/SelectField";
import { Pagination } from "@/common/Pagination";
import { beauticiansList, inprogressList, fetchStatus, modifyStatus } from "@/api/apiConfig";
import { ShimmerTable } from "shimmer-effects-react";
import stylist from "../../assets/images/stylist.png";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchInprogressList, setCurrentPage } from '@/redux/inprogressSlice';


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

interface Service {
  name: string;
  price: number;
}

interface InprogressListProps {
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

export const Inprogress = () => {


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
        (beautician) => beautician.staff === newValue.value
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

  // const [showEditServicePopup, setShowEditServicePopup] = useState(false);

  // const openEditService = () => {
  //   setShowEditServicePopup(!showEditServicePopup)
  // }

  // const closeEditService = () => {
  //   setShowEditServicePopup(false)
  // }


  // const [inprogressListData, setInprogressListData] = useState<InprogressListProps[]>([]);
  const [statusListData, setStatusListData] = useState<StatusListDataProps[]>([]);
  const [beauticiansListData, setBeauticiansListData] = useState<BeauticiansDataProps[]>([]);
  const [selectedStylist, setSelectedStylist] = useState<BeauticiansDataProps | null>(null);

  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  // const [totalItems, setTotalItems] = useState(0);


  // Pagination state
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  // Login Provider ID
  const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
  console.log("Login Provider ID from session storage", sessionLoginProviderID);


  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const { inprogressListData, loading, error, searchQuery, currentPage, totalItems } = useSelector((state: RootState) => state.inprogress);

  // Fetch inprogress list on mount and when dependencies change
  useEffect(() => {
    dispatch(fetchInprogressList({ providerID: Number(sessionLoginProviderID), status: 2, searchQuery, currentPage }));
  }, [dispatch, searchQuery, currentPage]);

  // Function call to get the inprogress list
  useEffect(() => {

    const fetchInprogressListData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await inprogressList(Number(sessionLoginProviderID), 2, currentPage);

        const beauticiansData = await beauticiansList(Number(sessionLoginProviderID));

        const statusData = await fetchStatus();

        setBeauticiansListData(beauticiansData.data);


        setStatusListData(statusData);
        // const data = await inprogressList(1, 2, currentPage);
        setInprogressListData(data.results);

        setTotalItems(data.count);
        console.log("Fetched Inprogress List data log:", data);
        console.log("Fetched Inprogress List pagination count data log :", data.count);

      }
      catch (error: any) {
        setError(error.message || 'Failed to fetch inprogress list');
      } finally {
        setLoading(false); // Ensure loading is false after fetching
      }
    }

    fetchInprogressListData();

  }, [currentPage, itemsPerPage]);


  // Function call to get the updated inprogress list
  const fetchRefreshedInprogressListData = async () => {
    // setLoading(true);
    // setError(null);

    try {
      // const data = await inprogressList(Number(sessionLoginProviderID), 2, currentPage);
      const beauticiansData = await beauticiansList(Number(sessionLoginProviderID));
      const statusData = await fetchStatus();

      setBeauticiansListData(beauticiansData.data);
      setStatusListData(statusData);
      // setInprogressListData(data.results);
      // setTotalItems(data.count);

      // console.log("Fetched Refreshed Inprogress List data log:", data);
      // console.log("Fetched Refreshed Inprogress List pagination count data log :", data.count);

    } catch (error: any) {
      // setError(error.message || "Failed to fetch inprogress list");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefreshedInprogressListData();
  }, [currentPage, itemsPerPage]);



  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>, appointmentID: string) => {
    const newStatusId = e.target.value;
    console.log(`Status changed for booking ID ${appointmentID} to ${newStatusId}`);

    // Optional: Update the status in the backend or state
    // API call or local state update logic here
    try {
      // setLoading(true);

      const data = await modifyStatus(Number(appointmentID), Number(newStatusId));

      console.log("Modify status data log:", data);


      // Refresh the inprogress list data after status update
      await fetchRefreshedInprogressListData();

      // Take a deep copy of the service list data and update
      // const updatedScheduleList = [...data.results]; // Assuming results is an array

      // Update the inprogress list based on the status
      // setScheduleListData(updatedScheduleList || []);
      // setTotalItems(data.count);


    } catch (error: any) {
      // setError(error.message || "Failed to fetch inprogress list for the selected status");
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
        <h5 className="text-3xl font-semibold py-5">Inprogress</h5>
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
              <th className="text-start px-2 py-3">Modify Status</th>
              <th className="text-start px-2 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* Content */}
            {inprogressListData.length > 0 ? (
              inprogressListData.map((inprogress) => (
                <tr key={inprogress.id} className="border-b-2">
                  {/* <td className="text-start px-2 py-5">{index + 1}</td> */}
                  <td className="text-start px-2 py-5">{inprogress.id}</td>
                  <td className="text-start px-2 py-5">{inprogress.date}</td>
                  <td className="text-start px-2 py-5">{inprogress.time}</td>
                  <td className="text-start px-2 py-5">{inprogress.location}</td>
                  <td className="text-start px-2 py-5">{inprogress.name}</td>
                  <td className="text-start px-2 py-5">{inprogress.phone}</td>
                  {/* <td className="text-start px-2 py-5">{inprogress.services}</td> */}

                  <td className="text-start px-2 py-5">
                    <ul>
                      {inprogress.services.map((service, index) => (
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

                  <td className="text-start px-2 py-5">{inprogress.amount}</td>

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
                              value: beautician.staff,
                              text: beautician.name,
                              // icon: beautician.profile_image,
                              icon: stylist,
                            }))
                            .find((option) => option.value === inprogress.stylist_id) || null // Set default value
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
                      value={inprogress.status_id} // Set default value from the API response
                      onChange={(e) => handleStatusChange(e, inprogress.id)} // Handle status change

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
                        .filter((status) => status.status_id !== 0 && status.status_id !== 1) // Exclude the option with status_id = 3
                        .map((status) => (
                          <option key={status.status_id} value={status.status_id}>
                            {status.status_name}
                          </option>
                        ))}
                    </select>
                  </td>

                  <td className="text-start px-2 py-5">
                    <Link
                      to="/ServiceManagement/EditServices"
                      aria-current="page"
                      aria-label="Edit Services" // Accessibility improvement
                    >
                      <button
                        // onClick={openEditService}
                        type="button"
                        className=""  // Optional: Add a class for better styling control
                      >
                        <img src={editButton} alt="editButton" />
                      </button>
                    </Link>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="text-center py-5">
                  No Inprogress Booking data available.
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
                  aria-label="Edit Services" // Accessibility improvement
                >
                  <button
                    // onClick={openEditService}
                    type="button"
                    className=""  // Optional: Add a class for better styling control
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
                <Link
                  to="/ServiceManagement/EditServices"
                  aria-current="page"
                  aria-label="Edit Services" // Accessibility improvement
                >
                  <button
                    // onClick={openEditService}
                    type="button"
                    className=""  // Optional: Add a class for better styling control
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
                  aria-label="Edit Services" // Accessibility improvement
                >
                  <button
                    // onClick={openEditService}
                    type="button"
                    className=""  // Optional: Add a class for better styling control
                  >
                    <img src={editButton} alt="editButton" />
                  </button>
                </Link>
              </td>


            </tr> */}
          </tbody>
        </table>
      </div >

      {/* {showDenialPopup && <DenialPopup closePopup={closeDenialPopup} />} */}
      {/* {showStylistPopup && <StylistPopup closePopup={closeStylistPopup} />} */}

      {showStylistPopup && selectedStylist && (
        <StylistPopup closePopup={closeStylistPopup} stylistDetails={selectedStylist} />
      )}


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
    </div >
  )
}
