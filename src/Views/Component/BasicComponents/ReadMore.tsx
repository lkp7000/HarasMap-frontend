import Data, { circleMarker } from "leaflet";
import Header from '../Layout/Header'
import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getMapDataAPI } from "../../../services/api";



interface ReportData {
    title: string;
    date: string;
    location: string;
    description: string;
    categories: string;
    expressionsOfSupport: number;
  }
  const ReadMore: React.FC<{ reportData?: ReportData }> = ({ reportData = {} }) => {

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [showHarassment, setShowHarassment] = useState(true);
    const [locations, setLocations] =
      useState<
        [{ lat: number; lon: number; name: string; description: string }]
      >();
    //     [
    //     { lat: 18.9712, lon: -72.2852, name: '1', description: 'Capital city of Haiti' },
  
    // ]
    const [showIntervention, setShowIntervention] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState<{
      name: any;
      lat: number;
      lon: number;
    } | null>(null);
  
    const token = localStorage.getItem("token");
  
    const [payload, setPayload] = useState({
      all: true,
      unemployment: true,
      Harrasvictim: true,
      DomesticVoilence: true,
      Health: true,
    });
  
    const handleDropdownToggle = () => {
      setDropdownOpen((prev) => !prev);
    };
  
  
    useEffect(() => {
      const token = localStorage.getItem('token');
  
      const fetchMapData = async () => {
        try {
          const apiResponse = await getMapDataAPI(token);
          const formattedData = apiResponse.data.map((item :any, index:any) => ({
            lat: item.latitude,
            lon: item.longitude,
            name: item.name,
            description: item.description,
          }));
          setLocations(formattedData);
          console.log(formattedData)
        } catch (error) {
          console.error('Error fetching map data:', error);
        }
      };
  
      fetchMapData();
    }, []); //
  
    const handleLinkClick = (e: any) => {
      const checkboxId = e.target.id;
      const isChecked = e.target.checked;
      const prev = {
        ...payload,
        [checkboxId]: isChecked,
      };
      // let keys = Object.keys(payload);
      // for(let keys in payload){
      //     if(payload[key])
      // }
      if (
        !prev.DomesticVoilence ||
        !prev.Harrasvictim ||
        !prev.Health ||
        !prev.unemployment
      ) {
        setPayload((prevPayload: any) => ({
          ...prevPayload,
          all: false,
          [checkboxId]: isChecked,
        }));
      } else {
        setPayload((prevPayload: any) => ({
          ...prevPayload,
          all: true,
          [checkboxId]: isChecked,
        }));
      }
  
      let staticData1 = [
        {
          lat: 18.1212,
          lon: -72.2552,
          name: "1",
          description: "Capital city of Haiti",
        },
        {
          lat: 19.1192,
          lon: -72.2529,
          name: "2",
          description: "Second-largest city",
        },
        { lat: 19.1531, lon: -72.6506, name: "43", description: "Coastal town" },
        { lat: 18.5192, lon: -72.3564, name: "27", description: "Artistic town" },
        { lat: 18.6314, lon: -74.1583, name: "21", description: "Coastal town" },
        {
          lat: 18.4214,
          lon: -72.8513,
          name: "20",
          description: "Town near Port-au-Prince",
        },
        {
          lat: 19.0105,
          lon: -72.827,
          name: "13",
          description: "Rural area in Haiti",
        },
        {
          lat: 19.41519,
          lon: -72.5813,
          name: "18",
          description: "Small village",
        },
      ];
      let staticData2 = [
        {
          lat: 18.1212,
          lon: -72.2152,
          name: "12",
          description: "Capital city of Haiti",
        },
        { lat: 19.9119, lon: -72.5813, name: "8", description: "Small village" },
      ];
      let staticData3 = [
        {
          lat: 18.1212,
          lon: -72.2552,
          name: "11",
          description: "Capital city of Haiti",
        },
        {
          lat: 19.1112,
          lon: -73.2529,
          name: "21",
          description: "Second-largest city",
        },
        { lat: 18.6114, lon: -74.1583, name: "52", description: "Coastal town" },
        {
          lat: 18.0105,
          lon: -72.827,
          name: "12",
          description: "Rural area in Haiti",
        },
        { lat: 19.44519, lon: -72.5813, name: "8", description: "Small village" },
      ];
      let staticData4 = [
        {
          lat: 18.1232,
          lon: -72.2552,
          name: "22",
          description: "Capital city of Haiti",
        },
        {
          lat: 19.1192,
          lon: -72.2529,
          name: "11",
          description: "Second-largest city",
        },
        { lat: 19.5192, lon: -72.3564, name: "3", description: "Artistic town" },
        { lat: 18.6114, lon: -74.1783, name: "5", description: "Coastal town" },
        {
          lat: 18.4214,
          lon: -72.8513,
          name: "19",
          description: "Town near Port-au-Prince",
        },
        { lat: 19.1519, lon: -72.5813, name: "90", description: "Small village" },
        { lat: 19.2229, lon: -72.5813, name: "8", description: "Small village" },
        { lat: 19.2119, lon: -72.5813, name: "48", description: "Small village" },
        { lat: 19.1519, lon: -72.5813, name: "91", description: "Small village" },
      ];
      const locationGenerator = (staticData: any) => {
        const data: any = [];
        staticData?.map((item: any, index: number) => {
          data.push({
            lat: item.lat,
            lon: item.lon,
            description: item?.description,
            // description: randomDescription[(Math.floor(Math.random() * randomDescription.length))],
            name: index,
          });
        });
        setLocations(data);
        // }
      };
      if (payload.DomesticVoilence) {
        locationGenerator(staticData1);
      }
      if (payload.Health) {
        locationGenerator(staticData2);
      }
      if (payload.unemployment) {
        locationGenerator(staticData3);
      }
      if (payload.Harrasvictim) {
        locationGenerator(staticData4);
      }
    };
    const getMapData = async () => {
      // try {
      // const response = await getMapDataAPI(token);
      let staticData = [
        {
          lat: 18.9712,
          lon: -72.2852,
          name: "1",
          description: "Capital city of Haiti",
        },
        {
          lat: 19.7592,
          lon: -72.2129,
          name: "2",
          description: "Second-largest city",
        },
        { lat: 19.1231, lon: -72.6406, name: "3", description: "Coastal town" },
        { lat: 18.5392, lon: -72.3364, name: "4", description: "Artistic town" },
        { lat: 18.6394, lon: -74.1183, name: "5", description: "Coastal town", },
        {
          lat: 18.4274,
          lon: -72.8713,
          name: "6",
          description: "Town near Port-au-Prince",
        },
        {
          lat: 19.0805,
          lon: -72.857,
          name: "7",
          description: "Rural area in Haiti",
        },
        { lat: 19.4519, lon: -72.6813, name: "8", description: "Small village" },
      ];
      // if (response.status !== 200) {
      const randomDescription = [
        "Capital city of Haiti",
        "Second-largest city",
        "Coastal town",
        "Artistic town",
        "Town near Port-au-Prince",
        "Small village",
      ];
      const data: any = [];
      const locationGenerator = () => {
        staticData?.map((item: any, index: number) => {
          data.push({
            lat: item.lat,
            lon: item.lon,
            description: item?.description,
            name: index,
          });
        });
        // }
  
        setLocations(data);
      };
      locationGenerator();
    };
    useEffect(() => {
      getMapData();
    }, []);
  
    useEffect(() => {
     
     
      // Data.tileLayer(
      //   "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      //   {}
      // ).addTo(map);
  
      // Data.tileLayer(
      //   "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      //   {}
      // ).addTo(map);
  
  
      const map = L.map("map", { attributionControl: false, minZoom: 9, maxZoom:11 }).setView([18.9712, -72.2852], 7);
      const southWest = L.latLng(18.8, -72.5);
      const northEast = L.latLng(15.2, -75);
  
      const initialBounds = L.latLngBounds(southWest, northEast);
    
      map.setMaxBounds(initialBounds);
      map.on('drag', function () {
        map.panInsideBounds(initialBounds, { animate: false });
      });
    
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(map);
    
      map.on('zoomend', function () {
        const currentZoom = map.getZoom();
        const newBounds = adjustBoundsForZoom(initialBounds, currentZoom);
        map.setMaxBounds(newBounds);

        console.log("Current Zoom Level:", currentZoom);
      });
      
  
      locations?.forEach((location: any) => {
        const divIcon = L.divIcon({
          className: "custom-marker",
          html: `<div class="marker-circle"><b>${location.name}</b></div>`,
        });
        const marker = Data.marker([location?.lat, location?.lon], {
          icon: divIcon,
        }).addTo(map);
        marker.bindPopup(`<b>${location?.name}</b><br />${location.description} <br />
        <a href="/readmore">Read More</a> `);
     
        const locationsWithRandomPoints: string[] = [];
        marker.on("click", () => {
          map.setView([location?.lat, location?.lon], 12);
          setSelectedLocation(location);
          if (!locationsWithRandomPoints.includes(location.name)) {
            selectRandomPoints(
              location?.lat,
              location?.lon,
              parseInt(location.name, 10),
              map
             
            );
            addGreenMarkers(
              location?.lat,
              location?.lon,
              parseInt(location.name, 10)
            );
            locationsWithRandomPoints.push(location.name);
            // console.log("Clicked Point Information:");
            // console.log("Latitude:", location?.lat);
            // console.log("Longitude:", location?.lon);
            // console.log("Zoom Level:", map.getZoom());
            // console.log("Max Zoom:", map.getMaxZoom());
            // console.log("Min Zoom:", map.getMinZoom());
          }
        });
      });
  
      function selectRandomPoints(
        centerLat: number,
        centerLon: number,
        numPoints: number,
        map: L.Map
      ) {
        const sideLengthKm = 20;
        for (let i = 0; i < numPoints; i++) {
          const randomLatOffset = (Math.random() - 0.5) * (sideLengthKm / 111.32);
          const randomLonOffset =
            (Math.random() - 0.5) *
            (sideLengthKm / (111.32 * Math.cos(centerLat * (Math.PI / 180))));
          const randomLat = centerLat + randomLatOffset;
          const randomLon = centerLon + randomLonOffset;
          Data.circleMarker([randomLat, randomLon], {
            className: "custom-circle-marker",
          }).addTo(map);
          const circleMarker: any = L.circleMarker([randomLat, randomLon], {
            className: "custom-circle-marker",
          }).addTo(map);
      
          circleMarker.bindPopup(
            // `<b>Random Point</b><br />This is a random point at (${randomLat}, ${randomLon})`
            `<b></b> ${locations && locations[i]?.description} <br />
            <a href="/readmore">Read More</a>`
          );
        }
      }
  
      function addGreenMarkers(
        centerLat: number,
        centerLon: number,
        numGreenMarkers: number
      ) {
        for (let i = 0; i < numGreenMarkers; i++) {
          const randomLatOffset = (Math.random() - 0.5) * 0.01;
          const randomLonOffset = (Math.random() - 0.5) * 0.01;
          const randomLat = centerLat + randomLatOffset;
          const randomLon = centerLon + randomLonOffset;
          Data.circleMarker([randomLat, randomLon], {
            className: "custom-green-marker",
          }).addTo(map);
         
        }
      }
  
      return () => {
        map.remove();
      };
    }, [locations]);
  
  
    function adjustBoundsForZoom(initialBounds: Data.LatLngBounds, currentZoom: number) {
      const zoomFactor = 60; // Increase or decrease based on your preference
      const southWest = initialBounds.getSouthWest();
      const northEast = initialBounds.getNorthEast();
      const newSouthWest = L.latLng(southWest.lat - zoomFactor, southWest.lng - zoomFactor);
      const newNorthEast = L.latLng(northEast.lat + zoomFactor, northEast.lng + zoomFactor);
      return L.latLngBounds(newSouthWest, newNorthEast);
    }
  
    useEffect(() => {
      const updateMarkers = () => {
        const harassmentMarkers = document.getElementsByClassName(
          "custom-circle-marker"
        );
        const interventionMarkers = document.getElementsByClassName(
          "custom-green-marker"
        );
        Array.from(harassmentMarkers).forEach(
          (marker) => ((marker as HTMLElement).style.display = "none")
        );
        Array.from(interventionMarkers).forEach(
          (marker) => ((marker as HTMLElement).style.display = "none")
        );
  
        if (showHarassment && selectedLocation) {
          Array.from(harassmentMarkers).forEach(
            (marker) => ((marker as HTMLElement).style.display = "initial")
          );
          if (selectedLocation.name) {
            selectRandomPoints(
              selectedLocation.lat,
              selectedLocation.lon,
              parseInt(selectedLocation.name, 10),
             
            );
          }
        }
        if (showIntervention && selectedLocation) {
          Array.from(interventionMarkers).forEach(
            (marker) => ((marker as HTMLElement).style.display = "initial")
          );
          if (selectedLocation.name) {
            addGreenMarkers(
              selectedLocation.lat,
              selectedLocation.lon,
              parseInt(selectedLocation.name, 10)
            );
          }
        }
        const mapContainer = document.getElementById("map");
        if (mapContainer) {
          if (showHarassment && showIntervention) {
            mapContainer.classList.add("harassment", "intervention");
          } else if (showHarassment) {
            mapContainer.classList.remove("intervention");
            mapContainer.classList.add("harassment");
          } else if (showIntervention) {
            mapContainer.classList.remove("harassment");
            mapContainer.classList.add("intervention");
          } else {
            mapContainer.classList.remove("harassment", "intervention");
          }
        }
      };
      updateMarkers();
    }, [showHarassment, showIntervention, selectedLocation]);
  
    //   if (!reportData) {
    //     return <p>Loading...</p>; // Or render a placeholder or handle the case accordingly
    //   }
    const {
        title = 'REPORT VIEW',
        date = '08/10/2020 at 11:00PM',
        location = 'at Magic wash(31.638650 30.082510)',
        description = 'We check all report descriptions to ensure anonymity and confidentiality. You will be able to view the full text soon.',
     
      } = reportData;

    return (
        <>
            <Header />
            <div className="mx-3 sm:mx-8 md:mx-20 lg:mx-32 xl:mx-40  mt-4 md:mt-36 lg:mt-32">
                <div className="h-auto md:h-[500px] ">
                    <div >
                        <p className="text-bold font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl">

                        {title}
                        </p>
                        <hr className="h-px my-4 sm:my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <p className=" text-3xl">{`Incident happened on ${date}`}</p>
                        <p className='text-lg text-gray-500'>{`at ${location}`}</p>
                        <br />
                        <br />
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="w-full sm:w-[80%]">
                            <p className='text-lg text-gray-500'>{description}</p>
                            {/* <p className="mt-[20%] font-bold">Categories</p> */}
                            <div className="mt-[15%]"> {/* Adjust the margin-left as needed */}
                                <p className="font-bold">Categories</p>
                                {/* Add your additional text here */}
                                <button className="text-black px-4 py-2 mt-2 border border-black ">Touching</button>
                            </div>
                           
                        </div>

                        {/* <div className="w-full sm:w-[50%]">
                            <div className="pl-0 sm:pl-8 md:pl-16 lg:pl-24">
                                <p>8 expressions of support.</p>
                                <button className="text-green-400 px-4 py-2  m-2 border border-green-400 ">Express Support</button>
                                <br />
                                <button className="text-green-400 px-4 py-2  m-2 border border-green-400 ">Add Comments</button>
                                <br />
                                <button className="text-green-400 px-4 py-2  m-2 border border-green-400 ">View more reports</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="flex gap-x-0.5">
  
  <div id="map" style={{ width: "100%", height: "300px", zIndex: 1 }}>
  
  </div>
 
 
</div>
            
        </>


    )
}

export default ReadMore;
function selectRandomPoints(
    centerLat: number,
    centerLon: number,
    numPoints: number
  ) {
    const sideLengthKm = 20;
    for (let i = 0; i < numPoints; i++) {
      const randomLatOffset = (Math.random() - 0.5) * (sideLengthKm / 111.32);
      const randomLonOffset =
        (Math.random() - 0.5) *
        (sideLengthKm / (111.32 * Math.cos(centerLat * (Math.PI / 180))));
      const randomLat = centerLat + randomLatOffset;
      const randomLon = centerLon + randomLonOffset;
      Data.circleMarker([randomLat, randomLon], {
        className: "custom-circle-marker",
      });
    }
  }
  function addGreenMarkers(
    centerLat: number,
    centerLon: number,
    numGreenMarkers: number
  ) {
    for (let i = 0; i < numGreenMarkers; i++) {
      const randomLatOffset = (Math.random() - 0.5) * 0.01;
      const randomLonOffset = (Math.random() - 0.5) * 0.01;
      const randomLat = centerLat + randomLatOffset;
      const randomLon = centerLon + randomLonOffset;
      Data.circleMarker([randomLat, randomLon], {
        className: "custom-green-marker",
  
        
      });
    }
  }
  function setDropdownOpen(arg0: (prev: any) => boolean) {
    throw new Error("Function not implemented.");
  }
  