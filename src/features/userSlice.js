import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    id: 0,
    username: "",
    email: "",
    role: "",
    imageUrl: "",
}

// const INITIAL_STATE = {
//     id: 102324,
//     username: "Sandhu Babu",
//     email: "sandhu@gmail.com",
//     imageUrl: "https://1fid.com/wp-content/uploads/2022/06/girl-profile-picture-1024x1024.jpg",
//     accessToken: "accessToken",
//     refreshToken: "refreshToken"
// }

export const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {
        setUser: (state, action) => {
            state.id = action?.payload?.id;
            state.username = action?.payload?.username;
            state.email = action?.payload?.email;
            state.role = action?.payload?.role;
        },
        handleUserLogout: (state) => {
            state.id = null;
            state.username = null;
            state.email = null;
            state.role = null
            localStorage.clear();
        }
    }
})

export const { setUser, handleUserLogout } = userSlice.actions

export default userSlice.reducer