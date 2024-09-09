import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { getallMapData } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import DatePicker from "react-datepicker";
import Layout1 from "../Component/Layout1/Layout1";
import { useTranslation } from "react-i18next";
//import { t } from "i18next";

const columns = [
  { id: "id", label: "Date", translationKey: "Date", minWidth: 70 },
  { id: "firstName", label: "Type", translationKey: "Type", minWidth: 130 },
  {
    id: "lastName",
    label: "Description",
    translationKey: "Description",
    minWidth: 130,
  },
  { id: "age", label: "Location", translationKey: "Location", minWidth: 90 },
  {
    id: "fullName",
    label: "Categories",
    translationKey: "Categories",
    minWidth: 160,
  },
];

const Tablereadmore = () => {
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [selectedOption, setSelectedOption] = useState<string | null>();
  const [isDataFetched, setIsDataFetched] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await getallMapData();
        const { reportInterventionDTOS, allDomesticDTOList } =
          apiResponse?.data;
        const combinedList = [...reportInterventionDTOS, ...allDomesticDTOList];
        setData(combinedList);
        setFilteredData(combinedList);
        setIsDataFetched(true);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [filteredData]);

  useEffect(() => {
    setFilteredData(data);
  }, [data, isDataFetched]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let filtered = data;

    if (startDate && endDate) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
    } else if (startDate) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate;
      });
    } else if (endDate) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate <= endDate;
      });
    }

    if (selectedOption && selectedOption !== "View All") {
      filtered = filtered.filter((item) => item.type === selectedOption);
    }

    setFilteredData(filtered);
  };

  function handleDateChange(date: Date | null, field: string): void {
    if (field === "startDate") {
      setStartDate(date);
    } else if (field === "endDate") {
      setEndDate(date);
    }
  }

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);

    if (option === "View All") {
      setFilteredData(data); // Reset to display all data
    } else {
      let filtered = data;

      if (startDate && endDate) {
        filtered = filtered.filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate >= startDate && itemDate <= endDate;
        });
      }
    }
  };

  const handleClick = (
    event: any,
    description: any,
    latitude: any,
    longitude: any,
    type: any
  ) => {
    navigate("/tableviewpage");
    localStorage.setItem("event", event);
    localStorage.setItem("description", description);
    localStorage.setItem("tablelatitute", latitude);
    localStorage.setItem("tablelongitude", longitude);
    localStorage.setItem("tabletype", type);
  };

  return (
    <Layout1>
      <div className="py-4 px-4 text-center text-3xl text-black font-bold shadow">
        {t("Report List")}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 items-center"
      >
        <div className="flex items-center pl-6">
          <DatePicker
            selected={startDate}
            onChange={(date) => handleDateChange(date, "startDate")}
            dateFormat="dd/MM/yyyy"
            placeholderText={t("Start Date")}
            className="w-40" // Adjust the width as needed
            id="startDate"
          />
        </div>

        <div className="flex items-center  px-2 py-2">
          <DatePicker
            selected={endDate}
            onChange={(date) => handleDateChange(date, "endDate")}
            dateFormat="dd/MM/yyyy"
            placeholderText={t("End Date")}
            className="w-40" // Adjust the width as needed
            id="endDate"
          />
        </div>

        <div className="flex items-center  px-2 py-2">
          <select
            value={selectedOption || "View All"}
            onChange={(e) => handleOptionChange(e.target.value)}
            className="border p-2" // Add border and padding for styling
          >
            <option value="View All">{t("View All")}</option>
            <option value="Harassment">{t("Harassment")}</option>
            <option value="Intervention">{t("Intervention")}</option>
            {/* Add other options based on your data */}
          </select>
        </div>

        <button
          type="submit"
          className="bg-slate-400 text-white px-4 py-2 rounded"
        >
          {t("Apply Filters")}
        </button>
      </form>

      {loading ? ( // Conditionally render loader if loading is true
        <div className="flex justify-center items-center h-64">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <Paper className="px-4 pb-4">
          <TableContainer>
            <Table className="border-collapse border border-gray-300 px-1.5">
              <TableHead className="bg-orange-300">
                <TableRow>
                  {columns?.map((column) => (
                    <TableCell
                      key={column.id}
                      className="border border-gray-300"
                    >
                      {t(column.translationKey)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredData?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredData
                )?.map((row: any) => (
                  <TableRow
                    key={row.id}
                    onClick={() =>
                      handleClick(
                        row.date,
                        row.description,
                        row.latitude,
                        row.longitude,
                        row.type
                      )
                    }
                    className="hover:bg-gray-200 border border-gray-300"
                  >
                    {loading && (
                      <CircularProgress
                        color="inherit"
                        thickness={8}
                        size={16}
                      />
                    )}

                    <TableCell className="border border-gray-300 px-1.5">
                      {row.date}
                    </TableCell>
                    <TableCell className="border border-gray-300 px-1.5">
                      {row.type === "Intervention" ? (
                        <div className="flex items-center">
                          <input
                            type="radio"
                            style={{
                              borderColor: "green",
                              backgroundColor: "green",
                            }}
                            id={`ratio-${row.date}`}
                            name={`ratio-${row.date}`}
                            value={row.ratio}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <input
                            type="radio"
                            style={{
                              borderColor: "red",
                              backgroundColor: "red",
                            }}
                            id={`ratio-${row.date}`}
                            name={`ratio-${row.date}`}
                            value={row.ratio}
                          />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="border border-gray-300 px-1.5">
                      {row.description}
                    </TableCell>
                    <TableCell className="border border-gray-300 px-1.5">
                      {row.location}
                    </TableCell>
                    <TableCell className="border border-gray-300 px-1.5">
                      {row.category}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData?.length || 0}
            labelRowsPerPage={t("Rows per page")}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) =>
              setRowsPerPage(parseInt(event.target.value, 10))
            }
          />
        </Paper>
      )}
    </Layout1>
  );
};

export default Tablereadmore;
