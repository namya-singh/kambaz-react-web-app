// /* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;  // Needed for nested routes

// Get all modules for a specific course
export const findModulesForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
};

// Create a new module for a specific course
export const createModuleForCourse = async (courseId: string, module: any) => {
    const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/modules`, module);
    return response.data;
};

// Update a module on the server
export const updateModule = async (module: any) => {
    const response = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
    return response.data;
};

// Delete a module from the server
export const deleteModule = async (moduleId: string) => {
    const response = await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
    return response.data;
};





//
// import axios from "axios";
//
// const axiosWithCredentials = axios.create({ withCredentials: true });
// const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
// const MODULES_API = `${REMOTE_SERVER}/api/modules`;
//
// // Delete a module from the server
// export const deleteModule = async (moduleId: string) => {
//     const response = await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
//     return response.data;
// };
//
// // Update a module on the server
// export const updateModule = async (module: any) => {
//     const { data } = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
//     return data;
// };
//
// // Get all modules for a specific course
// export const findModulesForCourse = async (courseId: string) => {
//     const response = await axios.get(`${MODULES_API}/course/${courseId}`);
//     return response.data;
// };
//
// // Create a new module for a specific course
// export const createModuleForCourse = async (courseId: string, module: any) => {
//     const response = await axiosWithCredentials.post(`${MODULES_API}/course/${courseId}`, module);
//     return response.data;
// };









// /* eslint-disable @typescript-eslint/no-explicit-any */
//
// import axios from "axios";
// const axiosWithCredentials = axios.create({ withCredentials: true });
// const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
// const MODULES_API = `${REMOTE_SERVER}/api/modules`;
// export const deleteModule = async (moduleId: string) => {
//     const response = await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
//     return response.data; };
//
// export const updateModule = async (module: any) => {
//     const { data } = await axios.put(`${MODULES_API}/${module._id}`, module);
//     return data;
// };
// export const findModulesForCourse = async (courseId: string) => {
//     const response = await axios.get(`${MODULES_API}/course/${courseId}`);
//     return response.data;
// };
//
// export const createModuleForCourse = async (courseId: string, module: any) => {
//     const response = await axiosWithCredentials.post(`${MODULES_API}/course/${courseId}`, module);
//     return response.data;
// };
