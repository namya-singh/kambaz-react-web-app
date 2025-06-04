
import Labs from "./Labs";
import Kambaz from "./Kambaz";
import store from "./Kambaz/store";
import { Provider } from "react-redux";

// ─── Must import these from “react-router-dom” ───
import {
    HashRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

export default function App() {
    return (
        <HashRouter>
            <Provider store={store}>
                <Routes>
                    {/* Redirect “/” → “/Kambaz” */}
                    <Route path="/" element={<Navigate to="/Kambaz" />} />

                    {/* /Labs goes to the Labs component */}
                    <Route path="/Labs/*" element={<Labs />} />

                    {/* /Kambaz/* is handled inside <Kambaz> */}
                    <Route path="/Kambaz/*" element={<Kambaz />} />

                    {/*
            We remove this top‐level Courses route:
            <Route path="/Courses/:cid/*" element={<Courses />} />
            because “/Kambaz/Courses/:cid/*” is already declared inside <Kambaz>.
          */}
                </Routes>
            </Provider>
        </HashRouter>
    );
}