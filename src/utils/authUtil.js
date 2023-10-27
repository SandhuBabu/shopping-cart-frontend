export const showLoginModal = () => {
    document.getElementById("login_modal").showModal();
}

export const setLocalTokens = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
}