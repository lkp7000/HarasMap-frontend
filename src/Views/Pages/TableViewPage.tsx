import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Header from "./AdminDashboard/Adminheader";
import Footer from "../Component/Layout/Footer";

const TableViewPage = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [date, setDate] = useState<string>(""); // State to hold the date

  const latString = localStorage.getItem("event");
  const storedDate = localStorage.getItem("description");
  const tabletype = localStorage.getItem("tabletype");
  useEffect(() => {
    const tablelatitute = localStorage.getItem("tablelatitute");
    const tablelongitude = localStorage.getItem("tablelongitude");

    if (storedDate) {
      setDate(storedDate); // Set the retrieved date to the state variable
    }
    if (tablelatitute && tablelongitude) {
      const lat = parseFloat(tablelatitute);
      const lng = parseFloat(tablelongitude);

      if (!isNaN(lat) && !isNaN(lng)) {
        if (!mapRef.current) {
          mapRef.current = L.map("map", {
            attributionControl: false,
            // minZoom: 9,
            // maxZoom: 11,
            zoom: 30,
            scrollWheelZoom: false,
          }).setView([lat, lng], 15);

          L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ).addTo(mapRef.current);

          const colortype = tabletype === "Intervention" ? "green" : "red"; // Assuming 'type' property determines intervention type
          const redCircleIcon = L.divIcon({
            className: "custom-icon",
            iconSize: [25, 25],
            iconAnchor: [12, 12],
            html: `<div style="background-color:  ${colortype}; width: 25px; height: 25px; border-radius: 50%;"></div>`,
          });

          L.marker([lat, lng], { icon: redCircleIcon }).addTo(mapRef.current);
        }
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <Header />
      <div className="mx-3 sm:mx-8 md:mx-20 lg:mx-32 xl:mx-40  mt-4 md:mt-36 lg:mt-32">
        <div className="h-auto md:h-[500px] ">
          <div>
            <p className="text-bold font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              Report View
            </p>
            <hr className="h-px my-4 sm:my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <p className=" text-3xl">{date}</p>
            <p className=" text-3xl">{latString}</p>
            {/* <p className='text-lg text-gray-500'>{`at ${date}`}</p> */}
            <br />
            <br />
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-[80%]">
              {/* <p className='text-lg text-gray-500'>{description}</p> */}
              {/* <p className="mt-[20%] font-bold">Categories</p> */}
              <div className="mt-[15%]">
                {" "}
                {/* Adjust the margin-left as needed */}
                <p className="font-bold">Categories</p>
                {/* Add your additional text here */}
                <button className="text-black px-4 py-2 mt-2 border border-black ">
                  Touching
                </button>
              </div>
            </div>

            <div className="w-full sm:w-[50%]">
              <div className="pl-0 sm:pl-8 md:pl-16 lg:pl-24">
                <p>8 expressions of support.</p>
                <button className="text-green-400 px-4 py-2  m-2 border border-green-400 ">
                  Express Support
                </button>
                <br />
                <button className="text-green-400 px-4 py-2  m-2 border border-green-400 ">
                  Add Comments
                </button>
                <br />
                <button className="text-green-400 px-4 py-2  m-2 border border-green-400 ">
                  View more reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="map" style={{ height: "400px" }}></div>
      <Footer />
    </>
  );
};

export default TableViewPage;
