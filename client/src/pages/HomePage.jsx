import { useState, useEffect } from 'react'
import Comp1 from '../components/comp1'
import Comp2 from '../components/comp2'
import Comp3 from '../components/comp3'

const Carousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const changeSlide = (index) => {
        setIsAnimating(true)
        setTimeout(() => {
            setCurrentIndex(index)
            setIsAnimating(false)
        }, 500)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            changeSlide((currentIndex + 1) % items.length)
        }, 5000)

        return () => clearTimeout(timer)
    }, [currentIndex, items.length])

    const goToSlide = (index) => {
        changeSlide(index)
    }

    return (
        <div className="m-8 h-[90vh] flex flex-col items-center justify-center">
            <div className={`h-full transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                {items[currentIndex]}
            </div>
            <div className="absolute bottom-4 flex space-x-2">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-3 w-3 rounded-full ${currentIndex === index ? 'bg-[#82B9E2]' : 'bg-[#D9D9D9]'}`}
                    />
                ))}
            </div>
        </div>
    )
}

const HomePage = () => {
    const components = [
        <div key="1"><Comp1 /></div>,
        <div key="2"><Comp2 /></div>,
        <div key="3"><Comp3 /></div>,
    ]

    return (
        <Carousel items={components} />
    )
}

export default HomePage