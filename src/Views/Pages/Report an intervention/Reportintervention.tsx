import React, { useEffect, useState, useRef } from "react";
import Header from "../../Component/Layout/Header";
import Footer from "../../Component/Layout/Footer";
import { Intervention } from "../../../services/api";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { number } from "yargs";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-number-input";
const BASE_URL = process.env.REACT_APP_MAP_KEY;
export const Reportintervention = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { t } = useTranslation();
  const mapRef = useRef(null);
  let marker: L.Layer | null = null;
  const cityCoordinates: { [key: string]: [number, number] } = {
    "Select your City": [18.533333, -72.333336],
    "Port-au-Prince": [18.5392, -72.335],
    "Les Cayes": [18.1906, -73.7468],
    "Port-de-Paix": [19.9389, -72.8295],
    "Cap-Haïtien": [19.7592, -72.2125],
    Jacmel: [18.2347, -72.5342],
    Gonaïves: [19.4515, -72.6812],
    Léogâne: [18.5096, -72.6318],
    Hinche: [19.1448, -72.0023],
    Miragoâne: [18.4441, -73.0887],
    Jérémie: [18.6504, -74.1163],
    "Fond Parisien": [18.4958, -71.9959],
    Thomassique: [19.0454, -71.8259],
    Verrettes: [19.0467, -72.4654],
    "Anse-à-Veau": [18.5153, -73.4602],
    "Petit-Goâve": [18.4313, -72.8628],
    Dessalines: [19.2833, -72.5],
    "Saint-Marc": [19.1082, -72.6936],
    Belladère: [18.9342, -71.9452],
    Maïssade: [19.1667, -72.0167],
    Aquin: [18.2795, -73.3989],
    "Belle-Anse": [18.2325, -72.0867],
    Thomonde: [19.0322, -71.8353],
    "Acul-du-Nord": [19.6451, -72.1789],
    Mirebalais: [18.8191, -72.1054],
    "Croix-des-Bouquets": [18.575, -72.2248],
    "Saint-Louis-du-Nord": [19.9317, -72.3447],
  };
  const [selectedCity, setSelectedCity] = useState("Select your City");
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<any>({
    full_Name: "Full name is required *",
    phone_number: "Phone Number is required *",
    interventionName: "Intervention name is required *",
    incident_date: "Incident date is required *",
  });
 
  const [formData, setFormData] = useState<any>({
    full_Name: "",
    email: "",
    phone_number: "",
    description: "",
    interventionName: "",
    intervention_date: "",
    intervention_address: "",
    latitude: "",
    longitude: "",
  });
  const [id, setId] = useState<any>(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
 
  const handleChange = (value: any, name: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const full_NameRef = useRef<HTMLInputElement>(null);
  const phone_numberRef = useRef<HTMLInputElement>(null);
  const interventionName = useRef<HTMLInputElement>(null);
  const intervention_date = useRef<HTMLInputElement>(null);
 
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (
      !formData.full_Name ||
      !formData.phone_number ||
      !formData.interventionName ||
      !formData.intervention_date
    ) {
      // If any required field is empty, do not submit the form
      console.error("Please fill in all required fields.");
      // Find the first required field that is empty and set focus to it
      if (!formData.full_Name) {
        full_NameRef.current?.focus();
      } else if (!formData.phone_number) {
        phone_numberRef.current?.focus();
      } else if (!formData.interventionName) {
        interventionName.current?.focus();
      } else if (!formData.intervention_date) {
        intervention_date.current?.focus();
      }
      return;
    }
    setLoading(true);
    try {
      const response = await Intervention(formData);
      console.log(response);
      if (response.status == 200) {
        setId(response.data.interventionId);
        console.log(response.data);
 
        setShowSuccessMessage(true);
      } else {
        console.error("Error submitting the form:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDownload = async (id: any) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/intervention/${id}`,
        {
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "report.pdf";
 
      document.body.appendChild(link);
 
      link.click();
 
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };
 
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);
    if (cityCoordinates[selectedCity]) {
      const [latitude, longitude] = cityCoordinates[selectedCity];
      setFormData((prev: any) => ({
        ...prev,
        latitude: String(latitude),
        longitude: String(longitude),
      }));
    }
  };
  useEffect(() => {
    if (cityCoordinates[selectedCity]) {
      const [latitude, longitude] = cityCoordinates[selectedCity];
      setFormData((prev: any) => ({
        ...prev,
        latitude: String(latitude),
        longitude: String(longitude),
      }));
    }
  }, []);
 
  useEffect(() => {
    if (!mapRef.current || !selectedCity) return;
    const [latitude, longitude] = cityCoordinates[selectedCity];
    const map = L.map(mapRef.current).setView([latitude, longitude], 12);
 
    const layer = L.tileLayer(
      "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    );
    map.addLayer(layer);
    const customIcon = L.icon({
      iconUrl:
        "https://www.freeiconspng.com/uploads/blue-location-icon-png-19.png",
      iconSize: [40, 40], // Adjust the size of your icon
      iconAnchor: [20, 32],
    });
    let marker: L.Layer | null = null;
    map.on("click", (event) => {
      if (marker !== null) {
        map.removeLayer(marker);
      }
      marker = L.marker([event.latlng.lat, event.latlng.lng], {
        icon: customIcon,
      }).addTo(map);
      const { lat, lng } = event.latlng;
      setFormData((prev: any) => ({
        ...prev,
        latitude: lat.toFixed(6),
        longitude: lng.toFixed(6),
      }));
    });
    return () => {
      map.off("click");
      map.remove();
    };
  }, [selectedCity]);
  const currentDate = new Date();
  const maxYear = currentDate.getFullYear() + 10;
  const maxDate = `${maxYear}-${("0" + (currentDate.getMonth() + 1)).slice(
    -2
  )}-${("0" + currentDate.getDate()).slice(-2)}`;
 
  return (
    <>
      <Header />
      <div className="w-full bg-[#f97316] md:pt-28 flex items-center justify-center">
        <h1 className="text-2xl text-black hover:underline font-oswald tracking-wide ">
          {t("Intervention form")}
        </h1>
      </div>
 
      <div className="bg-[#fdba74]/70 flex p-10 justify-center items-center">
        <div className="w-[800px] bg-white md:mt-0 xl:p-0">
          <div className="p-6 space-y-4 w-[800px] max-md:w-[100%]">
            <form onSubmit={handleSubmitForm}>
              <div className="mb-6">
                <label
                  htmlFor="full_Name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("Full Name")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="full_Name"
                  ref={full_NameRef}
                  id="full_Name"
                  value={formData.full_Name}
                  onChange={(e) => handleChange(e.target.value, "full_Name")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("Full Name")}
                />
                {formSubmitted && !formData.full_Name && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {t("Full name is required")}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("Email Address")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e.target.value, "email")}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] max-md:w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder={t("Email Address")}
                />
              </div>
 
              <div className="mb-6">
                <label
                  htmlFor="phone_number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("Contact Number")}{" "}
                  <span className="text-red-500 w-10px">*</span>
                </label>
                <PhoneInput
                  international
                  defaultCountry="US"
                  value={formData.phoneNumber}
                  onChange={(value: any) => handleChange(value, "phone_number")}
                  id="phone_number"
                  name="phone_number"
                />
                {formSubmitted && !formData.phone_number && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {t("Phone Number is required")}
                  </p>
                )}
              </div>
 
              <div className="mb-6">
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("Address of the incident")}
                </label>
                <div className="mb-6">
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  ></label>
                  <select
                    id="city"
                    name="city"
                    value={selectedCity}
                    onChange={handleCityChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  >
                    <option value="">{t("Select a city")}</option>
                    {Object.keys(cityCoordinates).map((city) => (
                      <option key={city} value={city}>
                        {t(city)}
                      </option>
                    ))}
                  </select>
                </div>
                <p> {t("Please select the map")}:</p>
 
                <div
                  id="map"
                  style={{ height: "400px", width: "100%", zIndex: "40" }}
                  ref={mapRef}
                ></div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("Describe the incident in Brief")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={(e) => handleChange(e.target.value, "description")}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("Leave a comment...")}
                />
              </div>
 
              <p className="ml-2 text-sm mt-4 text-xl font-bold text-gray-900 dark:text-gray-300">
                {t("Details of Harasser")}:
              </p>
              <div className="mb-6 mt-4">
                <label
                  htmlFor="interventionName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("Name of Intervention")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="interventionName"
                  name="interventionName"
                  ref={interventionName}
                  value={formData.interventionName}
                  onChange={(e) =>
                    handleChange(e.target.value, "interventionName")
                  }
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
                {formSubmitted && !formData.interventionName && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {t("Intervention Name is required")}
                  </p>
                )}
              </div>
 
              <div className="mb-6">
                <label
                  htmlFor="intervention_date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("Date of Intervention")}{" "}
                  <span className="text-red-500 ">*</span>
                </label>
                <input
                  type="date"
                  id="intervention_date"
                  name="intervention_date"
                  ref={intervention_date}
                  value={formData.intervention_date}
                  onChange={(e) =>
                    handleChange(e.target.value, "intervention_date")
                  }
                  max={maxDate}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
                {formSubmitted && !formData.intervention_date && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {t("Intervention Date is required")}
                  </p>
                )}
              </div>
 
              <div className="mb-6">
                <label
                  htmlFor="intervention_address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("Residential Address (if You know)")}
                </label>
                <input
                  type="text"
                  id="intervention_address"
                  name="intervention_address"
                  value={formData.intervention_address}
                  onChange={(e) =>
                    handleChange(e.target.value, "intervention_address")
                  }
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
 
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <span className="">{t("Submit")}</span>
                {loading && (
                  <CircularProgress
                    color="inherit"
                    thickness={8}
                    size={16}
                    style={{ marginLeft: "6px" }} // Add padding to the left of the loader
                  />
                )}
              </button>
 
              {showSuccessMessage && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                  <div className="bg-white p-6 rounded-lg text-center">
                    <p className="text-green-500 text-xl font-semibold">
                      {t("Your report is saved successfully!")}
                      <br />
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border mt-4 mr-2 inline border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      />
                      <button
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        onClick={() => handleDownload(id)}
                      >
                        <input
                          id="remember"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 border mt-4 mr-2 inline border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        />
                        {t("Download the report as pdf")}
                        <svg
                          className="h-6 w-6 text-black inline"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {" "}
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />{" "}
                          <polyline points="7 10 12 15 17 10" />{" "}
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </button>
                    </p>
                    <br />
 
                    <Link
                      to="/report"
                      className="mt-4 bg-blue-500  text-white py-2 px-4 rounded-md"
                      onClick={() => setShowSuccessMessage(false)}
                    >
                      {t("Close")}
                    </Link>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
 
      <Footer />
    </>
  );
};
