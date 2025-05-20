import { Card }      from "react-bootstrap";
import { Link }      from "react-router-dom";

interface Course {
    id:       string;
    title:    string;
    subtitle: string;
    color:    "success" | "primary" | "info" | "warning" | "dark" | "danger";
}

const courses: Course[] = [
    {
        id: "CS1001",
        title: "CS1001 React JS",
        subtitle: "Full Stack Software Development",
        color: "primary",
    },
    {
        id: "CS1002",
        title: "CS1002 Node.js",
        subtitle: "Backend Development",
        color: "success",
    },
    {
        id: "CS1003",
        title: "CS1003 MongoDB",
        subtitle: "NoSQL Database Design",
        color: "info",
    },
    {
        id: "CS1004",
        title: "CS1004 TypeScript",
        subtitle: "Typed JavaScript",
        color: "warning",
    },
    {
        id: "CS1005",
        title: "CS1005 HTML & CSS",
        subtitle: "Web Fundamentals",
        color: "danger",
    },
    {
        id: "CS2300",
        title: "CS2300 Cybersecurity",
        subtitle: "Cybersecurity",
        color: "dark",
    },
];


export default function KambazDashboard() {
    return (
        <div id="wd-dashboard">
            {/* 1) Title + hr */}
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />

            {/* 2) Subtitle */}
            <h2 id="wd-dashboard-published" className="h5 text-secondary">
                Published Courses ({courses.length})
            </h2>

            {/* 3) wrapping grid with fixed‑width cards */}
            <div
                id="wd-dashboard-courses"
                className="d-flex flex-wrap mt-4"
                style={{
                    columnGap: "30px",   /* 30px between cards horizontally */
                    rowGap:    "40px",   /* 40px vertically */
                }}
            >
                {courses.map(({ id, title, subtitle, color }) => (
                    <div
                        key={id}
                        style={{
                            flex:  "0 0 auto",
                            width: "270px",   /* fixed card width */
                        }}
                    >
                        <Card className="h-100">
                            {/* colored header */}
                            <div
                                className={`bg-${color}`}
                                style={{ height: "140px", borderTopLeftRadius: "0.25rem", borderTopRightRadius: "0.25rem" }}
                            />
                            <Card.Body>
                                <Card.Title className="text-truncate">{title}</Card.Title>
                                <Card.Text className="text-truncate text-muted" style={{ height: "3rem" }}>
                                    {subtitle}
                                </Card.Text>
                                {/* makes the entire card clickable */}
                                <Link to={`/Kambaz/Courses/${id}/Home`} className="stretched-link" />
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
