/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    setModules,
    addModule,
    deleteModule,
    editModule,
    updateModule,
} from "./reducer";
import * as modulesClient from "./client";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

export default function Modules() {
    const { cid } = useParams<{ cid: string }>();
    const [moduleName, setModuleName] = useState("");
    const dispatch = useDispatch();

    const { modules } = useSelector((state: any) => state.modulesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";

    // Fetch modules for course
    const fetchModulesForCourse = async () => {
        if (!cid) return;
        try {
            const modules = await modulesClient.findModulesForCourse(cid);
            dispatch(setModules(modules));
        } catch (error) {
            console.error("Failed to fetch modules:", error);
        }
    };

    useEffect(() => {
        fetchModulesForCourse();
    }, [cid]);

    // Updated handler: updates module on every change (server + redux)
    const updateModuleHandler = async (module: any) => {
        try {
            await modulesClient.updateModule(module);
            dispatch(updateModule(module));
        } catch (error) {
            console.error("Failed to update module:", error);
        }
    };

    // Create new module handler
    const addModuleHandler = async () => {
        if (!cid || moduleName.trim() === "") return;
        try {
            const newModule = await modulesClient.createModuleForCourse(cid, {
                name: moduleName.trim(),
                course: cid,
            });
            dispatch(addModule(newModule));
            setModuleName("");
        } catch (error) {
            console.error("Failed to create module:", error);
        }
    };

    // Delete module handler
    const deleteModuleHandler = async (moduleId: string) => {
        try {
            await modulesClient.deleteModule(moduleId);
            dispatch(deleteModule(moduleId));
        } catch (error) {
            console.error("Failed to delete module:", error);
        }
    };

    return (
        <div className="wd-modules d-flex">
            <div className="flex-fill pe-4">
                <ModulesControls
                    addModule={addModuleHandler}
                    moduleName={moduleName}
                    setModuleName={setModuleName}
                    isFaculty={isFaculty}
                />

                <hr />

                <ListGroup id="wd-modules" className="rounded-0">
                    {modules.map((mod: any) => (
                        <ListGroup.Item
                            key={mod._id}
                            className="wd-module p-0 mb-5 fs-5 border-gray"
                        >
                            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                                <BsGripVertical className="me-2 fs-3" />

                                {!mod.editing && mod.name}

                                {mod.editing && isFaculty && (
                                    <input
                                        className="w-50 d-inline-block form-control"
                                        value={mod.name}
                                        onChange={(e) =>
                                            updateModuleHandler({ ...mod, name: e.target.value })
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                updateModuleHandler({ ...mod, editing:false  });
                                            }
                                        }}
                                        autoFocus
                                    />
                                )}

                                <span className="ms-auto d-flex align-items-center gap-2">
                                    <ModuleControlButtons
                                        moduleId={mod._id}
                                        deleteModule={deleteModuleHandler}
                                        editModule={(id) => dispatch(editModule(id))}
                                        isFaculty={isFaculty}
                                    />
                                </span>
                            </div>

                            {mod.lessons && (
                                <ListGroup className="wd-lessons rounded-0">
                                    {mod.lessons.map((lesson: any) => (
                                        <ListGroup.Item
                                            key={lesson._id}
                                            className="wd-lesson p-3 ps-1 d-flex align-items-center"
                                        >
                                            <BsGripVertical className="me-2 fs-3" />
                                            {lesson.name}

                                            <span className="ms-auto">
                                                {isFaculty ? (
                                                    <LessonControlButtons />
                                                ) : (
                                                    <>
                                                        <GreenCheckmark className="me-3" />
                                                        <IoEllipsisVertical className="fs-4 text-secondary" />
                                                    </>
                                                )}
                                            </span>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </div>
    );
}






// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     setModules,
//     addModule,
//     deleteModule,
//     editModule,
//     updateModule,
// } from "./reducer";
// import * as modulesClient from "./client";
// import ModulesControls from "./ModulesControls";
// import ModuleControlButtons from "./ModuleControlButtons";
// import LessonControlButtons from "./LessonControlButtons";
// import { ListGroup, FormControl } from "react-bootstrap";
// import { BsGripVertical } from "react-icons/bs";
// import { IoEllipsisVertical } from "react-icons/io5";
// import GreenCheckmark from "./GreenCheckmark";
//
// export default function Modules() {
//     const { cid } = useParams<{ cid: string }>();
//     const [moduleName, setModuleName] = useState("");
//     const dispatch = useDispatch();
//
//     const { modules } = useSelector((state: any) => state.modulesReducer);
//     const { currentUser } = useSelector((state: any) => state.accountReducer);
//     const isFaculty = currentUser?.role === "FACULTY";
//
//     // Fetch modules from DB via backend using cid
//     const fetchModulesForCourse = async () => {
//         if (!cid) return;
//         try {
//             const fetchedModules = await modulesClient.findModulesForCourse(cid);
//             dispatch(setModules(fetchedModules));
//         } catch (error) {
//             console.error("Failed to fetch modules:", error);
//         }
//     };
//
//     useEffect(() => {
//         fetchModulesForCourse();
//     }, [cid]);
//
//     const saveModule = async (module: any) => {
//         try {
//             await modulesClient.updateModule(module);
//             dispatch(updateModule(module));
//         } catch (error) {
//             console.error("Failed to update module:", error);
//         }
//     };
//
//     const createModuleForCourse = async () => {
//         if (!cid || moduleName.trim() === "") return;
//         try {
//             const newModule = { name: moduleName.trim(), course: cid };
//             const created = await modulesClient.createModuleForCourse(cid, newModule);
//             dispatch(addModule(created));
//             setModuleName("");
//         } catch (error) {
//             console.error("Failed to create module:", error);
//         }
//     };
//
//     const removeModule = async (moduleId: string) => {
//         try {
//             await modulesClient.deleteModule(moduleId);
//             dispatch(deleteModule(moduleId));
//         } catch (error) {
//             console.error("Failed to delete module:", error);
//         }
//     };
//
//     return (
//         <div className="wd-modules d-flex">
//             <div className="flex-fill pe-4">
//                 <ModulesControls
//                     moduleName={moduleName}
//                     setModuleName={setModuleName}
//                     addModule={createModuleForCourse}
//                     isFaculty={isFaculty}
//                 />
//
//                 <hr />
//
//                 <ListGroup id="wd-modules" className="rounded-0">
//                     {modules.map((mod: any) => (
//                         <ListGroup.Item
//                             key={mod._id}
//                             className="wd-module p-0 mb-5 fs-5 border-gray"
//                         >
//                             <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
//                                 <BsGripVertical className="me-2 fs-3" />
//
//                                 {!mod.editing && mod.name}
//
//                                 {mod.editing && isFaculty && (
//                                     <FormControl
//                                         className="w-50 d-inline-block"
//                                         value={mod.name}
//                                         onChange={(e) =>
//                                             dispatch(updateModule({ ...mod, name: e.target.value }))
//                                         }
//                                         onKeyDown={(e) => {
//                                             if (e.key === "Enter") {
//                                                 saveModule({ ...mod, editing: false });
//                                             }
//                                         }}
//                                     />
//                                 )}
//
//                                 <span className="ms-auto d-flex align-items-center gap-2">
//                                     <ModuleControlButtons
//                                         moduleId={mod._id}
//                                         deleteModule={removeModule}
//                                         editModule={(id) => dispatch(editModule(id))}
//                                         isFaculty={isFaculty}
//                                     />
//                                 </span>
//                             </div>
//
//                             {mod.lessons && (
//                                 <ListGroup className="wd-lessons rounded-0">
//                                     {mod.lessons.map((lesson: any) => (
//                                         <ListGroup.Item
//                                             key={lesson._id}
//                                             className="wd-lesson p-3 ps-1 d-flex align-items-center"
//                                         >
//                                             <BsGripVertical className="me-2 fs-3" />
//                                             {lesson.name}
//
//                                             <span className="ms-auto">
//                                                 {isFaculty ? (
//                                                     <LessonControlButtons />
//                                                 ) : (
//                                                     <>
//                                                         <GreenCheckmark className="me-3" />
//                                                         <IoEllipsisVertical className="fs-4 text-secondary" />
//                                                     </>
//                                                 )}
//                                             </span>
//                                         </ListGroup.Item>
//                                     ))}
//                                 </ListGroup>
//                             )}
//                         </ListGroup.Item>
//                     ))}
//                 </ListGroup>
//             </div>
//         </div>
//     );
// }








// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     setModules,
//     addModule,
//     deleteModule,
//     editModule,
//     updateModule,
// } from "./reducer";
// import * as coursesClient from "../client";  // <-- imported for fetch
// import * as modulesClient from "./client";
// import ModulesControls from "./ModulesControls";
// import ModuleControlButtons from "./ModuleControlButtons";
// import LessonControlButtons from "./LessonControlButtons";
// import { ListGroup, FormControl } from "react-bootstrap";
// import { BsGripVertical } from "react-icons/bs";
// import { IoEllipsisVertical } from "react-icons/io5";
// import GreenCheckmark from "./GreenCheckmark";
//
// export default function Modules() {
//     const { cid } = useParams<{ cid: string }>();
//     const [moduleName, setModuleName] = useState("");
//     const dispatch = useDispatch();
//
//     const { modules } = useSelector((state: any) => state.modulesReducer);
//     const { currentUser } = useSelector((state: any) => state.accountReducer);
//
//     const isFaculty = currentUser?.role === "FACULTY";
//
//     // Save module asynchronously via API then update redux store
//     const saveModule = async (module: any) => {
//         try {
//             await modulesClient.updateModule(module);
//             dispatch(updateModule(module));
//         } catch (error) {
//             console.error("Failed to save module:", error);
//         }
//     };
//
//     // Fetch modules from backend and dispatch to store
//     const fetchModules = async () => {
//         if (!cid) return;
//         try {
//             const fetchedModules = await coursesClient.findModulesForCourse(cid);
//             dispatch(setModules(fetchedModules));
//         } catch (error) {
//             console.error("Failed to fetch modules:", error);
//         }
//     };
//
//     useEffect(() => {
//         fetchModules();
//     }, [cid]); // refetch if course id changes
//
//     // Async function to create a new module and dispatch addModule with result
//     const createModuleForCourse = async () => {
//         if (!cid || moduleName.trim() === "") return;
//         try {
//             const newModule = { name: moduleName.trim(), course: cid };
//             const module = await coursesClient.createModuleForCourse(cid, newModule);
//             dispatch(addModule(module));
//             setModuleName("");
//         } catch (error) {
//             console.error("Failed to create module:", error);
//         }
//     };
//
//     // Async remove module API call + redux update
//     const removeModule = async (moduleId: string) => {
//         try {
//             await modulesClient.deleteModule(moduleId);
//             dispatch(deleteModule(moduleId));
//         } catch (error) {
//             console.error("Failed to delete module:", error);
//         }
//     };
//
//     return (
//         <div className="wd-modules d-flex">
//             <div className="flex-fill pe-4">
//                 <ModulesControls
//                     moduleName={moduleName}
//                     setModuleName={setModuleName}
//                     addModule={createModuleForCourse}
//                     isFaculty={isFaculty}
//                 />
//
//                 <hr />
//
//                 <ListGroup id="wd-modules" className="rounded-0">
//                     {modules.map((mod: any) => (
//                         <ListGroup.Item
//                             key={mod._id}
//                             className="wd-module p-0 mb-5 fs-5 border-gray"
//                         >
//                             <div
//                                 className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center"
//                             >
//                                 <BsGripVertical className="me-2 fs-3" />
//
//                                 {!mod.editing && mod.name}
//
//                                 {mod.editing && isFaculty && (
//                                     <FormControl
//                                         className="w-50 d-inline-block"
//                                         value={mod.name}
//                                         onChange={(e) =>
//                                             dispatch(updateModule({ ...mod, name: e.target.value }))
//                                         }
//                                         onKeyDown={(e) => {
//                                             if (e.key === "Enter") {
//                                                 saveModule({ ...mod, editing: false });
//                                             }
//                                         }}
//                                     />
//                                 )}
//
//                                 <span className="ms-auto d-flex align-items-center gap-2">
//                                     <ModuleControlButtons
//                                         moduleId={mod._id}
//                                         deleteModule={removeModule}
//                                         editModule={(moduleId) => dispatch(editModule(moduleId))}
//                                         isFaculty={isFaculty}
//                                     />
//                                 </span>
//                             </div>
//
//                             {mod.lessons && (
//                                 <ListGroup className="wd-lessons rounded-0">
//                                     {mod.lessons.map((lesson: any) => (
//                                         <ListGroup.Item
//                                             key={lesson._id}
//                                             className="wd-lesson p-3 ps-1 d-flex align-items-center"
//                                         >
//                                             <BsGripVertical className="me-2 fs-3" />
//                                             {lesson.name}
//
//                                             <span className="ms-auto">
//                                                 {isFaculty ? (
//                                                     <LessonControlButtons />
//                                                 ) : (
//                                                     <>
//                                                         <GreenCheckmark className="me-3" />
//                                                         <IoEllipsisVertical className="fs-4 text-secondary" />
//                                                     </>
//                                                 )}
//                                             </span>
//                                         </ListGroup.Item>
//                                     ))}
//                                 </ListGroup>
//                             )}
//                         </ListGroup.Item>
//                     ))}
//                 </ListGroup>
//             </div>
//         </div>
//     );
// }
