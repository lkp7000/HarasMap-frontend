import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { newsview } from "../../../services/api";

const cards = [
  {
    title: "Sexual Harassment",
    description:
      "Sexual harassment can be physical or verbal. Sexual harassment includes a range of actions from verbal transgressions to sexual abuse or assault.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/021/907/793/small_2x/silhouette-of-woman-harassment-illustration-hands-of-man-touching-hijab-women-violence-against-women-workplace-bullying-concept-flat-concept-text-blue-white-victim-sexual-rape-vector.jpg",
  },
  {
    title: "Domestic Violence",
    description:
      "Domestic abuse, also called domestic violence or can be defined as a pattern of behaviour in any relationship that is used to gain or maintain power and control over an intimate partner.",
    imageUrl:
      "https://legalvidhiya.com/wp-content/uploads/2023/05/image-removebg-preview-48.png",
  },
  {
    title: "Health",
    description:
      "The meaning of health has evolved over time. In keeping with the biomedical perspective, early definitions of health focused on the theme of the body's ability to function.",
    imageUrl:
      "https://blog.ipleaders.in/wp-content/uploads/2020/01/Health-Insurance.jpg",
  },
  {
    title: "Employment",
    description:
      "Employment is a relationship between two parties regulating the provision of paid labour services. Usually based on a contract, one party, the employer, which might be a corporation, a not-for-profit organization, a co-operative.",
    imageUrl:
      "https://sustainable-environment.org.uk/wp-content/uploads/2019/01/19acf74f-6254-4906-a170-e7cf774a3e16.jpeg",
  },
];
const getCardLayout = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1024) {
    return "lg:w-64";
  } else if (screenWidth >= 768) {
    return "md:w-56";
  } else {
    return "w-full";
  }
};

const Testimonial = () => {
  const [apidata, setApiData] = useState<any>();
  const { t } = useTranslation();

  useEffect(() => {
    const allnews = async () => {
      try {
        const apiResponse = await newsview();
        setApiData(apiResponse);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };
    allnews();
  }, []);

  const CustomPrevArrow: React.FC<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  > = (props) => (
    <button {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-8 arrow-icon text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
  const CustomNextArrow: React.FC<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  > = (props) => (
    <button {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="my-custom  h-10 w-8 arrow-icon text-white"
        id="my-arrow"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="bg-{#76B0F4} gap-20 p-4 space-y-4">
        <div className=" h-[200px] my-10 ">
          <div className=" grid  grid-cols-3 max-md:grid-cols-3 max-sm:grid-cols-3   gap-4 h-[200px] justify-center text-center bg-blue">
            <div className="  h-[200px]">
              <div
                className="justify-center text-center "
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
              >
                <Link
                  to="/reporting"
                  type="button"
                  className="text-white bg-gradient-to-r from-white via-slate-600 to-[#0284c7] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-slate-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  <svg
                    className="h-16 w-16 text-white max-sm:h-8 max-sm:w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                </Link>
                <br />
                <p className=" text-bold  font-oswald text-2xl max-sm:text-lg  justify-center items-center text-[#0284c7] ">
                  {t("Learn the Basics")}
                </p>{" "}
                <p className=" text-bold  justify-center items-center max-sm:text-sm  text-black">
                  {t(
                    "Quick guide to sexual harassment and how  to take action."
                  )}
                </p>
              </div>
            </div>
            <div className=" h-[200px]">
              <div
                className=" item-center"
                data-aos="fade-down"
                data-aos-anchor-placement="center-bottom"
              >
                <Link
                  to="/report"
                  type="button"
                  className="text-white bg-gradient-to-r from-white via-slate-600 to-[#0284c7] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-slate-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  <svg
                    className="h-16 w-16 text-white max-sm:h-8 max-sm:w-8"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M12 10L6 20l-3-5L9 5z" />{" "}
                    <path d="M9 15h12l-3 5h-12" />{" "}
                    <path d="M15 15L9 5h6l6 10z" />
                  </svg>
                </Link>

                <br />
                <p className=" text-bold font-oswald text-2xl max-sm:text-lg  text-[#0284c7] ">
                  {t("Share your Story")}
                </p>
                <p className=" text-bold font-sans  justify-center items-center max-sm:text-sm  text-black">
                  {t("You Can Share your story of Harassment")}.
                </p>
              </div>
            </div>
            <div className="    h-[200px] mb-36">
              {/* {grid 02} */}
              <div
                className=" item-center "
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
              >
                <Link
                  to="/mapeffect"
                  type="button"
                  className="text-white bg-gradient-to-r from-white via-slate-600 to-[#0284c7] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-slate-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  <svg
                    className="h-16 w-16 text-white max-sm:h-8 max-sm:w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>
                </Link>

                <br />
                <p className=" text-bold font-oswald  text-2xl  max-sm:text-lg text-[#0284c7] ">
                  {t("Get Active")}
                </p>
                <p className=" text-bold  justify-center items-center max-sm:text-sm  text-black">
                  {t("There is a lot more you can do Harassment.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-300 to-pink-400">
        <div className="grid  lg:md:grid-cols-4 max-sm:grid-cols-1 gap-40 py-16 mx-auto w-10/12 ">
          <Card className="w-[240px] h-[240px] border-none ">
            <CardBody
              className="justify-center items-center pb-0"
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
            >
              <CircularProgress
                classNames={{
                  svg: "w-36 h-36 drop-shadow-md",
                  indicator: "stroke-white",
                  track: "stroke-white/10",
                  value: "text-3xl font-semibold text-white",
                }}
                value={40}
                strokeWidth={4}
                showValueLabel={true}
              />
            </CardBody>
            <br />
            <CardFooter
              className="justify-center items-center pt-0"
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
            >
              <Chip
                classNames={{
                  base: "border-1 border-white/30",
                  content:
                    "text-white/90 text-2xl my-2 font-oswald tracking-wide hover:tracking-widest ",
                }}
                variant="bordered"
              >
                {t("Harassment Cases")}
              </Chip>
            </CardFooter>
          </Card>
          <Card
            className="w-[240px] h-[240px] border-none "
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
          >
            <CardBody className="justify-center items-center pb-0">
              <CircularProgress
                classNames={{
                  svg: "w-36 h-36 drop-shadow-md",
                  indicator: "stroke-white",
                  track: "stroke-white/10",
                  value: "text-3xl font-semibold text-white",
                }}
                value={60}
                strokeWidth={4}
                showValueLabel={true}
              />
            </CardBody>
            <br />
            <CardFooter className="justify-center items-center pt-0">
              <Chip
                classNames={{
                  base: "border-1 border-white/30",
                  content:
                    "text-white/90 text-2xl my-2 font-oswald tracking-wide hover:tracking-widest ",
                }}
                variant="bordered"
              >
                {t("Domestic Violence")}
              </Chip>
            </CardFooter>
          </Card>
          <Card
            className="w-[240px] h-[240px] border-none"
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
          >
            <CardBody className="justify-center items-center pb-0">
              <CircularProgress
                classNames={{
                  svg: "w-36 h-36 drop-shadow-md",
                  indicator: "stroke-white",
                  track: "stroke-white/10",
                  value: "text-3xl font-semibold text-white",
                }}
                value={80}
                strokeWidth={4}
                showValueLabel={true}
              />
            </CardBody>
            <br />
            <CardFooter className="justify-center items-center pt-0">
              <Chip
                classNames={{
                  base: "border-1 border-white/30",
                  content:
                    "text-white/90 text-2xl my-2 font-oswald tracking-wide hover:tracking-widest ",
                }}
                variant="bordered"
              >
                {t("Intervention cases")}
              </Chip>
            </CardFooter>
          </Card>{" "}
          <Card className="w-[240px] h-[240px] border-none ">
            <CardBody
              className="justify-center items-center pb-0"
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
            >
              <CircularProgress
                classNames={{
                  svg: "w-36 h-36 drop-shadow-md",
                  indicator: "stroke-white",
                  track: "stroke-white/10",
                  value: "text-3xl font-semibold text-white",
                }}
                value={90}
                strokeWidth={4}
                showValueLabel={true}
              />
            </CardBody>
            <br />
            <CardFooter className="justify-center items-center pt-0">
              <Chip
                classNames={{
                  base: "border-1 border-white/30",
                  content:
                    "text-white/90 text-2xl my-2 font-oswald tracking-wide hover:tracking-widest ",
                }}
                variant="bordered"
              >
                {t("Health problems")}
              </Chip>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="bg-black py-16">
        <div className="h-auto flex bg-black/20" data-aos="flip-up">
          <div className="inline-flex items-center bg-black/20 pt-4 justify-center w-full">
            <hr className="w-full h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
            <p className="absolute flex-shrink text-white mx-4 bg-black pt-2 font-oswald text-3xl justify-content-center items-center font-bold dark:bg-gray-900">
              {t("NEWS")}
            </p>
          </div>
        </div>
        <hr className="my-4 bg-white border-0 dark:bg-gray-700"></hr>

        <div
          className=" w-[85%] h-[50%] mx-auto "
          data-aos="fade-down"
          data-aos-duration="3000"
        >
          <div className="">
            <Slider {...settings}>
              {apidata &&
                apidata.map((item: any, index: any, image: any) => (
                  <div
                    key={index}
                    className=" bg-gradient-to-r from-yellow-200 to-pink-300 h-[560px]  text-black rounded-xl overflow-hidden"
                  >
                    <div className="rounded-t-xl bg-black flex justify-center h-[50%] items-center overflow-hidden ">
                      <img
                        src={`data:image/png;base64,${item.image}`}
                        alt={`slide ${index + 1}`}
                        className="w-[100%] overflow-hidden"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4 p-4">
                      <p className="text-3xl  font-semibold  ">
                        {t(item.title)}
                      </p>
                      <p className="text-lg font-normal">
                        {t(item.description)}
                      </p>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </div>
      <div className="pt-[82px] bg-[#f97316]/80">
        <div className=" flex flex-col md:flex-row md:space-x-2">
          <div className="w-full md:w-[500px]  pt-[52px] ml-4 md:ml-[109px]">
            <p
              className="text-4xl font-oswald text-black font-bold"
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              {t("HOW WE CAN STOP SEXUAL HARASSMENT")}
            </p>
            <br /> <br />
            <p
              className="text-2xl flex-wrap md:text-xl  font-sans text-black"
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              {t(
                "When enough people take action, harassers will find it increasingly difficult to act with impunity. They will face consequences in the streets, at their workplace, from friends, family, and colleagues, eventually choosing to stop these practices. It is at that moment that we will achieve our goal: zero tolerance will become the norm, and sexual harassment will finally be eradicated in Haiti."
              )}
            </p>
            <div
              className="pt-[50px] ml-4 md:ml-[145px] max-md:shrink"
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              {/* <button className="bg-white font-oswald font-thin hover:bg-blue-500 text-[#3bc6c2]  hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded">
                {t('READ MORE')}
              </button> */}
            </div>
            <br />
            <br />
          </div>
          <div
            className=" h-full w-full"
            data-aos="fade-left"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            <img
              className=" max-md:hidden
             h-full w-full "
              src=".\images\stopharass.png"
              alt="Drop"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-black space-x-6 p-8  flex-wrap">
        {cards.map((card: any, index: any) => (
          <div
            key={index}
            className={`relative w-40 max-md:my-4 max-md:w-full my-8 md:w-56 lg:w-64 h-56 md:h-72 lg:h-80 ${getCardLayout()}`}
          >
            <motion.div
              className="absolute w-full h-full bg-blue-200 rounded-lg shadow-md flex flex-col items-center justify-center transition-transform duration-500 hover:-translate-y-full"
              whileHover={{ rotateY: 180 }}
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">{t(card.title)}</h3>
                <p className="text-sm text-left pl-2">{t(card.description)}</p>
              </div>
            </motion.div>
            <motion.img
              className="w-full h-full rounded-lg absolute top-0 left-0 object-cover"
              src={card.imageUrl}
              alt={card.title}
              whileHover={{ opacity: 0 }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Testimonial;

function newsnews() {
  throw new Error("Function not implemented.");
}
