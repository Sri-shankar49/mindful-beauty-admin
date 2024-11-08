
export const RolesManagement = () => {
    return (
        <div className="">
            <div>
                <h5 className="text-3xl font-semibold py-5">User Role Manager</h5>
            </div>

            <div>
                <table className="w-full">
                    <thead className="border-y-2 border-mindfulgrey">
                        <tr className="">
                            <th className="w-[40%] text-start px-2 py-3">Actions</th>
                            <th className="w-[20%] px-2 py-3">Admin</th>
                            <th className="w-[20%] px-2 py-3">Member</th>
                            <th className="w-[20%] px-2 py-3">Manager</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Heading */}
                        <tr>
                            <th colSpan={4} className="bg-mindfulLightgrey text-start px-2 py-4">Heading 1</th>
                        </tr>

                        {/* Content & Checkbox */}
                        <tr>
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

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
