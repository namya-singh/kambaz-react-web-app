/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AnyAction } from "redux";
import * as db from "./Database";

// Enrollment type
export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

// State interface: enrollments array + toggle boolean
interface EnrollmentState {
  data: Enrollment[];
  showAllCourses: boolean;
}

// Initialize from localStorage or fallback to db.enrollments
const persisted = localStorage.getItem("enrollments");
const initialData: Enrollment[] = persisted
    ? JSON.parse(persisted)
    : [...db.enrollments];

const persistedToggle = localStorage.getItem("showAllCourses");
const initialShowAll = persistedToggle
    ? JSON.parse(persistedToggle)
    : false;

const initialState: EnrollmentState = {
  data: initialData,
  showAllCourses: initialShowAll,
};

// Action types
const ENROLL_COURSE = "enrollment/ENROLL_COURSE";
const UNENROLL_COURSE = "enrollment/UNENROLL_COURSE";
const TOGGLE_SHOW_ALL_COURSES = "enrollment/TOGGLE_SHOW_ALL_COURSES";

// Action creators
export const enrollCourse = (payload: { user: string; course: string }) => ({
  type: ENROLL_COURSE,
  payload,
});

export const unenrollCourse = (payload: { user: string; course: string }) => ({
  type: UNENROLL_COURSE,
  payload,
});

export const toggleShowAllCourses = () => ({
  type: TOGGLE_SHOW_ALL_COURSES,
});

// Reducer
export default function enrollmentReducer(
    state = initialState,
    action: AnyAction
): EnrollmentState {
  switch (action.type) {
    case ENROLL_COURSE: {
      const { user, course } = action.payload;
      const already = state.data.some(
          (en) => en.user === user && en.course === course
      );
      if (already) return state;

      const newData = [...state.data, { _id: `${user}-${course}`, user, course }];

      localStorage.setItem("enrollments", JSON.stringify(newData));

      return { ...state, data: newData };
    }

    case UNENROLL_COURSE: {
      const { user, course } = action.payload;
      const newData = state.data.filter(
          (en) => !(en.user === user && en.course === course)
      );

      localStorage.setItem("enrollments", JSON.stringify(newData));

      return { ...state, data: newData };
    }

    case TOGGLE_SHOW_ALL_COURSES: {
      const newToggle = !state.showAllCourses;

      localStorage.setItem("showAllCourses", JSON.stringify(newToggle));

      return { ...state, showAllCourses: newToggle };
    }

    default:
      return state;
  }
}
