// Kambaz/Courses/Home.tsx

import { useParams } from "react-router-dom";
import * as db from "../../Database";
import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
    const { cid } = useParams<{ cid?: string }>();
    const course = db.courses.find((c) => c._id === cid);

    if (!course) {
        return <h4 className="text-danger p-3">Course not found</h4>;
    }

    return (
        <div className="d-flex">
            <div className="flex-fill">
                {/* No props passed here! Modules uses useParams internally */}
                <Modules />
            </div>
            <div className="d-none d-xl-block ms-4" style={{ width: 350 }}>
                <CourseStatus />
            </div>
        </div>
    );
}
