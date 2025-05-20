import {
    InputGroup,
    Form,
    Button,
    Row,
    Col,
} from "react-bootstrap";
import { FaSearch, FaPlus, FaRegFileAlt } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { Link } from "react-router-dom";
import "../../styles.css";

interface Assignment {
    title: string;
    modules: string;
    availableAt: string;
    dueAt: string;
    points: string;
}

const sampleAssignments: Assignment[] = [
    {
        title: "A1",
        modules: "Multiple Modules",
        availableAt: "May 6 at 12:00am",
        dueAt: "May 13 at 11:59pm",
        points: "100 pts",
    },
    {
        title: "A2",
        modules: "Multiple Modules",
        availableAt: "May 13 at 12:00am",
        dueAt: "May 20 at 11:59pm",
        points: "100 pts",
    },
    {
        title: "A3",
        modules: "Multiple Modules",
        availableAt: "May 20 at 12:00am",
        dueAt: "May 27 at 11:59pm",
        points: "100 pts",
    },
];

export default function Assignments() {
    return (
        <div className="p-4">
            {/* Top Controls */}
            <Row className="align-items-center mb-3">
                <Col xs={12} md={6} lg={4}>
                    <InputGroup>
                        <InputGroup.Text>
                            <FaSearch />
                        </InputGroup.Text>
                        <Form.Control placeholder="Search…" />
                    </InputGroup>
                </Col>
                <Col className="text-end">
                    <Button variant="outline-secondary" className="me-2">
                        + Group
                    </Button>
                    <Button variant="danger">+ Assignment</Button>
                </Col>
            </Row>

            {/* Header */}
            <div
                className="d-flex justify-content-between align-items-center bg-light border px-3 py-2 mb-2"
                style={{ fontWeight: "bold" }}
            >
                <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2" />
                    ASSIGNMENTS
                </div>
                <div className="d-flex align-items-center gap-3">
                    <Button
                        size="sm"
                        variant="outline-secondary"
                        className="rounded-pill px-3"
                    >
                        40% of Total
                    </Button>
                    <FaPlus />
                    <IoEllipsisVertical />
                </div>
            </div>

            {/* Assignment Items */}
            {sampleAssignments.map((a, index) => (
                <div
                    key={index}
                    className="d-flex border mb-2 bg-white"
                    style={{
                        border: "1px solid #dee2e6",
                        borderRadius: "4px",
                    }}
                >
                    {/* Green vertical line */}
                    <div
                        style={{
                            width: "4px",
                            backgroundColor: "#198754",
                            borderTopLeftRadius: "4px",
                            borderBottomLeftRadius: "4px",
                        }}
                    />

                    {/* Main assignment content */}
                    <div className="d-flex justify-content-between align-items-start w-100 p-3">
                        <div>
                            <div className="d-flex align-items-center mb-1">
                                <BsGripVertical className="me-2 text-secondary" />
                                <FaRegFileAlt className="text-success me-2 fs-5" />
                                <Link
                                    to={a.title.replace(/\s+/g, "-")}
                                    className="text-decoration-none text-dark fw-semibold"
                                >
                                    {a.title}
                                </Link>
                            </div>
                            <div className="text-secondary" style={{ fontSize: "0.9rem" }}>
                                <Link to="#" className="text-decoration-underline text-primary">
                                    {a.modules}
                                </Link>{" "}
                                | <strong>Not available until</strong> {a.availableAt}
                            </div>
                            <div className="text-secondary" style={{ fontSize: "0.9rem" }}>
                                <strong>Due</strong> {a.dueAt} | {a.points}
                            </div>
                        </div>

                        <div className="d-flex align-items-center">
                            <GreenCheckmark />
                            <IoEllipsisVertical className="fs-5 text-secondary ms-3" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
