import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import editButton from "../../assets/icons/editButton.png"
// import deleteButton from "../../assets/icons/deleteButton.png"
// import rectangleBlack from "../../assets/images/rectangleBlack.png"
import Select, { SingleValue } from 'react-select';
import stylist from "../../assets/images/stylist.png"
import { StylistPopup } from "../Dashboard/DashBoardData/StylistPopup";
import { SelectField } from "@/common/SelectField";
import { Pagination } from "@/common/Pagination";
import { inprogressList } from "@/api/apiConfig";

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

export const Inprogress = () => {


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

  // const [showEditServicePopup, setShowEditServicePopup] = useState(false);

  // const openEditService = () => {
  //   setShowEditServicePopup(!showEditServicePopup)
  // }

  // const closeEditService = () => {
  //   setShowEditServicePopup(false)
  // }


  const [inprogressListData, setInprogressListData] = useState<InprogressListProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchInprogressListData = async () => {
      setLoading(true);
      setError(null);

      // Login Provider ID
      const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
      console.log("Login Provider ID from session storage", sessionLoginProviderID);

      try {
        // const data = await bookingsList(Number(sessionLoginProviderID));
        const data = await inprogressList(1, 2);
        setInprogressListData(data.results);
        console.log("Fetched Inprogress List data log:", data);
      }
      catch (error: any) {
        setError(error.message || 'Failed to fetch inprogress list');
      } finally {
        setLoading(false); // Ensure loading is false after fetching
      }
    }

    fetchInprogressListData();

  }, []);


  if (loading) return <div>Loading...</div>;
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
              inprogressListData.map((inprogress, index) => (
                <tr className="border-b-2">
                  <td className="text-start px-2 py-5">{index + 1}</td>
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

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-5">
                  No Booking data available.
                </td>
              </tr>
            )}
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
                    buttonTitle={"Completed"}
                    className="bg-[#e5ffec] text-md text-mindfulGreen font-semibold rounded-sm px-3 py-1"
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
          </tbody>
        </table>
      </div >

      {/* {showDenialPopup && <DenialPopup closePopup={closeDenialPopup} />} */}
      {showStylistPopup && <StylistPopup closePopup={closeStylistPopup} />}


      {/* Pagination */}
      <div>
        <Pagination />
      </div>
    </div >
  )
}
