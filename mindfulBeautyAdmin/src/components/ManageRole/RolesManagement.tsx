import { useEffect, useState } from "react";
import { roleList, addPermissions, getProviderPermissions } from "@/api/apiConfig";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ShimmerTable } from "shimmer-effects-react";

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
    const [permissions, setPermissions] = useState<Record<number, Record<string, boolean>>>({});

    const loginProviderID = useSelector((state: RootState) => state.login.loginProviderID);

    console.log("loginProviderID roles management", loginProviderID);

    useEffect(() => {
        const fetchRoles = async () => {
            setLoading(true);
            setError(null);

            if (!loginProviderID) {
                return; // Early return if loginProviderID is not available
            }

            try {
                // Fetch role list data
                const loadRolesData = await roleList();
                setRoleListData(loadRolesData.data);
                console.log("Role list data log all data ===>", loadRolesData);

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

                console.log("Initial Permissions:", initialPermissions);

                // Fetch provider permissions
                const providerPermissions = await getProviderPermissions(loginProviderID);
                console.log("Provider Permissions ===>", providerPermissions);

                // Merge provider permissions into role-based permissions
                providerPermissions.forEach((permission: any) => {
                    if (!initialPermissions[permission.role]) {
                        initialPermissions[permission.role] = {};
                    }

                    Object.keys(permission).forEach((key) => {
                        if (key !== "permission_id" && key !== "role" && key !== "provider") {
                            initialPermissions[permission.role][key] =
                                initialPermissions[permission.role][key] || permission[key];
                        }
                    });
                });

                // Update the state with merged permissions
                setPermissions(initialPermissions);
                console.log("Final Permissions after merging:", initialPermissions);
            } catch (error: any) {
                setError(error.message || "Failed to fetch role list");
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);


    const handleCheckboxChange = (roleId: number, permission: string, roleName: string) => {
        // Don't allow changes if the role is Admin
        if (roleName === "Admin") {
            return;
        }

        if (!loginProviderID) {
            return;
        }
        console.log("roleId, permission, roleName ===>", roleId, permission, roleName);
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
            // console.log("roleid permissions ===>", 
            //     roleId,
            // );
            // console.log("loginProviderID ===>", loginProviderID);
            // console.log("rolePermissions dashboard ===>", rolePermissions.dashboard);
            // console.log("rolePermissions manage_role ===>", rolePermissions.manage_role);
            // console.log("rolePermissions roles_management ===>", rolePermissions.roles_management);
            // console.log("rolePermissions staff_management ===>", rolePermissions.staff_management);
            // console.log("rolePermissions branch_management ===>", rolePermissions.branch_management);
            // console.log("rolePermissions service_listing ===>", rolePermissions.service_listing);
            // console.log("rolePermissions service_management ===>", rolePermissions.service_management);
            // console.log("rolePermissions all_booking ===>", rolePermissions.all_booking);
            // console.log("rolePermissions schedule ===>", rolePermissions.schedule);
            // console.log("rolePermissions inprogress ===>", rolePermissions.inprogress);
            // console.log("rolePermissions completed ===>", rolePermissions.completed);
            // console.log("rolePermissions cancelled ===>", rolePermissions.cancelled);
            // console.log("rolePermissions sales_transactions ===>", rolePermissions.sales_transactions);
            // console.log("rolePermissions ratings_reviews ===>", rolePermissions.ratings_reviews);
            // console.log("rolePermissions report_details ===>", rolePermissions.report_details);

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
                rolePermissions.all_booking,
                rolePermissions.schedule,
                rolePermissions.inprogress,
                rolePermissions.completed,
                rolePermissions.cancelled,
                rolePermissions.sales_transactions,
                rolePermissions.ratings_reviews,
                rolePermissions.report_details,
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
                                    <label className={`cl-checkbox ${role.role_name === "Admin" ? "cursor-not-allowed" : ""}`}>
                                        <input
                                            type="checkbox"
                                            checked={permissions[role.role_id!]?.dashboard || false}
                                            onChange={() =>
                                                handleCheckboxChange(role.role_id!, "dashboard", role.role_name)
                                            }
                                            disabled={role.role_name === "Admin"}
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
                                    <label className={`cl-checkbox ${role.role_name === "Admin" ? "cursor-not-allowed" : ""}`}>
                                        <input
                                            type="checkbox"
                                            checked={permissions[role.role_id!]?.manage_role || false}
                                            onChange={() =>
                                                handleCheckboxChange(role.role_id!, "manage_role", role.role_name)
                                            }
                                            disabled={role.role_name === "Admin"}
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
                                            <label className={`cl-checkbox ${role.role_name === "Admin" ? "cursor-not-allowed" : ""}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        permissions[role.role_id!]?.[permissionKey] || false
                                                    }
                                                    onChange={() =>
                                                        handleCheckboxChange(role.role_id!, permissionKey, role.role_name)
                                                    }
                                                    disabled={role.role_name === "Admin"}
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
                                    <label className={`cl-checkbox ${role.role_name === "Admin" ? "cursor-not-allowed" : ""}`}>
                                        <input
                                            type="checkbox"
                                            checked={
                                                permissions[role.role_id!]?.service_listing || false
                                            }
                                            onChange={() =>
                                                handleCheckboxChange(role.role_id!, "service_listing", role.role_name)
                                            }
                                            disabled={role.role_name === "Admin"}
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
                                    <label className={`cl-checkbox ${role.role_name === "Admin" ? "cursor-not-allowed" : ""}`}>
                                        <input
                                            type="checkbox"
                                            checked={
                                                permissions[role.role_id!]?.service_management || false
                                            }
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    role.role_id!,
                                                    "service_management",
                                                    role.role_name
                                                )
                                            }
                                            disabled={role.role_name === "Admin"}
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
                                        <label className={`cl-checkbox ${role.role_name === "Admin" ? "cursor-not-allowed" : ""}`}>
                                            <input
                                                type="checkbox"
                                                checked={
                                                    permissions[role.role_id!]?.[permissionKey] || false
                                                }
                                                onChange={() =>
                                                    handleCheckboxChange(role.role_id!, permissionKey, role.role_name)
                                                }
                                                disabled={role.role_name === "Admin"}
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
                                    <label className={`cl-checkbox ${role.role_name === "Admin" ? "cursor-not-allowed" : ""}`}>
                                        <input
                                            type="checkbox"
                                            checked={
                                                permissions[role.role_id!]?.sales_transactions || false
                                            }
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    role.role_id!,
                                                    "sales_transactions",
                                                    role.role_name
                                                )
                                            }
                                            disabled={role.role_name === "Admin"}
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
                                    <label className={`cl-checkbox ${role.role_name === "Admin" ? "cursor-not-allowed" : ""}`}>
                                        <input
                                            type="checkbox"
                                            checked={
                                                permissions[role.role_id!]?.ratings_reviews || false
                                            }
                                            onChange={() =>
                                                handleCheckboxChange(role.role_id!, "ratings_reviews", role.role_name)
                                            }
                                            disabled={role.role_name === "Admin"}
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
                                    <label className={`cl-checkbox ${role.role_name === "Admin" ? "cursor-not-allowed" : ""}`}>
                                        <input
                                            type="checkbox"
                                            checked={
                                                permissions[role.role_id!]?.report_details || false
                                            }
                                            onChange={() =>
                                                handleCheckboxChange(role.role_id!, "report_details", role.role_name)
                                            }
                                            disabled={role.role_name === "Admin"}
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
