import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Footer from '../Component/Layout/Footer';
import Header from '../Component/Layout/Header';

const MapComponent1 = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [date, setDate] = useState<string>(''); // State to hold the date
  const storedtime = localStorage.getItem("markertime");
  const addressName = localStorage.getItem("mapaddressName")

  useEffect(() => {
    const latString = localStorage.getItem('lat');
    const storedDate = localStorage.getItem("date");



    if (storedDate) {
      setDate(storedDate); // Set the retrieved date to the state variable
    }
    if (latString) {
      const matches = latString.match(/\(([^)]+)\)/);
      if (matches && matches.length > 1) {
        const [lat, lng] = matches[1].split(',').map((val) => parseFloat(val.trim()));

        if (!isNaN(lat) && !isNaN(lng)) {
          if (!mapRef?.current) {
            mapRef.current = L.map("map", {
              attributionControl: false,
         
              zoom: 30,
              scrollWheelZoom: false
            }).setView([lat, lng], 17);


            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef?.current);

            const redCircleIcon = L.divIcon({
              className: 'custom-icon',
              iconSize: [25, 25],
              iconAnchor: [12, 12],
              html: `<div style="background-color: orange; width: 25px; height: 25px; border-radius: 50%;"></div>`
            });

            L.marker([lat, lng], { icon: redCircleIcon })
              .addTo(mapRef.current)



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

  return <>

    <Header />
    <div className="mx-3 sm:mx-8 md:mx-20 lg:mx-32 xl:mx-40  mt-4 md:mt-36 lg:mt-32">
      <div className="h-auto md:h-[500px] ">
        <div >
          <p className="text-bold font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Report View
          </p>
          <hr className="h-px my-4 sm:my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <div className='flex gap-4'> <p className=" text-3xl">{date}</p>   {storedtime !== null && storedtime !== undefined && (
            <p className="text-3xl">{storedtime}</p>
          )}</div>

          <p className=" text-md">{addressName}</p>
          <br />
          <br />
        </div>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-[80%]">
         
            <div className="mt-[15%]"> {/* Adjust the margin-left as needed */}
              <p className="font-bold">Categories</p>
              <button className="text-black px-4 py-2 mt-2 border border-black ">Touching</button>
            </div>

          </div>

        
        </div>
      </div>
    </div>

    <div id="map" style={{ height: '400px' }}></div>
    <Footer />
  </>;
};

export default MapComponent1;
