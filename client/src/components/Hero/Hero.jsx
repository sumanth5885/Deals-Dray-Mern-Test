import "./Hero.css";
import hero_img from '../../assets/mern-test-banner.png'

const Hero = () => {
    return <div className="hero">
        <img src={hero_img} alt="" />
    </div>;
};

export default Hero;
