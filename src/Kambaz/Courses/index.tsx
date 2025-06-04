/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams, Routes, Route, Navigate, useLocation } from "react-router-dom";
import * as db from "../Database"; // Adjust the relative path if needed

import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { FaAlignJustify } from "react-icons/fa";

export default function Courses() {
    const { cid } = useParams<{ cid?: string }>();
    const { pathname } = useLocation();

    const courses = db.courses; // Use static course list from db

    if (!cid) return <Navigate to="/Kambaz/Dashboard" replace />;

    const course = courses.find((c) => c._id === cid);
    if (!course) return <h2 className="p-3 text-danger">Course not found</h2>;

    const currentPage = pathname.split("/")[4] || "Home";

    return (
        <div id="wd-courses">
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
                        <Route path="Assignments" element={<Assignments isFaculty={false} />} />
                        <Route path="Assignments/New" element={<AssignmentEditor />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="People" element={<PeopleTable />} />
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
