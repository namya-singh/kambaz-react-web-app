// /* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from "axios";
// const axiosWithCred = axios.create({ withCredentials: true });
// const REMOTE        = import.meta.env.VITE_REMOTE_SERVER;
// const COURSES_API   = `${REMOTE}/api/courses`;
// const ASSNS_API     = `${REMOTE}/api/assignments`;
//
// export const findAssignmentsForCourse = (cid: string) =>
//     axiosWithCred.get(`${COURSES_API}/${cid}/assignments`).then(r => r.data);
//
// export const findAssignmentById = (aid: string) =>
//     axiosWithCred.get(`${ASSNS_API}/${aid}`).then(r => r.data);
//
// export const createAssignmentForCourse = (cid: string, assn: any) =>
//     axiosWithCred.post(`${COURSES_API}/${cid}/assignments`, assn).then(r => r.data);
//
// export const updateAssignment = (assn: any) =>
//     axiosWithCred.put(`${ASSNS_API}/${assn._id}`, assn).then(r => r.data);
//
// export const deleteAssignment = (aid: string) =>
//     axiosWithCred.delete(`${ASSNS_API}/${aid}`);


//
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from "axios";
//
// const axiosWithCred = axios.create({ withCredentials: true });
// const REMOTE = import.meta.env.VITE_REMOTE_SERVER;
// const COURSES_API = `${REMOTE}/api/courses`;
// const ASSNS_API = `${REMOTE}/api/assignments`;
//
// // Define an Assignment type (adjust fields as needed)
// export interface Assignment {
//     _id?: string;
//     title: string;
//     descriptionHtml?: string;
//     points?: number;
//     availableFrom?: string;
//     dueDate?: string;
//     availableUntil?: string;
//     course?: string;
//     assignTo?: string;
//     entryOptions?: {
//         text: boolean;
//         website: boolean;
//         media: boolean;
//         annotation: boolean;
//         file: boolean;
//     };
//     group?: string;
//     displayGradeAs?: string;
//     submissionType?: string;
//     // add other fields as needed
// }
//
// export const findAssignmentsForCourse = async (cid: string): Promise<Assignment[]> => {
//     const res = await axiosWithCred.get(`${COURSES_API}/${cid}/assignments`);
//     return res.data;
// };
//
// export const findAssignmentById = async (aid: string): Promise<Assignment> => {
//     const res = await axiosWithCred.get(`${ASSNS_API}/${aid}`);
//     return res.data;
// };
//
// export const createAssignmentForCourse = async (cid: string, assn: Assignment): Promise<Assignment> => {
//     const res = await axiosWithCred.post(`${COURSES_API}/${cid}/assignments`, assn);
//     return res.data;
// };
//
// export const updateAssignment = async (assn: Assignment): Promise<Assignment> => {
//     if (!assn._id) throw new Error("Assignment _id is required for update");
//     const res = await axiosWithCred.put(`${ASSNS_API}/${assn._id}`, assn);
//     return res.data;
// };
//
// export const deleteAssignment = async (aid: string): Promise<void> => {
//     await axiosWithCred.delete(`${ASSNS_API}/${aid}`);
// };


//
//
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from "axios";
//
// const axiosWithCred = axios.create({ withCredentials: true });
// const REMOTE = import.meta.env.VITE_REMOTE_SERVER;
// const COURSES_API = `${REMOTE}/api/courses`;
// const ASSNS_API = `${REMOTE}/api/assignments`;
//
// export interface Assignment {
//     _id: string;
//     title: string;
//     descriptionHtml: string;
//     points: number;
//     availableFrom: string;
//     dueDate: string;
//     availableUntil: string;
//     editing?: boolean;
// }
//
// export const findAssignmentsForCourse = (cid: string): Promise<Assignment[]> =>
//     axiosWithCred.get(`${COURSES_API}/${cid}/assignments`).then((r) => r.data);
//
// export const findAssignmentById = (aid: string): Promise<Assignment> =>
//     axiosWithCred.get(`${ASSNS_API}/${aid}`).then((r) => r.data);
//
// // Use Partial<Assignment> for creation payload because some fields like _id may be missing
// export const createAssignmentForCourse = (
//     cid: string,
//     assn: Partial<Assignment>
// ): Promise<Assignment> =>
//     axiosWithCred.post(`${COURSES_API}/${cid}/assignments`, assn).then((r) => r.data);
//
// export const updateAssignment = (assn: Assignment): Promise<Assignment> =>
//     axiosWithCred.put(`${ASSNS_API}/${assn._id}`, assn).then((r) => r.data);
//
// export const deleteAssignment = (aid: string): Promise<void> =>
//     axiosWithCred.delete(`${ASSNS_API}/${aid}`);


import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";
const COURSES_API   = `${REMOTE_SERVER}/api/courses`;
const ASSNS_API     = `${REMOTE_SERVER}/api/assignments`;

export interface Assignment {
    _id: string;
    title: string;
    descriptionHtml: string;
    points: number;
    availableFrom: string;
    dueDate: string;
    availableUntil: string;
    editing?: boolean;
}

export const findAssignmentsForCourse = (cid: string) =>
    axiosWithCredentials
        .get<Assignment[]>(`${COURSES_API}/${cid}/assignments`)
        .then(r => r.data);

export const findAssignmentById = (aid: string) =>
    axiosWithCredentials.get<Assignment>(`${ASSNS_API}/${aid}`).then(r => r.data);

export const createAssignmentForCourse = (cid: string, assn: Partial<Assignment>) =>
    axiosWithCredentials
        .post<Assignment>(`${COURSES_API}/${cid}/assignments`, assn)
        .then(r => r.data);

export const updateAssignment = (assn: Assignment) =>
    axiosWithCredentials
        .put<Assignment>(`${ASSNS_API}/${assn._id}`, assn)
        .then(r => r.data);

export const deleteAssignment = (aid: string) =>
    axiosWithCredentials.delete(`${ASSNS_API}/${aid}`);


