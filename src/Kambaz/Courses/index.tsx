/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Routes, Route, Navigate, useLocation } from "react-router-dom";
import * as userClient from "../Account/client";
import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { FaAlignJustify } from "react-icons/fa";

export default function Kambaz() {
    const [courses, setCourses] = useState<any[]>([]);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { cid } = useParams<{ cid?: string }>();
    const { pathname } = useLocation();

    // Fetch courses when currentUser changes
    const fetchCourses = async () => {
        try {
            const fetchedCourses = await userClient.findMyCourses();
            setCourses(fetchedCourses);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        }
    };

    useEffect(() => {
        if (currentUser) {
            fetchCourses();
        } else {
            setCourses([]);
        }
    }, [currentUser]);

    // Find the selected course
    const course = courses.find((c) => c._id === cid);

    // Set isFaculty based on currentUser's role
    const isFaculty = currentUser?.role === "FACULTY";

    // If no course id in URL, redirect to dashboard
    if (!cid) return <Navigate to="/Kambaz/Dashboard" replace />;

    // If course not found show error
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
                        <Route
                            path="Assignments"
                            element={<Assignments isFaculty={isFaculty} />}
                        />
                        <Route path="Assignments/New" element={<AssignmentEditor />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="People" element={<PeopleTable />} />
                        <Route path="Piazza" element={<h2 className="p-3">Piazza</h2>} />
                        <Route
                            path="Zoom"
                            element={<h2 className="p-3">Zoom Meetings</h2>}
                        />
                        <Route path="Quizzes" element={<h2 className="p-3">Quizzes</h2>} />
                        <Route path="Grades" element={<h2 className="p-3">Grades</h2>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
