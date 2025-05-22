import React from "react";
import HeroImage from "~/assets/png/Main-page-image.png";

interface HeroProps {
  title: React.ReactNode;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ title, ctaText, onCtaClick }) => {
  return (
    <section className="my-2 p-8 relative w-full after:h-screen bg-center bg-contain bg-no-repeat flex items-center overflow-hidden ">
      <img
        src={HeroImage}
        alt="Welcome to GameLog"
        className="absolute w-full h-full inset-0 object-contain"
      />
      <div className="relative top-8 md:top-8 flex items-start flex-col justify-between gap-4 md:gap-5 sm:gap-2">
        <h1 className="text-4xl  sm:text-3xl sm:w-[150px] md:text-5xl lg:text-7xl w-[250px] lg:w-[500px] xl:text-8xl xl:w-[650px] 2xl:text-9xl 2xl:w-[800px] md:w-72 font-semibold text-slate-200">
          {title}
        </h1>
       <Link
        to={ctaLink}
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
      >
        {ctaText}
      </Link>
        )}
      </div>
    </section>
  );
};

export default Hero;
