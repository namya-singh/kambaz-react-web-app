import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import CourseStatus from "../Home/Status";

export default function Modules() {
    return (
        <div className="d-flex">
            <div className="flex-fill">
                {/* Action Buttons */}


                <ModulesControls />
                <div style={{ height: "2rem" }} />

                {/* Modules List */}
                <ListGroup className="rounded-0" id="wd-modules">
                    {/* Week 1 */}
                    <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3" />
                            Week 1 <ModuleControlButtons />
                        </div>
                        <ListGroup className="wd-lessons rounded-0">
                            {[
                                "LEARNING OBJECTIVES",
                                "Introduction to the course",
                                "Learn what is Web Development",
                                "Full Stack Developer - Chapter 1 - Introduction",
                                "Full Stack Developer - Chapter 2 - Creating User Interface",
                                "Introduction to web development",
                                "Creating HTTP Server with Node.js",
                                "Creating a React Application"
                            ].map((lesson, idx) => (
                                <ListGroup.Item className="wd-lesson p-3 ps-1" key={idx}>
                                    <BsGripVertical className="me-2 fs-3" /> {lesson} <LessonControlButtons />
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </ListGroup.Item>

                    {/* Week 2 */}
                    <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3" />
                            Week 2 <ModuleControlButtons />
                        </div>
                        <ListGroup className="wd-lessons rounded-0">
                            {[
                                "Prototyping the React Kambaz User Interface with HTML",
                                "Learn how to create user interfaces with HTML",
                                "Keep working on assignment 1",
                                "Context Module Sub Header",
                                "Deploy the assignment to Netlify",
                                "Full Stack Developer - Chapter 3 - HTML Prototyping",
                                "HTML Reference Guide",
                                "HTML Basics and Semantic Elements",
                                "Structuring Content with HTML"
                            ].map((lesson, idx) => (
                                <ListGroup.Item className="wd-lesson p-3 ps-1" key={idx}>
                                    <BsGripVertical className="me-2 fs-3" /> {lesson} <LessonControlButtons />
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </ListGroup.Item>

                    {/* Week 3 */}
                    <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3" />
                            Week 3 <ModuleControlButtons />
                        </div>
                        <ListGroup className="wd-lessons rounded-0">
                            {[
                                "Styling Web Pages with CSS and Bootstrap, Assignment 2",
                                "Introduction to CSS",
                                "Selectors by tag ID, classes, and document structure",
                                "Context Module Sub Header",
                                "Styling color and background color",
                                "Styling dimensions and positions",
                                "Context Module Sub Header",
                                "The box model - styling margins, borders, and paddings",
                                "Full Stack Developer - Chapter 4 - Styling Web Pages",
                                "CSS Reference Guide",
                                "CSS Basics and Selectors",
                                "Using Bootstrap for Responsive Design"
                            ].map((lesson, idx) => (
                                <ListGroup.Item className="wd-lesson p-3 ps-1" key={idx}>
                                    <BsGripVertical className="me-2 fs-3" /> {lesson} <LessonControlButtons />
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </ListGroup.Item>
                </ListGroup>
            </div>

            {/* Course Status on large screens */}
            <div className="d-none d-xl-block ms-4" style={{ width: 350 }}>
                <CourseStatus />
            </div>
        </div>
    );
}
