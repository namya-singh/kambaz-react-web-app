/* eslint-disable @typescript-eslint/no-explicit-any */
// import * as client from "./client";
// import { useEffect, useState } from "react";
// import { setCurrentUser } from "./reducer";
// import { useDispatch } from "react-redux";
// export default function Session({ children }: { children: any }) {
//     const [pending, setPending] = useState(true);
//     const dispatch = useDispatch();
//     const fetchProfile = async () => {
//         try {
//             const currentUser = await client.profile();
//             dispatch(setCurrentUser(currentUser));
//         } catch (err: any) {
//             console.error(err);
//         }
//         setPending(false);
//     };
//     useEffect(() => {
//         fetchProfile();
//     }, []);
//     if (!pending) {
//         return children;
//     }
// }
//

//
// // ✅ Session.tsx
// import * as client from "./client";
// import { useEffect, useState } from "react";
// import { setCurrentUser } from "./reducer";
// import { useDispatch } from "react-redux";
//
// export default function Session({ children }: { children: any }) {
//     const [pending, setPending] = useState(true);
//     const dispatch = useDispatch();
//
//     const fetchProfile = async () => {
//         try {
//             const currentUser = await client.profile();
//             dispatch(setCurrentUser(currentUser));
//         } catch (err: any) {
//             console.error(err);
//         }
//         setPending(false);
//     };
//
//     useEffect(() => {
//         fetchProfile();
//     }, []);
//
//     if (pending) return <div>Loading...</div>;
//     return children;
// }




import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "./client";
import { setCurrentUser } from "./reducer";
import type { RootState } from "../store";

export default function Session({ children }: { children: React.ReactNode }) {
    const dispatch    = useDispatch();
    const currentUser = useSelector((s: RootState) => s.accountReducer.currentUser);

    useEffect(() => {
        profile()
            .then((u) => dispatch(setCurrentUser(u)))
            .catch(() => dispatch(setCurrentUser(null)));
    }, [dispatch]);

    if (currentUser === undefined) {
        return <div className="text-center p-4">Loading session…</div>;
    }

    return <>{children}</>;
}
