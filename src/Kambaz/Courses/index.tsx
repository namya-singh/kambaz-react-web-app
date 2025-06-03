import { useParams, useLocation, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { Course } from "./reducer";

import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { FaAlignJustify } from "react-icons/fa";

export default function Courses() {
    const { cid } = useParams<{ cid: string }>();
    const { pathname } = useLocation();

    const courses = useSelector(
        (state: RootState) => state.coursesReducer.all
    ) as Course[];

    const currentUser = useSelector(
        (state: RootState) => state.accountReducer.currentUser
    );

    const enrollments = useSelector(
        (state: RootState) => state.enrollmentReducer.data
    ) as { user: string; course: string }[];

    // Guard if cid is undefined
    if (!cid) {
        return <Navigate to="/Dashboard" replace />;
    }

    const enrolledCourseIds = enrollments
        .filter((e) => e.user === currentUser?._id)
        .map((e) => e.course);

    // Find the course using _id
    const course = courses.find((c) => c._id === cid);

    if (!course) {
        return <h2 className="p-3 text-danger">Course not found</h2>;
    }

    if (!enrolledCourseIds.includes(course._id)) {
        return <Navigate to="/Dashboard" replace />;
    }

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course.name} &gt; {pathname.split("/")[4] || "Home"}
            </h2>
            <hr />

            <div className="d-flex">
                <div className="d-none d-md-block bg-white border-end pe-4">
                    <CourseNavigation />
                </div>
                <div className="flex-fill ps-4">
                    {/* IMPORTANT: Add nested routes with '*' so child routes render */}
                    <Routes>
                        <Route index element={<Navigate to="Home" replace />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
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
