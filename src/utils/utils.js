export function setAdminTitle(title) {
    document.querySelector('title').innerHTML = "Shopping Cart - "+title
}

export const scrollToTop = () => {

    window.scrollTo({top: 0, left: 0})
}