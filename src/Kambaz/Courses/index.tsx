//
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useParams, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import * as userClient from "../Account/client";
// import CourseNavigation from "./Navigation";
// import Home from "./Home";
// import Modules from "./Modules";
// import Assignments from "./Assignments";
// import AssignmentEditor from "./Assignments/Editor";
// import PeopleTable from "./People/Table";
// import { FaAlignJustify } from "react-icons/fa";
//
//
// export default function Kambaz() {
//     const [courses, setCourses] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const { currentUser } = useSelector((state: any) => state.accountReducer);
//     const { cid } = useParams<{ cid?: string }>();
//     const { pathname } = useLocation();
//
//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 if (!currentUser?._id) {
//                     setCourses([]);
//                     return;
//                 }
//                 const fetchedCourses = await userClient.findCoursesForUser(currentUser._id);
//                 setCourses(fetchedCourses);
//             } catch (error) {
//                 console.error("Failed to fetch courses:", error);
//                 setCourses([]);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         if (currentUser) {
//             setLoading(true);
//             fetchCourses();
//         } else {
//             setCourses([]);
//             setLoading(false);
//         }
//     }, [currentUser]);
//
//     const course = courses.find((c) => c._id === cid);
//     const isFaculty = currentUser?.role === "FACULTY";
//
//     if (!cid) return <Navigate to="/Kambaz/Dashboard" replace />;
//     if (loading) return null; // Or return a spinner
//     if (!course) return <h2 className="p-3 text-danger">Course not found</h2>;
//
//     const currentPage = pathname.split("/")[4] || "Home";
//
//     return (
//         <div id="wd-courses" className="p-3">
//             <h2 className="text-danger mb-3">
//                 <FaAlignJustify className="me-2 fs-4 mb-1" />
//                 {course.name} &gt; {currentPage}
//             </h2>
//             <hr />
//
//             <div className="d-flex">
//                 <div className="d-none d-md-block bg-white border-end pe-4">
//                     <CourseNavigation course={course} />
//                 </div>
//
//                 <div className="flex-fill ps-4">
//                     <Routes>
//                         <Route index element={<Navigate to="Home" replace />} />
//                         <Route path="Home" element={<Home />} />
//                         <Route path="Modules" element={<Modules />} />
//                         <Route path="Assignments" element={<Assignments isFaculty={isFaculty} />} />
//                         <Route path="Assignments/New" element={<AssignmentEditor />} />
//                         <Route path="Assignments/:aid" element={<AssignmentEditor />} />
//                         <Route path="People" element={<PeopleTable />} />
//                         <Route path="Piazza" element={<h2 className="p-3">Piazza</h2>} />
//                         <Route path="Zoom" element={<h2 className="p-3">Zoom Meetings</h2>} />
//                         <Route path="Quizzes" element={<h2 className="p-3">Quizzes</h2>} />
//                         <Route path="Grades" element={<h2 className="p-3">Grades</h2>} />
//                     </Routes>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
//
//

//
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useParams, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import * as courseClient from "../Courses/client";
// import CourseNavigation from "./Navigation";
// import Home from "./Home";
// import Modules from "./Modules";
// import Assignments from "./Assignments";
// import AssignmentEditor from "./Assignments/Editor";
// import PeopleTable from "./People/Table";
// import { FaAlignJustify } from "react-icons/fa";
//
// export default function Kambaz() {
//     const [courses, setCourses] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const { currentUser } = useSelector((state: any) => state.accountReducer);
//     const { cid } = useParams<{ cid?: string }>();
//     const { pathname } = useLocation();
//
//     // Fetch all courses whenever currentUser changes
//     useEffect(() => {
//         const fetchCourses = async () => {
//             setLoading(true);
//             try {
//                 const fetchedCourses = await courseClient.fetchAllCourses();
//                 setCourses(fetchedCourses);
//             } catch (error) {
//                 console.error("Failed to fetch courses:", error);
//                 setCourses([]);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         if (currentUser) {
//             fetchCourses();
//         } else {
//             setCourses([]);
//             setLoading(false);
//         }
//     }, [currentUser]);
//
//     const course = courses.find((c) => c._id === cid);
//     const isFaculty = currentUser?.role === "FACULTY";
//
//     if (!cid) return <Navigate to="/Kambaz/Dashboard" replace />;
//     if (loading) return null; // Or a spinner component
//     if (!course) return <h2 className="p-3 text-danger">Course not found</h2>;
//
//     const currentPage = pathname.split("/")[4] || "Home";
//
//     return (
//         <div id="wd-courses" className="p-3">
//             <h2 className="text-danger mb-3">
//                 <FaAlignJustify className="me-2 fs-4 mb-1" />
//                 {course.name} &gt; {currentPage}
//             </h2>
//             <hr />
//
//             <div className="d-flex">
//                 <div className="d-none d-md-block bg-white border-end pe-4">
//                     <CourseNavigation course={course} />
//                 </div>
//
//                 <div className="flex-fill ps-4">
//                     <Routes>
//                         <Route index element={<Navigate to="Home" replace />} />
//                         <Route path="Home" element={<Home />} />
//                         <Route path="Modules" element={<Modules />} />
//                         <Route path="Assignments" element={<Assignments isFaculty={isFaculty} />} />
//                         <Route path="Assignments/New" element={<AssignmentEditor />} />
//                         <Route path="Assignments/:aid" element={<AssignmentEditor />} />
//                         <Route path="People" element={<PeopleTable />} />
//                         <Route path="Piazza" element={<h2 className="p-3">Piazza</h2>} />
//                         <Route path="Zoom" element={<h2 className="p-3">Zoom Meetings</h2>} />
//                         <Route path="Quizzes" element={<h2 className="p-3">Quizzes</h2>} />
//                         <Route path="Grades" element={<h2 className="p-3">Grades</h2>} />
//                     </Routes>
//                 </div>
//             </div>
//         </div>
//     );
// }


//
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useParams, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import CourseNavigation from "./Navigation";
// import Home from "./Home";
// import Modules from "./Modules";
// import Assignments from "./Assignments";
// import AssignmentEditor from "./Assignments/Editor";
// import PeopleTable from "./People/Table";
// import { FaAlignJustify } from "react-icons/fa";
//
// interface CoursesProps {
//     courses: any[];
//     setCourses: React.Dispatch<React.SetStateAction<any[]>>;
//     updateCourse: (course: any) => Promise<void>;
//     currentUser?: any;
//     deleteCourse?: (courseId: string) => Promise<void>;
// }
//
// export default function Courses({ courses, currentUser }: CoursesProps) {
//     const { cid } = useParams<{ cid?: string }>();
//     const { pathname } = useLocation();
//
//     const course = courses.find((c) => c._id === cid);
//     const isFaculty = currentUser?.role === "FACULTY";
//
//     if (!cid) return <Navigate to="/Kambaz/Dashboard" replace />;
//     if (!course) return <h2 className="p-3 text-danger">Course not found</h2>;
//
//     const currentPage = pathname.split("/")[4] || "Home";
//
//     return (
//         <div id="wd-courses" className="p-3">
//             <h2 className="text-danger mb-3">
//                 <FaAlignJustify className="me-2 fs-4 mb-1" />
//                 {course.name} &gt; {currentPage}
//             </h2>
//             <hr />
//
//             <div className="d-flex">
//                 <div className="d-none d-md-block bg-white border-end pe-4">
//                     <CourseNavigation course={course} />
//                 </div>
//
//                 <div className="flex-fill ps-4">
//                     <Routes>
//                         <Route index element={<Navigate to="Home" replace />} />
//                         <Route path="Home" element={<Home />} />
//                         <Route path="Modules" element={<Modules />} />
//                         <Route path="Assignments" element={<Assignments isFaculty={isFaculty} />} />
//                         <Route path="Assignments/New" element={<AssignmentEditor />} />
//                         <Route path="Assignments/:aid" element={<AssignmentEditor />} />
//                         <Route path="People" element={<PeopleTable />} />
//                         <Route path="Piazza" element={<h2 className="p-3">Piazza</h2>} />
//                         <Route path="Zoom" element={<h2 className="p-3">Zoom Meetings</h2>} />
//                         <Route path="Quizzes" element={<h2 className="p-3">Quizzes</h2>} />
//                         <Route path="Grades" element={<h2 className="p-3">Grades</h2>} />
//                     </Routes>
//                 </div>
//             </div>
//         </div>
//     );
// }




/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, Routes, Route, Navigate, useLocation } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { FaAlignJustify } from "react-icons/fa";
import * as client from "./client"; // adjust path if needed

interface CoursesProps {
    courses: any[];
    setCourses: React.Dispatch<React.SetStateAction<any[]>>;
    updateCourse: (course: any) => Promise<void>;
    currentUser?: any;
    deleteCourse?: (courseId: string) => Promise<void>;
}

export default function Courses({ courses, currentUser }: CoursesProps) {
    const { cid } = useParams<{ cid?: string }>();
    const { pathname } = useLocation();

    const course = courses.find((c) => c._id === cid);
    const isFaculty = currentUser?.role === "FACULTY";

    // State for users enrolled in this course
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!cid) return;
        setLoading(true);
        setError(null);
        client.findUsersForCourse(cid)
            .then(setUsers)
            .catch(e => setError(e.message || "Failed to load users"))
            .finally(() => setLoading(false));
    }, [cid]);

    if (!cid) return <Navigate to="/Kambaz/Dashboard" replace />;
    if (!course) return <h2 className="p-3 text-danger">Course not found</h2>;

    const currentPage = pathname.split("/")[4] || "Home";

    return (
        <div id="wd-courses" className="p-3">
            <h2 className="text-danger mb-3">
                <FaAlignJustify className="me-2 fs-4 mb-1" />
                {course.name} &gt; {currentPage}
            </h2>
            <hr />

            <div className="d-flex">
                <div className="d-none d-md-block bg-white border-end pe-4">
                    <CourseNavigation course={course} />
                </div>

                <div className="flex-fill ps-4">
                    <Routes>
                        <Route index element={<Navigate to="Home" replace />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments isFaculty={isFaculty} />} />
                        <Route path="Assignments/New" element={<AssignmentEditor />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />

                        <Route path="People" element={
                            loading ? (
                                <div>Loading users...</div>
                            ) : error ? (
                                <div className="text-danger">{error}</div>
                            ) : (
                                <PeopleTable users={users} />
                            )
                        } />

                        <Route path="Piazza" element={<h2 className="p-3">Piazza</h2>} />
                        <Route path="Zoom" element={<h2 className="p-3">Zoom Meetings</h2>} />
                        <Route path="Quizzes" element={<h2 className="p-3">Quizzes</h2>} />
                        <Route path="Grades" element={<h2 className="p-3">Grades</h2>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
