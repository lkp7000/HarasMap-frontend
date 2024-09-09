import React from "react";
import Header from "../../Component/Layout/Header";
import Footer from "../../Component/Layout/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect,  } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Report() {
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
      <div className="mx-4 md:mx-8 lg:mx-16 xl:mx-20 mt-4 md:mt-36 lg:mt-32">
        <div className="h-auto  flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4">
            <b
              className="text-bold font-oswald text-lg md:text-2xl"
              data-aos="flip-left"
            >
            
                 {t('Share Your Story')}
            </b>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <div className="p-4">
              <p
                className="text-bold text-lg md:text-xl text-[#0e7490] "
                data-aos="flip-left"
              >
                {t('Reporting is easy. All you need to do is tell us what happened, where, and when. We record all reports anonymously')}
              </p>
            </div>
            <div className="p-4">
              <div  data-aos="flip-left" className="bg-transparent hover:bg-blue-500 w-[140px] text-[#0284c7] font-semibold hover:text-white py-2 px-4 border border-[#91cedb] hover:border-transparent rounded">
               <Link to="/report-an-incident">{t('Report Here')}</Link> 
              </div>
            </div>
            <div  data-aos="flip-left" className="p-4">
              <p className="text-bold text-lg md:text-xl text-[#0e7490] ">
                {t('Want to know what difference it makes.')}
              </p>
            </div>
           
          </div>

          <div className="md:w-1/2 p-4"  data-aos="flip-right">
            <p className="text-black text-xl md:text-2xl font-bold">{t('How?')}</p>
            <p className="text-black text-base">
             {t('Anyone can report sexual harassment. You can choose to report an incident of sexual harassment or an intervention - when someone intervened to stop a sexual harassment incident or supported the harassed person. You can report directly when the incident happens, or anytime afterwards. And you can use your mobile or a computer to report.')}
            </p>
            <div className="p-4"  data-aos="flip-right">
              <p className="text-black text-xl md:text-2xl font-sans font-bold">
                {t('Step 1: Choose Report Incident or Report Intervention')}
              </p>
              <br />
              <div className=" max-md:flex">
              <Link
  to="/report/report-an-incident"
  className="bg-red-500 hover:underline text-white text-xl max-lg:text-sm font-oswald py-2 px-4 border border-red-700 rounded mr-4"
>
  {t('REPORT AN INCIDENT')}
</Link>

<Link
  to="/report/report-an-intervention"
  className="bg-[#0284c7] hover:underline text-white text-xl max-lg:text-sm font-oswald font-bold py-2 px-4 border border-[#91cedb] rounded"
>
  {t('REPORT AN INTERVENTION')}
</Link>

            </div>
            </div>

            <div className="p-4"  data-aos="flip-right">
              <p className="text-black text-xl md:text-2xl font-sans font-bold">
                {t('Step 2: Specify the location')}
              </p>
              <p className="text-black text-base"  data-aos="flip-right">
                {t('If you are reporting at the time and place of the incident,You can report it and if you know the residential address and position of harasser and intervener, or the exact location of incident, You can report. The collected data of these reports will be shown in the map and charts.')}
              </p>
              <img  data-aos="flip-right" src="\images\image1.png"></img>
              <p className="text-black text-base"  data-aos="flip-right">
           
              </p>
            </div>
            <div className="p-4"  data-aos="flip-right">
              <p className="text-black text-xl md:text-2xl font-sans font-bold">
                {t('Step 3: Describe what happened using the form below the map, and submit')}
              </p>
              <img  data-aos="flip-right" src=""></img>
              <p className="text-black text-base"  data-aos="flip-right">
              {t('You will be able to view your report on the map immediately. We check all report descriptions to ensure anonymity and once it is done, also the description will be viewable. If you want, you can download  your report as a pdf. Updates include comments and expressions of support.')}
              </p>
              <img  data-aos="flip-right" src="\images\image2.png"></img>
              <p className="text-black text-base"  data-aos="flip-right">
             {t('All reports are regularly reviewed to make sure that the report is about sexual harassment and not harassment in general. It should also be about a specific incident and not a general statement about sexual harassment. The report also has to say where and when it happened, and what kind of sexual harassment.')}
              </p>
            </div>

            <div className="p-4"  data-aos="flip-right">
             
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Report;
