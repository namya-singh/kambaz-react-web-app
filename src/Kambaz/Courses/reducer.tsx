import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Course {
  _id: string;
  name: string;
  description: string;
  image?: string;
}

interface CoursesState {
  all: Course[];
  form: Partial<Course>;
}

const initialState: CoursesState = {
  all: [],
  form: { _id: "", name: "", description: "", image: "/images/react.jpg" },
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourseForm(state, action: PayloadAction<Partial<Course>>) {
      state.form = { ...state.form, ...action.payload };
    },
    addCourse(state, action: PayloadAction<Omit<Course, "_id">>) {
      const newCourse: Course = {
        _id: Date.now().toString(),
        image: "/images/react.jpg",
        ...action.payload,
      };
      state.all.push(newCourse);
      state.form = { _id: "", name: "", description: "", image: "/images/react.jpg" };
    },
    updateCourse(state) {
      const idx = state.all.findIndex((c) => c._id === state.form._id);
      if (idx !== -1 && state.form.name && state.form.description) {
        state.all[idx] = state.form as Course;
        state.form = { _id: "", name: "", description: "", image: "/images/react.jpg" };
      }
    },
    loadCourseToForm(state, action: PayloadAction<string>) {
      const course = state.all.find((c) => c._id === action.payload);
      if (course) {
        state.form = { ...course };
      }
    },
    deleteCourse(state, action: PayloadAction<string>) {
      state.all = state.all.filter((c) => c._id !== action.payload);
    },
  },
});

export const {
  setCourseForm,
  addCourse,
  updateCourse,
  loadCourseToForm,
  deleteCourse,
} = coursesSlice.actions;
export default coursesSlice.reducer;
