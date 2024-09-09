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
import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { filterVariousApi, getFilterCharts } from "../../../services/api";
import FilterSideBarChart from "../../Component/BasicComponents/FilterSideBarChart";

const Chart = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState("bar");
  const [loading, setLoading] = useState(false);
  const [filterPayloadData, setFilterPayloadData] = useState<any>({});
  const [dateWiseData, setDateWiseData] = useState("year");

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };


  const [yearData, setYearData] = useState<any>();

  const cdata: any = {
    "2020": 13,
    "2021": 4,
    "2022": 2,
    "2023": 189,
    "2024": 6,
    "2025": 7,
    "2026": 9,
  };
  const chartData = Object.keys(cdata).map((year) => ({
    name: year,
    Cases: cdata[year],
  }));
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF19AF",
  ];

  useEffect(() => {
    const fetchYear = async () => {
      try {
        setLoading(false)
        const defaultPayload = {
          requestMap: {
            ALL: "yes",
            date: "year"
          },
        };
        setDateWiseData(dateWiseData)
        const apiResponse = await filterVariousApi(defaultPayload);
        const dataEntries = Object.entries(apiResponse.data.yearChart).map(([year, cases]) => ({
          name: year,
          Cases: cases,
        }));
        setYearData(dataEntries);
        setLoading(false)

      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };
    fetchYear();
  }, []);

  const filterHandler = (payload: any) => {
    setFilterPayloadData(payload)
    fetchChartData(payload, dateWiseData == undefined ? "year" : dateWiseData)
  }

  const fetchChartData = async (payload: any, dateWiseData: string) => {
    const newPayload = {
      ...payload,
      requestMap: {
        ...payload?.requestMap,
           date: dateWiseData
      },
    }
    setDateWiseData(dateWiseData)

    try {
      const apiResponse = await getFilterCharts(newPayload);
      let dynamicData = "dayChart";
      if (dateWiseData === "year") {
        dynamicData = "yearChart"
      } else if (dateWiseData === "month") {
        dynamicData = "monthChart"
      } else if (dateWiseData === "week") {
        dynamicData = "dayChart"
      }
      const dataEntries = Object.entries(apiResponse.data?.[dynamicData]).map(([year, cases]) => ({
        name: year,
        Cases: cases,
      }));
      setYearData(dataEntries);

    } catch (error) {
      console.error("Error fetching map data:", error);
    }
  };

  const renderChart = () => {
    switch (selectedChart ) {
      case "line":
        return (
          <>
            <h2 className="text-3xl">Reports Over Time</h2>
            <h3>Number (of Reports)</h3>
            <div style={{ position: "relative" }}>
              <div
                style={{ position: "absolute", top: 5, left: 400, zIndex: 1 }} >
                <button className="bg-yellow-500 py-2 px-2 rounded" onClick={() => { fetchChartData(filterPayloadData, "year") }}>Year</button>
              </div>
              <div
                style={{ position: "absolute", top: 5, left: 500, zIndex: 1 }}>
                <button className="bg-yellow-500 py-2 px-2 rounded" onClick={() => { fetchChartData(filterPayloadData, "month") }}>Month</button>
              </div>
              <div
                style={{ position: "absolute", top: 5, left: 600, zIndex: 1 }} >
                <button className="bg-yellow-500 py-2 px-2 rounded" onClick={() => { fetchChartData(filterPayloadData, "week") }}>Week</button>
              </div>
              { }
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
            <h2 className="text-3xl">Reports Over Time</h2>
            <h3>Number (of Reports)</h3>
            {loading ? (
              <div className="flex justify-center items-center h-screen">
                <img src={"images/spiner.png"} className="animate-spin	w-12 h-12 " />
              </div>
            ) : (
              <div style={{ position: "relative" }}>
                <div
                  style={{ position: "absolute", top: 5, left: 400, zIndex: 1 }}
                >
                  <button className="bg-yellow-500 py-2 px-2 rounded" onClick={() => { fetchChartData(filterPayloadData, "year") }}>Year</button>
                </div>
                <div
                  style={{ position: "absolute", top: 5, left: 500, zIndex: 1 }}
                >
                  <button className="bg-yellow-500 py-2 px-2 rounded" onClick={() => { fetchChartData(filterPayloadData, "month") }}>Month</button>
                </div>
                <div
                  style={{ position: "absolute", top: 5, left: 600, zIndex: 1 }}
                >
                  <button className="bg-yellow-500 py-2 px-2 rounded" onClick={() => { fetchChartData(filterPayloadData, "week") }}>Week</button>
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
                      {chartData.map((entry, index) => (
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
            <h2 className="text-3xl">Reports Over Time</h2>
            <h3>Number (of Reports)</h3>
            <div style={{ position: "relative" }}>
              <div
                style={{ position: "absolute", top: 5, left: 400, zIndex: 1 }}
              >
                <button className="bg-yellow-500 py-2 px-2 rounded" onClick={() => { fetchChartData(filterPayloadData, "year") }}>year</button>
              </div>
              <div
                style={{ position: "absolute", top: 5, left: 500, zIndex: 1 }}
              >
                <button className="bg-yellow-500 py-2 px-2 rounded" onClick={() => { fetchChartData(filterPayloadData, "month") }}>Month</button>
              </div>
              <div
                style={{ position: "absolute", top: 5, left: 600, zIndex: 1 }}
              >
                <button className="bg-yellow-500 py-2 px-2 rounded" onClick={() => { fetchChartData(filterPayloadData, "week") }}>Week</button>
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
            <h2 className="text-3xl">Reports Over Time</h2>
            <h3>Number (of Reports)</h3>
            {loading ? (
              <div className="flex justify-center items-center h-screen">
                <img src={"images/spiner.png"} className="animate-spin	w-12 h-12 " />
              </div>
            ) : (
              <div style={{ position: "relative" }}>
                <div
                  style={{ position: "absolute", top: 5, left: 400, zIndex: 1 }}
                >
                  <button className="bg-yellow-500 py-2 px-2 rounded" onClick={() => { fetchChartData(filterPayloadData, "year") }}>year</button>
                </div>
                <div
                  style={{ position: "absolute", top: 5, left: 500, zIndex: 1 }}
                >
                  <button className="bg-yellow-500 py-2 px-2 rounded" onClick={() => { fetchChartData(filterPayloadData, "month") }}>Month</button>
                </div>
                <div
                  style={{ position: "absolute", top: 5, left: 600, zIndex: 1 }}
                >
                  <button className="bg-yellow-500 py-2 px-2 rounded" onClick={() => { fetchChartData(filterPayloadData, "week") }}>Week</button>
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
            <h2 className="text-3xl">Reports Over Time</h2>
            <h3>Number (of Reports)</h3>
            {loading ? (
              <div className="flex justify-center items-center h-screen">
                <img src={"images/spiner.png"} className="animate-spin	w-12 h-12 " />
              </div>
            ) : (
              <div style={{ position: "relative" }}>
                <div
                  style={{ position: "absolute", top: 5, left: 400, zIndex: 1 }}
                >
                  <button className="bg-yellow-500 py-2 px-2 rounded" onClick={() => { fetchChartData(filterPayloadData, "year") }}>year</button>
                </div>
                <div
                  style={{ position: "absolute", top: 5, left: 500, zIndex: 1 }}
                >
                  <button className="bg-yellow-500 py-2 px-2 rounded" onClick={() => { fetchChartData(filterPayloadData, "month") }}>Month</button>
                </div>
                <div
                  style={{ position: "absolute", top: 5, left: 600, zIndex: 1 }}
                >
                  <button className="bg-yellow-500 py-2 px-2 rounded" onClick={() => { fetchChartData(filterPayloadData, "week") }}>Week</button>
                </div>
                <ResponsiveContainer width="100%" height={500}>
                  <RadialBarChart
                    data={yearData}
                    margin={{ top: 0, right: 5, left: 5, bottom: 5 }}
                    style={{ backgroundColor: 'lightgray' }}
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
      {/* <Layout1> */}
      <div className="button-container__1 flex flex-col lg:flex-row lg:justify-end">
        <button className="map-button button-1">
          <Link to="/map">
            <div className="button-content-img">
              <img src=".\assets\map_icon1.png" alt="" />
              <span>Map</span>
            </div>
          </Link>
        </button>

        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="map-button button-2">
            <div className="button-content-img">
              <img
                src=".\assets\chart_icon.png"
                alt="Chart Icon"
                className="w-5 h-5 mr-2"
              />
              <span>Chart</span>
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
                onClick={() => { setSelectedChart('line'); fetchChartData(filterPayloadData, "year"); }} >

                Line Chart
              </Link>
              <Link
                to=""
                className="block py-1"
                onClick={() => { setSelectedChart('bar'); fetchChartData(filterPayloadData, "year"); }} >
                Bar Chart
              </Link>
              <Link
                to=""
                className="block py-1"
                onClick={() => { setSelectedChart('pie'); fetchChartData(filterPayloadData, "year"); }} >

                Pie Chart
              </Link>
              <Link
                to="#"
                className="block py-1"
                onClick={() => { setSelectedChart('DonutChart'); fetchChartData(filterPayloadData, "year"); }} >

                Doughnut Chart
              </Link>
              <Link
                to=""
                className="block py-1"
                onClick={() => { setSelectedChart('RadialChart'); fetchChartData(filterPayloadData, "year"); }} >

                Radial Chart </Link>
            </div>
          )}
        </div>

        <button className="map-button button-3">
          <Link to="/table">
            <div className="button-content-img">
              <img src=".\assets\table_icon.png" alt="" />
              <span>Table</span>
            </div>
          </Link>
        </button>
      </div>
      {selectedChart && <div>{renderChart()}</div>}
      <FilterSideBarChart filterHandler={filterHandler} />
      {/* </Layout1> */}

    </>
  );
};

export default Chart;
