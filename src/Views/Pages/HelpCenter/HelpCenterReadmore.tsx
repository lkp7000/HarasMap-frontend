import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Footer from "../../Component/Layout/Footer";
import Header from "../../Component/Layout/Header";

const HelpCenterReadmore = () => {
  const mapRef = useRef<L.Map | null>();
  const [type, setType] = useState<string>(""); // State to hold the date
  const [date, setDate] = useState<any>();

  useEffect(() => {
    const latString = localStorage.getItem("workin");
    const type = localStorage.getItem("address");
    const storedDate = localStorage.getItem("organisationType");

    if (type) {
      setType(type);
    }
    if (storedDate) {
      setDate(storedDate);
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
              zoom: 30,
              scrollWheelZoom: false
            }).setView([lat, lng], 14);;
            L.tileLayer(
              "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ).addTo(mapRef.current);

            const markerColor = type === 'Harassment' ? 'red' : 'red';

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
      <div className="mx-3 sm:mx-8 md:mx-20 lg:mx-32 xl:mx-40 md:mt-36 ">
        <div className="h-100px md:h-[200px]">
          <div>
            <p className="text-bold font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              {date}
            </p>
            <hr className="h-px my-4 sm:my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <p className="text-bold font-sans text-xl sm:text-2xl md:text-3xl lg:text-2xl">
              Address :- {type}
            </p>
          </div>
        </div>
      </div>

      <div id="map" style={{ height: "400px" }}></div>

      <Footer />
    </>
  );
};

export default HelpCenterReadmore;
