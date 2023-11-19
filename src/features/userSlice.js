import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    id: 0,
    username: "",
    email: "",
    mobile: Number("0000000000"),
    role: "",
    imageUrl: "",
    cartCount: 0,
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
            state.mobile = action?.payload?.mobile;
            state.cartCount = action?.payload?.cartCount || 0
        },
        handleUserLogout: (state) => {
            state.id = null;
            state.username = null;
            state.email = null;
            state.role = null
            state.cartCount = 0
            localStorage.clear();
        },
        updateCartCount: (state, action) => {
            if (action.payload.type === "increment") {
                state.cartCount = state.cartCount + 1
            } else if (action.payload.type === "decrement") {
                state.cartCount = state.cartCount - 1
            } else if (action.payload.type === "empty") {
                state.cartCount = 0
            }
        }
    }
})

export const { setUser, handleUserLogout, updateCartCount } = userSlice.actions

export default userSlice.reducer