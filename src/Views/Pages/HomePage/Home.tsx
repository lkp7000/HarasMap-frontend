import HeroSection from "../../Component/BasicComponents/HeroSection"
import Testimonial from "../../Component/BasicComponents/Testimonial"
import Footer from "../../Component/Layout/Footer"
import Header from "../../Component/Layout/Header"

const Home = () => {
    return (
        <div>
            <div className='app'>
                <Header />
                <HeroSection />
                <br />
                <Testimonial />
                <Footer />
            </div>
        </div>
    )
}

export default Home
