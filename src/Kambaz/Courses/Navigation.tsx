import { ListGroup } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";

export default function CourseNavigation() {
    const { courseId = "1234" } = useParams();

    const items = [
        { to: `/Kambaz/Courses/${courseId}/home`, label: "Home", id: "wd-course-home-link", end: true },
        { to: `/Kambaz/Courses/${courseId}/modules`, label: "Modules", id: "wd-course-modules-link" },
        { to: `/Kambaz/Courses/${courseId}/piazza`, label: "Piazza", id: "wd-course-piazza-link" },
        { to: `/Kambaz/Courses/${courseId}/zoom`, label: "Zoom Meetings", id: "wd-course-zoom-link" },
        { to: `/Kambaz/Courses/${courseId}/assignments`, label: "Assignments", id: "wd-course-assignments-link" },
        { to: `/Kambaz/Courses/${courseId}/quizzes`, label: "Quizzes", id: "wd-course-quizzes-link" },
        { to: `/Kambaz/Courses/${courseId}/grades`, label: "Grades", id: "wd-course-grades-link" },
        { to: `/Kambaz/Courses/${courseId}/people`, label: "People", id: "wd-course-people-link" },
    ];

    return (
        <ListGroup id="wd-courses-navigation" className="wd fs-5 rounded-0 bg-white">
            {items.map(({ to, label, id, end }) => (
                <NavLink
                    key={id}
                    to={to}
                    end={end}
                    style={{ textDecoration: "none" }}
                    className="w-100"
                >
                    {({ isActive }) => (
                        <ListGroup.Item
                            id={id}
                            className={[
                                "list-group-item",
                                "list-group-item-action",
                                "py-3",
                                "border-0",
                                "bg-white",
                                isActive
                                    ? "text-dark border-start border-3 border-dark"
                                    : "text-danger"
                            ].join(" ")}
                        >
                            {label}
                        </ListGroup.Item>
                    )}
                </NavLink>
            ))}
        </ListGroup>
    );
}
