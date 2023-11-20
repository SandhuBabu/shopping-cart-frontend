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


export const getOrderStatusTextColor = status => {
    switch (status) {
        case 'Delivered': return 'text-green-500';
        case 'Cancelled': return 'text-error';
        case 'Shipped': return 'text-warning';
        default: return 'text-green-500';
    }
}

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