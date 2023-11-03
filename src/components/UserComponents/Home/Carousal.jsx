import React from 'react'

const images = [
    "https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg",
    "https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg",
    "https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
]




const Carousal = () => {

    return (
        <div className="carousel w-full h-56">
            <ImageContainer id="slide1" src={images[0]} next="#slide2" prev="#slide3" />
            <ImageContainer id="slide2" src={images[1]} next="#slide3" prev="#slide1" />
            <ImageContainer id="slide3" src={images[2]} next="#slide1" prev="#slide2" />

        </div>
    )
}

export default React.memo(Carousal)



const ImageContainer = ({ id, src, next, prev }) => {
    return <div id={id} className="carousel-item relative w-full">
        <img src={src} className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href={prev} className="btn btn-circle">❮</a>
            <a href={next} className="btn btn-circle">❯</a>
        </div>
    </div>
}
