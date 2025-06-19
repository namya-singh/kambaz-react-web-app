// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Table } from "react-bootstrap";
// import { FaUserCircle } from "react-icons/fa";
// import { Link, useParams } from "react-router-dom";
//
// export default function PeopleTable({ users = [] }: { users?: any[] }) {
//     const { uid } = useParams();
//
//     return (
//         <div id="wd-people-table" className="p-3">
//             {uid && (
//                 <div className="mb-3">
//                     <h5>User Details for: {uid}</h5>
//                     {/* You can replace this with a full <PeopleDetails /> component if needed */}
//                 </div>
//             )}
//
//             <Table striped bordered hover>
//                 <thead>
//                 <tr>
//                     <th>Name</th>
//                     <th>Login ID</th>
//                     <th>Section</th>
//                     <th>Role</th>
//                     <th>Last Activity</th>
//                     <th>Total Activity</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {users.length === 0 && (
//                     <tr>
//                         <td colSpan={6} className="text-center">
//                             No users found.
//                         </td>
//                     </tr>
//                 )}
//                 {users.map((user) => (
//                     <tr key={user._id}>
//                         <td>
//                             <FaUserCircle className="me-2" />
//                             <Link to={`/users/${user._id}`}>
//                                 {user.firstName} {user.lastName}
//                             </Link>
//                         </td>
//                         <td>{user.email ?? user.username}</td>
//                         <td>{user.section ?? "—"}</td>
//                         <td>{user.role ?? "—"}</td>
//                         <td>{user.lastActivity ?? "—"}</td>
//                         <td>{user.totalActivity ?? "—"}</td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </Table>
//         </div>
//     );
// }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// // // import { Table } from "react-bootstrap";
// // // import { FaUserCircle } from "react-icons/fa";
// // // import { useParams } from "react-router-dom";
// // // import * as db from "../../Database";
// // //
// // // export default function PeopleTable() {
// // //     const { cid } = useParams<{ cid: string }>();
// // //     const { users, enrollments } = db;
// // //
// // //     // Only keep users enrolled in this course
// // //     const roster = users.filter((usr) =>
// // //         enrollments.some((enr) => enr.user === usr._id && enr.course === cid)
// // //     );
// // //
// // //     return (
// // //         <div id="wd-people-table" className="p-3">
// // //             <Table striped hover>
// // //                 <thead>
// // //                 <tr>
// // //                     <th>Name</th>
// // //                     <th>Login ID</th>
// // //                     <th>Section</th>
// // //                     <th>Role</th>
// // //                     <th>Last Activity</th>
// // //                     <th>Total Activity</th>
// // //                 </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                 {roster.map((user, idx) => (
// // //                     <tr
// // //                         key={user._id}
// // //                         className={idx % 2 === 0 ? "table-light" : ""}
// // //                     >
// // //                         <td className="wd-full-name text-nowrap">
// // //                             <FaUserCircle className="me-2 fs-1 text-secondary" />
// // //                             <span className="wd-first-name">{user.firstName}</span>{" "}
// // //                             <span className="wd-last-name">{user.lastName}</span>
// // //                         </td>
// // //                         <td className="wd-login-id">{user.loginId}</td>
// // //                         <td className="wd-section">{user.section}</td>
// // //                         <td className="wd-role">{user.role}</td>
// // //                         <td className="wd-last-activity">{user.lastActivity}</td>
// // //                         <td className="wd-total-activity">{user.totalActivity}</td>
// // //                     </tr>
// // //                 ))}
// // //                 </tbody>
// // //             </Table>
// // //         </div>
// // //     );
// // // }
// //
// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // import { Table } from "react-bootstrap";
// // // import PeopleDetails from "./Details";
// // // import { FaUserCircle } from "react-icons/fa";
// // // import {Link} from "react-router-dom";
// // //
// // // export default function PeopleTable({ users = [] }: { users?: any[] }) {
// // //     return (
// // //         <div id="wd-people-table" className="p-3">
// // //             <PeopleDetails />
// // //
// // //             <Table striped hover>
// // //                 <thead>
// // //                 <tr>
// // //                     <th>Name</th>
// // //                     <th>Login ID</th>
// // //                     <th>Section</th>
// // //                     <th>Role</th>
// // //                     <th>Last Activity</th>
// // //                     <th>Total Activity</th>
// // //                 </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                 {users.map((user, idx) => (
// // //                     <tr key={user._id} className={idx % 2 === 0 ? "table-light" : ""}>
// // //                         <td className="wd-full-name text-nowrap">
// // //                             <Link to={`/Kambaz/Account/Users/${user._id}`} className="text-decoration-none">
// // //
// // //                             <FaUserCircle className="me-2 fs-1 text-secondary" />
// // //                             <span className="wd-first-name">{user.firstName}</span>{" "}
// // //                             <span className="wd-last-name">{user.lastName}</span>
// // //                             </Link>
// // //
// // //
// // //                         </td>
// // //                         <td className="wd-login-id">{user.loginId}</td>
// // //                         <td className="wd-section">{user.section}</td>
// // //                         <td className="wd-role">{user.role}</td>
// // //                         <td className="wd-last-activity">{user.lastActivity}</td>
// // //                         <td className="wd-total-activity">{user.totalActivity}</td>
// // //                     </tr>
// // //                 ))}
// // //                 </tbody>
// // //             </Table>
// // //         </div>
// // //     );
// // // }
// //
// //
// //
// // import { Table } from "react-bootstrap";
// // import PeopleDetails from "./Details";
// // import { FaUserCircle } from "react-icons/fa";
// // import { Link, useParams } from "react-router-dom";
// //
// // export default function PeopleTable({ users = [] }: { users?: any[] }) {
// //     const { uid } = useParams();
// //
// //     return (
// //         <div id="wd-people-table" className="p-3">
// //             {uid && <PeopleDetails />}
// //
// //             <Table striped hover>
// //                 <thead>
// //                 <tr>
// //                     <th>Name</th>
// //                     <th>Login ID</th>
// //                     <th>Section</th>
// //                     <th>Role</th>
// //                     <th>Last Activity</th>
// //                     <th>Total Activity</th>
// //                 </tr>
// //                 </thead>
// //                 <tbody>
// //                 {users.map((user, idx) => (
// //                     <tr key={user._id} className={idx % 2 === 0 ? "table-light" : ""}>
// //                         <td className="wd-full-name text-nowrap">
// //                             <Link to={`/Kambaz/Account/Users/${user._id}`} className="text-decoration-none">
// //                                 <FaUserCircle className="me-2 fs-1 text-secondary" />
// //                                 <span className="wd-first-name">{user.firstName}</span>{" "}
// //                                 <span className="wd-last-name">{user.lastName}</span>
// //                             </Link>
// //                         </td>
// //                         <td className="wd-login-id">{user.loginId}</td>
// //                         <td className="wd-section">{user.section}</td>
// //                         <td className="wd-role">{user.role}</td>
// //                         <td className="wd-last-activity">{user.lastActivity}</td>
// //                         <td className="wd-total-activity">{user.totalActivity}</td>
// //                     </tr>
// //                 ))}
// //                 </tbody>
// //             </Table>
// //         </div>
// //     );
// // }



import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "./Details";

export interface User {
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    loginId?: string;
    section?: string;
    role?: string;
    lastActivity?: string;
    totalActivity?: string;
}

interface PeopleTableProps {
    users?: User[];
    onDelete?: (userId: string) => Promise<void>;
    onUpdate?: (updated: User) => Promise<User>;
}

export default function PeopleTable({
                                        users = [],
                                        onDelete,
                                        onUpdate,
                                    }: PeopleTableProps) {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    return (
        <div id="wd-people-table" className="position-relative">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Login ID</th>
                    <th>Section</th>
                    <th>Role</th>
                    <th>Last Activity</th>
                    <th>Total Activity</th>
                </tr>
                </thead>
                <tbody>
                {users.map((u, idx) => (
                    <tr key={u._id} className={idx % 2 === 0 ? "table-light" : ""}>
                        <td className="text-nowrap">
                            <a
                                href="#"
                                className="text-danger text-decoration-none"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedUserId(u._id);
                                }}
                            >
                                <FaUserCircle className="me-2 fs-1 text-secondary" />
                                {u.firstName || ""} {u.lastName || ""}
                            </a>
                        </td>
                        <td>{u.email || ""}</td>
                        <td>{u.loginId || ""}</td>
                        <td>{u.section || ""}</td>
                        <td>{u.role || ""}</td>
                        <td>{u.lastActivity || ""}</td>
                        <td>{u.totalActivity || ""}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedUserId && (
                <PeopleDetails
                    uid={selectedUserId}
                    onClose={() => setSelectedUserId(null)}
                    onDelete={() =>
                        onDelete ? onDelete(selectedUserId) : Promise.resolve()
                    }
                    onUpdate={(u) => (onUpdate ? onUpdate(u) : Promise.resolve(u))}
                />
            )}
        </div>
    );
}
