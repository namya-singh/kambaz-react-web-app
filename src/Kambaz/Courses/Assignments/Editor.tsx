// src/Kambaz/Courses/Assignments/AssignmentEditor.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { addAssignment, updateAssignment } from "./reducer";
import type { RootState } from "../../store";

export default function AssignmentEditor() {
    const { cid, aid } = useParams<{ cid: string; aid: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
    const isFaculty = currentUser?.role === "FACULTY";

    const assignments = useSelector((state: RootState) => state.assignmentsReducer.assignments);
    const existingAssignment = assignments.find((a) => a._id === aid);
    const isEdit = Boolean(existingAssignment);

    const [assignment, setAssignment] = useState({
        _id: existingAssignment?._id || uuidv4(),
        course: cid || "",
        title: existingAssignment?.title || "",
        descriptionHtml: existingAssignment?.descriptionHtml || "",
        points: existingAssignment?.points || 100,
        dueDate: existingAssignment?.dueDate || "",
        availableFrom: existingAssignment?.availableFrom || "",
        availableUntil: existingAssignment?.availableUntil || "",
    });

    useEffect(() => {
        if (!isFaculty) {
            navigate(`/Kambaz/Courses/${cid}/Assignments`);
        }
    }, [isFaculty, cid, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAssignment((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if (isEdit) {
            dispatch(updateAssignment(assignment));
        } else {
            dispatch(addAssignment(assignment));
        }
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };

    const handleCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };

    return (
        <div className="p-3">
            <h2>{isEdit ? "Edit Assignment" : "New Assignment"}</h2>
            <hr />
            {!isFaculty ? (
                <Alert variant="danger">You do not have permission to edit assignments.</Alert>
            ) : (
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Assignment Name</Form.Label>
                        <Form.Control
                            name="title"
                            value={assignment.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            name="descriptionHtml"
                            value={assignment.descriptionHtml}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>Points</Form.Label>
                        <Col sm={3}>
                            <Form.Control
                                type="number"
                                name="points"
                                value={assignment.points}
                                onChange={handleChange}
                                min={0}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="dueDate"
                            value={assignment.dueDate}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Available From</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="availableFrom"
                            value={assignment.availableFrom}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Available Until</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="availableUntil"
                            value={assignment.availableUntil}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" className="me-2" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </Form>
            )}
        </div>
    );
}
