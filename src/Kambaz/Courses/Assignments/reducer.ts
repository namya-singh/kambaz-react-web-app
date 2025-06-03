// src/Kambaz/Courses/Assignments/reducer.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import * as db from '../../Database';

export interface Assignment {
    _id: string;
    course: string;
    title: string;
    descriptionHtml: string;
    points: number;
    dueDate: string;
    availableFrom: string;
    availableUntil: string;
}

interface AssignmentsState {
    assignments: Assignment[];
}

const initialState: AssignmentsState = {
    assignments: db.assignments,
};

const assignmentsSlice = createSlice({
    name: 'assignments',
    initialState,
    reducers: {
        addAssignment: (state, action: PayloadAction<Assignment>) => {
            state.assignments.push(action.payload);
        },
        updateAssignment: (state, action: PayloadAction<Assignment>) => {
            const index = state.assignments.findIndex(a => a._id === action.payload._id);
            if (index !== -1) {
                state.assignments[index] = action.payload;
            }
        },
        deleteAssignment: (state, action: PayloadAction<string>) => {
            state.assignments = state.assignments.filter(a => a._id !== action.payload);
        },
    },
});

export const { addAssignment, updateAssignment, deleteAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
