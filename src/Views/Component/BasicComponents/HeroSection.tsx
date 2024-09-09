import { useNavigate } from 'react-router-dom';

import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';


const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleReportButtonClick = () => {
    navigate('/report-an-incident');
  };
  useEffect(() => {
    AOS.init({
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="bg-gradient-to-r from-yellow-300 to-pink-400
    ">
      <div className="grid max-w-screen-xl px-8    pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1  data-aos="fade-right"
              className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
          {t('Misconception About')} <br /> {t('Sexual Harassment')} 
          </h1>
          <p data-aos="fade-right" className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            {t("Harassment is any unwanted behaviour, physical or verbal or even suggested, that makes a reasonable person feel uncomfortable, humiliated, or mentally distressed")}
            .
          </p>
          <div data-aos="fade-right" className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
            <button
              onClick={handleReportButtonClick}
              className="bg-orange-500 hover:bg-orange-300 hover:text-gray-700 pl-14 pr-14  text-white w-full sm:w-auto shadow-lg font-bold font-serif py-3 rounded-full"
            >
              {t("Report")} </button>

          </div>
        </div>
        <div data-aos="fade-left" className="lg:mt-0 lg:col-span-5 lg:flex">
          <img  src=".\assets\Heroimage.png" alt="hero image " />

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

