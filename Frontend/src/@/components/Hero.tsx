import hero from "../components/Hero/hero.jpg";
const Hero = () => {
    return (
        <div>
            <img src={hero} className="w-full max-h-[600px] object-cover" />
            
        </div>
    )
}

export default Hero;