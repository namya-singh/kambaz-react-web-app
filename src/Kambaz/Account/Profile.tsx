/* eslint-disable @typescript-eslint/no-explicit-any */
import * as client from "./client";

import { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import type { User } from "./reducer";
import type { RootState } from "../store";

export default function Profile() {
    const [profile, setProfile] = useState<User | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(
        (state: RootState) => state.accountReducer.currentUser
    );

    const fetchProfile = () => {
        if (!currentUser) {
            navigate("/Kambaz/Account/Signin", { replace: true });
            return;
        }
        setProfile(currentUser);
    };
    const updateProfile = async () => {
        if (!profile) return;
        try {
            const updated = await client.updateUser(profile);
            dispatch(setCurrentUser(updated));
            alert("Profile updated successfully");
        } catch (e: any) {
            console.error("Update failed", e);
            alert(
                e.response?.data?.message || "Failed to update profile—please try again"
            );
        }
    };

    const signout = async() => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/Kambaz/Account/Signin", { replace: true });
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (!profile) {
        return null;
    }

    return (
        <div className="wd-profile-screen p-4">
            <h3>Profile</h3>
            <hr />

            <Form>
                <Form.Group as={Row} className="mb-3" controlId="wd-username">
                    <Form.Label column sm={2} style={{ fontWeight: 600 }}>
                        Username
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            defaultValue={profile.username}
                            onChange={(e) =>
                                setProfile({ ...profile, username: e.target.value })
                            }
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="wd-password">
                    <Form.Label column sm={2} style={{ fontWeight: 600 }}>
                        Password
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="password"
                            defaultValue={profile.password}
                            onChange={(e) =>
                                setProfile({ ...profile, password: e.target.value })
                            }
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="wd-firstname">
                    <Form.Label column sm={2} style={{ fontWeight: 600 }}>
                        First Name
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            defaultValue={profile.firstName}
                            onChange={(e) =>
                                setProfile({ ...profile, firstName: e.target.value })
                            }
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="wd-lastname">
                    <Form.Label column sm={2} style={{ fontWeight: 600 }}>
                        Last Name
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            defaultValue={profile.lastName}
                            onChange={(e) =>
                                setProfile({ ...profile, lastName: e.target.value })
                            }
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="wd-dob">
                    <Form.Label column sm={2} style={{ fontWeight: 600 }}>
                        Date of Birth
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="date"
                            defaultValue={profile.dob}
                            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="wd-email">
                    <Form.Label column sm={2} style={{ fontWeight: 600 }}>
                        Email
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="email"
                            defaultValue={profile.email}
                            onChange={(e) =>
                                setProfile({ ...profile, email: e.target.value })
                            }
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4" controlId="wd-role">
                    <Form.Label column sm={2} style={{ fontWeight: 600 }}>
                        Role
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Select
                            defaultValue={profile.role}
                            onChange={(e) =>
                                setProfile({ ...profile, role: e.target.value as any })
                            }
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="FACULTY">Faculty</option>
                            <option value="STUDENT">Student</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button
                            variant="primary"
                            size="lg"
                            className="w-100 mb-2"
                            onClick={updateProfile}
                            id="wd-update-btn"
                        >
                            Update
                        </Button>
                        <Button
                            variant="danger"
                            size="lg"
                            className="w-100"
                            onClick={signout}
                            id="wd-signout-btn"
                        >
                            Sign out
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
}












//
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { setCurrentUser } from "./reducer";
// import * as client from "./client";
//
// export default function Profile() {
//     // Local profile state to edit form fields
//     const [profile, setProfile] = useState<any>({});
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//
//     // Get currentUser from Redux store
//     const { currentUser } = useSelector((state: any) => state.accountReducer);
//
//     // When currentUser changes, update local form state or redirect if not logged in
//     useEffect(() => {
//         if (!currentUser) {
//             navigate("/Kambaz/Account/Signin");
//         } else {
//             setProfile(currentUser);
//         }
//     }, [currentUser, navigate]);
//
//     // Update user profile API call
//     const updateProfile = async () => {
//         try {
//             const updatedProfile = await client.updateUser(profile);
//             dispatch(setCurrentUser(updatedProfile));
//             alert("Profile updated successfully!");
//         } catch (err) {
//             alert("Failed to update profile.");
//             console.error(err);
//         }
//     };
//
//     // Signout API call + Redux state clear + redirect to signin
//     const signout = async () => {
//         try {
//             await client.signout();
//             dispatch(setCurrentUser(null));
//             navigate("/Kambaz/Account/Signin");
//         } catch (err) {
//             alert("Failed to sign out.");
//             console.error(err);
//         }
//     };
//
//     return (
//         <Container fluid className="vh-100 g-0">
//             <Row className="h-100 g-0">
//                 <Col xs={12} md={8} className="d-flex align-items-start justify-content-center mx-auto">
//                     <div style={{ width: "100%", maxWidth: 600, padding: "2rem" }}>
//                         <h1 className="mb-5">Profile</h1>
//                         <Form>
//                             <Form.Group className="mb-3 d-flex align-items-center" controlId="username">
//                                 <Form.Label style={{ width: 120, minWidth: 120 }}>Username</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     value={profile.username || ""}
//                                     onChange={(e) => setProfile({ ...profile, username: e.target.value })}
//                                 />
//                             </Form.Group>
//
//                             <Form.Group className="mb-3 d-flex align-items-center" controlId="id">
//                                 <Form.Label style={{ width: 120, minWidth: 120 }}>ID</Form.Label>
//                                 <Form.Control type="text" value={profile._id || ""} readOnly />
//                             </Form.Group>
//
//                             <Form.Group className="mb-3 d-flex align-items-center" controlId="firstName">
//                                 <Form.Label style={{ width: 120, minWidth: 120 }}>First Name</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     value={profile.firstName || ""}
//                                     onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
//                                 />
//                             </Form.Group>
//
//                             <Form.Group className="mb-3 d-flex align-items-center" controlId="lastName">
//                                 <Form.Label style={{ width: 120, minWidth: 120 }}>Last Name</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     value={profile.lastName || ""}
//                                     onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
//                                 />
//                             </Form.Group>
//
//                             <Form.Group className="mb-3 d-flex align-items-center" controlId="dob">
//                                 <Form.Label style={{ width: 120, minWidth: 120 }}>Date of Birth</Form.Label>
//                                 <Form.Control
//                                     type="date"
//                                     value={profile.dob || ""}
//                                     onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
//                                 />
//                             </Form.Group>
//
//                             <Form.Group className="mb-3 d-flex align-items-center" controlId="email">
//                                 <Form.Label style={{ width: 120, minWidth: 120 }}>Email</Form.Label>
//                                 <Form.Control
//                                     type="email"
//                                     value={profile.email || ""}
//                                     onChange={(e) => setProfile({ ...profile, email: e.target.value })}
//                                 />
//                             </Form.Group>
//
//                             <Form.Group className="mb-4 d-flex align-items-center" controlId="role">
//                                 <Form.Label style={{ width: 120, minWidth: 120 }}>Role</Form.Label>
//                                 <Form.Select
//                                     value={profile.role || "USER"}
//                                     onChange={(e) => setProfile({ ...profile, role: e.target.value })}
//                                 >
//                                     <option value="USER">User</option>
//                                     <option value="ADMIN">Admin</option>
//                                     <option value="FACULTY">Faculty</option>
//                                     <option value="STUDENT">Student</option>
//                                 </Form.Select>
//                             </Form.Group>
//
//                             <div className="d-flex justify-content-between gap-3">
//                                 <Button variant="primary" size="lg" onClick={updateProfile} className="flex-grow-1">
//                                     Update Profile
//                                 </Button>
//                                 <Button variant="danger" size="lg" onClick={signout} className="flex-grow-1">
//                                     Sign Out
//                                 </Button>
//                             </div>
//                         </Form>
//                     </div>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }
