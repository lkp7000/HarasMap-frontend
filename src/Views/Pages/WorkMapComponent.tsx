import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Header from "../Component/Layout/Header";
import Footer from "../Component/Layout/Footer";

const WorkMapComponent = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [type, setType] = useState<string>(""); // State to hold the date
  const [date, setDate] = useState<any>();
  const [lat, setlat] = useState<any>();
  const [description, setdescription] = useState<any>();




  useEffect(() => {
    const latString = localStorage.getItem("worklat");
    const type = localStorage.getItem("type");
    const storedDate = localStorage.getItem("workDate");
    const descripition = localStorage.getItem("description")

    if (descripition) {
      setdescription(descripition)
    }
    if (type) {
      setType(type); // Set the retrieved date to the state variable
    }
    if (storedDate) {
      setDate(storedDate); // Set the retrieved date to the state variable
    }
    if (latString) {
      const matches = latString.match(/\(([^)]+)\)/);
      if (matches && matches.length > 1) {
        const [lat, lng] = matches[1]
          .split(",")
          .map((val) => parseFloat(val.trim()));

        if (!isNaN(lat) && !isNaN(lng)) {
          if (!mapRef.current) {
            mapRef.current = L.map("map", {
              attributionControl: false,
              // minZoom: 9,
              // maxZoom: 11,
              zoom: 10,
              scrollWheelZoom: false
            }).setView([lat, lng], 17);;
            L.tileLayer(
              "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ).addTo(mapRef.current);

            const markerColor = type === 'Harassment' ? 'red' : 'green';

            const redCircleIcon = L.divIcon({
              className: "custom-icon",
              iconSize: [25, 25],
              iconAnchor: [12, 12],
              html: `<div style="background-color:  ${markerColor}; width: 25px; height: 25px; border-radius: 50%;"></div>`,
            });

            L.marker([lat, lng], { icon: redCircleIcon }).addTo(mapRef.current);
          }
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
          <div >
            <p className="text-bold font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              Report View
            </p>
            <hr className="h-px my-4 sm:my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <div className='flex gap-4'> <p className=" text-3xl"> Type : {type}</p>
            </div>
            <br />
            <p className=" text-md">Date : {date}</p>
            <br />
            <br />
            <h3 className="" style={{ fontSize: "1.5rem" }}>
              Address: {description}
            </h3>
          </div>

        </div>
      </div>

      <div id="map" style={{ height: '400px' }}></div>

      <Footer />
    </>
  );
};

export default WorkMapComponent;
