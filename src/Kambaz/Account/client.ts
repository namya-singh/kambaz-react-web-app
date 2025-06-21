/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
//const axiosWithCredentials = axios.create({ withCredentials: true });

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
const axiosWithCredentials = axios.create({
    baseURL: 'https://kambaz-node-server-app-bwyf.onrender.com',
    withCredentials: true,
});
export const signin = async (credentials: any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
    return response.data;
};
// yo yo
export const signup = async (user: any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    return response.data;
};

// export const updateUser = async (user: any) => {
//     const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
//     return response.data;
// };

export const profile = async () => {
    const response = await axiosWithCredentials.get(`${USERS_API}/profile`);
    return response.data;
};

export const signout = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
};

export const findMyCourses = async () => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
    return data;
};


export const unenrollCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/courses/${courseId}/unenroll`);
    return response.data;
};

export const findCoursesForUser = async (userId: string) => {
    const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/courses`);
    return response.data;
};


export const debug = async () => {
    const response = await axiosWithCredentials.post(`${REMOTE_SERVER}/api/debug`);
    return response.data;
};
export const findAllUsers = async () => {
    const response = await axiosWithCredentials.get(USERS_API);
    return response.data;
};
export const findUsersByRole = async (role: string) => {
    const response = await
        axiosWithCredentials.get(`${USERS_API}?role=${role}`);
    return response.data;
};

export const findUsersByPartialName = async (name: string) => {
    const response = await axiosWithCredentials.get(`${USERS_API}?name=${name}`);
    return response.data;
};
export const findUserById = async (id: string) => {
    const response = await axiosWithCredentials.get(`${USERS_API}/${id}`);
    return response.data;
};
export const deleteUser = async (userId: string) => {
    const response = await axiosWithCredentials.delete( `${USERS_API}/${userId}` );
    return response.data;
};

export const updateUser = async (user: any) => {
    const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};



export const createUser = async (user: any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}`, user);
    return response.data;
};
export const enrollIntoCourse1 = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
    return response.data;
};
export const unenrollFromCourse1 = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
    return response.data;
};
// export const enrollIntoCourse = async (userId: string, courseId: string) => {
//     const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
//     return response.data;
// };
export const createCourseWithEnrollment = async (userId: string, course: any) => {
    const payload = { ...course, userId };
    const response = await axiosWithCredentials.post("/api/courses", payload);
    return response.data;
};
