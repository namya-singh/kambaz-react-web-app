import { useState } from "react";
import { FormControl, Form } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithArrays() {
    const API = `${REMOTE_SERVER}/lab5/todos`;
    const [todo, setTodo] = useState({
        id: "1",
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });

    return (
        <div id="wd-working-with-arrays" style={{ padding: "1rem" }}>
            <h3>Working with Arrays</h3>

            {/* Retrieve all todos */}
            <h4>Retrieving Arrays</h4>
            <a
                id="wd-retrieve-todos"
                className="btn btn-primary"
                href={API}
                target="_blank"
                rel="noreferrer"
            >
                Get Todos
            </a>
            <hr />

            {/* Filter by completed */}
            <h3>Filtering Array Items</h3>
            <a
                id="wd-retrieve-completed-todos"
                className="btn btn-primary"
                href={`${API}?completed=true`}
                target="_blank"
                rel="noreferrer"
            >
                Get Completed Todos
            </a>
            <hr />

            {/* Create todo (assuming backend handles GET /create for testing) */}
            <h3>Creating new Items in an Array</h3>
            <a
                className="btn btn-primary"
                href={`${API}/create`}
                target="_blank"
                rel="noreferrer"
            >
                Create Todo
            </a>
            <hr />

            {/* Delete by ID */}
            <h3>Deleting from an Array</h3>
            <div className="d-flex align-items-center mb-3" style={{ gap: "1rem" }}>
                <FormControl
                    defaultValue={todo.id}
                    className="w-50"
                    onChange={(e) => setTodo({ ...todo, id: e.target.value })}
                />
                <a
                    className="btn btn-primary"
                    href={`${API}/${todo.id}/delete`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Delete Todo with ID = {todo.id}
                </a>
            </div>
            <hr />

            {/* Retrieve by ID */}
            <h4>Retrieving an Item from an Array by ID</h4>
            <div className="d-flex align-items-center mb-3" style={{ gap: "1rem" }}>
                <FormControl
                    id="wd-todo-id"
                    className="w-50"
                    type="text"
                    value={todo.id}
                    onChange={(e) => setTodo({ ...todo, id: e.target.value })}
                />
                <a
                    id="wd-retrieve-todo-by-id"
                    className="btn btn-primary"
                    href={`${API}/${todo.id}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Get Todo by ID
                </a>
            </div>
            <hr />

            {/* Update todo title */}
            <h3>Updating an Item in an Array</h3>
            <div className="d-flex align-items-center mb-3" style={{ gap: "1rem" }}>
                <FormControl
                    className="w-25"
                    defaultValue={todo.id}
                    onChange={(e) => setTodo({ ...todo, id: e.target.value })}
                />
                <FormControl
                    className="w-50"
                    defaultValue={todo.title}
                    onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                />
                <a
                    className="btn btn-primary"
                    href={`${API}/${todo.id}/title/${encodeURIComponent(todo.title)}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Update Title
                </a>
            </div>
            <hr />

            {/* Update description */}
            <h3>Updating Description and Completed</h3>
            <div className="d-flex align-items-center mb-3" style={{ gap: "1rem", flexWrap: "wrap" }}>
                <FormControl
                    className="w-50"
                    placeholder="Description"
                    value={todo.description}
                    onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                />
                <a
                    className="btn btn-primary"
                    href={`${API}/${todo.id}/description/${encodeURIComponent(todo.description)}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Update Description
                </a>
            </div>

            <div className="d-flex align-items-center mb-3" style={{ gap: "1rem", flexWrap: "wrap" }}>
                <Form.Check
                    type="checkbox"
                    id="completed-checkbox"
                    label="Completed"
                    checked={todo.completed}
                    onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
                />
                <a
                    className="btn btn-primary"
                    href={`${API}/${todo.id}/completed/${todo.completed}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Update Completed
                </a>
            </div>
        </div>
    );
}
