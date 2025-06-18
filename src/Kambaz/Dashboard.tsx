/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
    Row,
    Col,
    Card,
    Button,
    FormControl,
    ButtonGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store";
import {enrollIntoCourse} from "./Account/client.ts";

interface Course {
    _id: string;
    name: string;
    description: string;
    image: string;
    enrolled?: boolean;
}

interface User {
    _id: string;
    role: string;
}

interface Enrollment {
    user: string;
    course: string;
}

interface DashboardProps {
    currentUser: User | null;
    courses: Course[];
    setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
    updateCourse: (course: any) => Promise<void>;
    addNewCourse: () => Promise<Course>; // return the created course
    course: Course;
    setCourse: React.Dispatch<React.SetStateAction<Course>>;
    deleteCourse?: (courseId: string) => Promise<void>;
    enrolling: boolean;
    setEnrolling: React.Dispatch<React.SetStateAction<boolean>>;
    updateEnrollment: (courseId: string, enrolled: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
                                                 currentUser,
                                                 courses,
                                                 addNewCourse,
                                                 course,
                                                 setCourse,
                                                 enrolling,
                                                 setEnrolling,
                                                 deleteCourse,
                                                 updateCourse,
                                                 updateEnrollment,
                                                 setCourses
                                             }) => {
    const enrollments: Enrollment[] = useSelector(
        (state: RootState) => state.enrollmentReducer.data
    );

    if (!currentUser) {
        return <h2 className="p-3">Please sign in to see your Dashboard.</h2>;
    }

    const isFaculty = currentUser.role === "FACULTY";

    // const addNewCourseHandler = async () => {
    //     try {
    //         const newCourse = await addNewCourse();
    //         setCourses((prev) => [...prev, newCourse]);
    //         setCourse({ _id: "", name: "", description: "", image: "" });
    //         updateEnrollment(newCourse._id, true);
    //     } catch (err) {
    //         console.error("Failed to add course:", err);
    //     }
    // };
    const addNewCourseHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // prevent form submit or page reload if inside a form

        try {
            // 1. Add new course via prop function
            const newCourse = await addNewCourse();
            if (!newCourse || !newCourse._id) {
                throw new Error("Failed to create course");
            }

            // 2. Add to local course list state
            setCourses((prev) => [...prev, newCourse]);

            // 3. Reset course form
            setCourse({ _id: "", name: "", description: "", image: "" });

            // 4. Auto-enroll current user to new course on backend
            // You need an API call here that enrolls user into the course
            // Assuming you have a function enrollIntoCourse(userId, courseId)
            if (currentUser && currentUser._id) {
                await enrollIntoCourse(currentUser._id, newCourse._id);
            }

            // 5. Update frontend enrollment state after enrolling
            updateEnrollment(newCourse._id, true);
        } catch (err) {
            console.error("Failed to add course:", err);
        }
    };


    const myEnrolledCourseIds = new Set(
        enrollments
            .filter((en: Enrollment) => en.user === currentUser._id)
            .map((en) => en.course)
    );

    const displayedCourses = enrolling
        ? courses
        : courses.filter((c) => myEnrolledCourseIds.has(c._id));

    const onToggleEnrolling = () => {
        setEnrolling(!enrolling);
    };

    return (
        <div id="wd-dashboard" className="p-3 container-fluid">
            <h1 id="wd-dashboard-title">
                Dashboard
                <Button
                    className="float-end"
                    variant="primary"
                    onClick={onToggleEnrolling}
                >
                    {enrolling ? "My Courses" : "All Courses"}
                </Button>
            </h1>
            <hr />

            {isFaculty && (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="mb-0">New Course</h5>
                        <div>
                            <Button
                                id="wd-add-new-course-click"
                                variant="primary"
                                className="me-2"
                                onClick={addNewCourseHandler}
                                disabled={!course.name.trim()}
                            >
                                Add
                            </Button>
                            <Button
                                id="wd-update-course-click"
                                variant="warning"
                                onClick={() => updateCourse(course)}
                                disabled={!course._id}
                            >
                                Update
                            </Button>
                        </div>
                    </div>

                    <FormControl
                        className="mb-2"
                        placeholder="Course Name"
                        value={course.name}
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                        id="wd-course-name"
                    />
                    <FormControl
                        as="textarea"
                        rows={3}
                        className="mb-4"
                        placeholder="Course Description"
                        value={course.description}
                        onChange={(e) =>
                            setCourse({ ...course, description: e.target.value })
                        }
                        id="wd-course-desc"
                    />
                    <hr />
                </>
            )}

            <h2 id="wd-dashboard-published">
                {enrolling ? "All Courses" : "My Courses"} ({displayedCourses.length})
            </h2>
            <hr />

            <div id="wd-dashboard-courses">
                <Row xs={1} md={3} lg={5} className="g-4">
                    {displayedCourses.map((c) => {
                        const isEnrolled = enrolling ? !!c.enrolled : true;

                        return (
                            <Col
                                key={c._id}
                                className="wd-dashboard-course d-flex justify-content-center"
                            >
                                <Card style={{ width: 300 }}>
                                    <Card.Img
                                        src={c.image || "/images/react.jpg"}
                                        variant="top"
                                        height={160}
                                    />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="text-truncate">{c.name}</Card.Title>

                                        <Card.Text
                                            className="flex-grow-1 overflow-hidden mb-2"
                                            style={{ height: 80 }}
                                        >
                                            {c.description}
                                        </Card.Text>

                                        {enrolling && (
                                            <div className="mb-2 d-flex justify-content-center">
                                                <Button
                                                    variant={isEnrolled ? "danger" : "success"}
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        updateEnrollment(c._id, !isEnrolled);
                                                    }}
                                                    className="px-4"
                                                >
                                                    {isEnrolled ? "Unenroll" : "Enroll"}
                                                </Button>
                                            </div>
                                        )}

                                        <ButtonGroup className="mt-auto w-100 d-flex justify-content-between gap-2">
                                            {isEnrolled ? (
                                                <Link
                                                    to={`/Kambaz/Courses/${c._id}/Home`}
                                                    className="btn btn-primary flex-fill"
                                                >
                                                    Go
                                                </Link>
                                            ) : (
                                                <Button variant="secondary" disabled className="flex-fill">
                                                    Go
                                                </Button>
                                            )}

                                            {isFaculty && isEnrolled && (
                                                <>
                                                    <Button
                                                        id="wd-delete-course-click"
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => deleteCourse && deleteCourse(c._id)}
                                                        className="flex-fill"
                                                    >
                                                        Delete
                                                    </Button>
                                                    <Button
                                                        id="wd-edit-course-click"
                                                        variant="warning"
                                                        size="sm"
                                                        onClick={() => setCourse(c)}
                                                        className="flex-fill"
                                                    >
                                                        Edit
                                                    </Button>
                                                </>
                                            )}
                                        </ButtonGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
};

export default Dashboard;








// import React, { useState } from "react";
// import {
//     Row,
//     Col,
//     Card,
//     Button,
//     FormControl,
//     ButtonGroup,
// } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import type { RootState } from "./store";
// import { enrollCourse, unenrollCourse } from "./enrollmentReducer";
// import * as db from "./Database";
//
// interface Course {
//     _id: string;
//     name: string;
//     description: string;
//     image: string;
// }
//
// interface Enrollment {
//     user: string;
//     course: string;
// }
//
// const Dashboard: React.FC = () => {
//     const { currentUser } = useSelector(
//         (state: RootState) => state.accountReducer
//     );
//
//     const enrollments: Enrollment[] = useSelector(
//         (state: RootState) => state.enrollmentReducer.data
//     );
//
//     const dispatch = useDispatch();
//
//     // Load all courses from JSON
//     const [courses, setCourses] = useState<Course[]>(db.courses);
//
//     // Local state for “editing/adding” (faculty only)
//     const [course, setCourse] = useState<Course>({
//         _id: "",
//         name: "",
//         description: "",
//         image: "/images/react.jpg",
//     });
//
//     if (!currentUser) {
//         return <h2 className="p-3">Please sign in to see your Dashboard.</h2>;
//     }
//
//     const isFaculty = currentUser.role === "FACULTY";
//
//     // ─────────────── Faculty: Add / Update / Delete ───────────────
//     const addNewCourse = () => {
//         if (!course.name.trim()) return;
//         const newCourse: Course = {
//             ...course,
//             _id: String(Date.now()),
//             image: course.image || "/images/react.jpg",
//         };
//         setCourses((prev) => [...prev, newCourse]);
//         setCourse({ _id: "", name: "", description: "", image: "/images/react.jpg" });
//     };
//
//     const updateCourse = () => {
//         if (!course._id) return;
//         setCourses((prev) => prev.map((c) => (c._id === course._id ? course : c)));
//         setCourse({ _id: "", name: "", description: "", image: "/images/react.jpg" });
//     };
//
//     const deleteCourse = (courseId: string) => {
//         setCourses((prev) => prev.filter((c) => c._id !== courseId));
//     };
//
//     // No client-side filtering: always show all courses
//     const displayedCourses = courses;
//
//     return (
//         <div id="wd-dashboard" className="p-3">
//             <h1 id="wd-dashboard-title">Dashboard</h1>
//             <hr />
//
//             {isFaculty && (
//                 <>
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                         <h5 className="mb-0">New Course</h5>
//                         <div>
//                             <Button
//                                 id="wd-add-new-course-click"
//                                 variant="primary"
//                                 className="me-2"
//                                 onClick={addNewCourse}
//                                 disabled={!course.name.trim()}
//                             >
//                                 Add
//                             </Button>
//                             <Button
//                                 id="wd-update-course-click"
//                                 variant="warning"
//                                 onClick={updateCourse}
//                                 disabled={!course._id}
//                             >
//                                 Update
//                             </Button>
//                         </div>
//                     </div>
//
//                     <FormControl
//                         className="mb-2"
//                         placeholder="Course Name"
//                         value={course.name}
//                         onChange={(e) => setCourse({ ...course, name: e.target.value })}
//                         id="wd-course-name"
//                     />
//                     <FormControl
//                         as="textarea"
//                         rows={3}
//                         className="mb-4"
//                         placeholder="Course Description"
//                         value={course.description}
//                         onChange={(e) =>
//                             setCourse({ ...course, description: e.target.value })
//                         }
//                         id="wd-course-desc"
//                     />
//                     <hr />
//                 </>
//             )}
//
//             <h2 id="wd-dashboard-published">
//                 All Courses ({displayedCourses.length})
//             </h2>
//             <hr />
//
//             <div id="wd-dashboard-courses">
//                 <Row xs={1} md={3} lg={5} className="g-4">
//                     {displayedCourses.map((c) => {
//                         // Check if user is enrolled in course
//                         const isEnrolled = enrollments.some(
//                             (en) => en.user === currentUser._id && en.course === c._id
//                         );
//
//                         return (
//                             <Col
//                                 key={c._id}
//                                 className="wd-dashboard-course d-flex justify-content-center"
//                             >
//                                 <Card style={{ width: 300 }}>
//                                     <Card.Img
//                                         src={c.image || "/images/react.jpg"}
//                                         variant="top"
//                                         height={160}
//                                     />
//                                     <Card.Body className="d-flex flex-column">
//                                         <Card.Title className="text-nowrap overflow-hidden">
//                                             {c.name}
//                                         </Card.Title>
//                                         <Card.Text
//                                             className="flex-grow-1 overflow-hidden"
//                                             style={{ height: 80 }}
//                                         >
//                                             {c.description}
//                                         </Card.Text>
//
//                                         <div className="mb-2">
//                                             {isEnrolled ? (
//                                                 <Button
//                                                     variant="danger"
//                                                     size="sm"
//                                                     onClick={() => dispatch(unenrollCourse({ user: currentUser._id, course: c._id }))}
//                                                 >
//                                                     Unenroll
//                                                 </Button>
//                                             ) : (
//                                                 <Button
//                                                     variant="success"
//                                                     size="sm"
//                                                     onClick={() => dispatch(enrollCourse({ user: currentUser._id, course: c._id }))}
//                                                 >
//                                                     Enroll
//                                                 </Button>
//                                             )}
//                                         </div>
//
//                                         <ButtonGroup className="mt-auto w-100">
//                                             {isEnrolled ? (
//                                                 <Link
//                                                     to={`/Kambaz/Courses/${c._id}/Home`}
//                                                     className="btn btn-primary"
//                                                 >
//                                                     Go
//                                                 </Link>
//                                             ) : (
//                                                 <Button variant="secondary" disabled style={{ flex: 1 }}>
//                                                     Go
//                                                 </Button>
//                                             )}
//
//                                             {isFaculty && isEnrolled && (
//                                                 <>
//                                                     <Button
//                                                         id="wd-delete-course-click"
//                                                         variant="danger"
//                                                         size="sm"
//                                                         onClick={() => deleteCourse(c._id)}
//                                                     >
//                                                         Delete
//                                                     </Button>
//                                                     <Button
//                                                         id="wd-edit-course-click"
//                                                         variant="warning"
//                                                         size="sm"
//                                                         onClick={() => setCourse(c)}
//                                                     >
//                                                         Edit
//                                                     </Button>
//                                                 </>
//                                             )}
//                                         </ButtonGroup>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         );
//                     })}
//                 </Row>
//             </div>
//         </div>
//     );
// };
//
// export default Dashboard;




// import React, { useState } from "react";
// import {
//     Row,
//     Col,
//     Card,
//     Button,
//     FormControl,
//     ButtonGroup,
// } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import type { RootState } from "./store";
// import { enrollCourse, unenrollCourse } from "./enrollmentReducer";
// import * as db from "./Database";
//
// interface Course {
//     _id: string;
//     name: string;
//     description: string;
//     image: string;
// }
//
// interface Enrollment {
//     user: string;
//     course: string;
// }
//
// const Dashboard: React.FC = () => {
//     const { currentUser } = useSelector(
//         (state: RootState) => state.accountReducer
//     );
//
//     const enrollments: Enrollment[] = useSelector(
//         (state: RootState) => state.enrollmentReducer.data
//     );
//
//     const dispatch = useDispatch();
//
//     // Load all courses from JSON
//     const [courses, setCourses] = useState<Course[]>(db.courses);
//
//     // Local state for “editing/adding” (faculty only)
//     const [course, setCourse] = useState<Course>({
//         _id: "",
//         name: "",
//         description: "",
//         image: "/images/react.jpg",
//     });
//
//     // Toggle: false = show enrolled courses only, true = show all courses
//     const [showAll, setShowAll] = useState(false);
//
//     if (!currentUser) {
//         return <h2 className="p-3">Please sign in to see your Dashboard.</h2>;
//     }
//
//     const isFaculty = currentUser.role === "FACULTY";
//
//     // ─────────────── Faculty: Add / Update / Delete ───────────────
//     const addNewCourse = () => {
//         if (!course.name.trim()) return;
//         const newCourse: Course = {
//             ...course,
//             _id: String(Date.now()),
//             image: course.image || "/images/react.jpg",
//         };
//         setCourses((prev) => [...prev, newCourse]);
//         setCourse({ _id: "", name: "", description: "", image: "/images/react.jpg" });
//     };
//
//     const updateCourse = () => {
//         if (!course._id) return;
//         setCourses((prev) => prev.map((c) => (c._id === course._id ? course : c)));
//         setCourse({ _id: "", name: "", description: "", image: "/images/react.jpg" });
//     };
//
//     const deleteCourse = (courseId: string) => {
//         setCourses((prev) => prev.filter((c) => c._id !== courseId));
//     };
//
//     // ─────────────── Student: Enroll / Unenroll ───────────────
//     // Build a Set of course‐IDs that this user is enrolled in:
//     const myEnrolledCourseIds = new Set(
//         enrollments
//             .filter((en: Enrollment) => en.user === currentUser._id)
//             .map((en) => en.course)
//     );
//
//     // Filter “all courses” down to only those the student is enrolled in:
//     const myEnrolledCourses = courses.filter((c) =>
//         myEnrolledCourseIds.has(c._id)
//     );
//
//     // Depending on “showAll,” decide which array to render:
//     const displayedCourses = showAll ? courses : myEnrolledCourses;
//
//     // Dispatch actions with a single payload object { user, course }:
//     const handleEnroll = (courseId: string) => {
//         dispatch(enrollCourse({ user: currentUser._id, course: courseId }));
//     };
//
//     const handleUnenroll = (courseId: string) => {
//         dispatch(unenrollCourse({ user: currentUser._id, course: courseId }));
//     };
//
//     return (
//         <div id="wd-dashboard" className="p-3">
//             <h1 id="wd-dashboard-title">Dashboard</h1>
//
//             {/* Navigation Buttons for toggling views */}
//             <div className="d-flex justify-content-end mb-2 gap-2">
//                 <Button
//                     variant={showAll ? "outline-primary" : "primary"}
//                     onClick={() => setShowAll(false)}
//                     id="wd-show-enrollments"
//                 >
//                     Enrollments
//                 </Button>
//
//                 <Button
//                     variant={showAll ? "primary" : "outline-primary"}
//                     onClick={() => setShowAll(true)}
//                     id="wd-show-all-courses"
//                 >
//                     All Courses
//                 </Button>
//             </div>
//
//             <hr />
//
//             {isFaculty && (
//                 <>
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                         <h5 className="mb-0">New Course</h5>
//                         <div>
//                             <Button
//                                 id="wd-add-new-course-click"
//                                 variant="primary"
//                                 className="me-2"
//                                 onClick={addNewCourse}
//                                 disabled={!course.name.trim()}
//                             >
//                                 Add
//                             </Button>
//                             <Button
//                                 id="wd-update-course-click"
//                                 variant="warning"
//                                 onClick={updateCourse}
//                                 disabled={!course._id}
//                             >
//                                 Update
//                             </Button>
//                         </div>
//                     </div>
//
//                     <FormControl
//                         className="mb-2"
//                         placeholder="Course Name"
//                         value={course.name}
//                         onChange={(e) => setCourse({ ...course, name: e.target.value })}
//                         id="wd-course-name"
//                     />
//                     <FormControl
//                         as="textarea"
//                         rows={3}
//                         className="mb-4"
//                         placeholder="Course Description"
//                         value={course.description}
//                         onChange={(e) =>
//                             setCourse({ ...course, description: e.target.value })
//                         }
//                         id="wd-course-desc"
//                     />
//                     <hr />
//                 </>
//             )}
//
//             <h2 id="wd-dashboard-published">
//                 {showAll
//                     ? `All Courses (${displayedCourses.length})`
//                     : `Your Enrolled Courses (${displayedCourses.length})`}
//             </h2>
//             <hr />
//
//             <div id="wd-dashboard-courses">
//                 <Row xs={1} md={3} lg={5} className="g-4">
//                     {displayedCourses.map((c) => {
//                         const isEnrolled = myEnrolledCourseIds.has(c._id);
//
//                         return (
//                             <Col
//                                 key={c._id}
//                                 className="wd-dashboard-course d-flex justify-content-center"
//                             >
//                                 <Card style={{ width: 300 }}>
//                                     <Card.Img
//                                         src={c.image || "/images/react.jpg"}
//                                         variant="top"
//                                         height={160}
//                                     />
//                                     <Card.Body className="d-flex flex-column">
//                                         <Card.Title className="text-nowrap overflow-hidden">
//                                             {c.name}
//                                         </Card.Title>
//                                         <Card.Text
//                                             className="flex-grow-1 overflow-hidden"
//                                             style={{ height: 80 }}
//                                         >
//                                             {c.description}
//                                         </Card.Text>
//
//                                         <div className="mb-2">
//                                             {isEnrolled ? (
//                                                 <Button
//                                                     variant="danger"
//                                                     size="sm"
//                                                     onClick={() => handleUnenroll(c._id)}
//                                                 >
//                                                     Unenroll
//                                                 </Button>
//                                             ) : (
//                                                 <Button
//                                                     variant="success"
//                                                     size="sm"
//                                                     onClick={() => handleEnroll(c._id)}
//                                                 >
//                                                     Enroll
//                                                 </Button>
//                                             )}
//                                         </div>
//
//                                         <ButtonGroup className="mt-auto w-100">
//                                             {isEnrolled ? (
//                                                 <Link
//                                                     to={`/Kambaz/Courses/${c._id}/Home`}
//                                                     className="btn btn-primary"
//                                                 >
//                                                     Go
//                                                 </Link>
//
//
//                                             ) : (
//                                                 <Button variant="secondary" disabled style={{ flex: 1 }}>
//                                                     Go
//                                                 </Button>
//                                             )}
//
//                                             {isFaculty && isEnrolled && (
//                                                 <>
//                                                     <Button
//                                                         id="wd-delete-course-click"
//                                                         variant="danger"
//                                                         size="sm"
//                                                         onClick={() => deleteCourse(c._id)}
//                                                     >
//                                                         Delete
//                                                     </Button>
//                                                     <Button
//                                                         id="wd-edit-course-click"
//                                                         variant="warning"
//                                                         size="sm"
//                                                         onClick={() => setCourse(c)}
//                                                     >
//                                                         Edit
//                                                     </Button>
//                                                 </>
//                                             )}
//                                         </ButtonGroup>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         );
//                     })}
//                 </Row>
//             </div>
//         </div>
//     );
// };
//
// export default Dashboard;
