import { roleList } from "@/api/apiConfig";
import { useEffect, useState } from "react";

interface RolesManagementProps {
    role_id?: number;
    role_name: string;
    status: boolean;
}

export const RolesManagement = () => {

    const [roleListData, setRoleListData] = useState<RolesManagementProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoles = async () => {
            setLoading(true);
            setError(null);

            try {
                const loadRolesData = await roleList();

                setRoleListData(loadRolesData.data);
                console.log("Role list data log:", loadRolesData);

            } catch (error: any) {
                setError(error.message || 'Failed to fetch role list');
            } finally {
                setLoading(false); // Ensure loading is false after fetching
            }
        }

        fetchRoles();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div className="">
            <div>
                <h5 className="text-3xl font-semibold py-5">User Role Manager</h5>
            </div>

            <div>
                <table className="w-full">
                    <thead className="border-y-2 border-mindfulgrey">
                        <tr className="">
                            <th className="w-[80%] text-start px-2 py-3">Actions</th>
                            <th className="w-[10%] px-2 py-3">Manager</th>
                            <th className="w-[10%] px-2 py-3">Admin</th>
                            {/* <th className="w-[20%] px-2 py-3">Member</th> */}
                        </tr>
                    </thead>

                    <tbody>
                        {/* Heading */}
                        <tr>
                            <th colSpan={4} className="bg-mindfulLightgrey text-start px-2 py-4">Heading 1</th>
                        </tr>

                        {/* Content & Checkbox */}
                        {roleListData.length > 0 ? (
                            roleListData.map((role) => (
                                <tr key={role.role_id}>

                                    <td className="px-2 py-2">{role.role_name}</td>

                                    <td className="text-center px-2 py-2">
                                        <label className="cl-checkbox">
                                            <input type="checkbox" checked={role.status} readOnly />
                                            <span></span>
                                        </label>
                                    </td>

                                    <td className="text-center px-2 py-2">
                                        <label className="cl-checkbox">
                                            <input type="checkbox" checked={role.status} readOnly />
                                            <span></span>
                                        </label>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center py-5">
                                    No roles data available.
                                </td>
                            </tr>
                        )}


                        {/* Content & Checkbox */}
                        {/* <tr>
                            <td className="px-2 py-2">Content</td>
                            <td className="text-center px-2 py-2">
                                <label className="cl-checkbox">
                                    <input type="checkbox" />
                                    <span></span>
                                </label>
                            </td>

                            <td className="text-center px-2 py-2">
                                <label className="cl-checkbox">
                                    <input type="checkbox" />
                                    <span></span>
                                </label>
                            </td>

                            <td className="text-center px-2 py-2">
                                <label className="cl-checkbox">
                                    <input type="checkbox" />
                                    <span></span>
                                </label>
                            </td>

                        </tr> */}

                    </tbody>
                </table>
            </div>
        </div>
    )
}
