import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const EnhancedCarousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    }

    const swipeConfidenceThreshold = 10000
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity
    }

    const paginate = (newDirection) => {
        setDirection(newDirection)
        setCurrentIndex((prevIndex) => (
            newDirection > 0
                ? (prevIndex + 1) % items.length
                : (prevIndex - 1 + items.length) % items.length
        ))
    }

    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1)
        }, 5000)

        return () => clearInterval(timer)
    }, [currentIndex])

    return (
        <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-white to-gray-50">
            <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x)
                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1)
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1)
                            }
                        }}
                        className="absolute w-full"
                    >
                        {items[currentIndex]}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/80 p-2 shadow-lg transition hover:bg-white hover:shadow-xl"
                onClick={() => paginate(-1)}
            >
                <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
            </button>

            <button
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/80 p-2 shadow-lg transition hover:bg-white hover:shadow-xl"
                onClick={() => paginate(1)}
            >
                <ChevronRightIcon className="h-6 w-6 text-gray-800" />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 transform space-x-3">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(index > currentIndex ? 1 : -1)
                            setCurrentIndex(index)
                        }}
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${currentIndex === index
                                ? 'bg-[#82B9E2] scale-125'
                                : 'bg-[#D9D9D9] hover:bg-[#82B9E2]/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default EnhancedCarousel
