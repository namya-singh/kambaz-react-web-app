 /* eslint-disable @typescript-eslint/no-explicit-any */
//
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
//
// import Session from "./Account/Session";
// import Account from "./Account";
// import Dashboard from "./Dashboard";
// import KambazNavigation from "./Navigation";
// import Courses from "./Courses";
// import ProtectedRoute from "./Account/ProtectedRoute";
//
// import type { RootState } from "./store";
//
// import "./styles.css";
//
// // Newly imported components for Assignments
// import Assignments from "./Courses/Assignments";
// import AssignmentEditor from "./Courses/Assignments/Editor.tsx";
//
// export default function Kambaz() {
//     const currentUser = useSelector(
//         (state: RootState) => state.accountReducer.currentUser
//     );
//
//     return (
//         <Session>
//             <div id="wd-kambaz">
//                 <KambazNavigation />
//                 <div className="wd-main-content-offset p-3">
//                     <Routes>
//                         <Route path="/" element={<Navigate to="Account" replace />} />
//                         <Route path="Account/*" element={<Account />} />
//                         <Route
//                             path="Dashboard"
//                             element={
//                                 <ProtectedRoute>
//                                     <Dashboard />
//                                 </ProtectedRoute>
//                             }
//                         />
//                         <Route
//                             path="Courses/:cid/*"
//                             element={
//                                 <ProtectedRoute>
//                                     <Courses />
//                                 </ProtectedRoute>
//                             }
//                         />
//
//                         <Route
//                             path="Assignments"
//                             element={
//                                 <ProtectedRoute>
//                                     <Assignments isFaculty={currentUser?.role === "FACULTY"} />
//
//                                 </ProtectedRoute>
//                             }
//                         />
//
//                         <Route
//                             path="Assignments/:aid"
//                             element={
//                                 <ProtectedRoute>
//                                     <AssignmentEditor />
//                                 </ProtectedRoute>
//                             }
//                         />
//                         <Route path="Calendar" element={<h1>Calendar</h1>} />
//                         <Route path="Inbox" element={<h1>Inbox</h1>} />
//                     </Routes>
//                 </div>
//             </div>
//         </Session>
//     );
// }




 /* eslint-disable @typescript-eslint/no-explicit-any */
 import { useEffect, useState } from "react";
 import { Routes, Route, Navigate } from "react-router-dom";
 import { useSelector } from "react-redux";

 import Session from "./Account/Session";
 import Account from "./Account";
 import Dashboard from "./Dashboard";
 import KambazNavigation from "./Navigation";
 import Courses from "./Courses";
 import ProtectedRoute from "./Account/ProtectedRoute";

 import type { RootState } from "./store";

 // Newly imported components for Assignments
 import Assignments from "./Courses/Assignments";
 import AssignmentEditor from "./Courses/Assignments/Editor.tsx";

 import * as courseClient from "./Courses/client";
 import * as userClient from "./Account/client";

 export default function Kambaz() {
     const currentUser = useSelector(
         (state: RootState) => state.accountReducer.currentUser
     );

     // Courses state held here and passed down
     const [courses, setCourses] = useState<any[]>([]);

     // Local state for adding a course
     const [course, setCourse] = useState<any>({
         _id: "",
         name: "",
         description: "",
         image: "/images/react.jpg",
     });

     // New state to toggle showing enrolled courses only or all courses with enrolled flag
     const [enrolling, setEnrolling] = useState<boolean>(false);

     // Fetch courses user is enrolled in only
     const findCoursesForUser = async () => {
         if (!currentUser?._id) return;
         try {
             const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);
             setCourses(enrolledCourses);
         } catch (error) {
             console.error("Error fetching enrolled courses:", error);
         }
     };

     const updateEnrollment = async (courseId: string, enrolled: boolean) => {
         if (!currentUser?._id) return;

         if (enrolled) {
             await userClient.enrollIntoCourse1(currentUser._id, courseId);
         } else {
             await userClient.unenrollFromCourse1(currentUser._id, courseId);
         }

         setCourses(
             courses.map((course) =>
                 course._id === courseId ? { ...course, enrolled } : course
             )
         );
     };

     // Fetch all courses and mark enrolled ones
     const fetchCourses = async () => {
         if (!currentUser?._id) return;
         try {
             const allCourses = await courseClient.fetchAllCourses();
             const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);
             const coursesWithEnrolledFlag = allCourses.map((course: any) => {
                 const isEnrolled = enrolledCourses.some((c: any) => c._id === course._id);
                 return { ...course, enrolled: isEnrolled };
             });
             setCourses(coursesWithEnrolledFlag);
         } catch (error) {
             console.error("Error fetching all courses with enroll info:", error);
         }
     };

     // Fetch courses when currentUser or enrolling changes
     useEffect(() => {
         if (!currentUser) return;
         if (enrolling) {
             fetchCourses();
         } else {
             findCoursesForUser();
         }
     }, [currentUser, enrolling]);

     // Add new course via API and update state
     // Add New Course — returns Promise<Course | undefined>
     const addNewCourse = async (): Promise<any | undefined> => {
         if (!course.name.trim()) return undefined;
         try {
             const newCourse = await courseClient.createCourse(course);
             setCourses([...courses, newCourse]);
             setCourse({ _id: "", name: "", description: "", image: "/images/react.jpg" });
             return newCourse; // <-- return new course here
         } catch (error) {
             console.error("Error adding new course:", error);
             return undefined;
         }
     };

     // Update Course — returns Promise<Course | undefined>
     const updateCourse = async (updatedCourse: any): Promise<any | undefined> => {
         try {
             const savedCourse = await courseClient.updateCourse(updatedCourse);
             setCourses(courses.map((c) => (c._id === savedCourse._id ? savedCourse : c)));
             return savedCourse; // <-- return updated course here
         } catch (error) {
             console.error("Error updating course:", error);
             return undefined;
         }
     };

     // Delete Course — returns Promise<void> (corrected to match expected type)
     const deleteCourse = async (courseId: string): Promise<void> => {
         try {
             const status = await courseClient.deleteCourse(courseId);
             if (status) {
                 setCourses(courses.filter((c) => c._id !== courseId));
             } else {
                 console.error("Failed to delete course");
             }
             // no return
         } catch (error) {
             console.error("Error deleting course:", error);
         }
     };

     return (
         <Session>
             <div id="wd-kambaz">
                 <KambazNavigation />
                 <div className="wd-main-content-offset p-3" style={{ marginLeft: "200px" }}>
                     <Routes>
                         <Route path="/" element={<Navigate to="Account" replace />} />
                         <Route path="Account/*" element={<Account />} />
                         <Route
                             path="Dashboard"
                             element={
                                 <ProtectedRoute>
                                     <Dashboard
                                         currentUser={currentUser}
                                         courses={courses}
                                         setCourses={setCourses}
                                         addNewCourse={addNewCourse}
                                         updateCourse={updateCourse}
                                         course={course}
                                         setCourse={setCourse}
                                         deleteCourse={deleteCourse}
                                         enrolling={enrolling}
                                         setEnrolling={setEnrolling}
                                         updateEnrollment={updateEnrollment}
                                     />
                                 </ProtectedRoute>
                             }
                         />
                         <Route
                             path="Courses/:cid/*"
                             element={
                                 <ProtectedRoute>
                                     <Courses
                                         courses={courses}
                                         setCourses={setCourses}
                                         updateCourse={updateCourse}
                                         deleteCourse={deleteCourse}
                                     />
                                 </ProtectedRoute>
                             }
                         />
                         <Route
                             path="Assignments"
                             element={
                                 <ProtectedRoute>
                                     <Assignments isFaculty={currentUser?.role === "FACULTY"} />
                                 </ProtectedRoute>
                             }
                         />
                         <Route
                             path="Assignments/:aid"
                             element={
                                 <ProtectedRoute>
                                     <AssignmentEditor />
                                 </ProtectedRoute>
                             }
                         />
                         <Route path="Calendar" element={<h1>Calendar</h1>} />
                         <Route path="Inbox" element={<h1>Inbox</h1>} />
                     </Routes>
                 </div>
             </div>
         </Session>
     );
 }
