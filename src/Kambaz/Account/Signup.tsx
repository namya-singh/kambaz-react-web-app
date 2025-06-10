/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { FormControl, Alert } from "react-bootstrap";

export default function Signup() {
    const [user, setUser] = useState<any>({ username: "", password: "", verifyPassword: "" });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signup = async () => {
        setError(null);
        if (user.password !== user.verifyPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const currentUser = await client.signup({ username: user.username, password: user.password });
            dispatch(setCurrentUser(currentUser));
            navigate("/Kambaz/Account/Profile");
        } catch (err: any) {
            setError(err.message || "Signup failed");
        }
    };

    return (
        <div className="wd-signup-screen">
            <h1>Sign up</h1>

            {error && <Alert variant="danger">{error}</Alert>}

            <FormControl
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="wd-username mb-2"
                placeholder="username"
            />

            <FormControl
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="wd-password mb-2"
                placeholder="password"
                type="password"
            />

            <FormControl
                value={user.verifyPassword}
                onChange={(e) => setUser({ ...user, verifyPassword: e.target.value })}
                className="wd-verify-password mb-3"
                placeholder="verify password"
                type="password"
            />

            <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-100">
                Sign up
            </button>
            <br />
            <Link to="/Kambaz/Account/Signin" className="wd-signin-link">
                Sign in
            </Link>
        </div>
    );
}
