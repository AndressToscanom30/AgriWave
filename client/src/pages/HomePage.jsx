import { useState } from 'react';
import Comp1 from '../components/comp1';

const Carousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    }

    const goToSlide = (index) => {
        setCurrentIndex(index);
    }

    return (
        <div className="m-8 h-[90vh] flex flex-col items-center justify-center">
            <div className="h-full">
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
        <div key="2">Componente 2</div>,
        <div key="3">Componente 3</div>,
    ]

    return (
        <Carousel items={components} />
    )
}

export default HomePage