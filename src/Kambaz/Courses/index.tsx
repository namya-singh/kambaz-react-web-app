import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { courses } from "../Database";


import { Navigate, Route, Routes, useParams, useLocation } from "react-router";

import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";

export default function Courses() {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]}


            </h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block bg-white border-end pe-4">
                    <CourseNavigation />
                </div>
                <div className="flex-fill ps-4">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="Piazza" element={<h2 className="p-3">Piazza</h2>} />
                        <Route path="Zoom" element={<h2 className="p-3">Zoom Meetings</h2>} />
                        <Route path="Quizzes" element={<h2 className="p-3">Quizzes</h2>} />
                        <Route path="Grades" element={<h2 className="p-3">Grades</h2>} />
                        <Route path="People" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
