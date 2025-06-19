 /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
// import * as client from "../../Account/client";
// import { useNavigate, useParams } from "react-router-dom";
//
// export default function PeopleDetails() {
//     const { uid } = useParams();
//     const [user, setUser] = useState<any>({});
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [role, setRole] = useState("");
//     const navigate = useNavigate();
//
//     const fetchUser = async () => {
//         if (!uid) return; // ✅ Guard clause
//         const u = await client.findUserById(uid);
//         setUser(u);
//         setName(`${u.firstName ?? ""} ${u.lastName ?? ""}`);
//         setEmail(u.email ?? "");
//         setRole(u.role ?? "USER");
//     };
//
//     useEffect(() => {
//         fetchUser();
//     }, [uid]);
//
//     const saveUser = async () => {
//         const [firstName, ...lastNameParts] = name.trim().split(" ");
//         const lastName = lastNameParts.join(" ");
//         const updatedUser = {
//             ...user,
//             firstName,
//             lastName,
//             email,
//             role,
//         };
//         await client.updateUser(updatedUser); // ✅ Only one argument
//         navigate("/Kambaz/Account/Users");
//     };
//
//
//     const deleteUser = async () => {
//         if (!uid) return;
//         if (window.confirm("Are you sure you want to delete this user?")) {
//             await client.deleteUser(uid); // ✅ Assumes deleteUser takes (id)
//             navigate("/Kambaz/Account/Users");
//         }
//     };
//
//     return user && user._id ? (
//         <div id="wd-people-details" className="p-4 border mb-3">
//             <h4>People Details</h4>
//
//             <div className="mb-3">
//                 <label className="form-label">Name</label>
//                 <input
//                     className="form-control"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />
//             </div>
//
//             <div className="mb-3">
//                 <label className="form-label">Email</label>
//                 <input
//                     className="form-control"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//             </div>
//
//             <div className="mb-3">
//                 <label className="form-label">Role</label>
//                 <select
//                     className="form-select"
//                     value={role}
//                     onChange={(e) => setRole(e.target.value)}
//                 >
//                     <option value="USER">User</option>
//                     <option value="STUDENT">Student</option>
//                     <option value="FACULTY">Faculty</option>
//                     <option value="ADMIN">Admin</option>
//                 </select>
//             </div>
//
//             <div className="d-flex gap-2">
//                 <button className="btn btn-success" onClick={saveUser}>
//                     Save
//                 </button>
//                 <button className="btn btn-danger" onClick={deleteUser}>
//                     Delete
//                 </button>
//                 <button
//                     className="btn btn-secondary"
//                     onClick={() => navigate("/Kambaz/Account/Users")}
//                 >
//                     Cancel
//                 </button>
//             </div>
//         </div>
//     ) : null;
// }
//
//
//
//
//
//
//
// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { useEffect, useState } from "react";
// // import { FaUserCircle } from "react-icons/fa";
// // import { IoCloseSharp } from "react-icons/io5";
// // import { FaPencil } from "react-icons/fa6";
// // import { FaCheck } from "react-icons/fa";
// // import { useParams, useNavigate } from "react-router";
// // import { FormControl } from "react-bootstrap";
// // import * as client from "../../Account/client";
// //
// // export default function PeopleDetails() {
// //     const { uid } = useParams();
// //     const navigate = useNavigate();
// //     const [user, setUser] = useState<any>({});
// //     const [name, setName] = useState("");
// //     const [email, setEmail] = useState("");
// //     const [role, setRole] = useState("");
// //     const [editing, setEditing] = useState(false);
// //
// //     // const fetchUser = async () => {
// //     //     if (!uid) return;
// //     //     const user = await client.findUserById(uid);
// //     //     setUser(user);
// //     //     setName(`${user.firstName} ${user.lastName}`);
// //     //     setEmail(user.email || "");
// //     //     setRole(user.role || "");
// //     // };
// //
// //     const fetchUser = async () => {
// //         if (!uid) return;
// //         try {
// //             const user = await client.findUserById(uid);
// //             setUser(user);
// //             setName(`${user.firstName} ${user.lastName}`);
// //             setEmail(user.email || "");
// //             setRole(user.role || "");
// //         } catch (err: any) {
// //             console.error("Failed to fetch user", err);
// //             alert("Failed to fetch user: " + err?.response?.data?.message || err.message);
// //         }
// //     };
// //
// //     const deleteUser = async (uid: string) => {
// //         await client.deleteUser(uid);
// //         navigate(-1);
// //     };
// //
// //     const saveUser = async () => {
// //         const [firstName, ...lastNameParts] = name.trim().split(" ");
// //         const lastName = lastNameParts.join(" ");
// //
// //         const updatedUser = { ...user, firstName, lastName, email, role };
// //         await client.updateUser(updatedUser);
// //         setUser(updatedUser);
// //         setEditing(false);
// //         navigate(-1);
// //     };
// //
// //     useEffect(() => {
// //         if (uid) fetchUser();
// //     }, [uid]);
// //
// //     if (!uid) return null;
// //
// //     return (
// //         <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
// //             <button
// //                 onClick={() => navigate(-1)}
// //                 className="btn position-fixed end-0 top-0 wd-close-details"
// //             >
// //                 <IoCloseSharp className="fs-1" />
// //             </button>
// //
// //             <div className="text-center mt-2">
// //                 <FaUserCircle className="text-secondary me-2 fs-1" />
// //             </div>
// //             <hr />
// //
// //             <div className="text-danger fs-4">
// //                 {!editing && (
// //                     <FaPencil
// //                         onClick={() => setEditing(true)}
// //                         className="float-end fs-5 mt-2 wd-edit"
// //                     />
// //                 )}
// //                 {editing && (
// //                     <FaCheck
// //                         onClick={() => saveUser()}
// //                         className="float-end fs-5 mt-2 me-2 wd-save"
// //                     />
// //                 )}
// //
// //                 {!editing && (
// //                     <div
// //                         className="wd-name"
// //                         onClick={() => setEditing(true)}
// //                     >
// //                         {user.firstName} {user.lastName}
// //                     </div>
// //                 )}
// //                 {editing && (
// //                     <FormControl
// //                         className="w-100 mb-2 wd-edit-name"
// //                         type="text"
// //                         value={name}
// //                         onChange={(e) => setName(e.target.value)}
// //                         onKeyDown={(e) => {
// //                             if (e.key === "Enter") saveUser();
// //                         }}
// //                     />
// //                 )}
// //             </div>
// //
// //             <b>Role:</b>{" "}
// //             {!editing ? (
// //                 <span className="wd-roles">{user.role}</span>
// //             ) : (
// //                 <select
// //                     value={role}
// //                     onChange={(e) => setRole(e.target.value)}
// //                     className="form-select mb-2 wd-role-select"
// //                 >
// //                     <option value="STUDENT">Student</option>
// //                     <option value="TA">TA</option>
// //                     <option value="FACULTY">Faculty</option>
// //                     <option value="ADMIN">Admin</option>
// //                 </select>
// //             )}
// //
// //             <b>Login ID:</b>{" "}
// //             <span className="wd-login-id">{user.loginId}</span> <br />
// //
// //             <b>Email:</b>{" "}
// //             {!editing ? (
// //                 <span className="wd-email">{user.email}</span>
// //             ) : (
// //                 <FormControl
// //                     className="mb-2 wd-edit-email"
// //                     type="email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     placeholder="Enter email"
// //                 />
// //             )}
// //
// //             <b>Section:</b> <span className="wd-section">{user.section}</span> <br />
// //             <b>Total Activity:</b>{" "}
// //             <span className="wd-total-activity">{user.totalActivity}</span>
// //
// //             <hr />
// //             <button
// //                 onClick={() => deleteUser(uid)}
// //                 className="btn btn-danger float-end wd-delete"
// //             >
// //                 Delete
// //             </button>
// //             <button
// //                 onClick={() => navigate(-1)}
// //                 className="btn btn-secondary float-start float-end me-2 wd-cancel"
// //             >
// //                 Cancel
// //             </button>
// //         </div>
// //     );
// // }



import { useEffect, useState } from "react";
import { FaUserCircle, FaPencilAlt, FaCheck } from "react-icons/fa";
import { IoCloseSharp }                      from "react-icons/io5";
import { FormControl }                        from "react-bootstrap";

interface Props {
    uid: string;
    onClose: () => void;
    onDelete: (userId: string) => Promise<void>;
    onUpdate: (user: any) => Promise<any>;
}

export default function PeopleDetails({
                                          uid,
                                          onClose,
                                          onDelete,
                                          onUpdate,
                                      }: Props) {
    const [user, setUser]       = useState<any>(null);
    const [editing, setEditing] = useState(false);
    const [name, setName]       = useState("");
    const [email, setEmail]     = useState("");
    const [role, setRole]       = useState("");
    const [section, setSection] = useState("");

    useEffect(() => {
        import("../../Account/client").then(({ findUserById }) =>
            findUserById(uid).then((u) => {
                setUser(u);
                setName(`${u.firstName} ${u.lastName}`);
                setEmail(u.email || "");
                setRole(u.role || "");
                setSection(u.section || "");
            })
        );
    }, [uid]);

    if (!user) return null;

    const handleSave = async () => {
        const [firstName, lastName = ""] = name.split(" ");
        const updated = { ...user, firstName, lastName, email, role, section };
        const saved   = await onUpdate(updated);
        setUser(saved || updated);
        setEditing(false);
        onClose();
    };


    const handleDelete = async () => {
        await onDelete(uid);
        onClose();
    };

    return (
        <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
            <button onClick={onClose} className="btn position-fixed end-0 top-0">
                <IoCloseSharp className="fs-1" />
            </button>

            <div className="text-center mt-4">
                <FaUserCircle className="text-secondary fs-1" />
            </div>

            <div className="position-relative my-3">
                {!editing ? (
                    <>
                        <FaPencilAlt
                            className="position-absolute end-0 top-0 text-secondary fs-5"
                            onClick={() => setEditing(true)}
                            style={{ cursor: "pointer" }}
                        />
                        <div onClick={() => setEditing(true)} className="text-danger fs-4">
                            {user.firstName} {user.lastName}
                        </div>
                    </>
                ) : (
                    <>
                        <FaCheck
                            className="position-absolute end-0 top-0 text-success fs-5"
                            onClick={handleSave}
                            style={{ cursor: "pointer" }}
                        />
                        <FormControl
                            className="w-100 mb-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSave()}
                        />
                    </>
                )}
            </div>

            <hr />

            <div className="mb-3">
                <strong>Email:</strong>{" "}
                {!editing ? (
                    <span>{user.email}</span>
                ) : (
                    <FormControl
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                )}
            </div>

            <div className="mb-3">
                <strong>Role:</strong>{" "}
                {!editing ? (
                    <span>{user.role}</span>
                ) : (
                    <select
                        className="form-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="USER">User</option>
                        <option value="STUDENT">Student</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                )}
            </div>

            <div className="mb-3">
                <strong>Section:</strong>{" "}
                {!editing ? (
                    <span>{user.section}</span>
                ) : (
                    <FormControl
                        type="text"
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                    />
                )}
            </div>

            {!editing && (
                <div className="d-flex justify-content-between">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}
