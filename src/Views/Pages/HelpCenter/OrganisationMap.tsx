import Header from "../../Component/Layout/Header";
import Footer from "../../Component/Layout/Footer";
import Data, { circleMarker } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { filterhelpcenterbytype } from "../../../services/api";
import { SetStateAction, useEffect, useRef, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const OrganisationMap = () => {
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const print = () => window.print();
  const [isViewAllDropdownOpen, setIsViewAllDropdownOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedOption, setSelectedOption] = useState("View All");

  const [data, setData] = useState<any>();

  const [locations, setLocation] = useState<any>([]);
  console.log(locations, "don");

  const [filteredReportIntervention, setFilteredReportIntervention] = useState(
    []
  );
  const [filteredAllDomestic, setFilteredAllDomestic] = useState([]);

  const red = "red";
  const green = "green";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const payload = {
      organisationType: "All",
    };

    const fetchMapData = async () => {
      try {
        const apiResponse = await filterhelpcenterbytype(payload);
        const Circle = apiResponse.data?.map((item: any) => ({
          latitude: item.latitude,
          longitude: item.longitude,
          organisationType: item.organisationType,
          address: item.address,
        }));
        Circle?.filter((item: any) => {
          let tempLat: any = null;
          let templon: any = null;
          item?.latitude;
          item?.longitude;
          item?.organisationType;
          item?.address;
        });

        setLocation(Circle);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    fetchMapData();
  }, []); //

  // ...
  useEffect(() => {
    const map = L.map("map", {
      attributionControl: false,
      zoom: 50,
      scrollWheelZoom: false,
    }).setView([18.539, -72.335], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
    const countMarkersInCluster = (cluster: L.MarkerCluster) => {
      return cluster.getChildCount();
    };

    const createClusterIcon = (
      count: number,
      fillColor: string,
      borderColor: string
    ) => {
      return L.divIcon({
        className: "custom-cluster-icon",
        html: `<svg width="35" height="35" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stop-color="red" />
          </radialGradient>
        </defs>
      
        <!-- Outer circle filled with the created radial gradient -->
        <circle cx="20" cy="20" r="20" style="fill:url(#gradient); stroke:none;" />
        
        <!-- Inner circle -->
        <circle cx="20" cy="20" r="15" style="fill:none; stroke:white; stroke-width:2;" />
      
        <!-- Text in the center -->
        <text x="50%" y="55%" text-anchor="middle" fill="white" font-size="10">${count}</text>
      </svg>
      
      
      
      `,
        iconSize: [20, 20],
      });
    };
    const markerCluster = L.markerClusterGroup({
      maxClusterRadius: 200,
      polygonOptions: {
        color: "blue",
        weight: 2,
        dashArray: null as any,
        lineCap: null as any,
        lineJoin: null as any,
        fillOpacity: 0.4,
      } as L.PathOptions,
      iconCreateFunction: function (cluster) {
        const markerCount = countMarkersInCluster(cluster);
        return createClusterIcon(markerCount, "red", "red"); // Replace 'red' with your desired border color
      },
    });
    const handleMarkerClick = (
      position: any,
      organisationType: any,
      address: any
    ) => {
      localStorage.setItem("workin", position);
      localStorage.setItem("organisationType", organisationType);
      localStorage.setItem("address", address);
    };

    locations.forEach((location: any) => {
      if (
        location &&
        location.latitude !== null &&
        location.longitude !== null
      ) {
        const { latitude, longitude, organisationType, address } = location;
        const markerColor = organisationType === "All" ? "red" : "red";
        const marker = L.circleMarker([latitude, longitude], {
          radius: 10,
          color: markerColor,
          fillColor: markerColor,
          fillOpacity: 0.5,
        });

        marker
          .bindPopup(
            `<a href="/helpCenterReadmore" id="readMorebutton">Read More</a><br>${address}</br><br>${organisationType}</br>`
          )
          .openPopup()
          .on("click", () => {
            const markerPosition = marker.getLatLng();
            handleMarkerClick(markerPosition, organisationType, address);
          })
          .on("popupopen", () => {
            map.setView(marker.getLatLng(), map.getZoom());
          });
        markerCluster.addLayer(marker);
      }
    });

    map.addLayer(markerCluster);

    return () => {
      map.remove();
    };
  }, [locations]);

  const handleNavigate = () => {};

  const handleOptionClick = (option: string) => {
    setIsViewAllDropdownOpen(!isViewAllDropdownOpen);
    setSelectedOption(option);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setIsViewAllDropdownOpen(!isViewAllDropdownOpen);

    if (
      option === "Foster Home" ||
      "Hospital" ||
      "Clinics" ||
      "Counseling" ||
      "PNH"
    ) {
      setFilteredAllDomestic(data);
      setFilteredReportIntervention(data);
    } else {
      const filteredData = data?.filter((val: any) => val.type === option);
      setFilteredAllDomestic(filteredData);
      setFilteredReportIntervention(filteredData);
    }

    handleOptionClick(option);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const payload = {
        organisationType: selectedOption,
      };

      const apiResponse = await filterhelpcenterbytype(payload);
      setData(apiResponse);

      const greenCircle = apiResponse?.data?.map((item: any, index: any) => ({
        latitude: item.latitude,
        longitude: item.longitude,
        organisationType: item.organisationType,
        address: item.address,
      }));
      greenCircle?.filter((item: any) => {
        let tempLat: any = null;
        let templon: any = null;
        item?.latitude;
      });

      setLocation(greenCircle);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const { t } = useTranslation();

  return (
    <>
      <Header />

      <div className="flex gap-x-0.5">
        <div
          id="map"
          className="mt-28"
          style={{ width: "100%", height: "400px", zIndex: 1 }}
        ></div>
      </div>
      <div
        className=" flex-col sm:flex-row gap space-x-0 sm:space-x-10 border border-gray-500 p-4"
        style={{ zIndex: 1 }}
      >
        <div className="flex  justify-between">
          <div className="flex">
            <img
              className="w-5 h-5 mr-2"
              src="\assets\red-circle-icon.webp"
              alt=""
            />
            {t("Organisation")}
          </div>

          <div className="top-12 pl-100px right-10  border-gray-300 shadow-md flex flex-col sm:flex-row">
            <div className=" flex items-center space-x-2">
              <select
                value={selectedOption}
                onChange={(e) => handleOptionChange(e.target.value)}
                className="border p-2"
              >
                <option value="All">{t("View All")}</option>
                <option value="Foster Home">{t("Foster Home")}</option>
                <option value="Hospital">{t("Hospital")}</option>
                <option value="Clinics">{t("Clinics")}</option>
                <option value="PNH">{t("PNH")}</option>
                <option value="Counseling">{t("Counselling")}</option>
              </select>
              <button
                onClick={handleSubmit}
                className="p-2 bg-blue-500 text-white"
              >
                {t("Submit")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrganisationMap;
