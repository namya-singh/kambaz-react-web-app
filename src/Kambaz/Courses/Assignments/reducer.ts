// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
// import * as client from "./client";
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
// interface State {
//     assignments: Assignment[];
//     status: "idle" | "loading" | "failed";
// }
//
// const initialState: State = {
//     assignments: [],
//     status: "idle",
// };
//
// // Thunks
// export const fetchAssignments = createAsyncThunk(
//     "assignments/fetch",
//     async (cid: string) => client.findAssignmentsForCourse(cid)
// );
//
// export const createAssignment = createAsyncThunk(
//     "assignments/create",
//     async (data: { cid: string; assn: any }) =>
//         client.createAssignmentForCourse(data.cid, data.assn)
// );
//
// export const updateAssignmentById = createAsyncThunk(
//     "assignments/update",
//     async (assn: Assignment) => client.updateAssignment(assn)
// );
//
// export const deleteAssignmentById = createAsyncThunk(
//     "assignments/delete",
//     async (aid: string) => {
//         await client.deleteAssignment(aid);
//         return aid;
//     }
// );
//
// const slice = createSlice({
//     name: "assignments",
//     initialState,
//     reducers: {
//         setEditing(
//             state,
//             action: PayloadAction<{ id: string; editing: boolean }>
//         ) {
//             state.assignments = state.assignments.map((a) =>
//                 a._id === action.payload.id
//                     ? { ...a, editing: action.payload.editing }
//                     : a
//             );
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // fetch
//             .addCase(fetchAssignments.pending, (s) => {
//                 s.status = "loading";
//             })
//             .addCase(fetchAssignments.fulfilled, (s, a) => {
//                 s.status = "idle";
//                 s.assignments = a.payload;
//             })
//             .addCase(fetchAssignments.rejected, (s) => {
//                 s.status = "failed";
//             })
//
//             // create
//             .addCase(createAssignment.fulfilled, (s, a) => {
//                 s.assignments.push(a.payload);
//             })
//
//             // update
//             .addCase(updateAssignmentById.fulfilled, (s, a) => {
//                 s.assignments = s.assignments.map((x) =>
//                     x._id === a.payload._id ? { ...a.payload, editing: false } : x
//                 );
//             })
//
//             // delete
//             .addCase(deleteAssignmentById.fulfilled, (s, a) => {
//                 s.assignments = s.assignments.filter((x) => x._id !== a.payload);
//             });
//     },
// });
//
// export const { setEditing } = slice.actions;
// export default slice.reducer;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import * as client from "./client";

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

interface State {
    assignments: Assignment[];
    status: "idle" | "loading" | "failed";
}

const initialState: State = {
    assignments: [],
    status: "idle",
};

// Fetch assignments for a course
export const fetchAssignments = createAsyncThunk<
    Assignment[],
    string,
    { rejectValue: string }
>("assignments/fetch", async (cid, thunkAPI) => {
    try {
        return await client.findAssignmentsForCourse(cid);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message || "Failed to fetch assignments");
    }
});

// Create a new assignment
export const createAssignment = createAsyncThunk<
    Assignment,
    { cid: string; assn: Partial<Assignment> },
    { rejectValue: string }
>("assignments/create", async (data, thunkAPI) => {
    try {
        return await client.createAssignmentForCourse(data.cid, data.assn);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message || "Failed to create assignment");
    }
});

// Update an existing assignment
export const updateAssignmentById = createAsyncThunk<
    Assignment,
    Assignment,
    { rejectValue: string }
>("assignments/update", async (assn, thunkAPI) => {
    try {
        return await client.updateAssignment(assn);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message || "Failed to update assignment");
    }
});

// Delete an assignment by ID
export const deleteAssignmentById = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>("assignments/delete", async (aid, thunkAPI) => {
    try {
        await client.deleteAssignment(aid);
        return aid;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message || "Failed to delete assignment");
    }
});

const slice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setEditing(state, action: PayloadAction<{ id: string; editing: boolean }>) {
            state.assignments = state.assignments.map((a) =>
                a._id === action.payload.id ? { ...a, editing: action.payload.editing } : a
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssignments.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAssignments.fulfilled, (state, action) => {
                state.status = "idle";
                state.assignments = action.payload;
            })
            .addCase(fetchAssignments.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(createAssignment.fulfilled, (state, action) => {
                state.assignments.push(action.payload);
            })

            .addCase(updateAssignmentById.fulfilled, (state, action) => {
                state.assignments = state.assignments.map((a) =>
                    a._id === action.payload._id ? { ...action.payload, editing: false } : a
                );
            })

            .addCase(deleteAssignmentById.fulfilled, (state, action) => {
                state.assignments = state.assignments.filter((a) => a._id !== action.payload);
            });
    },
});

export const { setEditing } = slice.actions;
export default slice.reducer;
