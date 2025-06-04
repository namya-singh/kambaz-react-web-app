
import { Routes, Route, Navigate } from "react-router-dom";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import Assignments from "./Courses/Assignments";
import AssignmentEditor from "./Courses/Assignments/Editor.tsx";

export default function Kambaz() {
    return (
        <div id="wd-kambaz">
            <KambazNavigation />
            <div className="wd-main-content-offset p-3">
                <Routes>
                    {/* When someone hits #/Kambaz exactly, send them to #/Kambaz/Account */}
                    <Route path="/" element={<Navigate to="Account" />} />

                    {/* All of these live under #/Kambaz/... (no leading slash) */}
                    <Route path="Account/*" element={<Account />} />
                    <Route path="Dashboard" element={<Dashboard />} />
                    <Route path="Courses/:cid/*" element={<Courses />} />
                    <Route path="Assignments" element={<Assignments />} />
                    <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                    <Route path="Calendar" element={<h1>Calendar</h1>} />
                    <Route path="Inbox" element={<h1>Inbox</h1>} />
                </Routes>
            </div>
        </div>
    );
}