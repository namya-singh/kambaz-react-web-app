// import { ListGroup } from "react-bootstrap";
// import { NavLink, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
//
// export default function AccountNavigation() {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const { currentUser } = useSelector((state: any) => state.accountReducer);
//     useLocation();
//
//     // Links to show based on login
//     const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
//
//     // All possible nav items
//     const items = [
//         { to: "/Kambaz/Account/Signin", label: "Signin", id: "wd-account-signin-link" },
//         { to: "/Kambaz/Account/Signup", label: "Signup", id: "wd-account-signup-link" },
//         { to: "/Kambaz/Account/Profile", label: "Profile", id: "wd-account-profile-link" },
//     ];
//
//     // Filter items based on user login status
//     const filteredItems = items.filter(({ label }) => links.includes(label));
//
//     return (
//         <ListGroup id="wd-account-nav" className="wd fs-5 rounded-0 bg-white">
//             {filteredItems.map(({ to, label, id }) => (
//                 <NavLink key={id} to={to} style={{ textDecoration: "none" }}>
//                     {({ isActive }: { isActive: boolean }) => (
//                         <ListGroup.Item
//                             id={id}
//                             className={[
//                                 "list-group-item",
//                                 "list-group-item-action",
//                                 "w-100",
//                                 "py-3",
//                                 "border-0",
//                                 "bg-white",
//                                 isActive
//                                     ? "text-dark border-start border-3 border-dark"
//                                     : "text-danger",
//                             ].join(" ")}
//                         >
//                             {label}
//
//                         </ListGroup.Item>
//                     )}
//
//                 </NavLink>
//             ))}
//
//         </ListGroup>
//     );
// }

import { ListGroup } from "react-bootstrap";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { pathname } = useLocation();
    const active = (path: string) => (pathname.includes(path) ? "active" : "");

    // Links to show based on login
    const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

    // All possible nav items
    const items = [
        { to: "/Kambaz/Account/Signin", label: "Signin", id: "wd-account-signin-link" },
        { to: "/Kambaz/Account/Signup", label: "Signup", id: "wd-account-signup-link" },
        { to: "/Kambaz/Account/Profile", label: "Profile", id: "wd-account-profile-link" },
    ];

    const filteredItems = items.filter(({ label }) => links.includes(label));

    return (
        <ListGroup id="wd-account-nav" className="wd fs-5 rounded-0 bg-white">
            {filteredItems.map(({ to, label, id }) => (
                <NavLink key={id} to={to} style={{ textDecoration: "none" }}>
                    {({ isActive }: { isActive: boolean }) => (
                        <ListGroup.Item
                            id={id}
                            className={[
                                "list-group-item",
                                "list-group-item-action",
                                "w-100",
                                "py-3",
                                "border-0",
                                "bg-white",
                                isActive
                                    ? "text-dark border-start border-3 border-dark"
                                    : "text-danger",
                            ].join(" ")}
                        >
                            {label}
                        </ListGroup.Item>
                    )}
                </NavLink>
            ))}

            {currentUser && currentUser.role === "ADMIN" && (
                <Link
                    to="/Kambaz/Account/Users"
                    className={`list-group-item list-group-item-action w-100 py-3 border-0 bg-white ${active("Users")}`}
                >
                    Users
                </Link>
            )}
        </ListGroup>
    );
}
