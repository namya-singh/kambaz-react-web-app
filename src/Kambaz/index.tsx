/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Session from "./Account/Session";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import ProtectedRoute from "./Account/ProtectedRoute";

import { findMyCourses, createCourse, unenrollCourse } from "./Account/client";
import * as courseClient from "./Courses/client";

import type { RootState } from "./store";
import "./styles.css";

// ✅ Newly imported components for Assignments
import Assignments from "./Courses/Assignments";
import AssignmentEditor from "./Courses/Assignments/Editor.tsx";

export default function Kambaz() {
    const [courses, setCourses] = useState<any[]>([]);
    const currentUser = useSelector(
        (state: RootState) => state.accountReducer.currentUser
    );

    useEffect(() => {
        if (!currentUser) return setCourses([]);
        findMyCourses().then(setCourses).catch(() => setCourses([]));
    }, [currentUser]);

    const handleAddCourse = async (courseData: any) => {
        const created = await createCourse(courseData);
        setCourses([...courses, created]);
        return created;
    };

    const handleDeleteCourse = async (courseId: string) => {
        await courseClient.deleteCourse(courseId);
        setCourses(courses.filter((c) => c._id !== courseId));
    };

    const handleUpdateCourse = async (course: any) => {
        await courseClient.updateCourse(course);
        setCourses(courses.map((c) => (c._id === course._id ? course : c)));
    };

    // ✅ Add this function to support unenrollment
    const handleUnenrollCourse = async (courseId: string) => {
        await unenrollCourse(courseId);
        setCourses(courses.filter((c) => c._id !== courseId));
    };

    return (
        <Session>
            <div id="wd-kambaz">
                <KambazNavigation />
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Account" replace />} />
                        <Route path="Account/*" element={<Account />} />
                        <Route
                            path="Dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard
                                        courses={courses}
                                        onAddCourse={handleAddCourse}
                                        onDeleteCourse={handleDeleteCourse}
                                        onUpdateCourse={handleUpdateCourse}
                                        onUnenrollCourse={handleUnenrollCourse} // ✅ Pass it here
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="Courses/:cid/*"
                            element={
                                <ProtectedRoute>
                                    <Courses />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="Assignments"
                            element={
                                <ProtectedRoute>
                                    <Assignments />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="Assignments/:aid"
                            element={
                                <ProtectedRoute>
                                    <AssignmentEditor />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="Calendar" element={<h1>Calendar</h1>} />
                        <Route path="Inbox" element={<h1>Inbox</h1>} />
                    </Routes>
                </div>
            </div>
        </Session>
    );
}
