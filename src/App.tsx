import Labs from "./Labs";
import Kambaz from "./Kambaz";
import store from "./Kambaz/store";
import { Provider } from "react-redux";

import {HashRouter, Navigate, Route, Routes} from "react-router";
import Courses from "./Kambaz/Courses";
export default function App() {
    return (
        <HashRouter>
            <Provider store={store}>

            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="Kambaz"/>}/>
                    <Route path="/Labs/*" element={<Labs />} />
                    <Route path="/Kambaz/*" element={<Kambaz />} />
                    <Route path="/Courses/:cid/*" element={<Courses />} />

                </Routes>
            </div>
            </Provider>

        </HashRouter>
    );}
