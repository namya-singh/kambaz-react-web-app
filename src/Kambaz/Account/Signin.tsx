
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { Button, FormControl } from "react-bootstrap";
import * as client from "./client";


export default function Signin() {
    const [credentials, setCredentials] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signin =  async () => {
        const user =   await client.signin(credentials);


        if (!user) {
            alert("Invalid username or password");
            return;
        }
        await client.debug().then(console.log).catch(console.error);

        // Fix: cast the role to expected type
        dispatch(setCurrentUser({
            ...user,
            role: user.role as "FACULTY" | "STUDENT" | "ADMIN" | "USER"
        }));

        navigate("/Kambaz/Dashboard");
    };

    return (
        <div id="wd-signin-screen">
            <h1>Sign in</h1>
            <FormControl   defaultValue={credentials.username}
                           onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                           className="mb-2"
                           placeholder="username"
                           id="wd-username"
            />
            <FormControl
                defaultValue={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="mb-2"
                placeholder="password"
                type="password"
                id="wd-password"
            />
            <Button onClick={signin} id="wd-signin-btn" className="w-100">
                Sign in
            </Button>
            <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
                Sign up
            </Link>
        </div>
    );
}