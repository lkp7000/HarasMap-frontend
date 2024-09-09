import React, { useEffect, useRef, useState } from "react";
import L, { marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster-src.js";
import { filterVariousApi } from "../../services/api";
import FilterSideBar from "../Component/BasicComponents/FilterSideBar";
import { Link } from "react-router-dom";
import Header from "../Component/Layout/Header";
import Chart from "./ChartPage/Chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// import { t } from "i18next";
import { useTranslation } from "react-i18next";

const MapWithMarkers = () => {
  
  const {t} = useTranslation();
  const mapRef = useRef<L.Map | null>(null);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<any[]>([]);
  const [tempLocations, setTempLocations] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState("map");
  const [isRelaodMap, setIsReloadMap] = useState(true);
  const [isChartDropDownOpen, setIsChartDropDownOpen] = useState(false);
  const [dateWiseData, setDateWiseData] = useState("year");
  const [selectedChart, setSelectedChart] = useState("bar");
  const [filterPayloadData, setFilterPayloadData] = useState<any>({});
  const [yearData, setYearData] = useState<any[]>([]);
  const [allChartData, setAllChartData] = useState<any>();

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF19AF",
  ];

  const handleMarkerClick = (
    position: any,
    date: string,
    time: any,
    addressName: string
  ) => {
    localStorage.setItem("lat", position);
    localStorage.setItem("date", date);
    localStorage.setItem("markertime", time);
    localStorage.setItem("mapaddressName", addressName);
  };

  const defaultPayload = {
    requestMap: {
      date: dateWiseData,
      ALL: "yes",
    },
  };
  const fetchMapData = async (defaultPayload: any, dateWiseData?: any) => {
    try {
      const newPayload = {
        ...defaultPayload,
        requestMap: {
          ...defaultPayload?.requestMap,
          date: dateWiseData ? dateWiseData : "year",
        },
      };
      setDateWiseData(dateWiseData);
      const apiResponse = await filterVariousApi(newPayload);
      const formattedData = apiResponse?.data?.filterAllInfoDTOList.map(
        (item: any) => ({
          latitude: item.latitude,
          longitude: item.longitude,
          name: `Survey ID: ${item.surveyID}`,
          addressName: item.addressName,
          date: item.date,
          time: item.time,
        })
      );
      setTempLocations(formattedData);
      if (currentView == "map") {
        setLocations(formattedData);
      }
      // chart
      setAllChartData(apiResponse.data);
      dateWiseHandler(apiResponse?.data, dateWiseData);
    } catch (error) {
      setLocations([]);
      console.error("Error fetching map data:", error);
    }
  };

  const handleFilter = (e: any) => {
    fetchMapData(e, "year");
    // You can perform other actions here based on the event 'e'
  };
  const dateWiseHandler = (allData: any, dateWise: any) => {
    setDateWiseData(dateWise);
    let dynamicData = "dayChart";
    if (dateWise === "year") {
      dynamicData = "yearChart";
    } else if (dateWise === "month") {
      dynamicData = "monthChart";
    } else if (dateWise === "week") {
      dynamicData = "dayChart";
    }
    const dataEntries = Object.entries(allData?.[dynamicData]).map(
      ([year, cases]) => ({
        name: year,
        Cases: cases,
      })
    );
    setYearData(dataEntries);
    console.log(yearData)
  };

  useEffect(() => {
    fetchMapData(defaultPayload, "year");
  }, []);

  useEffect(() => {
    if (!mapRef?.current) {
      const map = L.map("map", {
        attributionControl: false,
        zoom: 25,
        scrollWheelZoom: false,
      }).setView([18.5392, -72.335], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );

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
            <circle cx="20" cy="20" r="20" style="fill:${fillColor}; stroke:${borderColor}; stroke-width:1;" />
            <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="12">${count}</text>
          </svg>`,
          iconSize: [35, 35],
        });
      };
      const markers = L.markerClusterGroup({
        spiderLegPolylineOptions: { weight: 0 },
        iconCreateFunction: function (cluster) {
          const markerCount = countMarkersInCluster(cluster);
          return createClusterIcon(markerCount, "blue", "orange"); // Replace 'red' with your desired border color
        },
      });
      locations?.forEach((cluster: any) => {
        const { latitude, longitude, addressName, date, time } = cluster;

        const marker = L.marker([parseFloat(latitude), parseFloat(longitude)], {
          icon: L.divIcon({
            className: "custom-icon", // You can add additional classes here
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            html: `<div style="background-color: ${"orange"}; width: 25px; height: 25px; border-radius: 50%;"></div>`,
          }),
        })
          .bindPopup(
            `<b>${date} <br />
          <br />${addressName} <br />
          <a href="/y" id="readMorebutton">Read More</a>`
          )

          .on("click", () => {
            const markerPosition = marker.getLatLng();
            handleMarkerClick(markerPosition, date, time, addressName);
          })
          .on("popupopen", () => {
            map.setView(marker.getLatLng(), map.getMaxZoom());
          });

        markers.addLayer(marker);
      });

      map.addLayer(markers);
      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [locations, isRelaodMap]);

  const chartTabHandler = () => {
    setIsChartDropDownOpen(!isChartDropDownOpen);
    setCurrentView("chart");
  };
  const mapTabHandler = () => {
    setIsChartDropDownOpen(false);
    setCurrentView("map");
    setIsReloadMap(!isRelaodMap);
    setLocations(tempLocations);
  };
  const renderChart = () => {
    switch (selectedChart) {
      case "line":
        return (
          <>
            <h2 className="text-3xl">{t("Reports Over Time")}</h2>
            <h3>{t("Number (of Reports)")}</h3>
            <div style={{ position: "relative" }}>
              <div
                style={{ position: "absolute", top: 5, left: 400, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={() => {
                    dateWiseHandler(allChartData, "year");
                  }}
                >
                  {t("Year")}
                </button>
              </div>
              <div
                style={{ position: "absolute", top: 5, left: 500, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={() => {
                    dateWiseHandler(allChartData, "month");
                  }}
                >
                  {t("Month")}
                </button>
              </div>
              <div
                style={{ position: "absolute", top: 5, left: 600, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={() => {
                    dateWiseHandler(allChartData, "week");
                  }}
                >
                  {t("Week")}
                </button>
              </div>
              {}
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={yearData}
                  margin={{ top: 0, right: 5, left: 5, bottom: 5 }}
                  style={{ backgroundColor: "lightgray" }}
                >
                  <CartesianGrid stroke="black" strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend wrapperStyle={{ color: "black" }} iconSize={20} />
                  <Line type="monotone" dataKey="year" stroke="black" />
                  <Line type="monotone" dataKey="Cases" stroke="black" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      case "bar":
        return (
          <>
            <h2 className="text-3xl">{t("Reports Over Time")}</h2>
            <h3>{t("Number (of Reports)")}</h3>
            {loading ? (
              <div className="flex justify-center items-center h-screen">
                <img
                  src={"images/spiner.png"}
                  className="animate-spin	w-12 h-12 "
                />
              </div>
            ) : (
              <div style={{ position: "relative" }}>
                <div
                  style={{ position: "absolute", top: 5, left: 400, zIndex: 1 }}
                >
                  <button
                    className="bg-yellow-500 py-2 px-2 rounded"
                    onClick={() => {
                      dateWiseHandler(allChartData, "year");
                    }}
                  >
                    {t("Year")}
                  </button>
                </div>
                <div
                  style={{ position: "absolute", top: 5, left: 500, zIndex: 1 }}
                >
                  <button
                    className="bg-yellow-500 py-2 px-2 rounded"
                    onClick={() => {
                      dateWiseHandler(allChartData, "month");
                    }}
                  >
                    {t("Month")}
                  </button>
                </div>
                <div
                  style={{ position: "absolute", top: 5, left: 600, zIndex: 1 }}
                >
                  <button
                    className="bg-yellow-500 py-2 px-2 rounded"
                    onClick={() => {
                      dateWiseHandler(allChartData, "week");
                    }}
                  >
                    {t("Week")}
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={yearData}
                    margin={{ top: 0, right: 5, left: 5, bottom: 5 }}
                    style={{ backgroundColor: "lightgray" }}
                  >
                    <CartesianGrid stroke="black" strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend wrapperStyle={{ color: "black" }} iconSize={20} />
                    <Bar
                      dataKey="Cases"
                      isAnimationActive={true}
                      cx="50%"
                      cy="50%"
                      fill="#8884d8"
                      label
                    >
                      {yearData?.map((entry: any, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                      
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        );
      case "pie":
        return (
          <>
            <h2 className="text-3xl">{t("Reports Over Time")}</h2>
            <h3>{t("Number (of Reports)")}</h3>
            <div style={{ position: "relative" }}>
              <div
                style={{ position: "absolute", top: 5, left: 400, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={() => {
                    dateWiseHandler(allChartData, "year");
                  }}
                >
                  {t("Year")}
                </button>
              </div>
              <div
                style={{ position: "absolute", top: 5, left: 500, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={() => {
                    dateWiseHandler(allChartData, "month");
                  }}
                >
                  {t("Month")}
                </button>
              </div>
              <div
                style={{ position: "absolute", top: 5, left: 600, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={() => {
                    dateWiseHandler(allChartData, "week");
                  }}
                >
                  {t("Week")}
                </button>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart
                  data={yearData}
                  margin={{ top: 0, right: 5, left: 5, bottom: 5 }}
                  style={{ backgroundColor: "lightgray" }}
                >
                  <Pie
                    dataKey="Cases"
                    isAnimationActive={true}
                    data={yearData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {yearData?.map((entry: any, index: any) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      case "DonutChart":
        return (
          <>
            <h2 className="text-3xl">{t("Reports Over Time")}</h2>
            <h3>{t("Number (of Reports)")}</h3>
            {loading ? (
              <div className="flex justify-center items-center h-screen">
                <img
                  src={"images/spiner.png"}
                  className="animate-spin	w-12 h-12 "
                />
              </div>
            ) : (
              <div style={{ position: "relative" }}>
                <div
                  style={{ position: "absolute", top: 5, left: 400, zIndex: 1 }}
                >
                  <button
                    className="bg-yellow-500 py-2 px-2 rounded"
                    onClick={() => {
                      dateWiseHandler(allChartData, "year");
                    }}
                  >
                    {t("Year")}
                  </button>
                </div>
                <div
                  style={{ position: "absolute", top: 5, left: 500, zIndex: 1 }}
                >
                  <button
                    className="bg-yellow-500 py-2 px-2 rounded"
                    onClick={() => {
                      dateWiseHandler(allChartData, "month");
                    }}
                  >
                    {t("Month")}
                  </button>
                </div>
                <div
                  style={{ position: "absolute", top: 5, left: 600, zIndex: 1 }}
                >
                  <button
                    className="bg-yellow-500 py-2 px-2 rounded"
                    onClick={() => {
                      dateWiseHandler(allChartData, "week");
                    }}
                  >
                    {t("Week")}
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={600}>
                  <PieChart
                    data={yearData}
                    margin={{ top: 0, right: 5, left: 5, bottom: 5 }}
                    style={{ backgroundColor: "lightgray" }}
                  >
                    <Pie
                      dataKey="Cases"
                      isAnimationActive={true}
                      data={yearData}
                      cx="50%"
                      cy="50%"
                      outerRadius={200}
                      innerRadius={120}
                      fill="#8884d8"
                      label
                    >
                      {yearData?.map((entry: any, index: any) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        );
      case "RadialChart":
        return (
          <>
            <h2 className="text-3xl">{t("Reports Over Time")}</h2>
            <h3>{t("Number (of Reports)")}</h3>
            {loading ? (
              <div className="flex justify-center items-center h-screen">
                <img
                  src={"images/spiner.png"}
                  className="animate-spin	w-12 h-12 "
                />
              </div>
            ) : (
              <div style={{ position: "relative" }}>
                <div
                  style={{ position: "absolute", top: 5, left: 400, zIndex: 1 }}
                >
                  <button
                    className="bg-yellow-500 py-2 px-2 rounded"
                    onClick={() => {
                      dateWiseHandler(allChartData, "year");
                    }}
                  >
                    {t("Year")}
                  </button>
                </div>
                <div
                  style={{ position: "absolute", top: 5, left: 500, zIndex: 1 }}
                >
                  <button
                    className="bg-yellow-500 py-2 px-2 rounded"
                    onClick={() => {
                      dateWiseHandler(allChartData, "month");
                    }}
                  >
                    {t("Month")}
                  </button>
                </div>
                <div
                  style={{ position: "absolute", top: 5, left: 600, zIndex: 1 }}
                >
                  <button
                    className="bg-yellow-500 py-2 px-2 rounded"
                    onClick={() => {
                      dateWiseHandler(allChartData, "week");
                    }}
                  >
                    {t("Week")}
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={500}>
                  <RadialBarChart
                    data={yearData}
                    margin={{ top: 0, right: 5, left: 5, bottom: 5 }}
                    style={{ backgroundColor: "lightgray" }}
                  >
                    <RadialBar
                      dataKey="Cases"
                      isAnimationActive={true}
                      cx="50%"
                      cy="50%"
                      fill="#8884d8"
                      label
                    >
                      {yearData?.map((entry: any, index: any) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </RadialBar>
                    <Legend
                      iconSize={10}
                      width={120}
                      height={140}
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                    />
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <Header />
      {/* Mapp Component */}
      <div id="map" className="flex mt-28 z-10 gap-x-0.5 ">
        {currentView == "map" && (
          <div style={{ width: "100%", height: "400px" }}>
            {/* button container start */}
            <div className="button-container flex flex-col lg:flex-row lg:justify-end">
              <button onClick={mapTabHandler} className="map-button button-1">
                {/* <Link to ="/map"> */}
                <div className="button-content-img ">
                  <img src="\assets\map_icon1.png" alt="" />
                  <span>{t("Map")}</span>
                </div>
                {/* </Link> */}
              </button>

              <div className="relative inline-block">
                <button
                  onClick={chartTabHandler}
                  className="map-button button-2"
                >
                  <div className="button-content-img">
                    <img
                      src=".\assets\chart_icon.png"
                      alt="Chart Icon"
                      className="w-5 h-5 mr-2"
                    />
                    <span>{t("Chart")}</span>
                  </div>
                </button>

                {isChartDropDownOpen && (
                  <div
                    className="absolute p-2 bg-white border border-gray-300 rounded shadow"
                    style={{ width: "130px" }}
                  >
                    <Link
                      to=""
                      className="block py-1"
                      onClick={() => {
                        setSelectedChart("line");
                      }}
                    >
                      {t("Line Chart")}
                    </Link>
                    <Link
                      to=""
                      className="block py-1"
                      onClick={() => {
                        setSelectedChart("bar");
                      }}
                    >
                      {t("Bar Chart")}
                    </Link>
                    <Link
                      to=""
                      className="block py-1"
                      onClick={() => {
                        setSelectedChart("pie");
                      }}
                    >
                      {t("Pie Chart")}
                    </Link>
                    <Link
                      to="#"
                      className="block py-1"
                      onClick={() => {
                        setSelectedChart("DonutChart");
                      }}
                    >
                      {t("Doughnut Chart")}
                    </Link>
                    <Link
                      to=""
                      className="block py-1"
                      onClick={() => {
                        setSelectedChart("RadialChart");
                      }}
                    >
                      {t("Radial Chart")}{" "}
                    </Link>
                  </div>
                )}
              </div>
              <button className="map-button button-3">
                <Link to="/table">
                  <div className="button-content-img">
                    <img src="\assets\table_icon.png" alt="" />
                    <span>{t("Table")}</span>
                  </div>
                </Link>
              </button>
            </div>
            {/* button container end */}
          </div>
        )}
      </div>
      {/* Chart */}
      {currentView == "chart" && (
        <>
          <div className="button-container__1 flex flex-col lg:flex-row lg:justify-end">
            <button onClick={mapTabHandler} className="map-button button-1">
              <div className="button-content-img">
                <img src=".\assets\map_icon1.png" alt="" />
                <span>{t("Map")}</span>
              </div>
            </button>

            <div className="relative inline-block">
              <button onClick={chartTabHandler} className="map-button button-2">
                <div className="button-content-img">
                  <img
                    src=".\assets\chart_icon.png"
                    alt="Chart Icon"
                    className="w-5 h-5 mr-2"
                  />
                  <span>{t("Chart")}</span>
                </div>
              </button>

              {isChartDropDownOpen && (
                <div
                  className="absolute p-2 bg-white border border-gray-300 rounded shadow "
                  style={{ width: "130px" }}
                >
                  <Link
                    to=""
                    className="block py-1"
                    onClick={() => {
                      setSelectedChart("line");
                    }}
                  >
                    {t("Line Chart")}
                  </Link>
                  <Link
                    to=""
                    className="block py-1"
                    onClick={() => {
                      setSelectedChart("bar");
                    }}
                  >
                    {t("Bar Chart")}
                  </Link>
                  <Link
                    to=""
                    className="block py-1"
                    onClick={() => {
                      setSelectedChart("pie");
                    }}
                  >
                    {t("Pie Chart")}
                  </Link>
                  <Link
                    to="#"
                    className="block py-1"
                    onClick={() => {
                      setSelectedChart("DonutChart");
                    }}
                  >
                    {t("Doughnut Chart")}
                  </Link>
                  <Link
                    to=""
                    className="block py-1"
                    onClick={() => {
                      setSelectedChart("RadialChart");
                    }}
                  >
                    {t("Radial Chart")}{" "}
                  </Link>
                </div>
              )}
            </div>

            <button className="map-button button-3">
              <Link to="/table">
                <div className="button-content-img">
                  <img src=".\assets\table_icon.png" alt="" />
                  <span>{t("Table")}</span>
                </div>
              </Link>
            </button>
          </div>
          <div>{renderChart()}</div>
        </>
      )}
      <FilterSideBar filterHandler={handleFilter} currentView={currentView} />
    </>
  );
};

export default MapWithMarkers;
