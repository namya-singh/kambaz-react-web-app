// import { ListGroup } from "react-bootstrap";
// import { NavLink, useParams, useLocation } from "react-router-dom";
//
// export default function CourseNavigation() {
//     const { courseId = "1234" } = useParams<{ courseId: string }>();
//     const location = useLocation();
//
//     const items = [
//         { to: `/Kambaz/Courses/${courseId}/Home`,        label: "Home",        id: "wd-course-home-link",        end: true },
//         { to: `/Kambaz/Courses/${courseId}/Modules`,     label: "Modules",     id: "wd-course-modules-link" },
//         { to: `/Kambaz/Courses/${courseId}/Piazza`,      label: "Piazza",      id: "wd-course-piazza-link" },
//         { to: `/Kambaz/Courses/${courseId}/Zoom`,        label: "Zoom Meetings",id: "wd-course-zoom-link" },
//         { to: `/Kambaz/Courses/${courseId}/Assignments`, label: "Assignments", id: "wd-course-assignments-link" },
//         { to: `/Kambaz/Courses/${courseId}/Quizzes`,     label: "Quizzes",     id: "wd-course-quizzes-link" },
//         { to: `/Kambaz/Courses/${courseId}/Grades`,      label: "Grades",      id: "wd-course-grades-link" },
//         { to: `/Kambaz/Courses/${courseId}/People`,      label: "People",      id: "wd-course-people-link" },
//     ];
//
//     // Check if the current path matches any item explicitly
//     const isAnyActive = items.some(item => location.pathname === item.to);
//
//     return (
//         <ListGroup
//             id="wd-courses-navigation"
//             className="wd fs-5 rounded-0 bg-white"
//         >
//             {items.map(({ to, label, id, end }) => (
//                 <NavLink key={id} to={to} end={end} style={{ textDecoration: "none" }}>
//                     {({ isActive }) => {
//                         const isHomeForcedActive = label === "Home" && !isAnyActive;
//                         const active = isActive || isHomeForcedActive;
//
//                         return (
//                             <ListGroup.Item
//                                 id={id}
//                                 className={[
//                                     "list-group-item",
//                                     "list-group-item-action",
//                                     "w-100",
//                                     "py-3",
//                                     "border-0",
//                                     "bg-white",
//                                     active
//                                         ? "text-dark border-start border-3 border-dark"
//                                         : "text-danger"
//                                 ].join(" ")}
//                             >
//                                 {label}
//                             </ListGroup.Item>
//                         );
//                     }}
//                 </NavLink>
//             ))}
//         </ListGroup>
//     );
// }





import { ListGroup } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";

export default function CourseNavigation() {
    // grab the same “cid” param you defined in your Routes
    const { cid } = useParams<{ cid: string }>();

    // just an array of labels—no hardcoding of JSX
    const links = [
        "Home",
        "Modules",
        "Piazza",
        "Zoom",
        "Assignments",
        "Quizzes",
        "Grades",
        "People",
    ];

    return (
        <ListGroup
            id="wd-courses-navigation"
            className="wd fs-5 rounded-0 bg-white"
        >
            {links.map((label) => {
                // build each URL from the current course ID + label
                const to = `/Kambaz/Courses/${cid}/${label}`;
                // only “Home” should use exact matching
                const end = label === "Home";

                return (
                    <NavLink
                        key={label}
                        to={to}
                        end={end}
                        style={{ textDecoration: "none" }}
                    >
                        {({ isActive }: { isActive: boolean }) => (
                            <ListGroup.Item
                                id={`wd-course-${label.toLowerCase()}-link`}
                                className={[
                                    "list-group-item",
                                    "list-group-item-action",
                                    "w-100",
                                    "py-3",
                                    "border-0",
                                    "bg-white",
                                    // exactly your original styling:
                                    isActive
                                        ? "text-dark border-start border-3 border-dark"
                                        : "text-danger",
                                ].join(" ")}
                            >
                                {label}
                            </ListGroup.Item>
                        )}
                    </NavLink>
                );
            })}
        </ListGroup>
    );
}
