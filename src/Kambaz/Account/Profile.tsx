import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { setCurrentUser } from "./reducer";

export default function Profile() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [profile, setProfile] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    useEffect(() => {
        if (!currentUser) {
            navigate("/Kambaz/Account/Signin");
        } else {
            setProfile(currentUser);
        }
    }, [currentUser, navigate]);

    const signout = () => {
        dispatch(setCurrentUser(null));
        navigate("/Kambaz/Account/Signin");
    };

    return (
        <Container fluid className="vh-100 g-0">
            <Row className="h-100 g-0">
                <Col xs={20} md={100} className="d-flex align-items-start justify-content-center">
                    <div style={{ width: "100%", maxWidth: 8000, padding: "2rem" }}>
                        <h1 className="mb-5">Profile</h1>
                        <Form>
                            <div className="d-flex align-items-center mb-4">
                                <Form.Label style={{ width: "25%", minWidth: 120 }}>Username</Form.Label>
                                <Form.Control
                                    value={profile.username || ""}
                                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                    style={{ flex: 1 }}
                                />
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <Form.Label style={{ width: "25%", minWidth: 120 }}>ID</Form.Label>
                                <Form.Control
                                    value={profile._id || ""}
                                    readOnly
                                    style={{ flex: 1 }}
                                />
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <Form.Label style={{ width: "25%", minWidth: 120 }}>First Name</Form.Label>
                                <Form.Control
                                    value={profile.firstName || ""}
                                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                    style={{ flex: 1 }}
                                />
                            </div>

                            <div className="d-flex align-items-center mb-4">
                                <Form.Label style={{ width: "25%", minWidth: 120 }}>Last Name</Form.Label>
                                <Form.Control
                                    value={profile.lastName || ""}
                                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                    style={{ flex: 1 }}
                                />
                            </div>

                            <div className="d-flex align-items-center mb-4">
                                <Form.Label style={{ width: "25%", minWidth: 120 }}>Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={profile.dob || ""}
                                    onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                                    style={{ flex: 1 }}
                                />
                            </div>

                            <div className="d-flex align-items-center mb-4">
                                <Form.Label style={{ width: "25%", minWidth: 120 }}>Email</Form.Label>
                                <Form.Control
                                    value={profile.email || ""}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    style={{ flex: 1 }}
                                />
                            </div>

                            <div className="d-flex align-items-center mb-5">
                                <Form.Label style={{ width: "25%", minWidth: 120 }}>Role</Form.Label>
                                <Form.Select
                                    value={profile.role || "USER"}
                                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                                    style={{ flex: 1 }}
                                >
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                    <option value="FACULTY">Faculty</option>
                                    <option value="STUDENT">Student</option>
                                </Form.Select>
                            </div>

                            <div className="d-flex justify-content-end">
                                <Button
                                    id="wd-signout-btn"
                                    variant="danger"
                                    size="lg"
                                    className="px-5"
                                    onClick={signout}
                                >
                                    Signout
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
