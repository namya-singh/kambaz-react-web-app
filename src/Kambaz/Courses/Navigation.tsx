import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

interface Course {
    _id: string;
    name: string;
    // add other course properties if needed
}

interface CourseNavigationProps {
    course: Course;
}

export default function CourseNavigation({ course }: CourseNavigationProps) {
    const cid = course._id;

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
        <ListGroup id="wd-courses-navigation" className="wd fs-5 rounded-0 bg-white">
            {links.map((label) => {
                const to = `/Kambaz/Courses/${cid}/${label}`;
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
