export default function Assignments() {
    return (
        <div id="wd-assignments">
            <input placeholder="Search for Assignments"
                   id="wd-search-assignment" />
            <button id="wd-add-assignment-group">+ Group</button>
            <button id="wd-add-assignment">+ Assignment</button>

            <h3 id="wd-assignments-title">
                ASSIGNMENTS 40% of Total <button>Edit</button>
            </h3>
            <ul id="wd-assignment-list">
                <li className="wd-assignment-list-item">
                    <a href="#/Kambaz/Courses/1234/Assignments/123"
                       className="wd-assignment-link">
                        A1 - ENV + HTML
                    </a>
                    <div><a href="#">Multiple Modules</a> | Not Available Yet</div>
                </li>
                <li className="wd-assignment-list-item">
                    <a href="#">A2 - CSS + BOOTSTRAP</a>
                    <div><a href="#">Multiple Modules</a> | Not Available Yet</div>
                </li>
                <li className="wd-assignment-list-item">
                    <a href="#">A3 - JS + REACT</a>
                    <div><a href="#">Multiple Modules</a> | Not Available Yet</div>
                </li>
                <li className="wd-assignment-list-item">
                    <a href="#">A4 - STATE + REDUX</a>
                    <div><a href="#">Multiple Modules</a> | Not Available Yet</div>
                </li>
                <li className="wd-assignment-list-item">
                    <a href="#">A5 - NODE + SESSION</a>
                    <div><a href="#">Multiple Modules</a> | Not Available Yet</div>
                </li>
                <li className="wd-assignment-list-item">
                    <a href="#">A6 - MONGO + MONGOOSH</a>
                    <div><a href="#">Multiple Modules</a> | Not Available Yet</div>
                </li>
            </ul>
        </div>
    );
}
