import { createSlice } from "@reduxjs/toolkit";

// const INITIAL_STATE = {
//     id: null,
//     username: null,
//     email: null,
//     imageUrl: null,
//     accessToken: null,
//     refreshToken: null
// }

const INITIAL_STATE = {
    id: 102324,
    username: "Sandhu Babu",
    email: "sandhu@gmail.com",
    imageUrl: "https://1fid.com/wp-content/uploads/2022/06/girl-profile-picture-1024x1024.jpg",
    accessToken: "accessToken",
    refreshToken: "refreshToken"
}

export const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {
        setUser: (state, action) => {
            state.id = action?.payload?.id;
            state.username = action?.payload?.username;
            state.email = action?.payload?.email;
            state.accessToken = action?.payload?.accessToken;
            state.refreshToken = action?.payload?.refreshToken;
        },
        logout: (state) => {
            state.id = null;
            state.username = null;
            state.email = null;
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.clear();
        }
    }
})

export const { setUser, logout } = userSlice.actions

export default userSlice.reducer