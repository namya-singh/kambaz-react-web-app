import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1><hr />
            <h2 id="wd-dashboard-published">Published Courses (6)</h2><hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/CS1001/Home" className="wd-dashboard-course-link">
                        <img src="/images/react.png" width={200} alt="React JS logo" />
                        <div>
                            <h5>CS1001 React JS</h5>
                            <p className="wd-dashboard-course-title">Full Stack Software Development</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/CS1002/Home" className="wd-dashboard-course-link">
                        <img src="/images/node.webp" width={200} alt="Node.js logo" />
                        <div>
                            <h5>CS1002 Node.js</h5>
                            <p className="wd-dashboard-course-title">Backend Development</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>


                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/CS1003/Home" className="wd-dashboard-course-link">
                        <img src="/images/mongo.png" width={200} alt="MongoDB logo" />
                        <div>
                            <h5>CS1003 MongoDB</h5>
                            <p className="wd-dashboard-course-title">NoSQL Database Design</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>


                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/CS1004/Home" className="wd-dashboard-course-link">
                        <img src="/images/ts.webp" width={200} alt="TypeScript logo" />
                        <div>
                            <h5>CS1004 TypeScript</h5>
                            <p className="wd-dashboard-course-title">Typed JavaScript</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/CS1005/Home" className="wd-dashboard-course-link">
                        <img src="/images/hc.png" width={200} alt="HTML & CSS icon" />
                        <div>
                            <h5>CS1005 HTML &amp; CSS</h5>
                            <p className="wd-dashboard-course-title">Web Fundamentals</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/CS1006/Home" className="wd-dashboard-course-link">
                        <img src="/images/c.jpeg" width={200} alt="Cybersecurity logo" />
                        <div>
                            <h5>CS2300 Cybersecurity</h5>
                            <p className="wd-dashboard-course-title">Cybersecurity</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>


            </div>
        </div>
    );
}