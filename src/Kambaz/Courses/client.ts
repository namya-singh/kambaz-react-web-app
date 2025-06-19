/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

// ✅ Axios instance with baseURL and credentials enabled
const axiosWithCredentials = axios.create({
    baseURL: import.meta.env.VITE_REMOTE_SERVER, // e.g. https://kambaz-node-server-app-bwyf.onrender.com
    withCredentials: true,
});

// ✅ Use relative paths for API routes
const COURSES_API = `/api/courses`;

export const createCourseWithEnrollment = async (userId: string, course: any) => {
    const payload = { ...course, userId };
    console.log("🚀 Payload being sent:", payload);
    const { data } = await axiosWithCredentials.post(COURSES_API, payload);
    return data;
};

export const fetchAllCourses = async () => {
    const { data } = await axiosWithCredentials.get(COURSES_API);
    return data;
};

export const deleteCourse = async (id: string) => {
    const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
    return data;
};

export const updateCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
    return data;
};

export const findModulesForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
};

export const createCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.post(COURSES_API, course);
    return data;
};

export const findUsersForCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/users`);
    return response.data;
};


