import React, { useState, useEffect } from 'react'

const posters = [
    { "sliderIMG": "https://i.pinimg.com/originals/ef/80/83/ef8083bfe79088dc00bd8eca9c821cd5.jpg" },

    { "sliderIMG": "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/4995be28f180a90c.jpg?q=20" },

    { "sliderIMG": "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/b8e07ff39439d998.jpg?q=20" },

    { "sliderIMG": "https://i.pinimg.com/originals/bd/4b/d1/bd4bd1c3a5373e3044077f7c29dd2974.jpg" },

    { "sliderIMG": "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/headphone-banner-design-template-c46c02738002f860b1bee00e378eff4a_screen.jpg?ts=1669277015" },

    { "sliderIMG": "https://www.designinfo.in/wp-content/uploads/elementor/thumbs/panasonic-brand-banner-6-qbbpfg0g4j9fskva3obgni1qu4u0a5flqnwa5875c4-optimized.webp" },

    { "sliderIMG": "https://images.samsung.com/latin_en/smartphones/galaxy-s23/images/galaxy-s23-highlights-design-kv-end-s.jpg" },

    { "sliderIMG": "https://steady-jelly-24109c.netlify.app/assets/images/home/img1.png" },

    { "sliderIMG": "https://steady-jelly-24109c.netlify.app/assets/images/home/img2.png" },
]
function HomeSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const lengthOfSlider = posters.length;
    useEffect(() => {
        const slideInterval = setInterval(() => {
            currentIndex === lengthOfSlider - 1 ? setCurrentIndex(0) : setCurrentIndex(currentIndex + 1);
        }, 5000)
        return () => clearInterval(slideInterval)
    }, [currentIndex, lengthOfSlider])

    return (
        <div className='sliderContainer'>
            <img src={posters[currentIndex].sliderIMG} alt="SliderPoster" className={`sliderPoster `} loading="lazy"/>
        </div>
    )
}

export default HomeSlider
