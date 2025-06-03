// src/Kambaz/Courses/Assignments/index.tsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { InputGroup, Form, Button, ListGroup } from 'react-bootstrap';
import { FaSearch, FaPlus, FaTrash, FaRegFileAlt } from 'react-icons/fa';
import { BsGripVertical } from 'react-icons/bs';
import { IoEllipsisVertical } from 'react-icons/io5';
import GreenCheckmark from '../Modules/GreenCheckmark';
import '../../styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAssignment } from './reducer';
import type { RootState } from '../../store';

export default function Assignments() {
    const { cid } = useParams<{ cid: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
    const isFaculty = currentUser?.role === "FACULTY";

    const assignments = useSelector((state: RootState) => state.assignmentsReducer.assignments);
    const courseAssignments = assignments.filter(a => a.course === cid);

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this assignment?')) {
            dispatch(deleteAssignment(id));
        }
    };

    return (
        <div className="p-3">
            <div className="d-flex align-items-center mb-4">
                <InputGroup style={{ maxWidth: 300 }} className="me-auto">
                    <InputGroup.Text><FaSearch /></InputGroup.Text>
                    <Form.Control placeholder="Search…" />
                </InputGroup>
                {isFaculty && (
                    <>
                        <Button
                            variant="light"
                            size="lg"
                            className="me-2 border border-secondary text-dark"
                        >
                            <FaPlus className="me-1" /> Group
                        </Button>
                        <Button
                            variant="danger"
                            size="lg"
                            onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/New`)}
                        >
                            <FaPlus className="me-1" /> Assignment
                        </Button>
                    </>
                )}
            </div>

            <ListGroup className="rounded-0">
                <ListGroup.Item className="p-0 mb-3" style={{ border: '1px solid #dee2e6' }}>
                    <div className="d-flex justify-content-between align-items-center p-3 bg-light">
                        <div className="d-flex align-items-center">
                            <BsGripVertical className="me-2" />
                            <strong>ASSIGNMENTS</strong>
                        </div>
                        {isFaculty && (
                            <div className="d-flex align-items-center">
                                <Button variant="outline-secondary" size="sm" className="me-2 rounded-pill">
                                    40% of Total
                                </Button>
                                <FaPlus className="me-3" />
                                <IoEllipsisVertical />
                            </div>
                        )}
                    </div>
                </ListGroup.Item>

                {courseAssignments.map(a => (
                    <ListGroup.Item
                        key={a._id}
                        className="d-flex justify-content-between align-items-start mb-2 p-3"
                        style={{
                            border: '1px solid #dee2e6',
                            borderLeft: '5px solid #198754',
                        }}
                    >
                        <div>
                            <div className="d-flex align-items-center mb-1">
                                <BsGripVertical className="me-2"/>
                                <FaRegFileAlt className="me-2 text-success"/>
                                <Link
                                    to={`/Kambaz/Courses/${cid}/Assignments/${a._id}`}
                                    className="text-decoration-none text-dark"
                                >
                                    <strong style={{fontSize: '1.1rem'}}>{a.title}</strong>
                                </Link>
                            </div>
                            <div className="text-secondary mb-1" style={{fontSize: '0.9rem'}}>
                                <strong>Not available until</strong> {a.availableFrom || 'TBD'}
                            </div>
                            <div className="text-secondary" style={{fontSize: '0.9rem'}}>
                                <strong>Due</strong> {a.dueDate || 'TBD'} | {a.points} pts
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <GreenCheckmark/>
                            <IoEllipsisVertical className="fs-4 text-secondary ms-3"/>
                            {isFaculty && (
                                <FaTrash
                                    className="fs-5 text-danger ms-3"
                                    role="button"
                                    title="Delete Assignment"
                                    onClick={() => handleDelete(a._id)}
                                />
                            )}
                        </div>

                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}
