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
    const [permissions, setPermissions] = useState<Record<number, Record<string, boolean>>>({});
    const loginProviderID = useSelector((state: RootState) => state.login.loginProviderID);

    useEffect(() => {
        const fetchRoles = async () => {
            setLoading(true);
            setError(null);

            if (!loginProviderID) {
                setLoading(false);
                return;
            }

            try {
                const loadRolesData = await roleList();
                setRoleListData(loadRolesData.data);
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

                const providerPermissions = await getProviderPermissions(loginProviderID);
                providerPermissions.forEach((permission: any) => {
                    const roleId = permission.role;
                    if (initialPermissions[roleId]) {
                        Object.keys(permission).forEach((key) => {
                            if (key !== "permission_id" && key !== "role" && key !== "provider") {
                                initialPermissions[roleId][key] = permission[key];
                            }
                        });
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
    }, [loginProviderID]); // Added loginProviderID as dependency

    const handleCheckboxChange = async (roleId: number, permission: string, roleName: string) => {
        if (roleName === "Admin" || !loginProviderID) return;

        setPermissions(prev => {
            const updated = {
                ...prev,
                [roleId]: {
                    ...prev[roleId],
                    [permission]: !prev[roleId][permission]
                }
            };
            return updated;
        });

        try {
            const rolePermissions = permissions[roleId];
            await addPermissions(
                roleId,
                loginProviderID,
                {
                    dashboard: rolePermissions.dashboard,
                    manage_role: rolePermissions.manage_role,
                    roles_management: rolePermissions.roles_management,
                    staff_management: rolePermissions.staff_management,
                    branch_management: rolePermissions.branch_management,
                    service_listing: rolePermissions.service_listing,
                    service_management: rolePermissions.service_management,
                    sales_transactions: rolePermissions.sales_transactions,
                    ratings_reviews: rolePermissions.ratings_reviews,
                    report_details: rolePermissions.report_details,
                    all_booking: rolePermissions.all_booking,
                    schedule: rolePermissions.schedule,
                    inprogress: rolePermissions.inprogress,
                    completed: rolePermissions.completed,
                    cancelled: rolePermissions.cancelled,
                    [permission]: !rolePermissions[permission]
                }
            );
        } catch (error) {
            console.error("Error updating permissions:", error);
            // Revert state on error
            setPermissions(prev => ({
                ...prev,
                [roleId]: {
                    ...prev[roleId],
                    [permission]: prev[roleId][permission]
                }
            }));
        }
    };

    // if (loading) return (
    //     <div>
    //         <ShimmerTable
    //             mode="light"
    //             row={2}
    //             col={4}
    //             border={1}
    //             borderColor={"#cbd5e1"}
    //             rounded={0.25}
    //             rowGap={16}
    //             colPadding={[15, 5, 15, 5]}
    //         />
    //     </div>
    // );
    // if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h5 className="text-3xl font-semibold py-5">User Role Manager</h5>
            <div className="max-xl:overflow-x-scroll">
            <table className="w-full ">
                <thead className="border-y-2 border-mindfulgrey">
                    <tr>
                        <th className="w-[80%] text-start px-2 py-3">Actions</th>

                        {/* {roleListData.map((role) => (
                            <th key={role.role_id} className="w-[10%] px-2 py-3">
                                {role.role_name}
                            </th>
                        ))} */}

                        {loading ? (
                            <th colSpan={roleListData.length} className="text-center px-2 py-3">
                                Loading...
                            </th>
                        ) : error ? (
                            <th colSpan={roleListData.length} className="text-center px-2 py-3 text-red-600">
                                Error: {error}
                            </th>
                        ) : (
                            roleListData.map((role) => (
                                <th key={role.role_id} className="w-[10%] px-2 py-3">
                                    {role.role_name}
                                </th>
                            ))
                        )}
                    </tr>
                </thead>

                <tbody>
                    {/* Render permission rows here, similar to original code */}
                    {/* Example for Dashboard Permission */}

                    {loading ? (
                        <tr>
                            <td colSpan={roleListData.length + 1} className="text-center px-2 py-4">
                                <ShimmerTable
                                    mode="light"
                                    row={5} // Adjust rows based on expected data
                                    col={roleListData.length + 1}
                                    border={1}
                                    borderColor={"#cbd5e1"}
                                    rounded={0.25}
                                    rowGap={16}
                                    colPadding={[15, 5, 15, 5]}
                                />
                            </td>
                        </tr>
                    ) : error ? (
                        // Error State
                        <tr>
                            <td colSpan={roleListData.length + 1} className="text-red-600 text-center px-2 py-4">
                                Error: {error}
                            </td>
                        </tr>
                    ) : (
                        // Render permissions data here, similar to original code
                        <>
                            <tr>
                                <th className="bg-mindfulLightgrey text-start px-2 py-4">DASHBOARD</th>

                                {roleListData.map((role) => (
                                    <td key={role.role_id} className="text-center px-2 py-2">
                                        <label className={`cl-checkbox ${role.role_name === "Admin" ? "cursor-not-allowed" : ""}`}>
                                            <input
                                                type="checkbox"
                                                checked={permissions[role.role_id!]?.dashboard || false}
                                                onChange={() => handleCheckboxChange(role.role_id!, "dashboard", role.role_name)}
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
                            {/* <tr>
                            <th className="bg-mindfulLightgrey text-start px-2 py-4">
                                REPORTS
                            </th>{" "} */}
                            {/* Align with other permission rows */}
                            {/* {roleListData.map((role) => (
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
                            ))} */}
                            {/* </tr> */}


                        </>
                    )}


                </tbody>
            </table>
            </div>
        </div>
    );
}