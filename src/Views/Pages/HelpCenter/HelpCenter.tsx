import React, { useEffect, useState, useRef } from "react";
import Header from "../../Component/Layout/Header";
import Footer from "../../Component/Layout/Footer";
import { addorganisation } from "../../../services/api";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
const BASE_URL = process.env.REACT_APP_MAP_KEY;
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminDashboardLayout from "../AdminDashboard/AdminDashBoardLayout";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useTranslation } from "react-i18next";

export const HelpCenter = () => {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [formSubmitted, setFormSubmitted] = useState(false);
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
  type OrganisationType = {
    [key: string]: string;
  };
  const organisation: OrganisationType = {
    Hospital: t("Hospital"),
    Clinics: t("Clinics"),
    "Foster Home": t("Foster Home"),
    PNH: t("PNH"),
    Counselling: t("Counselling"),
  };
  const [selectedCity, setSelectedCity] = useState("Select your City");
  const [errors, setErrors] = useState<any>({
    organisationName: "Full name is required *",
    number: "Number is required *",

  });
  const [formData, setFormData] = useState<any>({
    organisationName: "",
    email: "",
    number: "",
    latitude: "",
    longitude: "",
    organisationType: ""
  });
  const [id, setId] = useState<any>(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //   const handleChange = (e: { target: { name: any; value: any } }) => {
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value,
  //     });
  //   };
  const handleChange = (value: any, name: any) => {
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ""
    });
  };
  const full_NameRef = useRef<HTMLInputElement>(null);
  // const phone_numberRef = useRef<HTMLInputElement>(null);
  // const selectRef = useRef<HTMLInputElement>(null);
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setFormSubmitted(true);
      if (
        !formData.organisationName ||
        !formData.number ||
        !formData.organisationType
      ) {
        if (!formData.organisationName) {
          full_NameRef.current?.focus();
        }
        return;
      }
      setLoading(true);
      const response = await addorganisation(formData);
      if (response.status == 200) {
        // console.log('object status chal rha hai:>> ');
        navigate("/organisationmap");
        setId(response.data);
        console.log(response.data);
        setShowSuccessMessage(true);
      } else {
        console.error("Error submitting the form:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
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
  console.log(cityCoordinates[0], "ok");

  const handleorganisationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const organisationType = e.target.value;
    if (organisation[organisationType]) {
      setFormData((prev: any) => ({
        ...prev,
        organisationType,
      }));
    }
    console.log([]);
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
  }, [0]);

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
      <AdminDashboardLayout>
        <div className="   w-full bg-[#f97316] flex  justify-center">
          <h1 className="text-2xl text-black hover:underline font-oswald tracking-wide ">
            {t("Help Center")}{" "}
          </h1>
        </div>

        <div className=" bg-[#fdba74]/70 flex p-10  justify-center items-center">
          <div className="w-[800px] h-[500px] overflow-y-auto overflow-x-hidden bg-white md:mt-0 xl:p-0">
            {" "}
            <div className="p-6 space-y-4  w-[800px] max-md:w-[100%] ">
              <form onSubmit={handleSubmitForm}>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("Full Name")}
                  </label>
                  <input
                    type="text"
                    name="organisationName"
                    id="organisationName"
                    ref={full_NameRef}
                    value={formData.organisationName}
                    // onChange={handleChange}
                    onChange={(e) => handleChange(e.target.value, 'organisationName')}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={t("Full Name")}
                  />
                  {formSubmitted && !formData.organisationName && (
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
                    // onChange={handleChange}
                    onChange={(e) => handleChange(e.target.value, 'email')}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] max-md:w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder=""
                  // required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("Contact Number")}
                  </label>
                  <PhoneInput
                    international
                    defaultCountry="US"
                    value={phoneNumber}
                    onChange={(value: any) => handleChange(value, "number")}
                    id="number"
                    name="number"
                  />
                  {formSubmitted && !formData.number && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {t("Contact Number is required")}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("Organisation Type")}
                  </label>
                  <select
                    id="organisationType"
                    name="organisationType"
                    value={formData.organisationType}
                    onChange={handleorganisationChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  >
                    <option value="">{t("select")} </option>
                    {Object.keys(organisation).map((city) => (
                      <option key={city} value={city}>
                        {organisation[city]}
                      </option>
                    ))}

                  </select>
                  {formSubmitted && !formData.organisationType && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {t("Organisation Type is required")}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor=""
                    className="block mb-2 text-sm font-bold   text-gray-900 dark:text-white"
                  >
                    {t("Location of the Organization")}
                  </label>
                  <div className="mb-6">
                    <label
                      htmlFor=""
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    ></label>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="city"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("Select City in Haiti")}
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={selectedCity}
                      onChange={handleCityChange}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    >
                      <option value="">{t("Select your city")}</option>
                      {Object.keys(cityCoordinates).map((city) => (
                        <option key={city} value={city}>
                          {t(city)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p> {t("Please select the map :")}</p>

                  <div
                    id="map"
                    style={{ height: "400px", width: "100%", zIndex: "40" }}
                    ref={mapRef}
                  ></div>
                </div>
                <button
                  type="submit"
                  className="bg-[#91cedb] font-bold py-2 px-4  rounded hover:text-black"
                >
                  <span className="p-5"> {t("Save")} </span>
                  {loading && (
                    <CircularProgress color="inherit" thickness={8} size={16} />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </AdminDashboardLayout>
    </>
  );
};
export default HelpCenter;
