export default function Modules() {
    return (
        <div id="wd-modules-screen">

            <div id="wd-modules-actions">
                <button id="wd-collapse-all">Collapse All</button>
                <button id="wd-view-progress">View Progress</button>
                <button id="wd-publish-all">Publish All</button>
                <button id="wd-add-module">+ Module</button>
            </div>


            <ul id="wd-modules">


                <li className="wd-module">
                    <div className="wd-title">Week 1</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to the course</li>
                                <li className="wd-content-item">Learn what is Web Development</li>
                            </ul>
                        </li>
                        <li className="wd-lesson">
                            <span className="wd-title">READING</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Full Stack Developer - Chapter 1 - Introduction</li>
                                <li className="wd-content-item">Full Stack Developer - Chapter 2 - Creating User Interface</li>
                            </ul>
                        </li>
                        <li className="wd-lesson">
                            <span className="wd-title">SLIDES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to web development</li>
                                <li className="wd-content-item">Creating HTTP Server with Node.js</li>
                                <li className="wd-content-item">Creating a React Application</li>
                            </ul>
                        </li>
                    </ul>
                </li>


                <li className="wd-module">
                    <div className="wd-title">Week 2</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">Prototyping the React Kambaz User Interface with HTML</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
                                <li className="wd-content-item">Keep working on assignment 1</li>
                                <li className="wd-content-item">Context Module Sub Header</li>
                                <li className="wd-content-item">Deploy the assignment to Netlify</li>
                            </ul>
                        </li>
                        <li className="wd-lesson">
                            <span className="wd-title">READING</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Full Stack Developer - Chapter 3 - HTML Prototyping</li>
                                <li className="wd-content-item">HTML Reference Guide</li>
                            </ul>
                        </li>
                        <li className="wd-lesson">
                            <span className="wd-title">SLIDES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">HTML Basics and Semantic Elements</li>
                                <li className="wd-content-item">Structuring Content with HTML</li>
                            </ul>
                        </li>
                    </ul>
                </li>


                <li className="wd-module">
                    <div className="wd-title">Week 3</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">Styling Web Pages with CSS and Bootstrap, Assignment 2</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to CSS</li>
                                <li className="wd-content-item">Selectors by tag ID, classes, and document structure</li>
                                <li className="wd-content-item">Context Module Sub Header</li>
                                <li className="wd-content-item">Styling color and background color</li>
                                <li className="wd-content-item">Styling dimensions and positions</li>
                                <li className="wd-content-item">Context Module Sub Header</li>
                                <li className="wd-content-item">The box model - styling margins, borders, and paddings</li>
                            </ul>
                        </li>
                        <li className="wd-lesson">
                            <span className="wd-title">READING</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Full Stack Developer - Chapter 4 - Styling Web Pages</li>
                                <li className="wd-content-item">CSS Reference Guide</li>
                            </ul>
                        </li>
                        <li className="wd-lesson">
                            <span className="wd-title">SLIDES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">CSS Basics and Selectors</li>
                                <li className="wd-content-item">Using Bootstrap for Responsive Design</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
