import { useEffect, useState } from "react";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
    const ASSIGNMENT_API = `${REMOTE_SERVER}/lab5/assignment`;

    const [assignment, setAssignment] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10",
        completed: false,
        score: 0,
    });

    // Fetch the current assignment from the server
    useEffect(() => {
        fetch(ASSIGNMENT_API)
            .then((res) => res.json())
            .then(setAssignment)
            .catch((err) => console.error("Failed to fetch assignment", err));
    }, []);

    const encodedTitle = encodeURIComponent(assignment.title);
    const encodedScore = encodeURIComponent(assignment.score);
    const encodedCompleted = encodeURIComponent(assignment.completed);

    return (
        <div id="wd-working-with-objects" style={{ padding: "1rem" }}>
            <h3>Working With Objects</h3>

            {/* Retrieve Assignment Object */}
            <h4>Retrieving Objects</h4>
            <a
                id="wd-retrieve-assignments"
                className="btn btn-primary mb-2"
                href={`${ASSIGNMENT_API}`}
                target="_blank"
                rel="noreferrer"
            >
                Get Assignment
            </a>

            {/* Retrieve Assignment Title */}
            <h4>Retrieving Properties</h4>
            <a
                id="wd-retrieve-assignment-title"
                className="btn btn-primary mb-2"
                href={`${ASSIGNMENT_API}/title`}
                target="_blank"
                rel="noreferrer"
            >
                Get Title
            </a>

            {/* Modify Title */}
            <h4>Modifying Title</h4>
            <input
                id="wd-assignment-title"
                className="form-control w-75 mb-2"
                type="text"
                value={assignment.title}
                onChange={(e) =>
                    setAssignment({ ...assignment, title: e.target.value })
                }
            />
            <a
                id="wd-update-assignment-title"
                className="btn btn-success mb-3"
                href={`${ASSIGNMENT_API}/title/${encodedTitle}`}
            >
                Update Title
            </a>

            {/* Modify Score */}
            <h4>Modifying Score</h4>
            <input
                id="wd-assignment-score"
                className="form-control w-25 mb-2"
                type="number"
                value={assignment.score}
                onChange={(e) =>
                    setAssignment({ ...assignment, score: parseInt(e.target.value) })
                }
            />
            <a
                id="wd-update-assignment-score"
                className="btn btn-success mb-3"
                href={`${ASSIGNMENT_API}/score/${encodedScore}`}
            >
                Update Score
            </a>

            {/* Modify Completed */}
            <h4>Modifying Completed</h4>
            <div className="form-check mb-2">
                <input
                    id="wd-assignment-completed"
                    className="form-check-input"
                    type="checkbox"
                    checked={assignment.completed}
                    onChange={(e) =>
                        setAssignment({ ...assignment, completed: e.target.checked })
                    }
                />
                <label htmlFor="wd-assignment-completed" className="form-check-label">
                    Completed
                </label>
            </div>
            <a
                id="wd-update-assignment-completed"
                className="btn btn-success mb-3"
                href={`${ASSIGNMENT_API}/completed/${encodedCompleted}`}
            >
                Update Completed
            </a>

            {/* Debug Output */}
            <h5>Assignment Object</h5>
            <pre>{JSON.stringify(assignment, null, 2)}</pre>
        </div>
    );
}
