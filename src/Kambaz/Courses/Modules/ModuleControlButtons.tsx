// components/ModuleControlButtons.tsx
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

interface Props {
    moduleId: string;
    deleteModule: (moduleId: string) => void;
    editModule: (moduleId: string) => void;
    isFaculty: boolean;
}

export default function ModuleControlButtons({
                                                 moduleId,
                                                 deleteModule,
                                                 editModule,
                                                 isFaculty,
                                             }: Props) {
    return (
        <div className="d-flex align-items-center gap-2">
            {isFaculty && (
                <>
                    <FaPencil
                        onClick={() => editModule(moduleId)}
                        className="text-primary"
                        style={{ cursor: "pointer" }}
                    />
                    <FaTrash
                        onClick={() => deleteModule(moduleId)}
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                    />
                    <BsPlus className="text-success" style={{ cursor: "pointer" }} />
                </>
            )}
            <GreenCheckmark className="me-2" />

            <IoEllipsisVertical className="fs-4 text-dark" />
        </div>
    );
}
