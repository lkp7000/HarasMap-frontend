import Header from "../../Component/Layout/Header";
import Footer from "../../Component/Layout/Footer";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getFilterByDomesticDate, getallMapData } from "../../../services/api";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
 
const Work = () => {
  const { t } = useTranslation();
  const print = () => window.print();
  const [isViewAllDropdownOpen, setIsViewAllDropdownOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [selectedOption, setSelectedOption] = useState(t('Select'));
  const [data, setData] = useState<any>();
  const [locations, setLocation] = useState<any>([]);
 
  const [filteredReportIntervention, setFilteredReportIntervention] = useState(
    []
  );
  const [filteredAllDomestic, setFilteredAllDomestic] = useState([]);
 
  const red = "red";
  const green = "green";
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchMapData = async () => {
      try {
        const apiResponse = await getallMapData();
 
        const greenCircle =
          apiResponse.data?.reportInterventionDTOS?.map((item: any) => ({
            latitude: item.latitude,
            longitude: item.longitude,
            color: "green",
            type: item.type,
            date: item.date,
            locations: item.locations,
            description: item.description,
          })) || [];
 
        const redCircle =
          apiResponse.data?.allDomesticDTOList?.map((item: any) => ({
            latitude: item.latitude,
            longitude: item.longitude,
            color: "red",
            type: item.type,
            date: item.date,
            description: item.description,
            location: item.location,
          })) || [];
 
        console.log("Is greenCircle an array?", Array.isArray(greenCircle));
        console.log("Is redCircle an array?", Array.isArray(redCircle));
 
        const combinedCircles = [...greenCircle, ...redCircle];
        console.log(combinedCircles);
 
        setLocation(combinedCircles);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };
    fetchMapData();
  }, []);
 
  useEffect(() => {
    const map = L.map("map", {
      attributionControl: false,
      zoom: 30,
      scrollWheelZoom: false,
    }).setView([18.5392, -72.335], 10);
 
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
    const countMarkersInCluster = (cluster: L.MarkerCluster) => {
      return cluster.getChildCount();
    };
 
    const createClusterIcon = (count: number, typesss: any, cluster: any) => {
      console.log("Count:", count);
      console.log("Type:", typesss);
      let isRed = false;
      let isGreen = false;
      console.log(cluster, "clustor");
 
      cluster?.map((item: any) => {
        if (item?.options?.color == "red") {
          isRed = true;
        } else {
          isGreen = true;
        }
      });
 
      let fillColor = isRed ? "red" : "green";
      let borderColor = isGreen ? "green" : "red";
 
      return L.divIcon({
        className: "custom-cluster-icon",
        html: `<svg width="35" height="35" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <defs>
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          <stop offset="100%" stop-color="${fillColor}" />
          <stop offset="100%" stop-color="${borderColor}"stop-opacity="0" />
        </radialGradient>
      </defs>
 
      <!-- Outer circle filled with the created radial gradient -->
      <circle cx="20" cy="20" r="20" style="fill:url(#gradient); stroke:none;" />
     
      <!-- Inner circle -->
      <circle cx="20" cy="20" r="15" style="fill:none; stroke:${borderColor};stroke-width:2;" />
   
      <!-- Text in the center -->
      <text x="50%" y="60%" text-anchor="middle" fill="black" font-size="13" >${count}</text>
    </svg>`,
 
        iconSize: [22, 22],
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
        console.log(markerCount, "markerCount");
 
        let a = cluster.getAllChildMarkers();
        console.log(a, "getallnum");
        return createClusterIcon(markerCount, "red", a);
      },
    });
    const handleMarkerClick = (
      position: any,
      type: any,
      date: any,
      description: any,
      location: any
    ) => {
      localStorage.setItem("worklat", position);
      localStorage.setItem("type", type);
      localStorage.setItem("workDate", date);
      localStorage.setItem("description", description);
      localStorage.setItem("mapaddress", description);
      localStorage.setItem("location", location);
    };
 
    locations.forEach((location: any) => {
      if (
        location &&
        location.latitude !== null &&
        location.longitude !== null
      ) {
        const marker = L.circleMarker([location.latitude, location.longitude], {
          radius: 10,
          color: location.color,
          fillColor: location.color,
          fillOpacity: 0.5,
        });
 
        marker
          .bindPopup(
            `<a href="/workreadmore" id="readMorebutton">Read More</a><br>${location.date}</br><br>${location.type}</br>`
          )
          .openPopup()
          .on("click", () => {
            const markerPosition = marker.getLatLng();
            handleMarkerClick(
              markerPosition,
              location.type,
              location.date,
              location.description,
              location.location
            );
          })
          .on("popupopen", () => {
            map.setView(marker.getLatLng(), map.getMaxZoom());
          });
 
        markerCluster.addLayer(marker);
      }
    });
 
    map.addLayer(markerCluster);
 
    return () => {
      map.remove();
    };
  }, [locations]);
 
  function handleDateChange(date: any | null, field: any): void {
    if (field === "startDate") {
      setStartDate(new Date(date.getTime() - date.getTimezoneOffset() * 60000));
      console.log(startDate);
    } else if (field === "endDate") {
      setEndDate(new Date(date.getTime() - date.getTimezoneOffset() * 60000));
    }
  }
 
  const handleOptionClick = (option: string) => {
    setIsViewAllDropdownOpen(!isViewAllDropdownOpen);
    setSelectedOption(option);
  };
  const [isFilterOpen, setIsFilterOpen] = useState(false);
 
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
 
  const handleOptionChange = (option: any) => {
    setSelectedOption(option);
    setIsViewAllDropdownOpen(!isViewAllDropdownOpen);
 
    if (option === "View All") {
      setFilteredAllDomestic(data?.data?.allDomesticDTOList);
      setFilteredReportIntervention(data?.data?.reportInterventionDTOS);
    } else {
      const filtereddomestic = data?.data?.allDomesticDTOList?.filter(
        (val: any) => val.type === option
      );
 
      const filteredReport = data?.data?.reportInterventionDTOS?.filter(
        (val: any) => val.type === option
      );
 
      setFilteredAllDomestic(filtereddomestic);
      setFilteredReportIntervention(filteredReport);
    }
 
    handleOptionClick(option);
  };
 
  const handleSubmit = async (e: any) => {
    e.preventDefault();
 
    try {
      const formattedStartDate = startDate;
      const formattedEndDate = endDate;
 
      const payload = {
        requestMap: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      };
 
      const apiResponse = await getFilterByDomesticDate(payload);
      setData(apiResponse);
 
      const greenCircle = filteredReportIntervention?.map(
        (item: any, index: any) => ({
          latitude: item.latitude,
          longitude: item.longitude,
          color: "green",
          type: item.type,
        })
      );
      greenCircle?.filter((item: any) => {
        let tempLat: any = null;
        let templon: any = null;
        item?.latitude;
      });
      const redCircle = filteredAllDomestic?.map((item: any, index: any) => ({
        latitude: item.latitude,
        longitude: item.longitude,
        color: "red",
        type: item.type,
      }));
 
      const redAndGreenLocation = greenCircle.concat(redCircle);
      setLocation(redAndGreenLocation);
    } catch (error) {
      console.error("Error:", error);
    }
  };
 
 
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
      <div className="relative flex flex-col sm:flex-row space-x-0 sm:space-x-10 border border-gray-500 p-4  ">
        <div className="flex">
          <img
            className="w-5 h-5 mr-2"
            src="\assets\red-circle-icon.webp"
            alt=""
          />
          {t("Harassment")}
        </div>
 
        <div className="flex">
          <img
            className="w-5 h-5 mr-2"
            src="\assets\green-circle-icon.webp"
            alt=""
          />
          {t("Incident With Intervention")}
        </div>
 
        <button
          className="printButton absolute top-2 right-[120px] pt-2 pb-2 pl-4 pr-4 bg-gray-500 text-white"
          onClick={print}
        >
          {t("Print")}
        </button>
        <button
          className="absolute top-2 right-10 pt-2 pb-2 pl-4 pr-4 bg-gray-500 text-white"
          onClick={toggleFilter}
        >
          {t("Filter")}
        </button>
 
        {isFilterOpen && (
          <form onSubmit={handleSubmit}>
            <div className="absolute top-12 right-10 mt-2 py-2 bg-white border border-gray-300 shadow-md flex flex-col sm:flex-row">
              <DatePicker
                selected={startDate}
                onChange={(date) => handleDateChange(date, "startDate")}
                dateFormat="dd/MM/yyyy"
                placeholderText={t('Date from')}
                className="flex items-center space-x-2 px-4 py-2"
                id="startDate"
              />
 
              <DatePicker
                selected={endDate}
                onChange={(date) => handleDateChange(date, "endDate")}
                dateFormat="dd/MM/yyyy"
                placeholderText={t('Date to')}
                className="flex items-center space-x-2 px-4 py-2"
                id="endDate"
              />
 
              <div className="relative">
                <button
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-500"
                  onClick={() => handleOptionClick(t('selectedOption'))}
                >
                  <span>{selectedOption}</span>
                </button>
 
                {isViewAllDropdownOpen && (
                  <div className="absolute z-10 top-10 right-[-1] mt-2">
                    <div className="bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
                      <ul className="divide-y divide-gray-200">
                        <li
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleOptionChange("View All")}
                        >
                          {t("View All")}
                        </li>
                        <li
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleOptionChange("Harassment")}
                        >
                          {t("Harassment")}
                        </li>
                        <li
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleOptionChange("Intervention")}
                        >
                          {t("Intervention")}
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
 
              <button
                type="submit"
                className="flex items-center space-x-2 px-4 py-2 border border-gray-500 bg-gray-500 text-white"
              >
                <span> {t("Go")}</span>
              </button>
            </div>
          </form>
        )}
      </div>
 
      <div className="container-2">
        <div className="content-2">
          {t("Our reporting and mapping")} <div className="marker-circle"></div>
          {t(
            "system is a tool for everyone in Egypt to anonymously share their stories of experiencing, witnessing, or intervening against sexual harassment."
          )}
          <br />
          <br />
          <button>
            {" "}
            <Link to="/domesticviolence/report">
              {" "}
              {t("HOW TO REPORT")}
            </Link>{" "}
          </button>
        </div>
 
        <div className="content-3">
          <h2> {t("How does it work?")} </h2>
          <br />
          <div>
            {t(
              "Reporting is open for everyone. You can choose to report an incident of sexual harassment or an intervention - when someone intervened to stop a sexual harassment incident or supported the harassed person."
            )}
            <br />
            <br />
            {t(
              "We map the reports online, and each report appears on the map as a dot. When you click on the dot, the full information of the report is displayed. Looking at the map gives you an overview of where we have received reports of sexual harassment, and the individual  reports show the reality and scope of sexual harassment and assault in Egypt."
            )}
            <br />
            <button>
              <Link to="/table"> {t("View the reports here")} </Link>
            </button>
            <h2> {t("What difference does it make?")}</h2>
            <br />
            <h3> {t("Every report is evidence that we use to:")}</h3>
            <ul>
              <li>
                {t(
                  "Put an end to stereotypes that blame the harassed and make excuses for the harasser."
                )}
              </li>
              <li>
                {t(
                  "Make people understand that sexual harassment is a crime that has serious consequences."
                )}
              </li>
              <li>
                {t(
                  "Build campaigns to change perceptions about sexual harassment and convince people to take action against it."
                )}
              </li>
              <li>
                {t(
                  "Equip our volunteers and partners with information that they use to create zero-tolerance attitudes and behaviour in schools, universities, workplaces, and the streets."
                )}
              </li>
            </ul>
            <h3>
              {t(
                "Together, these things work to convince people that sexual harassment is a serious problem and that we all need to take action against it."
              )}
            </h3>
            <br />
            <hr />
            <br />
            <h3>
              {t(
                "Reporting is anonymous. If you have logged in, only your user name is used on the website, never your real name or email address."
              )}
            </h3>
          </div>
        </div>
      </div>
 
      <Footer />
    </>
  );
};
 
export default Work;