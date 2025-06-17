import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import AccountNavigation from "./Navigation";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from './Signup';
import Users from "./Users.tsx";

export default function Account() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    return (
        <div id="wd-account-screen">
            <table>
                <tbody>
                <tr>
                    <td valign="top">
                        <AccountNavigation />
                    </td>
                    <td valign="top">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to={currentUser ? "/Kambaz/Account/Profile" : "/Kambaz/Account/Signin"}
                                              replace
                                    />
                                }
                            />
                            <Route path="/" element={ <Navigate to={currentUser ? "/Kambaz/Account/Profile" : "/Kambaz/Account/Signin" } /> } />
                            <Route path="/Signin" element={<Signin />} />
                            <Route path="/Profile" element={<Profile />} />
                            <Route path="/Signup" element={<Signup />} />
                            <Route path="/Users" element={<Users />} />
                            <Route path="/Users/:uid" element={<Users />} />

                        </Routes>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
