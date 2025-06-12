/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from "axios";
// const axiosWithCredentials = axios.create({ withCredentials: true });
//
// export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
// export const USERS_API = `${REMOTE_SERVER}/api/users`;
//
// export const signin = async (credentials: any) => {
//     const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
//     return response.data;
// };
//
// export const signup = async (user: any) => {
//     const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
//     return response.data;
// };
//
// export const updateUser = async (user: any) => {
//     const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
//     return response.data;
// };
//
// export const profile = async () => {
//     const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
//     return response.data;
// };
//
// export const signout = async () => {
//     const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
//     return response.data;
// };
//
// export const findMyCourses = async () => {
//     const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
//     return data;
// };
//
// export const createCourse = async (course: any) => {
//     const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
//     return data;
// };
//
// export const unenrollCourse = async (courseId: string) => {
//     const response = await axiosWithCredentials.post(`${USERS_API}/courses/${courseId}/unenroll`);
//     return response.data;
// };
//
// export const findCoursesForUser = async (userId: string) => {
//     const { data } = await axiosWithCredentials.get(`${USERS_API}/${userId}/courses`);
//     return data;
// };
//
// export const debug = async () => {
//     const response = await axiosWithCredentials.post(`${REMOTE_SERVER}/api/debug`);
//     return response.data;
// };

import axios from "axios";

const request = axios.create({
    withCredentials: true,
});

const API_BASE = import.meta.env.VITE_API_BASE;
const ACCOUNTS_API = `${API_BASE}/api/accounts`;
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER; // ✅ Fixed here
export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const signin = async (credentials: { username: string; password: string }) => {
    try {
        const response = await request.post(`${ACCOUNTS_API}/signin`, credentials);
        return response.data;
    } catch (err) {
        console.error("Error during signin:", err); // ✅ ESLint fixed
        throw err;
    }
};

export const signout = async () => {
    try {
        const response = await request.post(`${ACCOUNTS_API}/signout`);
        return response.data;
    } catch (err) {
        console.error("Error during signout:", err); // ✅ ESLint fixed
        throw err;
    }
};

export const signup = async (user: any) => {
    try {
        const response = await request.post(`${ACCOUNTS_API}/signup`, user);
        return response.data;
    } catch (err) {
        console.error("Error during signup:", err); // ✅ ESLint fixed
        throw err;
    }
};

export const profile = async () => {
    try {
        const response = await request.post(`${ACCOUNTS_API}/profile`);
        return response.data;
    } catch (err) {
        console.error("Error during profile fetch:", err); // ✅ ESLint fixed
        throw err;
    }
};

export const updateUser = async (user: any) => {
    try {
        const response = await request.put(`${ACCOUNTS_API}/users/${user._id}`, user);
        return response.data;
    } catch (err) {
        console.error("Error during user update:", err); // ✅ ESLint fixed
        throw err;
    }
};
