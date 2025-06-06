import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload
        },
        removeUser: (state, action) => {
            return null
        }
    }
})

/// extract actions       /// export reducer
export const { addUser, removeUser } = userSlice.actions

// export reducer
export default userSlice.reducer