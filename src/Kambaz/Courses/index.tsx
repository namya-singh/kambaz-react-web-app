import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";

import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";

export default function Courses() {
    const { courseId } = useParams();

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
            </h2>
            <h2>Course {courseId}</h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block bg-white border-end pe-4">
                    <CourseNavigation />
                </div>
                <div className="flex-fill ps-4">
                    <Routes>
                        {/* Default redirect to /home */}
                        <Route index element={<Navigate to="home" replace />} />

                        {/* Course Sub-Routes */}
                        <Route path="home" element={<Home />} />
                        <Route path="modules" element={<Modules />} />
                        <Route path="assignments" element={<Assignments />} />
                        <Route path="assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="piazza" element={<h2 className="p-3">Piazza</h2>} />
                        <Route path="zoom" element={<h2 className="p-3">Zoom Meetings</h2>} />
                        <Route path="quizzes" element={<h2 className="p-3">Quizzes</h2>} />
                        <Route path="grades" element={<h2 className="p-3">Grades</h2>} />
                        <Route path="people" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
