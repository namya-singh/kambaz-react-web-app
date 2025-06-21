//  /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import {
//     Row,
//     Col,
//     Card,
//     Button,
//     FormControl,
//     ButtonGroup,
// } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "./store";
// import { enrollIntoCourse } from "./Account/client";
// import { createCourseWithEnrollment } from "./Account/client";
//
// interface Course {
//     _id: string;
//     name: string;
//     description: string;
//     image: string;
//     enrolled?: boolean;
// }
//
// interface User {
//     _id: string;
//     role: string;
// }
//
// interface Enrollment {
//     user: string;
//     course: string;
// }
//
// interface DashboardProps {
//     currentUser: User | null;
//     courses: Course[];
//     setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
//     updateCourse: (course: any) => Promise<void>;
//     addNewCourse: () => Promise<Course>; // return the created course
//     course: Course;
//     setCourse: React.Dispatch<React.SetStateAction<Course>>;
//     deleteCourse?: (courseId: string) => Promise<void>;
//     enrolling: boolean;
//     setEnrolling: React.Dispatch<React.SetStateAction<boolean>>;
//     updateEnrollment: (courseId: string, enrolled: boolean) => void;
// }
//
// const Dashboard: React.FC<DashboardProps> = ({
//                                                  currentUser,
//                                                  courses,
//                                                  course,
//                                                  setCourse,
//                                                  enrolling,
//                                                  setEnrolling,
//                                                  deleteCourse,
//                                                  updateCourse,
//                                                  updateEnrollment,
//                                                  setCourses,
//                                              }) => {
//     const enrollments: Enrollment[] = useSelector(
//         (state: RootState) => state.enrollmentReducer.data
//     );
//
//     if (!currentUser) {
//         return <h2 className="p-3">Please sign in to see your Dashboard.</h2>;
//     }
//
//     const isFaculty = currentUser.role === "FACULTY";
//
//     // const addNewCourseHandler = async (
//     //     e: React.MouseEvent<HTMLButtonElement>
//     // ) => {
//     //     e.preventDefault();
//     //
//     //     // ✅ Confirm handler is firing and check values
//     //     console.log("🚀 Add button clicked");
//     //     console.log("Course state:", course);
//     //     console.log("Current user:", currentUser);
//     //
//     //     try {
//     //         const newCourse = await createCourseWithEnrollment(currentUser._id, course);
//     //         console.log("New course returned:", newCourse);
//     //
//     //         if (!newCourse || !newCourse._id) {
//     //             throw new Error("Failed to create course");
//     //         }
//     //
//     //         setCourses((prev) => [...prev, newCourse]);
//     //         setCourse({ _id: "", name: "", description: "", image: "" });
//     //
//     //         if (currentUser && currentUser._id) {
//     //             console.log(
//     //                 `Enrolling user ${currentUser._id} into course ${newCourse._id}`
//     //             );
//     //             await enrollIntoCourse(currentUser._id, newCourse._id);
//     //             console.log("Enrolled successfully");
//     //         }
//     //
//     //         updateEnrollment(newCourse._id, true);
//     //     } catch (err) {
//     //         console.error("❌ Failed to add course:", err);
//     //     }
//     // };
//
//     const addNewCourseHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
//         e.preventDefault();
//
//         try {
//             const newCourse = await createCourseWithEnrollment(currentUser._id, course);
//
//             if (!newCourse || !newCourse._id) throw new Error("Failed to create course");
//
//             setCourses((prev) => [...prev, newCourse]);
//             setCourse({ _id: "", name: "", description: "", image: "" });
//
//             if (currentUser && currentUser._id) {
//                 await enrollIntoCourse(currentUser._id, newCourse._id);
//
//                 // Update enrollments in redux:
//                 updateEnrollment(newCourse._id, true);
//
//                 // Or if updateEnrollment doesn't add, do this instead:
//                 // dispatch(addEnrollment({ user: currentUser._id, course: newCourse._id }));
//
//                 // Or refetch enrollments after:
//                 // const updatedEnrollments = await fetchEnrollments(currentUser._id);
//                 // dispatch(setEnrollments(updatedEnrollments));
//             }
//         } catch (err) {
//             console.error("❌ Failed to add course:", err);
//         }
//     };
//
//
//
//     const myEnrolledCourseIds = new Set(
//         enrollments
//             .filter((en: Enrollment) => en.user === currentUser._id)
//             .map((en) => en.course)
//     );
//
//     // Filter courses shown depending on enroll toggle
//     const displayedCourses = enrolling
//         ? courses
//         : courses.filter((c) => myEnrolledCourseIds.has(c._id));
//
//     const onToggleEnrolling = () => {
//         setEnrolling(!enrolling);
//     };
//
//     return (
//         <div id="wd-dashboard" className="p-3 container-fluid">
//             <h1 id="wd-dashboard-title">
//                 Dashboard
//                 <Button
//                     className="float-end"
//                     variant="primary"
//                     onClick={onToggleEnrolling}
//                 >
//                     {enrolling ? "My Courses" : "All Courses"}
//                 </Button>
//             </h1>
//             <hr />
//
//             {isFaculty && (
//                 <>
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                         <h5 className="mb-0">New Course</h5>
//                         <div>
//                             <Button
//                                                                 id="wd-add-new-course-click"
//                                                                 variant="primary"
//                                                                 className="me-2"
//                                                                 onClick={addNewCourseHandler}
//                                                                 disabled={!course.name.trim()}
//                                                             >
//                                                                 Add
//                                                             </Button>
//                             {/*<Button*/}
//                             {/*    id="wd-add-new-course-click"*/}
//                             {/*    variant="primary"*/}
//                             {/*    className="me-2"*/}
//                             {/*    onClick={addNewCourseHandler}*/}
//                             {/*    disabled={!course.name.trim()}*/}
//                             {/*>*/}
//                             {/*    Add*/}
//                             {/*</Button>*/}
//                             <Button
//                                 id="wd-update-course-click"
//                                 variant="warning"
//                                 onClick={() => updateCourse(course)}
//                                 disabled={!course._id}
//                             >
//                                 Update
//                             </Button>
//                         </div>
//                     </div>
//
//                     <FormControl
//                         className="mb-2"
//                         placeholder="Course Name"
//                         value={course.name}
//                         onChange={(e) => setCourse({ ...course, name: e.target.value })}
//                         id="wd-course-name"
//                     />
//                     <FormControl
//                         as="textarea"
//                         rows={3}
//                         className="mb-4"
//                         placeholder="Course Description"
//                         value={course.description}
//                         onChange={(e) =>
//                             setCourse({ ...course, description: e.target.value })
//                         }
//                         id="wd-course-desc"
//                     />
//                     <hr />
//                 </>
//             )}
//
//             <h2 id="wd-dashboard-published">
//                 {enrolling ? "All Courses" : "My Courses"} ({displayedCourses.length})
//             </h2>
//             <hr />
//
//             <div id="wd-dashboard-courses">
//                 <Row xs={1} md={3} lg={5} className="g-4">
//                     {displayedCourses.map((c) => {
//                         // If showing all courses, check if enrolled via enrolled flag
//                         // If showing my courses, all are enrolled by definition
//                         const isEnrolled = enrolling ? !!c.enrolled : true;
//
//                         return (
//                             <Col
//                                 key={c._id}
//                                 className="wd-dashboard-course d-flex justify-content-center"
//                             >
//                                 <Card style={{ width: 300 }}>
//                                     <Card.Img
//                                         src={c.image || "/images/react.jpg"}
//                                         variant="top"
//                                         height={160}
//                                     />
//                                     <Card.Body className="d-flex flex-column">
//                                         <Card.Title className="text-truncate">
//                                             {c.name}
//                                         </Card.Title>
//
//                                         <Card.Text
//                                             className="flex-grow-1 overflow-hidden mb-2"
//                                             style={{ height: 80 }}
//                                         >
//                                             {c.description}
//                                         </Card.Text>
//
//                                         {enrolling && (
//                                             <div className="mb-2 d-flex justify-content-center">
//                                                 <Button
//                                                     variant={isEnrolled ? "danger" : "success"}
//                                                     size="sm"
//                                                     onClick={(e) => {
//                                                         e.preventDefault();
//                                                         updateEnrollment(c._id, !isEnrolled);
//                                                     }}
//                                                     className="px-4"
//                                                 >
//                                                     {isEnrolled ? "Unenroll" : "Enroll"}
//                                                 </Button>
//                                             </div>
//                                         )}
//
//                                         <ButtonGroup className="mt-auto w-100 d-flex justify-content-between gap-2">
//                                             {isEnrolled ? (
//                                                 <Link
//                                                     to={`/Kambaz/Courses/${c._id}/Home`}
//                                                     className="btn btn-primary flex-fill"
//                                                 >
//                                                     Go
//                                                 </Link>
//                                             ) : (
//                                                 <Button
//                                                     variant="secondary"
//                                                     disabled
//                                                     className="flex-fill"
//                                                 >
//                                                     Go
//                                                 </Button>
//                                             )}
//
//                                             {isFaculty && isEnrolled && (
//                                                 <>
//                                                     <Button
//                                                         id="wd-delete-course-click"
//                                                         variant="danger"
//                                                         size="sm"
//                                                         onClick={() =>
//                                                             deleteCourse && deleteCourse(c._id)
//                                                         }
//                                                         className="flex-fill"
//                                                     >
//                                                         Delete
//                                                     </Button>
//                                                     <Button
//                                                         id="wd-edit-course-click"
//                                                         variant="warning"
//                                                         size="sm"
//                                                         onClick={() => setCourse(c)}
//                                                         className="flex-fill"
//                                                     >
//                                                         Edit
//                                                     </Button>
//                                                 </>
//                                             )}
//                                         </ButtonGroup>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         );
//                     })}
//                 </Row>
//             </div>
//         </div>
//     );
// };
//
// export default Dashboard;



//
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, {useCallback, useEffect} from "react";
// import {
//     Row,
//     Col,
//     Card,
//     Button,
//     FormControl,
//     ButtonGroup,
// } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import {enrollIntoCourse, createCourseWithEnrollment,findMyCourses, unenrollFromCourse, findAllCourses} from "./Account/client";
//
// interface Course {
//     _id: string;
//     name: string;
//     description: string;
//     image: string;
//     enrolled?: boolean;
// }
//
// interface User {
//     _id: string;
//     role: string;
// }
//
// // @ts-expect-error : this is necessary
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// interface Enrollment {
//     user: string;
//     course: string;
// }
//
// interface DashboardProps {
//     currentUser: User | null;
//     courses: Course[];
//     setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
//     updateCourse: (course: any) => Promise<void>;
//     addNewCourse: () => Promise<Course>;
//     course: Course;
//     setCourse: React.Dispatch<React.SetStateAction<Course>>;
//     deleteCourse?: (courseId: string) => Promise<void>;
//     enrolling: boolean;
//     setEnrolling: React.Dispatch<React.SetStateAction<boolean>>;
//     updateEnrollment: (courseId: string, enrolled: boolean) => void;
// }
//
// const Dashboard: React.FC<DashboardProps> = ({
//                                                  currentUser,
//                                                  courses,
//                                                  setCourses,
//                                                  updateCourse,
//                                                  course,
//                                                  setCourse,
//                                                  deleteCourse,
//                                                  enrolling,
//                                                  setEnrolling,
//                                                  updateEnrollment,
//                                              }) => {
//
//     const fetchCourses = useCallback(async () => {
//         if (!currentUser) {
//             if (enrolling) {
//                 try {
//                     const allCoursesData = await findAllCourses();
//                     setCourses(allCoursesData);
//                 } catch (error) {
//                     console.error("Error fetching all courses (no user):", error);
//                     setCourses([]);
//                 }
//             } else {
//                 setCourses([]);
//             }
//             return;
//         }
//
//         try {
//             if (enrolling) {
//                 const allCoursesData = await findAllCourses();
//                 setCourses(allCoursesData);
//             } else {
//                 const myCoursesData = await findMyCourses();
//                 setCourses(myCoursesData.map((c: Course) => ({ ...c, enrolled: true })));
//             }
//         } catch (error) {
//             console.error("Error fetching courses:", error);
//             setCourses([]);
//         }
//     }, [currentUser, enrolling, setCourses]);
//
//     useEffect(() => {
//         fetchCourses();
//     }, [fetchCourses]);
//
//     if (!currentUser) {
//         return <h2 className="p-3">Please sign in to see your Dashboard.</h2>;
//     }
//
//     const isFaculty = currentUser.role === "FACULTY";
//
//     const addNewCourseHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
//         e.preventDefault();
//
//         try {
//             const newCourse = await createCourseWithEnrollment(currentUser._id, course);
//
//             if (!newCourse || !newCourse._id) throw new Error("Failed to create course");
//
//             await fetchCourses();
//
//             setCourse({ _id: "", name: "", description: "", image: "" });
//
//             updateEnrollment(newCourse._id, true);
//         } catch (err) {
//             console.error("❌ Failed to add course:", err);
//         }
//     };
//
//     const handleEnrollmentToggle = async (courseId: string, isCurrentlyEnrolled: boolean) => {
//         if (!currentUser) {
//             console.error("Cannot enroll/unenroll: currentUser is null.");
//             return;
//         }
//
//         try {
//             if (isCurrentlyEnrolled) {
//                 await unenrollFromCourse(currentUser._id, courseId);
//             } else {
//                 await enrollIntoCourse(currentUser._id, courseId);
//             }
//             updateEnrollment(courseId, !isCurrentlyEnrolled);
//
//             await fetchCourses();
//
//         } catch (error) {
//             console.error("Failed to update enrollment:", error);
//         }
//     };
//
//     const displayedCourses = courses;
//
//     const onToggleEnrolling = () => {
//         setEnrolling(!enrolling);
//     };
//
//     return (
//         <div id="wd-dashboard" className="p-3 container-fluid">
//             <h1 id="wd-dashboard-title">
//                 Dashboard
//                 <Button className="float-end" variant="primary" onClick={onToggleEnrolling}>
//                     {enrolling ? "My Courses" : "All Courses"}
//                 </Button>
//             </h1>
//             <hr />
//
//             {isFaculty && (
//                 <>
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                         <h5 className="mb-0">New Course</h5>
//                         <div>
//                             <Button
//                                 id="wd-add-new-course-click"
//                                 variant="primary"
//                                 className="me-2"
//                                 onClick={addNewCourseHandler}
//                                 disabled={!course.name.trim()}
//                             >
//                                 Add
//                             </Button>
//                             <Button
//                                 id="wd-update-course-click"
//                                 variant="warning"
//                                 onClick={() => updateCourse(course)}
//                                 disabled={!course._id}
//                             >
//                                 Update
//                             </Button>
//                         </div>
//                     </div>
//
//                     <FormControl
//                         className="mb-2"
//                         placeholder="Course Name"
//                         value={course.name}
//                         onChange={(e) => setCourse({ ...course, name: e.target.value })}
//                         id="wd-course-name"
//                     />
//                     <FormControl
//                         as="textarea"
//                         rows={3}
//                         className="mb-4"
//                         placeholder="Course Description"
//                         value={course.description}
//                         onChange={(e) =>
//                             setCourse({ ...course, description: e.target.value })
//                         }
//                         id="wd-course-desc"
//                     />
//                     <hr />
//                 </>
//             )}
//
//             <h2 id="wd-dashboard-published">
//                 {enrolling ? "All Courses" : "My Courses"} ({displayedCourses.length})
//             </h2>
//             <hr />
//
//             <div id="wd-dashboard-courses">
//                 <Row xs={1} md={3} lg={5} className="g-4">
//                     {displayedCourses.map((c) => {
//                         const isEnrolled = c.enrolled || false;
//
//                         return (
//                             <Col key={c._id} className="wd-dashboard-course d-flex justify-content-center">
//                                 <Card style={{ width: 300 }}>
//                                     <Card.Img
//                                         src={c.image || "/images/react.jpg"}
//                                         variant="top"
//                                         height={160}
//                                     />
//                                     <Card.Body className="d-flex flex-column">
//                                         <Card.Title className="text-truncate">{c.name}</Card.Title>
//                                         <Card.Text className="flex-grow-1 overflow-hidden mb-2" style={{ height: 80 }}>
//                                             {c.description}
//                                         </Card.Text>
//
//                                         {enrolling && (
//                                             <div className="mb-2 d-flex justify-content-center">
//                                                 <Button
//                                                     variant={isEnrolled ? "danger" : "success"}
//                                                     size="sm"
//                                                     onClick={(e) => {
//                                                         e.preventDefault();
//                                                         handleEnrollmentToggle(c._id, isEnrolled);
//                                                     }}
//                                                     className="px-4"
//                                                 >
//                                                     {isEnrolled ? "Unenroll" : "Enroll"}
//                                                 </Button>
//
//                                             </div>
//                                         )}
//
//                                         <ButtonGroup className="mt-auto w-100 d-flex justify-content-between gap-2">
//                                             {isEnrolled ? (
//                                                 <Link
//                                                     to={`/Kambaz/Courses/${c._id}/Home`}
//                                                     className="btn btn-primary flex-fill"
//                                                 >
//                                                     Go
//                                                 </Link>
//                                             ) : (
//                                                 <Button variant="secondary" disabled className="flex-fill">
//                                                     Go
//                                                 </Button>
//                                             )}
//
//                                             {isFaculty && isEnrolled && (
//                                                 <>
//                                                     <Button
//                                                         id="wd-delete-course-click"
//                                                         variant="danger"
//                                                         size="sm"
//                                                         onClick={() =>
//                                                             deleteCourse && deleteCourse(c._id)
//                                                         }
//                                                         className="flex-fill"
//                                                     >
//                                                         Delete
//                                                     </Button>
//                                                     <Button
//                                                         id="wd-edit-course-click"
//                                                         variant="warning"
//                                                         size="sm"
//                                                         onClick={() => setCourse(c)}
//                                                         className="flex-fill"
//                                                     >
//                                                         Edit
//                                                     </Button>
//                                                 </>
//                                             )}
//                                         </ButtonGroup>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         );
//                     })}
//                 </Row>
//             </div>
//         </div>
//     );
// };
//
// export default Dashboard;

//
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, {useCallback, useEffect} from "react";
// import {
//     Row,
//     Col,
//     Card,
//     Button,
//     FormControl,
//     ButtonGroup,
// } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import {enrollIntoCourse, createCourseWithEnrollment,findMyCourses, unenrollFromCourse, findAllCourses} from "./Account/client";
//
// interface Course {
//     _id: string;
//     name: string;
//     description: string;
//     image: string;
//     enrolled?: boolean;
// }
//
// interface User {
//     _id: string;
//     role: string;
// }
//
// // @ts-expect-error : this is necessary
//  // eslint-disable-next-line @typescript-eslint/no-unused-vars
// interface Enrollment {
//     user: string;
//     course: string;
// }
//
// interface DashboardProps {
//     currentUser: User | null;
//     courses: Course[];
//     setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
//     updateCourse: (course: any) => Promise<void>;
//     addNewCourse: () => Promise<Course>;
//     course: Course;
//     setCourse: React.Dispatch<React.SetStateAction<Course>>;
//     deleteCourse?: (courseId: string) => Promise<void>;
//     enrolling: boolean;
//     setEnrolling: React.Dispatch<React.SetStateAction<boolean>>;
//     updateEnrollment: (courseId: string, enrolled: boolean) => void;
// }
//
// const Dashboard: React.FC<DashboardProps> = ({
//                                                  currentUser,
//                                                  courses,
//                                                  setCourses,
//                                                  updateCourse,
//                                                  course,
//                                                  setCourse,
//                                                  deleteCourse,
//                                                  enrolling,
//                                                  setEnrolling,
//                                                  updateEnrollment,
//                                              }) => {
//
//     const fetchCourses = useCallback(async () => {
//         if (!currentUser) {
//             if (enrolling) {
//                 try {
//                     const allCoursesData = await findAllCourses();
//                     setCourses(allCoursesData);
//                 } catch (error) {
//                     console.error("Error fetching all courses (no user):", error);
//                     setCourses([]);
//                 }
//             } else {
//                 setCourses([]);
//             }
//             return;
//         }
//
//         try {
//             if (enrolling) {
//                 const allCoursesData = await findAllCourses();
//                 setCourses(allCoursesData);
//             } else {
//                 const myCoursesData = await findMyCourses();
//                 setCourses(myCoursesData.map((c: Course) => ({ ...c, enrolled: true })));
//             }
//         } catch (error) {
//             console.error("Error fetching courses:", error);
//             setCourses([]);
//         }
//     }, [currentUser, enrolling, setCourses]);
//
//     useEffect(() => {
//         fetchCourses();
//     }, [fetchCourses]);
//
//     if (!currentUser) {
//         return <h2 className="p-3">Please sign in to see your Dashboard.</h2>;
//     }
//
//     const isFaculty = currentUser.role === "FACULTY";
//
//     const addNewCourseHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
//         e.preventDefault();
//
//         try {
//             const newCourse = await createCourseWithEnrollment(currentUser._id, course);
//
//             if (!newCourse || !newCourse._id) throw new Error("Failed to create course");
//
//             await fetchCourses();
//
//             setCourse({ _id: "", name: "", description: "", image: "" });
//
//             updateEnrollment(newCourse._id, true);
//         } catch (err) {
//             console.error("❌ Failed to add course:", err);
//         }
//     };
//
//     const handleEnrollmentToggle = async (courseId: string, isCurrentlyEnrolled: boolean) => {
//         if (!currentUser) {
//             console.error("Cannot enroll/unenroll: currentUser is null.");
//             return;
//         }
//
//         try {
//             if (isCurrentlyEnrolled) {
//                 await unenrollFromCourse(currentUser._id, courseId);
//             } else {
//                 await enrollIntoCourse(currentUser._id, courseId);
//             }
//             updateEnrollment(courseId, !isCurrentlyEnrolled);
//
//             await fetchCourses();
//
//         } catch (error) {
//             console.error("Failed to update enrollment:", error);
//         }
//     };
//
//     const displayedCourses = courses;
//
//     const onToggleEnrolling = () => {
//         setEnrolling(!enrolling);
//     };
//
//     return (
//         <div id="wd-dashboard" className="p-3 container-fluid">
//             <h1 id="wd-dashboard-title">
//                 Dashboard
//                 <Button className="float-end" variant="primary" onClick={onToggleEnrolling}>
//                     {enrolling ? "My Courses" : "All Courses"}
//                 </Button>
//             </h1>
//             <hr />
//
//             {isFaculty && (
//                 <>
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                         <h5 className="mb-0">New Course</h5>
//                         <div>
//                             <Button
//                                 id="wd-add-new-course-click"
//                                 variant="primary"
//                                 className="me-2"
//                                 onClick={addNewCourseHandler}
//                                 disabled={!course.name.trim()}
//                             >
//                                 Add
//                             </Button>
//                             <Button
//                                 id="wd-update-course-click"
//                                 variant="warning"
//                                 onClick={() => updateCourse(course)}
//                                 disabled={!course._id}
//                             >
//                                 Update
//                             </Button>
//                         </div>
//                     </div>
//
//                     <FormControl
//                         className="mb-2"
//                         placeholder="Course Name"
//                         value={course.name}
//                         onChange={(e) => setCourse({ ...course, name: e.target.value })}
//                         id="wd-course-name"
//                     />
//                     <FormControl
//                         as="textarea"
//                         rows={3}
//                         className="mb-4"
//                         placeholder="Course Description"
//                         value={course.description}
//                         onChange={(e) =>
//                             setCourse({ ...course, description: e.target.value })
//                         }
//                         id="wd-course-desc"
//                     />
//                     <hr />
//                 </>
//             )}
//
//             <h2 id="wd-dashboard-published">
//                 {enrolling ? "All Courses" : "My Courses"} ({displayedCourses.length})
//             </h2>
//             <hr />
//
//             <div id="wd-dashboard-courses">
//                 <Row xs={1} md={3} lg={5} className="g-4">
//                     {displayedCourses.map((c) => {
//                         const isEnrolled = c.enrolled || false;
//
//                         return (
//                             <Col key={c._id} className="wd-dashboard-course d-flex justify-content-center">
//                                 <Card style={{ width: 300 }}>
//                                     <Card.Img
//                                         src={c.image || "/images/react.jpg"}
//                                         variant="top"
//                                         height={160}
//                                     />
//                                     <Card.Body className="d-flex flex-column">
//                                         <Card.Title className="text-truncate">{c.name}</Card.Title>
//                                         <Card.Text className="flex-grow-1 overflow-hidden mb-2" style={{ height: 80 }}>
//                                             {c.description}
//                                         </Card.Text>
//
//                                         {enrolling && (
//                                             <div className="mb-2 d-flex justify-content-center">
//                                                 <Button
//                                                     variant={isEnrolled ? "danger" : "success"}
//                                                     size="sm"
//                                                     onClick={(e) => {
//                                                         e.preventDefault();
//                                                         handleEnrollmentToggle(c._id, isEnrolled);
//                                                     }}
//                                                     className="px-4"
//                                                 >
//                                                     {isEnrolled ? "Unenroll" : "Enroll"}
//                                                 </Button>
//
//                                             </div>
//                                         )}
//
//                                         <ButtonGroup className="mt-auto w-100 d-flex justify-content-between gap-2">
//                                             {isEnrolled ? (
//                                                 <Link
//                                                     to={`/Kambaz/Courses/${c._id}/Home`}
//                                                     className="btn btn-primary flex-fill"
//                                                 >
//                                                     Go
//                                                 </Link>
//                                             ) : (
//                                                 <Button variant="secondary" disabled className="flex-fill">
//                                                     Go
//                                                 </Button>
//                                             )}
//
//                                             {isFaculty && isEnrolled && (
//                                                 <>
//                                                     <Button
//                                                         id="wd-delete-course-click"
//                                                         variant="danger"
//                                                         size="sm"
//                                                         onClick={() =>
//                                                             deleteCourse && deleteCourse(c._id)
//                                                         }
//                                                         className="flex-fill"
//                                                     >
//                                                         Delete
//                                                     </Button>
//                                                     <Button
//                                                         id="wd-edit-course-click"
//                                                         variant="warning"
//                                                         size="sm"
//                                                         onClick={() => setCourse(c)}
//                                                         className="flex-fill"
//                                                     >
//                                                         Edit
//                                                     </Button>
//                                                 </>
//                                             )}
//                                         </ButtonGroup>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         );
//                     })}
//                 </Row>
//             </div>
//         </div>
//     );
// };
//
// export default Dashboard;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect } from "react";
import {
    Row,
    Col,
    Card,
    Button,
    FormControl,
    ButtonGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
    enrollIntoCourse,
    createCourseWithEnrollment,
    findMyCourses,
    unenrollFromCourse,
    findAllCourses,
} from "./Account/client";

interface Course {
    _id: string;
    name: string;
    description: string;
    image: string;
    enrolled?: boolean;
}

interface User {
    _id: string;
    role: string;
}

// @ts-expect-error : this is necessary
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 interface Enrollment {
    user: string;
     course: string;
 }

interface DashboardProps {
    currentUser: User | null;
    courses: Course[];
    setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
    updateCourse: (course: any) => Promise<void>;
    addNewCourse: () => Promise<Course>;
    course: Course;
    setCourse: React.Dispatch<React.SetStateAction<Course>>;
    deleteCourse?: (courseId: string) => Promise<void>;
    enrolling: boolean;
    setEnrolling: React.Dispatch<React.SetStateAction<boolean>>;
    updateEnrollment: (courseId: string, enrolled: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
                                                 currentUser,
                                                 courses,
                                                 setCourses,
                                                 updateCourse,
                                                 course,
                                                 setCourse,
                                                 deleteCourse,
                                                 enrolling,
                                                 setEnrolling,
                                                 updateEnrollment,
                                             }) => {
    const fetchCourses = useCallback(async () => {
        if (!currentUser) {
            setCourses([]);
            return;
        }

        try {
            if (enrolling) {
                const allCoursesData = await findAllCourses();
                const myCourses = await findMyCourses();
                const myEnrolledIds = new Set(myCourses.map((c: Course) => c._id));
                const updatedCourses = allCoursesData.map((c: Course) => ({
                    ...c,
                    enrolled: myEnrolledIds.has(c._id),
                }));
                setCourses(updatedCourses);
            } else {
                const myCoursesData = await findMyCourses();
                setCourses(myCoursesData.map((c: Course) => ({ ...c, enrolled: true })));
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
            setCourses([]);
        }
    }, [currentUser, enrolling, setCourses]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    if (!currentUser) {
        return <h2 className="p-3">Please sign in to see your Dashboard.</h2>;
    }

    const isFaculty = currentUser.role === "FACULTY";

    const addNewCourseHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const newCourse = await createCourseWithEnrollment(currentUser._id, course);
            if (!newCourse || !newCourse._id) throw new Error("Failed to create course");
            await fetchCourses();
            setCourse({ _id: "", name: "", description: "", image: "" });
            updateEnrollment(newCourse._id, true);
        } catch (err) {
            console.error("❌ Failed to add course:", err);
        }
    };

    const handleEnrollmentToggle = async (courseId: string, isCurrentlyEnrolled: boolean) => {
        if (!currentUser) return;

        try {
            if (isCurrentlyEnrolled) {
                await unenrollFromCourse(currentUser._id, courseId);
            } else {
                await enrollIntoCourse(currentUser._id, courseId);
            }
            updateEnrollment(courseId, !isCurrentlyEnrolled);
            await fetchCourses();
        } catch (error) {
            console.error("Failed to update enrollment:", error);
        }
    };

    const onToggleEnrolling = () => {
        setEnrolling(!enrolling);
    };

    return (
        <div className="p-3 container-fluid">
            <h1>
                Dashboard
                <Button className="float-end" onClick={onToggleEnrolling}>
                    {enrolling ? "My Courses" : "All Courses"}
                </Button>
            </h1>
            <hr />

            {isFaculty && (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="mb-0">New Course</h5>
                        <div>
                            <Button
                                variant="primary"
                                onClick={addNewCourseHandler}
                                disabled={!course.name.trim()}
                            >
                                Add
                            </Button>
                            <Button
                                variant="warning"
                                onClick={() => updateCourse(course)}
                                disabled={!course._id}
                                className="ms-2"
                            >
                                Update
                            </Button>
                        </div>
                    </div>

                    <FormControl
                        className="mb-2"
                        placeholder="Course Name"
                        value={course.name}
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                    />
                    <FormControl
                        as="textarea"
                        rows={3}
                        className="mb-4"
                        placeholder="Course Description"
                        value={course.description}
                        onChange={(e) =>
                            setCourse({ ...course, description: e.target.value })
                        }
                    />
                    <hr />
                </>
            )}

            <h2>{enrolling ? "All Courses" : "My Courses"} ({courses.length})</h2>
            <hr />

            <Row xs={1} md={3} lg={5} className="g-4">
                {courses.map((c) => {
                    const isEnrolled = !!c.enrolled;

                    return (
                        <Col key={c._id}>
                            <Card style={{ width: 300 }}>
                                <Card.Img
                                    src={c.image || "/images/react.jpg"}
                                    variant="top"
                                    height={160}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="text-truncate">{c.name}</Card.Title>
                                    <Card.Text
                                        className="flex-grow-1 overflow-hidden mb-2"
                                        style={{ height: 80 }}
                                    >
                                        {c.description}
                                    </Card.Text>

                                    {enrolling && (
                                        <div className="mb-2 d-flex justify-content-center">
                                            <Button
                                                variant={isEnrolled ? "danger" : "success"}
                                                size="sm"
                                                onClick={() => handleEnrollmentToggle(c._id, isEnrolled)}
                                            >
                                                {isEnrolled ? "Unenroll" : "Enroll"}
                                            </Button>
                                        </div>
                                    )}

                                    <ButtonGroup className="mt-auto w-100 d-flex gap-2">
                                        {isEnrolled ? (
                                            <Link
                                                to={`/Kambaz/Courses/${c._id}/Home`}
                                                className="btn btn-primary flex-fill"
                                            >
                                                Go
                                            </Link>
                                        ) : (
                                            <Button variant="secondary" disabled className="flex-fill">
                                                Go
                                            </Button>
                                        )}

                                        {!enrolling && isFaculty && isEnrolled && (
                                            <>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => deleteCourse?.(c._id)}
                                                    className="flex-fill"
                                                >
                                                    Delete
                                                </Button>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    onClick={() => setCourse(c)}
                                                    className="flex-fill"
                                                >
                                                    Edit
                                                </Button>
                                            </>
                                        )}
                                    </ButtonGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default Dashboard;




