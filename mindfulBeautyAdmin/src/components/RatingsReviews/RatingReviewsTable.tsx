import { NavLink } from 'react-router-dom';
import { InputField } from '@/common/InputField'
// import { MdSearch } from 'react-icons/md'
import { FaSort } from "react-icons/fa";
import { Pagination } from '@/common/Pagination';
import { useEffect, useState } from 'react';
import { reviewsList } from '@/api/apiConfig';

interface RatingReviewsTableProps {
  review_id?: string;
  created_at: string;
  order_id?: string;
  user_id?: string;
  customer_name: string;
  rating: string;
  comment: string;
}

export const RatingReviewsTable: React.FC<RatingReviewsTableProps> = () => {

  const [reviewsListData, setReviewsListData] = useState<RatingReviewsTableProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {

    const fetchReviewsList = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const data = await reviewsList(currentPage);

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


  if (loading) return <div>Loading...</div>;
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
                <table className="w-full">
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
                          <td className="text-start pl-8 py-5">{review.customer_name}</td>
                          <td className="text-start pl-8 py-5">{review.rating}</td>
                          <td className="text-start pl-8 py-5">{review.comment}</td>
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
