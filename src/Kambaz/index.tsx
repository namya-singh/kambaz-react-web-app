/* eslint-disable @typescript-eslint/no-explicit-any */

import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Session from "./Account/Session";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import ProtectedRoute from "./Account/ProtectedRoute";

import type { RootState } from "./store";

import "./styles.css";

// Newly imported components for Assignments
import Assignments from "./Courses/Assignments";
import AssignmentEditor from "./Courses/Assignments/Editor.tsx";

export default function Kambaz() {
    const currentUser = useSelector(
        (state: RootState) => state.accountReducer.currentUser
    );

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
                                    <Dashboard />
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
                                    <Assignments isFaculty={currentUser?.role === "FACULTY"} />

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
