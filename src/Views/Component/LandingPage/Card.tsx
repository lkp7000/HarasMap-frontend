import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Box } from "@mui/system";
import { t } from "i18next";

const Cards = () => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <Box className="bg-{#76B0F4} gap-20 p-4 space-y-4">
      <div className=" h-[200px] my-10 ">
        <div className=" grid  grid-cols-3 max-md:grid-cols-3 max-sm:grid-cols-3   gap-4 h-[200px] justify-center text-center bg-blue">
          <div className="  h-[200px]">
            <div
              className="justify-center text-center "
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
            >
              <button
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
              </button>
              <br />
              <p className =" text-bold  font-oswald text-2xl max-sm:text-lg  justify-center items-center text-[#0284c7] ">
                Learn to Report
              </p>{" "}
              <p className=" text-bold  justify-center items-center max-sm:text-sm  text-black">
                Quick guide to sexual harassment and how <br/> to take action.
               
              </p>
            </div>
          </div>
          <div className=" h-[200px]">
            {/* {grid 02} */}
            <div
              className=" item-center"
              data-aos="fade-down"
              data-aos-anchor-placement="center-bottom"
            >
              <button
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
                  <path d="M9 15h12l-3 5h-12" /> <path d="M15 15L9 5h6l6 10z" />
                </svg>
              </button>

              <br />
              <p className=" text-bold font-oswald text-2xl max-sm:text-lg  text-[#0284c7] ">
                Share your Story
              </p>
              <p className=" text-bold font-sans  justify-center items-center max-sm:text-sm  text-black">
                You Can Share your story of Harassment.
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
              <button
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
              </button>

              <br />
              <p className=" text-bold font-oswald  text-2xl  max-sm:text-lg text-[#0284c7] ">
                Get Active
              </p>
              <p className=" text-bold  justify-center items-center max-sm:text-sm  text-black">
                There is a lot more you can do Harassment.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap 
bg-gradient-to-r from-yellow-300 to-pink-400 hover:from-pink-300 hover:to-yellow-400 rounded-lg  "     data-aos="fade-up"

>
        <Card className="w-full sm:w-[40%] md:w-[30%] lg:w-[30%] xl:w-1/5 max-w-md my-24 mx-auto lg:mx-auto xl:mx-auto hover:scale-110">
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="assets/stop.png"
              alt="green iguana"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                Harassment
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {showFullText
                  ? `Lorem ipsum dolor  ipsum dolor sit amet, labore et dolore magna aliqua. Ut enim`
                  : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim`}
              </Typography>
              <Box className="p-4 text-center"></Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
         
          className="w-full sm:w-[40%] md:w-[30%] lg:w-[30%] xl:w-1/5 max-w-md my-24 mx-auto lg:mx-auto xl:mx-auto  hover:scale-110"
          data-aos="fade-down"
               >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="assets/card1.png"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              {t('Domestic Violence')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {showFullText
                  ? `Lorem ipsum dolor sit amet,elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim`
                  : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim`}
              </Typography>
              <Box className="p-4 text-center"></Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className="w-full sm:w-[40%] md:w-[30%] lg:w-[30%] xl:w-1/5 max-w-md md:flex-wrap my-24 mx-auto  hover:scale-110 lg:mx-auto xl:mx-auto"      data-aos="fade-up">
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="assets/card2.png"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Unemployment
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {showFullText
                  ? `Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim`
                  : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim`}
              </Typography>
              <Box className="p-4 text-center"></Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </Box>
  );
};

export default Cards;
