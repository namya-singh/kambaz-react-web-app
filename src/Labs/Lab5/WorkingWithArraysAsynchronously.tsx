/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import * as client from "./client";
import { FormControl, ListGroup } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";

export default function WorkingWithArraysAsynchronously() {
    const [todos, setTodos] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchTodos = async () => {
        try {
            const todos = await client.fetchTodos();
            setTodos(todos);
            setErrorMessage(null);
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Failed to fetch todos");
        }
    };

    const removeTodo = async (todo: any) => {
        try {
            const updatedTodos = await client.removeTodo(todo);
            setTodos(updatedTodos);
            setErrorMessage(null);
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Failed to remove todo");
        }
    };

    const createTodo = async () => {
        try {
            const todos = await client.createTodo();
            setTodos(todos);
            setErrorMessage(null);
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Failed to create todo");
        }
    };

    const postTodo = async () => {
        try {
            const newTodo = await client.postTodo({ title: "New Posted Todo", completed: false });
            setTodos([...todos, newTodo]);
            setErrorMessage(null);
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Failed to post todo");
        }
    };

    const deleteTodo = async (todo: any) => {
        try {
            await client.deleteTodo(todo);
            const newTodos = todos.filter((t) => t.id !== todo.id);
            setTodos(newTodos);
            setErrorMessage(null);
        } catch (error: any) {
            console.error(error);
            setErrorMessage(error.response?.data?.message || "Failed to delete todo");
        }
    };

    const editTodo = (todo: any) => {
        const updatedTodos = todos.map((t) => (t.id === todo.id ? { ...todo, editing: true } : t));
        setTodos(updatedTodos);
    };

    const updateTodo = async (todo: any) => {
        try {
            await client.updateTodo(todo);
            setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
            setErrorMessage(null);
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Failed to update todo");
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div id="wd-asynchronous-arrays">
            <h3>Working with Arrays Asynchronously</h3>

            {/* Show error message if exists */}
            {errorMessage && (
                <div id="wd-todo-error-message" className="alert alert-danger mb-2 mt-2">
                    {errorMessage}
                </div>
            )}

            <h4>Todos</h4>
            <FaPlusCircle
                onClick={createTodo}
                className="text-success float-end fs-3"
                id="wd-create-todo"
                style={{ cursor: "pointer" }}
            />
            <FaPlusCircle
                onClick={postTodo}
                className="text-primary float-end fs-3 me-3"
                id="wd-post-todo"
                style={{ cursor: "pointer" }}
            />

            <ListGroup>
                {todos.map((todo) => (
                    <ListGroup.Item key={todo.id} className="d-flex align-items-center">
                        {/* Checkbox on left */}
                        <input
                            type="checkbox"
                            className="form-check-input me-2"
                            checked={todo.completed}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                updateTodo({ ...todo, completed: e.target.checked })
                            }
                        />

                        {/* Title or editable input */}
                        {!todo.editing ? (
                            <span style={{ textDecoration: todo.completed ? "line-through" : "none", flexGrow: 1 }}>
                                {todo.title}
                            </span>
                        ) : (
                            <FormControl
                                className="w-50"
                                value={todo.title}
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") {
                                        updateTodo({ ...todo, editing: false });
                                    }
                                }}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    updateTodo({ ...todo, title: e.target.value })
                                }
                            />
                        )}

                        {/* Icons aligned right in order: Pencil -> Cross -> Trash */}
                        <div className="ms-auto d-flex align-items-center gap-2">
                            <FaPencil
                                onClick={() => editTodo(todo)}
                                className="text-primary"
                                style={{ cursor: "pointer" }}
                            />
                            <TiDelete
                                onClick={() => deleteTodo(todo)}
                                className="text-danger fs-5"
                                style={{ cursor: "pointer" }}
                            />
                            <FaTrash
                                onClick={() => removeTodo(todo)}
                                className="text-danger"
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <hr />
        </div>
    );
}
