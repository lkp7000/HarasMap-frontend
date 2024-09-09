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
import { useEffect, useState } from "react";

import Layout2 from "../../Component/Layout1/Layout2";
import {
  getallChartDataByMonth,
  getallChartDataByWeek,
  getallChartDataByYear,
} from "../../../services/api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const DomesticChart = () => {
  const { t } = useTranslation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState<string>("line");

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const [yearData, setYearData] = useState<any>();
  const [monthData, setMonthData] = useState<any>();
  const [weekData, setWeekData] = useState<any>();

  useEffect(() => {
    const fetchYear = async () => {
      try {
        const apiResponse = await getallChartDataByYear();
        const dataEntries = Object.entries(apiResponse.data.yearChart).map(
          ([year, cases]) => ({
            name: year,
            Cases: cases,
          })
        );

        setYearData(dataEntries);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };
    fetchYear();
  }, []);

  const fetchYear = async () => {
    try {
      const apiResponse = await getallChartDataByYear();
      const dataEntries = Object.entries(apiResponse.data.yearChart).map(
        ([year, cases]) => ({
          name: year,
          Cases: cases,
        })
      );
      setYearData(dataEntries);

      console.log({ apiResponse });
    } catch (error) {
      console.error("Error fetching map data:", error);
    }
  };

  const fetchMonth = async () => {
    try {
      const apiResponse = await getallChartDataByMonth();
      const dataEntries = Object.entries(apiResponse.data.monthChart).map(
        ([month, cases]) => ({
          name: month,
          Cases: cases,
        })
      );
      setYearData(dataEntries);
      console.log(apiResponse);
    } catch (error) {
      console.error("Error fetching map data:", error);
    }
  };

  const fetchWeek = async () => {
    try {
      const apiResponse = await getallChartDataByWeek();
      const dataEntries = Object.entries(apiResponse.data.dayChart).map(
        ([week, cases]) => ({
          name: week,
          Cases: cases,
        })
      );
      setYearData(dataEntries);
      console.log(apiResponse);
    } catch (error) {
      console.error("Error fetching map data:", error);
    }
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF19AF",
  ];

  const renderChart = () => {
    switch (selectedChart) {
      case "line":
        return (
          <>
            <div style={{ position: "relative" }}>
              <div
                style={{ position: "absolute", top: 5, left: 400, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={fetchYear}
                >
                  {t("Year")}
                </button>
              </div>
              <div
                style={{ position: "absolute", top: 5, left: 500, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={fetchMonth}
                >
                  {t("Month")}
                </button>
              </div>
              <div
                style={{ position: "absolute", top: 5, left: 600, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={fetchWeek}
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
            <div style={{ position: "relative" }}>
              <div
                style={{ position: "absolute", top: 5, left: 400, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={fetchYear}
                >
                  {t("Year")}
                </button>
              </div>
              <div
                style={{ position: "absolute", top: 5, left: 500, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={fetchMonth}
                >
                  {t("Month")}
                </button>
              </div>
              <div
                style={{ position: "absolute", top: 5, left: 600, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={fetchWeek}
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
                    {yearData.map((entry: any, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      case "pie":
        return (
          <>
            <div style={{ position: "relative" }}>
              <div
                style={{ position: "absolute", top: 5, left: 400, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={fetchYear}
                >
                  {t("Year")}
                </button>
              </div>
              <div
                style={{ position: "absolute", top: 5, left: 500, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={fetchMonth}
                >
                  {t("Month")}
                </button>
              </div>
              <div
                style={{ position: "absolute", top: 5, left: 600, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={fetchWeek}
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
            <div style={{ position: "relative" }}>
              <div
                style={{ position: "absolute", top: 5, left: 400, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={fetchYear}
                >
                  {t("Year")}
                </button>
              </div>
              <div
                style={{ position: "absolute", top: 5, left: 500, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={fetchMonth}
                >
                  {t("Month")}
                </button>
              </div>
              <div
                style={{ position: "absolute", top: 5, left: 600, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={fetchWeek}
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
          </>
        );
      case "RadialChart":
        return (
          <>
            <div style={{ position: "relative" }}>
              <div
                style={{ position: "absolute", top: 5, left: 400, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={fetchYear}
                >
                  {t("Year")}
                </button>
              </div>
              <div
                style={{ position: "absolute", top: 5, left: 500, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={fetchMonth}
                >
                  {t("Month")}
                </button>
              </div>
              <div
                style={{ position: "absolute", top: 5, left: 600, zIndex: 1 }}
              >
                <button
                  className="bg-yellow-500 py-2 px-2 rounded"
                  onClick={fetchWeek}
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
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Layout2>
        <div className="button-container__1 flex flex-col lg:flex-row lg:justify-end">
          <div className="relative inline-block">
            <button onClick={toggleDropdown} className="map-button button-2">
              <div className="button-content-img">
                <img
                  src="\assets\chart_icon.png"
                  alt=""
                  className="w-5 h-5 mr-2"
                />
                <span>{t("Chart")}</span>
              </div>
            </button>

            {isDropdownOpen && (
              <div
                className="absolute p-2 bg-white border border-gray-300 rounded shadow "
                style={{ width: "130px" }}
              >
                <Link
                  to=""
                  className="block py-1"
                  onClick={() => {
                    setSelectedChart("line");
                    fetchYear();
                  }}
                >
                  {t("Line Chart")}
                </Link>
                <Link
                  to=""
                  className="block py-1"
                  onClick={() => {
                    setSelectedChart("bar");
                    fetchYear();
                  }}
                >
                  {t("Bar Chart")}
                </Link>
                <Link
                  to=""
                  className="block py-1"
                  onClick={() => {
                    setSelectedChart("pie");
                    fetchYear();
                  }}
                >
                  {t("Pie Chart")}
                </Link>
                <Link
                  to="#"
                  className="block py-1"
                  onClick={() => {
                    setSelectedChart("DonutChart");
                    fetchYear();
                  }}
                >
                  {t("Doughnut Chart")}
                </Link>
                <Link
                  to=""
                  className="block py-1"
                  onClick={() => {
                    setSelectedChart("RadialChart");
                    fetchYear();
                  }}
                >
                  {t("Radial Chart")}
                </Link>
              </div>
            )}
          </div>
        </div>
        {selectedChart && <div>{renderChart()}</div>}
      </Layout2>
    </>
  );
};

export default DomesticChart;
