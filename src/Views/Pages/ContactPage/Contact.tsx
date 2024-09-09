import { useState, useRef } from "react";
import axios from "axios";
import Header from "../../Component/Layout/Header";
import Footer from "../../Component/Layout/Footer";
import { addcontact } from "../../../services/api";
import { CircularProgress } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();

  const storedEmail = localStorage.getItem("email");
  console.log(storedEmail);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    contactEmail: storedEmail || "",
    contactPhone: "",
    description: "",
  });

  const handleCancel = () => {
    setFormData({
      fullName: "",
      contactEmail: "",
      contactPhone: "",
      description: "",
    });
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await addcontact(formData);
      toast.success(t("Form submitted successfully!"));

      console.log(response);
      setFormData({
        fullName: "",
        contactEmail: "",
        contactPhone: "",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setLoading(false); // Set loading to false after API call is completed
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="  md:mt-28 w-full bg-[#91cedb] flex items-center justify-center">
        <h1 className="text-2xl font-oswald  tracking-wide  hover:tracking-widest text-black underline ">
          {t("Contact Details")}
        </h1>
      </div>

      <div className="bg-[#def2f7] flex justify-center p-10">
        <div className=" w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("Full Name")}
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("Enter your full name")}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-6"
                >
                  {t("Email")}
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  id="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("Enter your Email")}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="contact"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-6"
                >
                  {t("Phone Number")}
                </label>
                <input
                  type="number"
                  name="contactPhone"
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder={t("Enter Phone Number")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  pattern="[0-9]*"
                  title="Please enter only numeric characters."
                  required
                />
                <label
                  htmlFor=" description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-6"
                >
                  {t('Description')}
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={t('Enter description')}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  title="Please enter description"
                  required
                />
              </div>

              <div className="flex space-x-2 mt-8">
                <button
                  type="submit"
                  className="w-[190px] text-black bg-[#91cedb] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 max-md:w-[109px]"
                >
                  <span className="pl-0.5"> {t('Submit')}</span>
                  <span className="pl-0.5">
                    {" "}
                    {loading && (
                      <CircularProgress
                        color="inherit"
                        thickness={8}
                        size={12}
                      />
                    )}{" "}
                  </span>
                </button>
                <button
                  type="button"
                  className="w-[190px] text-black border border-black bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-dark dark:text-white dark:bg-white dark:hover:bg-gray-200 dark:focus:ring-primary-800 max-md:w-[109px]"
                  onClick={handleCancel}
                >
                  {t("Cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="justify-between max-md:hidden">
          <img src="./images/h2.png" alt="Logo" className="h-full w-auto" />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
