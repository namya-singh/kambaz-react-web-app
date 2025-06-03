/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    addModule,
    deleteModule,
    editModule,
    updateModule,
} from "./reducer";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { ListGroup, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";

export default function Modules() {
    const { cid } = useParams<{ cid: string }>();
    const [moduleName, setModuleName] = useState("");
    const dispatch = useDispatch();
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    // Role check
    const isFaculty = currentUser?.role === "FACULTY";

    const courseModules = modules.filter((m: any) => m.course === cid);

    return (
        <div className="wd-modules d-flex">
            <div className="flex-fill pe-4">
                {/* Show Add Module form only if FACULTY */}
                {isFaculty && (
                    <ModulesControls
                        moduleName={moduleName}
                        setModuleName={setModuleName}
                        addModule={() => {
                            if (moduleName.trim() === "") return;
                            dispatch(addModule({ name: moduleName.trim(), course: cid }));
                            setModuleName("");
                        }}
                    />
                )}
                <hr />

                <ListGroup id="wd-modules" className="rounded-0">
                    {courseModules.map((mod: any) => (
                        <ListGroup.Item
                            key={mod._id}
                            className="wd-module p-0 mb-5 fs-5 border-gray"
                        >
                            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                                <BsGripVertical className="me-2 fs-3" />
                                {!mod.editing && mod.name}
                                {mod.editing && isFaculty && (
                                    <FormControl
                                        className="w-50 d-inline-block"
                                        defaultValue={mod.name}
                                        onChange={(e) =>
                                            dispatch(updateModule({ ...mod, name: e.target.value }))
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                dispatch(updateModule({ ...mod, editing: false }));
                                            }
                                        }}
                                    />
                                )}
                                {/* Show edit/delete buttons only if FACULTY */}
                                {isFaculty && (
                                    <span className="ms-auto">
                    <ModuleControlButtons
                        moduleId={mod._id}
                        deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                        editModule={(moduleId) => dispatch(editModule(moduleId))}
                    />
                  </span>
                                )}
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
                                            {/* Hide lesson control buttons if not FACULTY */}
                                            {isFaculty && (
                                                <span className="ms-auto">
                          <LessonControlButtons />
                        </span>
                                            )}
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
