import  { useState } from "react";
import { FaPlus, FaEye, FaCompressAlt } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { Button, Dropdown } from "react-bootstrap";
import ModuleEditor from "./ModuleEditor";

type ModulesControlsProps = {
    moduleName: string;
    setModuleName: (title: string) => void;
    addModule: () => void;
};

export default function ModulesControls({
                                            moduleName,
                                            setModuleName,
                                            addModule,
                                        }: ModulesControlsProps) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div
            id="wd-modules-controls"
            className="d-flex flex-wrap gap-3 justify-content-start align-items-center mb-3"
        >
            <Button variant="secondary" size="lg" id="wd-collapse-all">
                <FaCompressAlt className="me-2" />
                Collapse All
            </Button>

            <Button variant="secondary" size="lg" id="wd-view-progress">
                <FaEye className="me-2" />
                View Progress
            </Button>

            <Dropdown>
                <Dropdown.Toggle variant="secondary" size="lg" id="wd-publish-all-btn">
                    <GreenCheckmark /> Publish All
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item id="wd-publish-all">
                        <GreenCheckmark /> Publish All
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-publish-all-modules-and-items">
                        <GreenCheckmark /> Publish all modules and items
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-publish-modules-only">
                        <GreenCheckmark /> Publish modules only
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-unpublish-all-modules-and-items">
                        <FaRegCircleXmark className="me-2 text-danger" />
                        Unpublish all modules and items
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-unpublish-modules-only">
                        <FaRegCircleXmark className="me-2 text-danger" />
                        Unpublish modules only
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {/* The "Add Module" button now opens the ModuleEditor modal */}
            <Button variant="danger" size="lg" onClick={handleShow} id="wd-add-module-btn">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Module
            </Button>

            {/* ModuleEditor modal dialog */}
            <ModuleEditor
                show={show}
                handleClose={handleClose}
                dialogTitle="Add Module"
                moduleName={moduleName}
                setModuleName={setModuleName}
                addModule={addModule}
            />
        </div>
    );
}
