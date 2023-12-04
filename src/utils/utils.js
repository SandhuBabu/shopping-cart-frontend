export const orderStatusOptions = [
    { title: "placed" },
    { title: "shipped" },
    { title: "delivered" },
    { title: "cancelled" },
    { title: "returned" }
]

const ORDER_STATUS_BG = {
    placed: "#00aaff4f",
    shipped: "#ffa6024f",
    delivered: "#5ae65a4f",
    cancelled: "#fe0d0d4f",
    returned: "#ffa6024f"
}

export const getOrderStatusTextColor = status => {
    switch (status) {
        case 'placed': return 'text-primary'
        case 'delivered': return 'text-green-500';
        case 'cancelled': return 'text-error';
        case 'shipped': return 'text-warning';
        case 'returned': return 'text-warning';
        default: return 'text-primary';
    }
}

export const getOrderStatusBg = (status) => {
    return ORDER_STATUS_BG[status]
}

export function setAdminTitle(title) {
    document.querySelector('title').innerHTML = "Shopping Cart - " + title
}

export const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0 })
}

export const categories = [
    { title: "Smartwatches", link: "/category/smartwatches" },
    { title: "Bags", link: "/category/bags" },
    { title: "Shoes", link: "/category/shoes" },
    { title: "T-Shirts", link: "/category/t-shirts" },
    { title: "Shirts", link: "/category/shirts" },
    { title: "Jeans", link: "/category/jeans" },
    { title: "Sneakers", link: "/category/sneakers" },
    { title: "Backpacks", link: "/category/backpacks" },
    { title: "TWS", link: "/category/tws" },
    { title: "Hoodies", link: "/category/hoodies" },
    { title: "Dresses", link: "/category/dress" },
    { title: "Accessories", link: "/category/accessories" },
    { title: "Skateboards", link: "/category/skateboards" },
    { title: "Headphones", link: "/category/headphones" },
    { title: "Sunglasses", link: "/category/sunglasses" },
    { title: "Watches", link: "/category/watches" },
]

export const copyText = (text) => {
    navigator.clipboard.writeText(text)
}


export const share = (shareData) => {
    navigator.share(shareData)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
}

export const formatDate = date => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export const getDateDifference = (from) => {
    let day1 = new Date(from)
    let day2 = new Date()

    let diffInMilliseconds = day2 - day1;
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    return diffInMilliseconds/millisecondsInDay

}