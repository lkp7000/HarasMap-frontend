import Data, { circleMarker } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { filterVariousApi, getMapDataAPI } from "../../../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import FilterSideBar from "./FilterSideBar";

const MapComponent: React.FC = () => {
  const [readMoreHandlerBind, setReadMoreHandlerBind] =useState<Function | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showHarassment, setShowHarassment] = useState(true);
  const [locations, setLocations] =
    useState<
      [{ lat: number; lon: number; name: string; description: string }]
    >();
 
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
    const token = localStorage.getItem("token");

    const fetchMapData = async () => {
      try {
        const apiResponse = await getMapDataAPI(token);
        console.log(apiResponse);
        const formattedData = apiResponse.data.map((item: any, index: any) => ({
          lat: item.latitude,
          lon: item.longitude,
          name: item.name,
          description: item.description,
        }));
        setLocations(formattedData);
        console.log(formattedData);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    fetchMapData();
  }, []); //

  useEffect(() => {
    filterHandler({
      requestMap: {
        ALL: "yes",
      },
    });
  }, []);

  useEffect(() => {
   
    const map = L.map("map", {
      attributionControl: false,
      minZoom: 9,
      maxZoom: 11,
      zoom:20,
      scrollWheelZoom:false
    }).setView([18.5392, -72.335], 17);
    const southWest = L.latLng(19.2, -72.2);
    const northEast = L.latLng(13.2, -75.2);

    const initialBounds = L.latLngBounds(southWest, northEast);

    map.setMaxBounds(initialBounds);
    map.on("drag", function () {
      map.panInsideBounds(initialBounds, { animate: false });
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
      map
    );

    map.on("zoomend", function () {
      const currentZoom = map.getZoom();
      const newBounds = adjustBoundsForZoom(initialBounds, currentZoom);
      map.setMaxBounds(newBounds);
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
         
        }
      });
    });
  

    function selectRandomPoints(

      centerLat: any,
      centerLon: any,
      numPoints: number,
      map: L.Map
    ) {
      

      const sideLengthKm = 20;
      for (let i = 0; i < numPoints; i++) {
        const randomLatOffset = (Math.random() - 0.5) * (sideLengthKm / 111.32);
        const randomLonOffset =
          (Math.random() - 0.5) *
          (sideLengthKm / (111.32 * Math.cos(centerLat * (Math.PI / 180))));
       
          const cleanLatitude = centerLat.replace(/[^\d.-]/g, '');

          const separatedLongitude = centerLon.replace(/-/g, ' -'); // Add a space before negative sign for separation
const cleanLongitude = separatedLongitude.replace(/[^\d.-]/g, '');
  
        Data.circleMarker([cleanLatitude, cleanLongitude], {
          className: "custom-circle-marker",
        }).addTo(map);
        const circleMarker: any = L.circleMarker([cleanLatitude, cleanLongitude], {
          className: "custom-circle-marker",
        }).addTo(map);

        circleMarker.bindPopup(
          `<b></b> ${locations && locations[i]?.description} <br />
          <p
            className="read-more-button"
            onClick={readMoreHandlerBind as () => void}
          >
            Read More
          </p>`
        );
        circleMarker.on("click", () => {
          console.log("Clicked Red Point Information:");
          // console.log("Latitude:", randomLat);
          // console.log("Longitude:", randomLon);
          console.log("Zoom Level:", map.getZoom());
        });
      }
    }

    function addGreenMarkers(
      centerLat: any,
      centerLon: any,
      numGreenMarkers: number
    ) {
  
      for (let i = 0; i < numGreenMarkers; i++) {
        const randomLatOffset = (Math.random() - 0.5) * 0.01;
        const randomLonOffset = (Math.random() - 0.5) * 0.01;
        // const randomLat = centerLat.toFixed(4) ;
        // const l = parseFloat(randomLat)

      // const randomLon = centerLon.toFixed(4) ;
      // const f = parseFloat(randomLat)
      const cleanLatitude = centerLat.replace(/[^\d.-]/g, '');

      const separatedLongitude = centerLon.replace(/-/g, ' -'); // Add a space before negative sign for separation
const cleanLongitude = separatedLongitude.replace(/[^\d.-]/g, '');

        Data.circleMarker([cleanLatitude, cleanLongitude], {
          className: "custom-green-marker",
        }).addTo(map);  

        

        const greenMarker = Data.circleMarker([cleanLatitude, cleanLongitude], {
          className: "custom-green-marker",
        }).addTo(map);

        // Add click event listener to the green circle marker
        greenMarker.on("click", () => {
          console.log("Clicked Green Point Information:");
          // console.log("Latitude:", randomLat);
          // console.log("Longitude:", randomLon);
          console.log("Zoom Level:", map.getZoom());
        });
      }
    }

    return () => {
      map.remove();
    };
  }, [locations]);

  function adjustBoundsForZoom(
    initialBounds: Data.LatLngBounds,
    currentZoom: number
  ) {
    const zoomFactor = 60; // Increase or decrease based on your preference
    const southWest = initialBounds.getSouthWest();
    const northEast = initialBounds.getNorthEast();
    const newSouthWest = L.latLng(
      southWest.lat - zoomFactor,
      southWest.lng - zoomFactor
    );
    const newNorthEast = L.latLng(
      northEast.lat + zoomFactor,
      northEast.lng + zoomFactor
    );
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
            parseInt(selectedLocation.name, 10)
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


  const filterHandler = async (payload:any) => {
    try {
      const apiResponse = await filterVariousApi({requestMap : payload});
      let mapData = apiResponse?.data?.filterAllInfoDTOList;
      const uniqueAddresses:any = {};
      const uniqueAddressObjects :any= [];
      
      mapData.forEach((item:any) => {
        const address = item.addressName;
        if (!uniqueAddresses[address]) {
          uniqueAddresses[address] = true;
          uniqueAddressObjects.push(item);
        }
      });
      
      uniqueAddressObjects.forEach((obj:any) => {
        console.log(obj.latitude, obj.longitude, obj.addressName);
        // Access other properties as needed
      });

      const data: any = [];
      const locationGenerator = () => {
        uniqueAddressObjects?.map((item: any, index: number) => {
          data.push({
            lat: item?.latitude,
            lon: item?.longitude,
            description: item?.addressName,
            name: index,
          });
        });
        // }
        setLocations(data);
      };
      locationGenerator();
      // You can return the apiResponse or perform any other actions here if needed
    } catch (error) {
      console.error("Error fetching map data:", error);
      // Handle the error accordingly
    }
  };

  return (
    <>
      <Header />
      <div className="flex gap-x-0.5">
        <div id="map" className="mt-28" style={{  width: "100%", height: "400px", zIndex: 1 }}>
          <div className="button-container flex flex-col lg:flex-row lg:justify-end">
            <button className="map-button button-1">
              <Link to ="/map">

                <div className="button-content-img">
                  <img src="\assets\map_icon1.png" alt="" />
                  <span>Map</span>
                </div>
              </Link>
            </button>
            <button className="map-button button-2">
              <Link to ="/chart">
                <div className="button-content-img">
                  <img src="\assets\chart_icon.png" alt="" />
                  <span>Chart</span>
                </div>
              </Link>
            </button>
            <button className="map-button button-3">
              <Link to ="/table">
                <div className="button-content-img">
                  <img src="\assets\table_icon.png" alt="" />
                  <span>Table</span>
                </div>
              </Link>
            </button>
          </div>
        </div>
        <div></div>
      </div>
      <FilterSideBar filterHandler={filterHandler} />
    </>
  );
};

export default MapComponent;
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
    Data.circleMarker([centerLat, centerLon], {
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
    Data.circleMarker([centerLat, centerLon], {
      className: "custom-green-marker",
    });
  }
}
function setDropdownOpen(arg0: (prev: any) => boolean) {
  throw new Error("Function not implemented.");
}
