/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { roleList, addPermissions } from "@/api/apiConfig";
// import { useEffect, useState } from "react";

// interface RolesManagementProps {
//   role_id?: number;
//   role_name: string;
//   status: boolean;
// }

// export const RolesManagement = () => {
//   const [roleListData, setRoleListData] = useState<RolesManagementProps[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   // State to track checkbox selections for permissions per role
//   const [permissions, setPermissions] = useState<
//     Record<number, Record<string, boolean>>
//   >({});

//   useEffect(() => {
//     const fetchRoles = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const loadRolesData = await roleList();

//         setRoleListData(loadRolesData.data);
//         console.log("Role list data log:", loadRolesData);

//         // Initialize permissions state for all roles
//         const initialPermissions: Record<number, Record<string, boolean>> = {};
//         loadRolesData.data.forEach((role: RolesManagementProps) => {
//           if (role.role_id !== undefined) {
//             initialPermissions[role.role_id] = {
//               dashboard: false,
//               manage_role: false,
//               roles_management: false,
//               staff_management: false,
//               branch_management: false,
//             };
//           }
//         });
//         setPermissions(initialPermissions);
//       } catch (error: any) {
//         setError(error.message || "Failed to fetch role list");
//       } finally {
//         setLoading(false); // Ensure loading is false after fetching
//       }
//     };

//     fetchRoles();
//   }, []);

//   const handleCheckboxChange = (roleId: number, permission: string) => {
//     setPermissions((prevPermissions) => {
//       const updatedPermissions = {
//         ...prevPermissions,
//         [roleId]: {
//           ...prevPermissions[roleId],
//           [permission]: !prevPermissions[roleId][permission],
//         },
//       };

//       // Make API call for adding permissions when a checkbox is clicked
//       addPermissions(
//         roleId,
//         12,
//         updatedPermissions[roleId].dashboard,
//         updatedPermissions[roleId].manage_role
//       )
//         .then((response) => {
//           console.log("Permissions updated:", response);
//         })
//         .catch((error) => {
//           console.error("Error updating permissions:", error);
//         });

//       return updatedPermissions;
//     });
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="">
//       <div>
//         <h5 className="text-3xl font-semibold py-5">User Role Manager</h5>
//       </div>

//       <div>
//         <table className="w-full">
//           <thead className="border-y-2 border-mindfulgrey">
//             <tr>
//               <th className="w-[80%] text-start px-2 py-3">Actions</th>
//               {/* Dynamically render column headers based on role list */}
//               {roleListData.map((role) => (
//                 <th key={role.role_id} className="w-[10%] px-2 py-3">
//                   {role.role_name}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {/* Heading */}

//             <tr>
//               <th
//                 colSpan={5}
//                 className="bg-mindfulLightgrey text-start px-2 py-4"
//               >
//                 Dashboard
//               </th>

//               {/* Dynamically render checkboxes for each role */}
//               {roleListData.map((role) => (
//                 <td key={role.role_id} className="text-center px-2 py-2">
//                   <label className="cl-checkbox">
//                     <input
//                       type="checkbox"
//                       checked={permissions.dashboard}
//                       onChange={() => {
//                         if (role.role_id !== undefined) {
//                           handleCheckboxChange(role.role_id, "dashboard");
//                         } else {
//                           console.error("Role ID is undefined");
//                         }
//                       }}
//                     />

//                     <span></span>
//                   </label>
//                 </td>
//               ))}
//             </tr>
//             <tr>
//               <th
//                 colSpan={5}
//                 className="bg-mindfulLightgrey text-start px-2 py-4"
//               >
//                 Manage Role
//               </th>

//               {/* Dynamically render checkboxes for each role */}
//               {roleListData.map((role) => (
//                 <td key={role.role_id} className="text-center px-2 py-2">
//                   <label className="cl-checkbox">
//                     <input
//                       type="checkbox"
//                       checked={permissions.manage_role}
//                       onChange={() => {
//                         if (role.role_id !== undefined) {
//                           handleCheckboxChange(role.role_id, "manage_role");
//                         } else {
//                           console.error("Role ID is undefined");
//                         }
//                       }}
//                     />

//                     <span></span>
//                   </label>
//                 </td>
//               ))}
//             </tr>
//             {/* Content & Checkbox */}

//             {/* Content & Checkbox */}
//             <tr>
//               <td className="px-2 py-2">Roles Management</td>
//               {roleListData.map((role) => (
//                 <td key={role.role_id} className="text-center px-2 py-2">
//                   <label className="cl-checkbox">
//                     <input
//                       type="checkbox"
//                       checked={permissions.roles_management}
//                       //   onChange={() => handleCheckboxChange(role.role_id, 'roles_management')}
//                       onChange={() => {
//                         if (role.role_id !== undefined) {
//                           handleCheckboxChange(
//                             role.role_id,
//                             "roles_management"
//                           );
//                         } else {
//                           console.error("Role ID is undefined");
//                         }
//                       }}
//                     />

//                     <span></span>
//                   </label>
//                 </td>
//               ))}
//             </tr>

//             <tr>
//               <td className="px-2 py-2">Staff Management</td>
//               {roleListData.map((role) => (
//                 <td key={role.role_id} className="text-center px-2 py-2">
//                   <label className="cl-checkbox">
//                     <input
//                       type="checkbox"
//                       checked={permissions.staff_management}
//                       //   onChange={() => handleCheckboxChange(role.role_id, 'staff_management')}

//                       onChange={() => {
//                         if (role.role_id !== undefined) {
//                           handleCheckboxChange(
//                             role.role_id,
//                             "staff_management"
//                           );
//                         } else {
//                           console.error("Role ID is undefined");
//                         }
//                       }}
//                     />
//                     <span></span>
//                   </label>
//                 </td>
//               ))}
//             </tr>

//             <tr>
//               <td className="px-2 py-2">Branch Management</td>
//               {roleListData.map((role) => (
//                 <td key={role.role_id} className="text-center px-2 py-2">
//                   <label className="cl-checkbox">
//                     <input
//                       type="checkbox"
//                       checked={permissions.branch_management}
//                       //   onChange={() => handleCheckboxChange(role.role_id, 'branch_management')}
//                       onChange={() => {
//                         if (role.role_id !== undefined) {
//                           handleCheckboxChange(
//                             role.role_id,
//                             "branch_management"
//                           );
//                         } else {
//                           console.error("Role ID is undefined");
//                         }
//                       }}
//                     />
//                     <span></span>
//                   </label>
//                 </td>
//               ))}
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import {
    roleList,
    addPermissions,
    getProviderPermissions,
} from "@/api/apiConfig";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface RolesManagementProps {
    role_id?: number;
    role_name: string;
    status: boolean;
}

export const RolesManagement = () => {
    const [roleListData, setRoleListData] = useState<RolesManagementProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // State to track checkbox selections for permissions per role
    const [permissions, setPermissions] = useState<
        Record<number, Record<string, boolean>>
    >({});
    const loginProviderID = useSelector(
        (state: RootState) => state.login.loginProviderID
    );
    console.log("loginProviderID roles management", loginProviderID);

    useEffect(() => {
        const fetchRoles = async () => {
            setLoading(true);
            setError(null);

            if (!loginProviderID) {
                return; // Early return if loginProviderID is not available
            }

            setLoading(true);
            setError(null);

            try {
                const loadRolesData = await roleList();
                setRoleListData(loadRolesData.data);
                console.log("Role list data log:", loadRolesData);

                // Initialize permissions state for all roles
                const initialPermissions: Record<number, Record<string, boolean>> = {};
                loadRolesData.data.forEach((role: RolesManagementProps) => {
                    if (role.role_id !== undefined) {
                        initialPermissions[role.role_id] = {
                            dashboard: false,
                            manage_role: false,
                            roles_management: false,
                            staff_management: false,
                            branch_management: false,
                            service_listing: false,
                            service_management: false,
                            sales_transactions: false,
                            ratings_reviews: false,
                            report_details: false,
                            all_booking: false,
                            schedule: false,
                            inprogress: false,
                            completed: false,
                            cancelled: false,
                        };
                    }
                });
                setPermissions(initialPermissions);

                // Fetch provider permissions for role id 12 (static providerId)
                const providerPermissions = await getProviderPermissions(
                    loginProviderID
                );
                // Map the provider permissions to the roles management permissions
                providerPermissions.forEach((permission: any) => {
                    if (initialPermissions[permission.role]) {
                        initialPermissions[permission.role] = {
                            dashboard: permission.dashboard,
                            manage_role: permission.manage_role,
                            roles_management: permission.roles_management,
                            staff_management: permission.staff_management,
                            branch_management: permission.branch_management,
                            service_listing: permission.service_listing,
                            service_management: permission.service_management,
                            sales_transactions: permission.sales_transactions,
                            ratings_reviews: permission.ratings_reviews,
                            report_details: permission.report_details,
                            all_booking: permission.all_booking,
                            schedule: permission.schedule,
                            inprogress: permission.inprogress,
                            completed: permission.completed,
                            cancelled: permission.cancelled,
                        };
                    }
                });
                setPermissions(initialPermissions);
            } catch (error: any) {
                setError(error.message || "Failed to fetch role list");
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    const handleCheckboxChange = (roleId: number, permission: string) => {
        if (!loginProviderID) {
            return; // Early return if loginProviderID is not available
        }
        setPermissions((prevPermissions) => {
            const updatedPermissions = {
                ...prevPermissions,
                [roleId]: {
                    ...prevPermissions[roleId],
                    [permission]: !prevPermissions[roleId][permission],
                },
            };

            // Make API call for adding permissions when a checkbox is clicked
            const rolePermissions = updatedPermissions[roleId];
            addPermissions(
                roleId,
                loginProviderID,
                rolePermissions.dashboard,
                rolePermissions.manage_role,
                rolePermissions.roles_management,
                rolePermissions.staff_management,
                rolePermissions.branch_management,
                rolePermissions.service_listing,
                rolePermissions.service_management,
                rolePermissions.sales_transactions,
                rolePermissions.ratings_reviews,
                rolePermissions.report_details,
                rolePermissions.all_booking,
                rolePermissions.schedule,
                rolePermissions.inprogress,
                rolePermissions.completed,
                rolePermissions.cancelled
            )
                .then((response) => {
                    console.log("Permissions updated:", response);
                    //salert("added:");
                })
                .catch((error) => {
                    console.error("Error updating permissions:", error);
                });

            return updatedPermissions;
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div>
                <h5 className="text-3xl font-semibold py-5">User Role Manager</h5>
            </div>

            <div>
                <table className="w-full">
                    <thead className="border-y-2 border-mindfulgrey">
                        <tr>
                            <th className="w-[80%] text-start px-2 py-3">Actions</th>
                            {roleListData.map((role) => (
                                <th key={role.role_id} className="w-[10%] px-2 py-3">
                                    {role.role_name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Dashboard Permissions */}
                        <tr>
                            <th className="bg-mindfulLightgrey text-start px-2 py-4">
                                DASHBOARD
                            </th>{" "}
                            {/* Align with other permission rows */}
                            {roleListData.map((role) => (
                                <td key={role.role_id} className="text-center px-2 py-2">
                                    <label className="cl-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={permissions[role.role_id!]?.dashboard || false}
                                            onChange={() =>
                                                handleCheckboxChange(role.role_id!, "dashboard")
                                            }
                                        />
                                        <span></span>
                                    </label>
                                </td>
                            ))}
                        </tr>

                        {/* Manage Role Permissions */}
                        <tr>
                            <th className="bg-mindfulLightgrey text-start px-2 py-4">
                                MANAGE ROLE
                            </th>{" "}
                            {/* Align with other permission rows */}
                            {roleListData.map((role) => (
                                <td key={role.role_id} className="text-center px-2 py-2">
                                    <label className="cl-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={permissions[role.role_id!]?.manage_role || false}
                                            onChange={() =>
                                                handleCheckboxChange(role.role_id!, "manage_role")
                                            }
                                        />
                                        <span></span>
                                    </label>
                                </td>
                            ))}
                        </tr>

                        {/* Other Permissions (Roles, Staff, Branch) */}


                        {["roles_management", "staff_management", "branch_management"].map(
                            (permissionKey) => (
                                <tr key={permissionKey}>
                                    <td className="px-2 py-2">
                                        {
                                            // Providing a label for each permission key
                                            permissionKey === "roles_management"
                                                ? "ROLES MANAGEMENT"
                                                : permissionKey === "staff_management"
                                                    ? "STAFF MANAGEMENT"
                                                    : permissionKey === "branch_management"
                                                        ? "BRANCH MANAGEMENT"
                                                        : ""
                                        }
                                    </td>
                                    {roleListData.map((role) => (
                                        <td key={role.role_id} className="text-center px-2 py-2">
                                            <label className="cl-checkbox">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        permissions[role.role_id!]?.[permissionKey] || false
                                                    }
                                                    onChange={() =>
                                                        handleCheckboxChange(role.role_id!, permissionKey)
                                                    }
                                                />
                                                <span></span>
                                            </label>
                                        </td>
                                    ))}
                                </tr>
                            )
                        )}

                        <tr>
                            <th className="bg-mindfulLightgrey text-start px-2 py-4">
                                SERVICE LISTING
                            </th>{" "}
                            {/* Align with other permission rows */}
                            {roleListData.map((role) => (
                                <td key={role.role_id} className="text-center px-2 py-2">
                                    <label className="cl-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={
                                                permissions[role.role_id!]?.service_listing || false
                                            }
                                            onChange={() =>
                                                handleCheckboxChange(role.role_id!, "service_listing")
                                            }
                                        />
                                        <span></span>
                                    </label>
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <th className="bg-mindfulLightgrey text-start px-2 py-4">
                                SERVICE MANAGEMENT
                            </th>{" "}
                            {/* Align with other permission rows */}
                            {roleListData.map((role) => (
                                <td key={role.role_id} className="text-center px-2 py-2">
                                    <label className="cl-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={
                                                permissions[role.role_id!]?.service_management || false
                                            }
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    role.role_id!,
                                                    "service_management"
                                                )
                                            }
                                        />
                                        <span></span>
                                    </label>
                                </td>
                            ))}
                        </tr>

                        {[
                            "all_booking",
                            "schedule",
                            "inprogress",
                            "completed",
                            "cancelled",
                        ].map((permissionKey) => (
                            <tr key={permissionKey}>
                                <td className="px-2 py-2">
                                    {
                                        // Providing a label for each permission key
                                        permissionKey === "all_booking"
                                            ? "ALL BOOKING"
                                            : permissionKey === "schedule"
                                                ? "SCHEDULE"
                                                : permissionKey === "inprogress"
                                                    ? "INPROGRESS"
                                                    : permissionKey === "completed"
                                                        ? "COMPLETED"
                                                        : permissionKey === "cancelled"
                                                            ? "CANCELLED"
                                                            : ""
                                    }
                                </td>
                                {roleListData.map((role) => (
                                    <td key={role.role_id} className="text-center px-2 py-2">
                                        <label className="cl-checkbox">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    permissions[role.role_id!]?.[permissionKey] || false
                                                }
                                                onChange={() =>
                                                    handleCheckboxChange(role.role_id!, permissionKey)
                                                }
                                            />
                                            <span></span>
                                        </label>
                                    </td>
                                ))}
                            </tr>
                        ))}

                        <tr>
                            <th className="bg-mindfulLightgrey text-start px-2 py-4">
                                SALES & TRANSACTIONS
                            </th>{" "}
                            {/* Align with other permission rows */}
                            {roleListData.map((role) => (
                                <td key={role.role_id} className="text-center px-2 py-2">
                                    <label className="cl-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={
                                                permissions[role.role_id!]?.sales_transactions || false
                                            }
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    role.role_id!,
                                                    "sales_transactions"
                                                )
                                            }
                                        />
                                        <span></span>
                                    </label>
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <th className="bg-mindfulLightgrey text-start px-2 py-4">
                                RATINGS & REVIEWS
                            </th>{" "}
                            {/* Align with other permission rows */}
                            {roleListData.map((role) => (
                                <td key={role.role_id} className="text-center px-2 py-2">
                                    <label className="cl-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={
                                                permissions[role.role_id!]?.ratings_reviews || false
                                            }
                                            onChange={() =>
                                                handleCheckboxChange(role.role_id!, "ratings_reviews")
                                            }
                                        />
                                        <span></span>
                                    </label>
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <th className="bg-mindfulLightgrey text-start px-2 py-4">
                                REPORTS
                            </th>{" "}
                            {/* Align with other permission rows */}
                            {roleListData.map((role) => (
                                <td key={role.role_id} className="text-center px-2 py-2">
                                    <label className="cl-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={
                                                permissions[role.role_id!]?.report_details || false
                                            }
                                            onChange={() =>
                                                handleCheckboxChange(role.role_id!, "report_details")
                                            }
                                        />
                                        <span></span>
                                    </label>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
