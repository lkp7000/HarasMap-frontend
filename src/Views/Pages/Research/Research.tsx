import React from "react";
import Header from "../../Component/Layout/Header";
import Footer from "../../Component/Layout/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
export const Research = () => {
  useEffect(() => {
    AOS.init({
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div className="mx-4 md:mx-8 lg:mx-16 xl:mx-20  mt-4 md:mt-36 lg:mt-32">
        <div className="h-auto  flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4">
            <b
              className="text-bold font-oswald text-lg md:text-2xl"
              data-aos="flip-left"
            >
              {t("RESEARCH")}
            </b>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <div className="p-4 ">
              <p
                className="text-bold text-lg md:text-xl text-[#0e7490] w-full "
                data-aos="flip-left"
              >
                {t(
                  "We are working on a lot of exciting research related to sexual harassment to learn more about how best to document and address it."
                )}
              </p>
            </div>
          </div>{" "}
          <div className="p-4  w-1/2 w-full">
            <p className="text-bold text-sm md:text-sm " data-aos="flip-right">
              {t(
                "We are using crowdsourcing to collect and map incidents of sexual harassment. Our research project in 2014 examined crowdsourcing as a method for data collection and assessed its usefulness for studying sensitive issues like sexual harassment. Other research projects have focused on topics such as public perceptions of sexual harassment and instances of sexual harassment in the workplace."
              )}
              <br />
              <br />
              <br />
              {t(
                "There is always more to learn, and we are continually seeking ways to enhance our research capabilities. If you are interested in joining our research team as a volunteer, please send an email."
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="" data-aos="flip-up">
        <img src="\images\Map screen.png"></img>
      </div>
      <Footer />
    </>
  );
};
