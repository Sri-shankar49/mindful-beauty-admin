import { NavLink } from 'react-router-dom';
import { InputField } from '@/common/InputField'
// import { MdSearch } from 'react-icons/md'
import { FaSort } from "react-icons/fa";
import { Pagination } from '@/common/Pagination';
import { useEffect, useState } from 'react';
import { reviewAction, reviewsList } from '@/api/apiConfig';
import { ShimmerTable } from 'shimmer-effects-react';
// import { BiEditAlt } from 'react-icons/bi';
// import { RiDeleteBinLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

interface RatingReviewsTableProps {
  // review_id?: string;
  // created_at: string;
  // order_id?: string;
  // user_id?: string;
  // customer_name: string;
  // // service_names: any[];
  // service_objects: any;
  // rating: string;
  // comment: string;

  comment: string;
  created_at: string;
  customer_name: string;
  order_id: string;
  rating: string;
  review_id: string;
  service_objects: ServiceObj[];
  user_id: number;
  status: number;
}

interface ServiceObj {
  service_id: number;
  service_name: string;
}

export const RatingReviewsTable: React.FC<RatingReviewsTableProps> = () => {

  const [reviewsListData, setReviewsListData] = useState<RatingReviewsTableProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Login Provider ID
  const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
  console.log("Login Provider ID from session storage", sessionLoginProviderID);

  useEffect(() => {

    const fetchReviewsList = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const data = await reviewsList(Number(sessionLoginProviderID), currentPage);

        setReviewsListData(data.results || []); // Fallback to an empty array if data is null
        setTotalItems(data.count);

        console.log("Reviews list data log:", data);
        console.log("Fetched Booking List pagination count data log :", data.count);

      } catch (error: any) {
        setError(error.message || 'Failed to fetch staff list');
      } finally {
        setLoading(false); // Ensure loading is false after fetching
      }
    };

    fetchReviewsList();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to the first page when items per page changes
  };


  const handleReviewAction = async (reviewID: number, statusID: number, userID: number) => {

    setLoading(true);
    setError(null);

    console.log("Review ID: ", reviewID);
    console.log("Status ID: ", statusID);
    console.log("User ID: ", userID);


    try {
      const response = await reviewAction(reviewID, statusID, userID);
      console.log("Review Action data log:", response);

      if (response?.status === "success") {
        const data = await reviewsList(Number(sessionLoginProviderID), currentPage);
        setReviewsListData(data.results || []); // Fallback to an empty array if data is null
        setTotalItems(data.count);
        console.log("Refreshed the reviews list data log:", data);

      }
    } catch (error: any) {
      setError(error.message || 'Failed to do review action');
    } finally {
      setLoading(false); // Ensure loading is false after fetching
    }
  }


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
      <div>
        <div className="bg-mindfulLightPink px-5 py-5">

          <div className="bg-mindfulWhite px-5 py-5">

            <div className="pb-5">
              <div className="flex items-center justify-between">
                <div>
                  <NavLink to="ServiceList">
                    <h5 className="text-3xl font-semibold">Ratings & Reviews</h5>
                  </NavLink>
                </div>

                {/* Select, Add Service & Search */}
                <div className="">
                  {/* Search Field */}
                  <div className="flex items-center ">
                    <InputField
                      label={''}
                      placeholder="Search"
                      className="w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                    />
                    {/* <MdSearch className="text-[22px] text-mindfulBlack absolute top-2 right-1 cursor-pointer" /> */}
                  </div>
                </div>

              </div>
            </div>


            {/* Rating Table */}
            <div>
              <div>
                <table className="w-full border-[1px]">
                  <thead className="bg-mindfulLightgrey">
                    <tr className="">
                      <th className="text-start px-2 py-3">
                        <div className="flex items-center">
                          <FaSort className="text-[12px] text-mindfulgrey mr-2 cursor-pointer" />
                          #
                        </div>
                      </th>
                      <th className="text-start px-2 py-3">
                        <div className="flex items-center">
                          <FaSort className="text-[12px] text-mindfulgrey mr-2 cursor-pointer" />
                          Date
                        </div>
                      </th>
                      <th className="text-start px-2 py-3">
                        <div className="flex items-center">
                          <FaSort className="text-[12px] text-mindfulgrey mr-2 cursor-pointer" />
                          Order ID
                        </div>
                      </th>
                      <th className="text-start px-2 py-3">
                        <div className="flex items-center">
                          <FaSort className="text-[12px] text-mindfulgrey mr-2 cursor-pointer" />
                          Customer
                        </div>
                      </th>
                      <th className="text-start px-2 py-3">
                        <div className="flex items-center">
                          <FaSort className="text-[12px] text-mindfulgrey mr-2 cursor-pointer" />
                          Service
                        </div>
                      </th>
                      <th className="text-start px-2 py-3">
                        <div className="flex items-center">
                          <FaSort className="text-[12px] text-mindfulgrey mr-2 cursor-pointer" />
                          Ratings
                        </div>
                      </th>
                      <th className="text-start px-2 py-3">
                        <div className="flex items-center">
                          <FaSort className="text-[12px] text-mindfulgrey mr-2 cursor-pointer" />
                          Comments
                        </div>
                      </th>
                      <th className="text-start px-2 py-3">
                        <div className="flex items-center">
                          <FaSort className="text-[12px] text-mindfulgrey mr-2 cursor-pointer" />
                          Action
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* Content */}
                    {reviewsListData.length > 0 ? (
                      reviewsListData.map((review) => (
                        <tr key={review.review_id} className="border-b-2">
                          <td className="text-start pl-8 ml-2 py-5">{review.review_id}</td>
                          <td className="text-start pl-8 py-5">{review.created_at}</td>
                          <td className="text-start pl-8 py-5">{review.order_id}</td>
                          <td key={review.user_id} className="text-start pl-8 py-5">{review.customer_name}</td>
                          {/* <td className="text-start pl-8 py-5">{review.service_names}</td> */}
                          <td className="text-start pl-8 py-5">
                            <ul>
                              {review.service_objects.map((service) => (
                                <li key={service.service_id}>{service.service_name}</li>
                              ))}
                            </ul>
                          </td>
                          <td className="text-start pl-8 py-5">{review.rating}</td>
                          <td className="text-start pl-8 py-5">{review.comment}</td>
                          <td className="text-start pl-8 py-5">
                            <div className="flex items-center space-x-2">

                              {/* Approve Button */}

                              <div
                                onClick={() => {
                                  if (review.status !== 1) {
                                    handleReviewAction(Number(review.review_id), 1, Number(review.user_id));
                                  }
                                }}
                                className={`border-[1px] rounded-md px-2 py-1.5 group transition-colors duration-200 ${review.status === 1
                                  ? "border-mindfulgrey cursor-not-allowed bg-gray-200"
                                  : "border-mindfulGreen cursor-pointer hover:bg-[#e5ffec]"
                                  }`}
                                title={review.status === 1 ? "Already Approved" : "Approve"}
                              >
                                <FaCheck className={`text-[20px] ${review.status === 1 ? "text-mindfulgrey" : "text-mindfulGreen group-hover:text-mindfulGreen"}`} />
                              </div>

                              {/* Decline Button */}
                              <div
                                onClick={() => {
                                  if (review.status !== 0) {
                                    handleReviewAction(Number(review.review_id), 0, Number(review.user_id));
                                  }
                                }}
                                className={`border-[1px] rounded-md px-2 py-1.5 group transition-colors duration-200 ${review.status === 0
                                  ? "border-mindfulgrey cursor-not-allowed bg-gray-200"
                                  : "border-mindfulRed cursor-pointer hover:bg-[#ffe1e1]"
                                  }`}
                                title={review.status === 0 ? "Already Declined" : "Decline"}
                              >
                                <IoClose className={`text-[20px] ${review.status === 0 ? "text-mindfulgrey" : "text-mindfulRed group-hover:text-mindfulRed"}`} />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))) : (
                      <tr>
                        <td colSpan={6} className="text-center py-5">
                          No ratings & reviews data available.
                        </td>
                      </tr>)
                    }


                    {/* <tr className="border-b-2">
                      <td className="text-start pl-8 ml-2 py-5">1</td>
                      <td className="text-start pl-8 py-5">11 August 2024</td>
                      <td className="text-start pl-8 py-5">MB94873</td>
                      <td className="text-start pl-8 py-5">Arshada</td>
                      <td className="text-start pl-8 py-5">Bridal Glow Facial</td>
                      <td className="text-start pl-8 py-5">4.8</td>
                      <td className="text-start pl-8 py-5">Excellent Service, Well-Trained professionals</td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>

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
        </div>
      </div>
    </div>
  )
}
