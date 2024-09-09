import React from "react";
import Footer from "../../Component/Layout/Footer";
import Header from "../../Component/Layout/Header";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

function Campaigns() {
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
      <div className="mx-4  md:mx-8 lg:mx-16 xl:mx-20 mt-4 md:mt-36 lg:mt-32">
        <div className="h-auto flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4">
            <b
              className=" font-oswald text-lg md:text-2xl"
              data-aos="fade-right"
            >
               {t('Campaigns')} 
              
            </b>
            <hr
              className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"
              data-aos="fade-right"
            ></hr>
            <div className="p-4" data-aos="fade-right">
              <p className="text-bold flex-nowrap text-lg md:text-xl  md:w-full lg:w-full xl:w-full text-[#0e7490] ">
                {t('To get harassers to stop harassing, all of society needs to stop tolerating and excusing their behavior.')}
                <br />
                <br />
               {t('We use our reports, research, and experiences from our work in schools, universities, and workplaces to create campaigns to change the perceptions that create and reinforce a culture of blaming the harassed, excusing the harasser, and accepting sexual harassment')}{" "}
              </p>
            </div>
          </div>
          <div className=" p-4 md:w-1/2 lg:w-1/2 xl:w-1/2" data-aos="fade-left">
            <iframe
              width={660}
              height={350}
              src="https://www.youtube.com/embed/7PIji8OubXU?si=umMVRLAVGSTfki8S"
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <p className="text-bold text-sm md:text-xl mt-4 ">
           {t('We also work to steer the media discourse away from unproductive stereotyping, and towards a facts-based positive discussion of what needs to be done to end this epidemic.')}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-8 max-md:grid-cols-1 max-md:my-4">
        {" "}
        <div className="h-60 bg-black " data-aos="flip-left">
          <img src="https://blog.ipleaders.in/wp-content/uploads/2021/01/Sexual-Harassment-4.jpg"></img>
        </div>
        <div className="h-60  bg-black " data-aos="flip-left">
          <img
            className="h-60 w-[120%]"
            src="/images/image3.jpg"
          ></img>
        </div>{" "}
        <div className="h-60 bg-black " data-aos="flip-left">
          <img
            className="h-60 w-full"
            src="/images/img07.png"
          ></img>
        </div>{" "}
        <div className="h-60 bg-black " data-aos="flip-right">
          <img
            className="h-60 w-full"
            src="https://poshhelp.in/wp-content/uploads/2023/01/Role-of-HR-in-preventing-sexual-harassment-jpg.webp"
          ></img>
        </div>{" "}
        <div className="h-60 bg-black " data-aos="flip-right">
          <img
            className="h-60  w-full "
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7HPvgZjvvyJ7mekRMZAylS6bDShAELg7nAQ&usqp=CAU"
          ></img>
        </div>{" "}
        <div className="h-60 bg-black " data-aos="flip-right">
          <img
            className="h-60 w-full"
            src="https://media.istockphoto.com/id/1419502900/vector/stop-violence-against-women-social-problem-vector-stock-illustration.jpg?s=612x612&w=0&k=20&c=KJRN0m-xnPsFJ6VKHivlCsq6NdS1x20VJ8jYaTiFOXI="
          ></img>
        </div>{" "}
      </div>
      <div className="h-10 "></div>
      <Footer />
    </>
  );
}

export default Campaigns;
