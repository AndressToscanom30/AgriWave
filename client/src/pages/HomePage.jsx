import EnhancedCarousel from '../components/EnhancedCarousel'
import Comp1 from '../components/comp1'
import Comp2 from '../components/comp2'
import Comp3 from '../components/comp3'

const HomePage = () => {
  const components = [
    <div key="1" className="md:px-16 lg:px-24 mt-[-130px]"><Comp1 /></div>,
    <div key="2" className="md:px-16 lg:px-24 mt-[-130px]"><Comp2 /></div>,
    <div key="3" className="md:px-16 lg:px-24 mt-[-130px]"><Comp3 /></div>,
  ]

  return (
    <div className="min-h-screen">
      <EnhancedCarousel items={components} />
    </div>
  )
}

export default HomePage
