// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { useState, useEffect } from "react";
// // import { useParams } from "react-router";
// // import PeopleTable from "../Courses/People/Table";
// // import * as client from "./client";
// // export default function Users() {
// //     const [users, setUsers] = useState<any[]>([]);
// //
// //     const { uid } = useParams();
// //     const fetchUsers = async () => {
// //         const users = await client.findAllUsers();
// //         setUsers(users);
// //     };
// //     useEffect(() => {
// //         fetchUsers();
// //     }, [uid]);
// //     return (
// //         <div>
// //             <h3>Users</h3>
// //             <PeopleTable users={users} />
// //         </div>
// //     );}
// //
//
// //
// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { useState, useEffect } from "react";
// // import { useParams } from "react-router";
// // import { FaPlus } from "react-icons/fa";
// // import PeopleTable from "../Courses/People/Table";
// // import FormControl from "react-bootstrap/FormControl";
// // import * as client from "./client";
// //
// // export default function Users() {
// //     const [users, setUsers] = useState<any[]>([]);
// //     const [role, setRole] = useState("");
// //     const [name, setName] = useState("");
// //     const { uid } = useParams();
// //
// //     const fetchUsers = async () => {
// //         const users = await client.findAllUsers();
// //         console.log("Fetched users:", users);
// //         setUsers(users);
// //     };
// //
// //     const filterUsersByRole = async (role: string) => {
// //         setRole(role);
// //         if (role) {
// //             const users = await client.findUsersByRole(role);
// //             setUsers(users);
// //         } else {
// //             fetchUsers();
// //         }
// //     };
// //
// //     const filterUsersByName = async (name: string) => {
// //         setName(name);
// //         if (name) {
// //             const users = await client.findUsersByPartialName(name);
// //             setUsers(users);
// //         } else {
// //             fetchUsers();
// //         }
// //     };
// //
// //     const createUser = async () => {
// //         const user = await client.createUser({
// //             firstName: "New",
// //             lastName: `User${users.length + 1}`,
// //             username: `newuser${Date.now()}`,
// //             password: "password123",
// //             email: `email${users.length + 1}@neu.edu`,
// //             section: "S101",
// //             role: "STUDENT",
// //         });
// //         setUsers([...users, user]);
// //     };
// //
// //     useEffect(() => {
// //         fetchUsers();
// //     }, [uid]);
// //
// //     return (
// //         <div>
// //             <h3>Users</h3>
// //             <button
// //                 onClick={createUser}
// //                 className="float-end btn btn-danger wd-add-people mb-3"
// //             >
// //                 <FaPlus className="me-2" />
// //                 Users
// //             </button>
// //             <div className="d-flex mb-3">
// //                 <FormControl
// //                     value={name}
// //                     onChange={(e) => filterUsersByName(e.target.value)}
// //                     placeholder="Search people"
// //                     className="float-start w-25 me-2 wd-filter-by-name"
// //                 />
// //                 <select
// //                     value={role}
// //                     onChange={(e) => filterUsersByRole(e.target.value)}
// //                     className="form-select float-start w-25 wd-select-role"
// //                 >
// //                     <option value="">All Roles</option>
// //                     <option value="STUDENT">Students</option>
// //                     <option value="TA">Assistants</option>
// //                     <option value="FACULTY">Faculty</option>
// //                     <option value="ADMIN">Administrators</option>
// //                 </select>
// //             </div>
// //             <div className="clearfix" />
// //             <PeopleTable users={users} />
// //         </div>
// //     );
// // }
//
//
//
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import { useParams } from "react-router";
// import { FaPlus } from "react-icons/fa";
// import PeopleTable from "../Courses/People/Table";
// import FormControl from "react-bootstrap/FormControl";
// import * as client from "./client";
// import { useDispatch } from "react-redux";
// import { setCurrentUser } from "../Account/reducer"; // ✅ adjust import as needed
//
// export default function Users() {
//     const [users, setUsers] = useState<any[]>([]);
//     const [role, setRole] = useState("");
//     const [name, setName] = useState("");
//     const { uid } = useParams();
//     const dispatch = useDispatch();
//
//     // ✅ Fetch and store current user into Redux
//     useEffect(() => {
//         const fetchCurrentUser = async () => {
//             try {
//                 const user = await client.profile(); // 👈 calls profile API
//                 dispatch(setCurrentUser(user)); // 👈 updates Redux store
//                 console.log("Fetched profile:", user);
//             } catch (e) {
//                 console.log("No user logged in", e);
//             }
//         };
//
//         fetchCurrentUser();
//     }, [dispatch]);
//
//     const fetchUsers = async () => {
//         const users = await client.findAllUsers();
//         console.log("Fetched users:", users);
//         setUsers(users);
//     };
//
//     const filterUsersByRole = async (role: string) => {
//         setRole(role);
//         if (role) {
//             const users = await client.findUsersByRole(role);
//             setUsers(users);
//         } else {
//             fetchUsers();
//         }
//     };
//
//     const filterUsersByName = async (name: string) => {
//         setName(name);
//         if (name) {
//             const users = await client.findUsersByPartialName(name);
//             setUsers(users);
//         } else {
//             fetchUsers();
//         }
//     };
//
//     const createUser = async () => {
//         const user = await client.createUser({
//             firstName: "New",
//             lastName: `User${users.length + 1}`,
//             username: `newuser${Date.now()}`,
//             password: "password123",
//             email: `email${users.length + 1}@neu.edu`,
//             section: "S101",
//             role: "STUDENT",
//         });
//         setUsers([...users, user]);
//     };
//
//     useEffect(() => {
//         fetchUsers();
//     }, [uid]);
//
//     return (
//         <div>
//             <h3>Users</h3>
//             <button
//                 onClick={createUser}
//                 className="float-end btn btn-danger wd-add-people mb-3"
//             >
//                 <FaPlus className="me-2" />
//                 Users
//             </button>
//             <div className="d-flex mb-3">
//                 <FormControl
//                     value={name}
//                     onChange={(e) => filterUsersByName(e.target.value)}
//                     placeholder="Search people"
//                     className="float-start w-25 me-2 wd-filter-by-name"
//                 />
//                 <select
//                     value={role}
//                     onChange={(e) => filterUsersByRole(e.target.value)}
//                     className="form-select float-start w-25 wd-select-role"
//                 >
//                     <option value="">All Roles</option>
//                     <option value="STUDENT">Students</option>
//                     <option value="TA">Assistants</option>
//                     <option value="FACULTY">Faculty</option>
//                     <option value="ADMIN">Administrators</option>
//                 </select>
//             </div>
//             <div className="clearfix" />
//             <PeopleTable users={users} />
//         </div>
//     );
// }



import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import PeopleTable, { type User } from "../Courses/People/Table";
import * as client from "./client";

export default function Users() {
    const [users, setUsers]           = useState<User[]>([]);
    const [roleFilter, setRoleFilter] = useState("");
    const [nameFilter, setNameFilter] = useState("");
    const [loading, setLoading]       = useState(false);

    const loadUsers = async () => {
        setLoading(true);
        try {
            let data: User[];
            if (nameFilter.trim()) {
                data = await client.findUsersByPartialName(nameFilter.trim());
            } else if (roleFilter) {
                data = await client.findUsersByRole(roleFilter);
            } else {
                data = await client.findAllUsers();
            }
            setUsers(data);
        } catch (e) {
            console.error("Failed to load users:", e);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, [roleFilter, nameFilter]);

    const handleCreateUser = async () => {
        setLoading(true);
        try {
            await client.createUser({
                firstName: "New",
                lastName:  `User${Date.now()}`,
                username:  `newuser${Date.now()}`,
                password:  "password123",
                email:     `email${Date.now()}@neu.edu`,
                section:   "S101",
                role:      "STUDENT",
            });
            await loadUsers();
            setNameFilter("");
            setRoleFilter("");
        } catch (e: any) {
            console.error("Error creating user:", e.response?.data || e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        await client.deleteUser(userId);
        setUsers((prev) => prev.filter((u) => u._id !== userId));
    };

    const handleUpdateUser = async (user: User): Promise<User> => {
        const saved = await client.updateUser(user);
        await loadUsers();
        return saved;
    };

    return (
        <div className="p-4 position-relative">
            <h3>Users</h3>

            <Button
                onClick={handleCreateUser}
                className="btn-danger mb-3 float-end wd-add-people"
                disabled={loading}
            >
                <FaPlus className="me-2" /> New User
            </Button>

            <Row className="mb-3">
                <Col md={5}>
                    <InputGroup>
                        <Form.Control
                            placeholder="Search by name..."
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                        />
                        <Button onClick={loadUsers} disabled={loading}>
                            Search
                        </Button>
                    </InputGroup>
                </Col>
                <Col md={3}>
                    <Form.Select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        disabled={loading}
                    >
                        <option value="">All Roles</option>
                        <option value="ADMIN">Administrators</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="TA">Assistants</option>
                        <option value="STUDENT">Students</option>
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Button
                        variant="link"
                        onClick={() => {
                            setNameFilter("");
                            setRoleFilter("");
                        }}
                        disabled={loading}
                    >
                        Reset
                    </Button>
                </Col>
            </Row>

            {loading ? (
                <div>Loading users…</div>
            ) : (
                <PeopleTable
                    users={users}
                    onDelete={handleDeleteUser}
                    onUpdate={handleUpdateUser}
                />
            )}
        </div>
    );
}
