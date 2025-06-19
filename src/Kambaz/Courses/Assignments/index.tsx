// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState, AppDispatch } from "../../store";
//
// import {
//     fetchAssignments,
//     createAssignment,
//     updateAssignmentById,
//     deleteAssignmentById,
//     type Assignment,
// } from "./reducer";
//
// import {
//     InputGroup,
//     FormControl,
//     Button,
//     ListGroup,
//     Modal,
//     Form,
// } from "react-bootstrap";
//
// import { FaSearch, FaPlus, FaRegFileAlt, FaPencilAlt } from "react-icons/fa";
// import { BsGripVertical, BsTrash } from "react-icons/bs";
// import { IoEllipsisVertical } from "react-icons/io5";
// import GreenCheckmark from "../Modules/GreenCheckmark";
//
// export default function Assignments({ isFaculty }: { isFaculty: boolean }) {
//     const { cid } = useParams<{ cid: string }>();
//     const dispatch = useDispatch<AppDispatch>();
//     const assignments = useSelector(
//         (s: RootState) => s.assignmentsReducer.assignments
//     );
//     const status = useSelector((s: RootState) => s.assignmentsReducer.status);
//
//     const [showAdd, setShowAdd] = useState(false);
//     const [newTitle, setNewTitle] = useState("");
//     const [newDesc, setNewDesc] = useState("");
//     const [newPoints, setNewPoints] = useState(0);
//     const [newFrom, setNewFrom] = useState("");
//     const [newDueDate, setNewDueDate] = useState("");
//     const [newUntil, setNewUntil] = useState("");
//
//     const [searchTerm, setSearchTerm] = useState("");
//     const [editingId, setEditingId] = useState<string | null>(null);
//     const [editingTitle, setEditingTitle] = useState("");
//
//     useEffect(() => {
//         if (cid) {
//             dispatch(fetchAssignments(cid));
//         }
//     }, [cid, dispatch]);
//
//     if (!cid) return <div>No course selected</div>;
//     if (status === "loading") return <div>Loading assignments…</div>;
//     if (status === "failed") return <div>Failed to load assignments. Please try again later.</div>;
//
//     const filteredAssignments = assignments.filter((a) =>
//         a.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//
//     const handleDelete = (aid: string) => {
//         if (window.confirm("Delete this assignment?")) {
//             dispatch(deleteAssignmentById(aid));
//         }
//     };
//
//     const handleEditClick = (a: Assignment) => {
//         setEditingId(a._id);
//         setEditingTitle(a.title);
//     };
//
//     const handleInlineTitleChange = (value: string) => {
//         setEditingTitle(value);
//     };
//
//     const handleSaveInline = (a: Assignment) => {
//         if (!editingTitle.trim()) {
//             alert("Title cannot be empty");
//             return;
//         }
//         dispatch(updateAssignmentById({ ...a, title: editingTitle }));
//         setEditingId(null);
//         setEditingTitle("");
//     };
//
//     const handleAddAssignment = () => {
//         if (!newTitle.trim()) return alert("Title is required");
//
//         const payload = {
//             title: newTitle.trim(),
//             descriptionHtml: `<p>${newDesc}</p>`,
//             points: newPoints,
//             availableFrom: newFrom || undefined,
//             dueDate: newDueDate || undefined,
//             availableUntil: newUntil || undefined,
//             course: cid,
//             assignTo: "Everyone",
//             entryOptions: {
//                 text: true,
//                 website: false,
//                 media: false,
//                 annotation: false,
//                 file: false,
//             },
//             group: "default",
//             displayGradeAs: "points",
//             submissionType: "online",
//         };
//
//         dispatch(createAssignment({ cid, assn: payload }));
//
//         setShowAdd(false);
//         setNewTitle("");
//         setNewDesc("");
//         setNewPoints(0);
//         setNewFrom("");
//         setNewDueDate("");
//         setNewUntil("");
//     };
//
//     return (
//         <div className="p-3">
//             <div className="d-flex align-items-center mb-4">
//                 <InputGroup style={{ maxWidth: 300 }} className="me-auto">
//                     <InputGroup.Text>
//                         <FaSearch />
//                     </InputGroup.Text>
//                     <FormControl
//                         placeholder="Search assignments…"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </InputGroup>
//
//                 {isFaculty && (
//                     <>
//                         <Button
//                             variant="light"
//                             size="lg"
//                             className="me-2 border border-secondary text-dark"
//                             disabled
//                         >
//                             <FaPlus className="me-1" /> Group
//                         </Button>
//                         <Button
//                             variant="danger"
//                             size="lg"
//                             onClick={() => setShowAdd(true)}
//                         >
//                             <FaPlus className="me-1" /> Assignment
//                         </Button>
//                     </>
//                 )}
//             </div>
//
//             {filteredAssignments.length === 0 && (
//                 <div className="p-3">
//                     <h4>No assignments found for this course.</h4>
//                     {isFaculty && (
//                         <Button variant="primary" onClick={() => setShowAdd(true)}>
//                             <FaPlus className="me-1" /> Add Assignment
//                         </Button>
//                     )}
//                 </div>
//             )}
//
//             <ListGroup className="rounded-0 mb-3">
//                 <ListGroup.Item className="p-0 border">
//                     <div className="d-flex justify-content-between align-items-center p-3 bg-light border">
//                         <strong>ASSIGNMENTS</strong>
//                     </div>
//                 </ListGroup.Item>
//             </ListGroup>
//
//             <ListGroup className="rounded-0">
//                 {filteredAssignments.map((a) => (
//                     <ListGroup.Item
//                         key={a._id}
//                         className="d-flex justify-content-between align-items-start mb-2 p-3 border"
//                         style={{ borderLeft: "5px solid #198754" }}
//                     >
//                         <div className="flex-grow-1">
//                             <div className="d-flex align-items-center mb-1">
//                                 <BsGripVertical className="me-2" />
//                                 <FaRegFileAlt className="me-2 text-success" />
//                                 {editingId === a._id && isFaculty ? (
//                                     <FormControl
//                                         value={editingTitle}
//                                         onChange={(e) =>
//                                             handleInlineTitleChange(e.target.value)
//                                         }
//                                         onKeyDown={(e) => {
//                                             if (e.key === "Enter") {
//                                                 e.preventDefault();
//                                                 handleSaveInline(a);
//                                             }
//                                         }}
//                                         onBlur={() => handleSaveInline(a)}
//                                         className="me-3"
//                                         autoFocus
//                                         style={{ maxWidth: 300 }}
//                                     />
//                                 ) : (
//                                     <>
//                                         <Link
//                                             to={`/Kambaz/Courses/${cid}/Assignments/${a._id}`}
//                                             className="text-decoration-none text-dark flex-grow-1"
//                                         >
//                                             <strong style={{ fontSize: "1.1rem" }}>
//                                                 {a.title}
//                                             </strong>
//                                         </Link>
//                                         {isFaculty && (
//                                             <>
//                                                 <FaPencilAlt
//                                                     onClick={() => handleEditClick(a)}
//                                                     className="text-primary ms-2"
//                                                     role="button"
//                                                     tabIndex={0}
//                                                     aria-label={`Edit assignment ${a.title}`}
//                                                     style={{ cursor: "pointer" }}
//                                                 />
//                                                 <BsTrash
//                                                     onClick={() => handleDelete(a._id)}
//                                                     className="text-danger ms-4"
//                                                     role="button"
//                                                     tabIndex={0}
//                                                     aria-label={`Delete assignment ${a.title}`}
//                                                     style={{ cursor: "pointer", fontSize: "1.3rem" }}
//                                                 />
//                                             </>
//                                         )}
//                                     </>
//                                 )}
//                             </div>
//                             <div
//                                 className="text-secondary mb-1"
//                                 style={{ fontSize: "0.9rem" }}
//                             >
//                                 <strong>Not available until:</strong>{" "}
//                                 {a.availableFrom
//                                     ? new Date(a.availableFrom).toLocaleString()
//                                     : "TBD"}
//                             </div>
//                             <div className="text-secondary" style={{ fontSize: "0.9rem" }}>
//                                 <strong>Due:</strong>{" "}
//                                 {a.dueDate ? new Date(a.dueDate).toLocaleString() : "TBD"} |{" "}
//                                 {a.points} pts
//                             </div>
//                         </div>
//
//                         <div
//                             className="d-flex align-items-center justify-content-end"
//                             style={{ gap: "12px", minWidth: "80px" }}
//                         >
//                             <GreenCheckmark />
//                             <IoEllipsisVertical className="fs-4 text-secondary" />
//                         </div>
//                     </ListGroup.Item>
//                 ))}
//             </ListGroup>
//
//             <Modal
//                 show={showAdd}
//                 onHide={() => setShowAdd(false)}
//                 backdrop="static"
//                 keyboard={false}
//                 centered
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title>New Assignment</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group className="mb-3" controlId="newTitle">
//                             <Form.Label>Title</Form.Label>
//                             <FormControl
//                                 placeholder="Assignment title"
//                                 value={newTitle}
//                                 onChange={(e) => setNewTitle(e.target.value)}
//                                 autoFocus
//                             />
//                         </Form.Group>
//
//                         <Form.Group className="mb-3" controlId="newDesc">
//                             <Form.Label>Description</Form.Label>
//                             <FormControl
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="Describe assignment…"
//                                 value={newDesc}
//                                 onChange={(e) => setNewDesc(e.target.value)}
//                             />
//                         </Form.Group>
//
//                         <Form.Group className="mb-3" controlId="newPoints">
//                             <Form.Label>Points</Form.Label>
//                             <FormControl
//                                 type="number"
//                                 min={0}
//                                 value={newPoints}
//                                 onChange={(e) => setNewPoints(Number(e.target.value))}
//                             />
//                         </Form.Group>
//
//                         <Form.Group className="mb-3" controlId="newFrom">
//                             <Form.Label>Available From</Form.Label>
//                             <FormControl
//                                 type="datetime-local"
//                                 value={newFrom}
//                                 onChange={(e) => setNewFrom(e.target.value)}
//                             />
//                         </Form.Group>
//
//                         <Form.Group className="mb-3" controlId="newDueDate">
//                             <Form.Label>Due Date</Form.Label>
//                             <FormControl
//                                 type="datetime-local"
//                                 value={newDueDate}
//                                 onChange={(e) => setNewDueDate(e.target.value)}
//                             />
//                         </Form.Group>
//
//                         <Form.Group className="mb-3" controlId="newUntil">
//                             <Form.Label>Available Until</Form.Label>
//                             <FormControl
//                                 type="datetime-local"
//                                 value={newUntil}
//                                 onChange={(e) => setNewUntil(e.target.value)}
//                             />
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowAdd(false)}>
//                         Cancel
//                     </Button>
//                     <Button
//                         variant="primary"
//                         onClick={handleAddAssignment}
//                         disabled={!newTitle.trim()}
//                     >
//                         Save
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// }



import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";

import {
    fetchAssignments,
    createAssignment,
    deleteAssignmentById,
    setEditing,
    type Assignment,
    updateAssignmentById,
} from "./reducer";


import {
    InputGroup,
    FormControl,
    Button,
    ListGroup,
    Modal,
} from "react-bootstrap";
import { FaSearch, FaPlus, FaRegFileAlt } from "react-icons/fa";
import { BsGripVertical, BsTrash, BsGear } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";

interface AssignmentsProps {
    isFaculty: boolean;
}

export default function Assignments({ isFaculty }: AssignmentsProps) {
    const { cid } = useParams<{ cid: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const assignments = useSelector(
        (s: RootState) => s.assignmentsReducer.assignments
    );
    const status = useSelector((s: RootState) => s.assignmentsReducer.status);

    const [showAdd, setShowAdd] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [newPoints, setNewPoints] = useState(0);
    const [newFrom, setNewFrom] = useState("");
    const [newDueDate, setNewDueDate] = useState("");
    const [newUntil, setNewUntil] = useState("");

    useEffect(() => {
        if (cid) dispatch(fetchAssignments(cid));
    }, [cid, dispatch]);

    if (status === "loading") {
        return <div>Loading assignments…</div>;
    }

    const handleDelete = (aid: string) => {
        if (window.confirm("Delete this assignment?")) {
            dispatch(deleteAssignmentById(aid));
        }
    };

    const handleEditClick = (aid: string) => {
        dispatch(setEditing({ id: aid, editing: true }));
    };

    const handleSaveInline = (a: Assignment) => {
        dispatch(updateAssignmentById({ ...a, editing: false }));
    };

    const handleAddAssignment = () => {
        if (!newTitle.trim() || !cid) return;
        dispatch(
            createAssignment({
                cid,
                assn: {
                    title: newTitle.trim(),
                    descriptionHtml: `<p>${newDesc}</p>`,
                    points: newPoints,
                    availableFrom: newFrom,
                    dueDate: newDueDate,
                    availableUntil: newUntil,
                },
            })
        );
        setShowAdd(false);
        setNewTitle("");
        setNewDesc("");
        setNewPoints(0);
        setNewFrom("");
        setNewDueDate("");
        setNewUntil("");
    };

    return (
        <>
            <div className="d-flex align-items-center mb-4">
                <InputGroup style={{ maxWidth: 300 }} className="me-auto">
                    <InputGroup.Text>
                        <FaSearch />
                    </InputGroup.Text>
                    <FormControl placeholder="Search…" />
                </InputGroup>
                {isFaculty && (
                    <>
                        <Button
                            id="wd-add-group-click"
                            variant="light"
                            size="lg"
                            className="me-2 border border-secondary text-dark"
                        >
                            <FaPlus className="me-1" />
                            Group
                        </Button>
                        <Button
                            id="wd-add-assignment-click"
                            variant="danger"
                            size="lg"
                            onClick={() => setShowAdd(true)}
                        >
                            <FaPlus className="me-1" />
                            Assignment
                        </Button>
                    </>
                )}
            </div>

            <ListGroup className="rounded-0 mb-3">
                <ListGroup.Item className="p-0 border">
                    <div className="d-flex justify-content-between align-items-center p-3 bg-light border">
                        <strong>ASSIGNMENTS</strong>
                    </div>
                </ListGroup.Item>
            </ListGroup>

            <ListGroup className="rounded-0">
                {assignments.map((a) => (
                    <ListGroup.Item
                        key={a._id}
                        className="d-flex justify-content-between align-items-start mb-2 p-3 border"
                        style={{ borderLeft: "5px solid #198754" }}
                    >
                        <div className="flex-grow-1">
                            {a.editing && isFaculty ? (
                                <FormControl
                                    value={a.title}
                                    onChange={(e) =>
                                        dispatch(
                                            updateAssignmentById({ ...a, title: e.target.value })
                                        )
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSaveInline(a);
                                        }
                                    }}
                                    className="me-3"
                                />
                            ) : (
                                <>
                                    <div className="d-flex align-items-center mb-1">
                                        <BsGripVertical className="me-2" />
                                        <FaRegFileAlt className="me-2 text-success" />
                                        <Link
                                            to={`Assignments/${a._id}`}
                                            className="text-decoration-none text-dark"
                                        >
                                            <strong style={{ fontSize: "1.1rem" }}>
                                                {a.title}
                                            </strong>
                                        </Link>
                                    </div>
                                    <div
                                        className="text-secondary mb-1"
                                        style={{ fontSize: "0.9rem" }}
                                    >
                                        <strong>Not available until</strong> {a.availableFrom || "TBD"}
                                    </div>
                                    <div
                                        className="text-secondary"
                                        style={{ fontSize: "0.9rem" }}
                                    >
                                        <strong>Due</strong> {a.dueDate || "TBD"} | {a.points} pts
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="d-flex align-items-center">
                            {isFaculty && !a.editing && (
                                <>
                                    <BsGear
                                        onClick={() => handleEditClick(a._id)}
                                        className="text-primary me-3 fs-5"
                                    />
                                    <BsTrash
                                        onClick={() => handleDelete(a._id)}
                                        className="text-danger fs-5 me-3"
                                    />
                                </>
                            )}
                            {a.editing && <GreenCheckmark className="me-3" />}
                            <IoEllipsisVertical className="fs-4 text-secondary" />
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Modal show={showAdd} onHide={() => setShowAdd(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>New Assignment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        placeholder="Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="mb-2"
                    />
                    <FormControl
                        as="textarea"
                        rows={3}
                        placeholder="Description…"
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        className="mb-2"
                    />
                    <FormControl
                        type="number"
                        placeholder="Points"
                        value={newPoints}
                        onChange={(e) => setNewPoints(+e.target.value)}
                        className="mb-2"
                    />
                    <FormControl
                        type="datetime-local"
                        placeholder="Available From"
                        value={newFrom}
                        onChange={(e) => setNewFrom(e.target.value)}
                        className="mb-2"
                    />
                    <FormControl
                        type="datetime-local"
                        placeholder="Due Date"
                        value={newDueDate}
                        onChange={(e) => setNewDueDate(e.target.value)}
                        className="mb-2"
                    />
                    <FormControl
                        type="datetime-local"
                        placeholder="Available Until"
                        value={newUntil}
                        onChange={(e) => setNewUntil(e.target.value)}
                        className="mb-2"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAdd(false)}>
                        Cancel
                    </Button>
                    <Button id="wd-save-assignment-click" onClick={handleAddAssignment}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
