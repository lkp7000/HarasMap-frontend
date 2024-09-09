import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../../../LanguageSwitcher/languageSwitcher";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Header = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const roleValue = localStorage.getItem("role");
  const displayValue = roleValue || "login";

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleProjectsDropdown = () => {
    setIsProjectsDropdownOpen(!isProjectsDropdownOpen);
  };

  const [projectsDropdown00pen, setProjectsDropdown00pen] = useState(false);
  const [projectsDropdown1Open, setProjectsDropdown1Open] = useState(false);
  const [projectsDropdown2Open, setProjectsDropdown2Open] = useState(false);
  const [projectsDropdown3Open, setProjectsDropdown3Open] = useState(false);

  const toggleProjectsDropdown0 = () => {
    setProjectsDropdown00pen(!projectsDropdown00pen);
    setProjectsDropdown2Open(false);
    setProjectsDropdown3Open(false);
  };
  const toggleProjectsDropdown1 = () => {
    setProjectsDropdown1Open(!projectsDropdown1Open);
    // Close other project dropdowns if needed
    setProjectsDropdown2Open(false);
    setProjectsDropdown3Open(false);
  };

  const toggleProjectsDropdown2 = () => {
    setProjectsDropdown2Open(!projectsDropdown2Open);
    // Close other project dropdowns if needed
    setProjectsDropdown1Open(false);
    setProjectsDropdown3Open(false);
  };

  const toggleProjectsDropdown3 = () => {
    setProjectsDropdown3Open(!projectsDropdown3Open);
    // Close other project dropdowns if needed
    setProjectsDropdown1Open(false);
    setProjectsDropdown2Open(false);
  };

  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false);
  const [isOurWorkOpen, setIsOurWorkOpen] = useState(false);
  const [isDomesticOpen, setIsDomesticOpen] = useState(false);
  const [isDataOpen, setIsDataOpen] = useState(false);
  const [ishelpcenteropen, setIsHelpCenterOpen] = useState(false);

  const handlehelpHover = () => {
    setIsHelpCenterOpen(true);
  };

  const handlehelpLeave = () => {
    setIsHelpCenterOpen(false);
  };

  const handleAboutUsHover = () => {
    setIsAboutUsOpen(true);
  };

  const handleAboutUsLeave = () => {
    setIsAboutUsOpen(false);
  };

  const handleOurWorkHover = () => {
    setIsOurWorkOpen(true);
  };

  const handleOurWorkLeave = () => {
    setIsOurWorkOpen(false);
  };

  const handleDomesticHover = () => {
    setIsDomesticOpen(true);
  };

  const handleDomesticLeave = () => {
    setIsDomesticOpen(false);
  };

  const handleDataHover = () => {
    setIsDataOpen(true);
  };

  const handleDataLeave = () => {
    setIsDataOpen(false);
  };
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleWindowResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();


    navigate("/home");
  };

  return (
    <>
      {isDesktop ? (
        <div className="fixed z-50 w-full">
          <div className="h-8 bg-[#3f3f46]">
            <div className="flex flex-row-reverse px-20">
              <LanguageSwitcher />

              {roleValue ? (
                <div className="flex items-center">
                  <span className="mr-2 text-white font-oswald">
                    {roleValue}
                  </span>
                  <button
                    className="bg-transparent hover:underline text-white font-oswald"
                    onClick={handleLogout}
                  >
                    {t("Logout")}
                  </button>
                </div>
              ) : (
                <div className="whitespace-nowrap">
                  <Link to="/login" className="text-xl font-oswald text-white">
                    {t("Login")}
                  </Link>
                </div>
              )}
            </div>
            <div></div>
          </div>

          <header className=" bg-gradient-to-r from-yellow-300 to-pink-400 shadow-xl fixed   w-full  ">
            <nav className="flex items-center justify-between px-6   ">
              <div className="flex items-center flex-shrink-0 text-white mr-6">
                <div className="flex">
                  <div className=" items-left mt-4 ">
                    <img
                      onClick={() => {
                        navigate("/");
                      }}
                      src="\assets\Logo123.png"
                      className="h-[62px] w-[130px] cursor-pointer"
                      alt="img"
                    />
                  </div>
                </div>
              </div>

              <div className="block lg:hidden">
                <button
                  className="flex items-center px-3 py-2 border rounded text-black border-gray-400  "
                  onClick={toggleMenu}
                >
                  <svg
                    className="h-3 w-3 fill-current"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title></title>

                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                  </svg>
                </button>
              </div>

              <div
                className={`w-full lg:flex lg:items-center lg:w-auto ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                <ul className="text-sm flex  space-x-1 lg:flex-row-reverse md:flex-row-reverse  max-md:flex-col max-md:relative max-md:w-full">
                  <li
                    className="relative"
                    onMouseEnter={handleAboutUsHover}
                    onMouseLeave={handleAboutUsLeave}
                  >
                    <Link
                      to=""
                      className="block mt-4 lg:inline-block font-oswald  text-xl lg:mt-0 text-black hover:text-white mr-4 px-4"
                    >
                      {t("ABOUT US")}
                    </Link>
                    {isAboutUsOpen && (
                      <div className="absolute  py-2 w-32 bg-white rounded-lg shadow-md hover:border-2 hover:border-[#fdba74] z-10">
                        <Link
                          to="/aboutus/who-we-are"
                          className="block px-4 py-2 font-oswald text-[#fa9859] hover:text-black"
                        >
                          {t("Who We Are")}
                        </Link>

                        <hr className=" h-1 bg-gray-100 rounded dark:bg-gray-700"></hr>
                        <Link
                          to="/aboutus/mapeffect"
                          className="block px-4 py-2 font-oswald text-[#fa9859] hover:text-black"
                        >
                          {t("Harrasmap")}
                        </Link>
                      </div>
                    )}
                  </li>
                  <li
                    className="relative"
                    onMouseEnter={handlehelpHover}
                    onMouseLeave={handlehelpLeave}
                  >
                    <Link
                      to=""
                      className="block mt-4 lg:inline-block lg:mt-0 text-xl  font-oswald  text-black hover:text-white mr-4"
                    >
                      {t("HELP CENTER")}
                    </Link>

                    {ishelpcenteropen && (
                      <div className="absolute  py-2 w-32 bg-white rounded-lg hover:border-2 hover:border-[#fdba74] shadow-md z-10">
                        <hr className=" h-1 bg-gray-100 rounded dark:bg-gray-700"></hr>

                        <Link
                          to="/organisationmap"
                          className="block px-4 py-2 font-oswald text-[#fa9859] hover:text-black"
                        >
                          {t("Organisation Map")}
                        </Link>
                      </div>
                    )}
                  </li>

                  <li
                    className="relative"
                    onMouseEnter={handleOurWorkHover}
                    onMouseLeave={handleOurWorkLeave}
                  >
                    <Link
                      to=""
                      className="block mt-4 lg:inline-block text-xl font-oswald  lg:mt-0 text-black hover:text-white mr-4"
                    >
                      {t("DOMESTIC VIOLENCE")}
                    </Link>
                    {isOurWorkOpen && (
                      <div className="absolute  py-2 w-32 bg-white  hover:border-2 hover:border-[#fdba74] rounded-lg shadow-md z-10">
                        <Link
                          to="/domesticviolence/report"
                          className="block px-4 py-2  font-oswald   text-[#fa9859] hover:text-black"
                        >
                          {t("Report")}
                        </Link>
                        <hr className=" h-1 bg-gray-100 rounded dark:bg-gray-700"></hr>
                        <Link
                          to="/domesticviolence/reporting"
                          className="block px-4 py-2  font-oswald  text-[#fa9859] hover:text-black"
                        >
                          {t("Reporting Map")}
                        </Link>
                        <hr className=" h-1 bg-gray-100 rounded dark:bg-gray-700"></hr>
                        <Link
                          to="/domesticviolence/intervenue"
                          className="block px-4 py-2  font-oswald   text-[#fa9859] hover:text-black"
                        >
                          {t("Intervene")}
                        </Link>

                        <hr className=" h-1 bg-gray-100 rounded dark:bg-gray-700"></hr>

                        <Link
                          to="/domesticviolence/chart"
                          className="block px-4 py-2  font-oswald   text-[#fa9859] hover:text-black"
                        >
                          {t("Chart")}
                        </Link>
                      </div>
                    )}
                  </li>

                  <li
                    className="relative"
                    onMouseEnter={handleDataHover}
                    onMouseLeave={handleDataLeave}
                  >
                    <Link
                      to=""
                      className="block mt-4 lg:inline-block lg:mt-0 text-xl  font-oswald  text-black hover:text-white mr-4"
                    >
                      {t("DATA STATISTICS")}
                    </Link>
                    {isDataOpen && (
                      <div className="absolute  py-2 w-32 bg-white rounded-lg hover:border-2 hover:border-[#fdba74] shadow-md z-10">
                        <Link
                          to="/"
                          className="block px-4 py-2 font-oswald text-[#fa9859] hover:text-black"
                        >
                          {t("Map")}
                        </Link>
                        <hr className=" h-1 bg-gray-100 rounded dark:bg-gray-700"></hr>
                        <Link
                          to="/table"
                          className="block px-4 py-2 font-oswald   text-[#fa9859] hover:text-black"
                        >
                          {t("Table")}
                        </Link>
                      </div>
                    )}
                  </li>

                  <li
                    className="relative"
                    onMouseEnter={handleDomesticHover}
                    onMouseLeave={handleDomesticLeave}
                  >
                    <Link
                      to=""
                      className="block mt-4 lg:inline-block lg:mt-0 text-xl  font-oswald  text-black hover:text-white mr-4"
                    >
                      {t("OUR WORK")}
                    </Link>
                    {isDomesticOpen && (
                      <div className="absolute  py-2 w-32 bg-white rounded-lg hover:border-2 hover:border-[#fdba74] shadow-md z-10">
                        <Link
                          to="/ourwork/campaign"
                          className="block px-4 py-2 font-oswald   text-[#fa9859] hover:text-black"
                        >
                          {t("Campaigns")}
                        </Link>
                        <hr className=" h-1 bg-gray-100 rounded dark:bg-gray-700"></hr>
                        <Link
                          to="/ourwork/research"
                          className="block px-4 py-2 font-oswald   text-[#fa9859] hover:text-black"
                        >
                          {t("Research")}
                        </Link>
                      </div>
                    )}
                  </li>

                  <li>
                    <Link
                      to="/home"
                      className="block mt-4 lg:inline-block lg:mt-0 text-xl  font-oswald  text-black hover:text-white mr-4"
                    >
                      {t("HOME")}
                    </Link>
                  </li>
                  <li>
                    {roleValue === "admin" && (
                      <li>
                        <Link
                          to="/admindashboard"
                          className="block mt-4 lg:inline-block text-xl font-oswald lg:mt-0 text-black hover:text-white mr-4"
                        >
                          {t("ADMIN DASHBOARD")}
                        </Link>
                      </li>
                    )}

                    {roleValue === "agent" && (
                      <li>
                        <Link
                          to="/agentdashboard"
                          className="block mt-4 lg:inline-block text-xl font-oswald lg:mt-0 text-black hover:text-white mr-4"
                        >
                          {t("AGENT DASHBOARD")}
                        </Link>
                      </li>
                    )}
                  </li>
                </ul>
                <button> </button>
              </div>
            </nav>
          </header>
        </div>
      ) : (
        // Code to render for mobile view
        <div>
          {/* Add your mobile-specific components or layout here */}

          <div className="h-8 w-full bg-black/70  ">
            <div className="pr-[65px]">
              {" "}
              <div className="relative inline-block float-right text-left pr-0">
                {" "}
                <div className="flex ">
                  <LanguageSwitcher />
                  <button className="bg-transparent hover:underline font-sans text-gray-800 ">
                    <div className="whitespace-nowrap">
                      <Link
                        to="/login"
                        className=" text-xl  font-oswald text-white"
                      >
                        {t("Login")}
                      </Link>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* nav computer */}
          <div className="bg-gray-100  min-h-80vh">
            <div className="bg-gradient-to-r from-yellow-300 to-pink-400 shadow-xl text-white p-4">
              <div className="flex justify-between items-center">
                {/* <div className="text-xl font-bold">Logo</div> */}
                <div className="flex   ">
                  <div className=" items-left mt-4 ">
                    <img
                      src="\assets\Logo123.png"
                      className="h-[62px] w-[130px]"
                      alt="img"
                    />
                  </div>
                </div>
              </div>
              <div className="block flex justify-end lg:hidden">
                <button
                  className="text-white focus:outline-none"
                  onClick={toggleMenu}
                >
                  <svg
                    className="h-6 w-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* mobile */}

            <div className={`lg:hidden ${isOpen ? "block" : "hidden"}`}>
              <ul className="mt-4">
                <li className="py-2">
                  <Link
                    to="/home"
                    className="block font-bold hover:text-gray-300"
                  >
                    {t("HOME")}
                  </Link>
                </li>
                <li className="py-2" onClick={toggleProjectsDropdown0}>
                  <p className="block font-bold hover:text-gray-300">
                    {t("OUR WORK")}
                  </p>
                  {projectsDropdown00pen && (
                    <ul className="pl-4">
                      <li>
                        <Link
                          to="/ourwork/campaign"
                          className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                        >
                          {t("Campaigns")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/ourwork/research"
                          className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                        >
                          {t("Research")}
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                <li className="py-2" onClick={toggleProjectsDropdown1}>
                  <a className="block font-bold hover:text-gray-300">
                    {t("DATA STATISTICS")}
                  </a>
                  {projectsDropdown1Open && (
                    <ul className="pl-4">
                      <li>
                        <Link
                          to="/"
                          className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                        >
                          {t("Map")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/chart"
                          className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                        >
                          {t("Chart")}
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="py-2" onClick={toggleProjectsDropdown2}>
                  <a className="block font-bold  hover:text-gray-300">
                    {t("DOMESTIC VIOLENCE")}
                  </a>
                  {projectsDropdown2Open && (
                    <ul className="pl-4">
                      <li>
                        <Link
                          to="/domesticviolence/report"
                          className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                        >
                          {t("Report")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/domesticviolence/reporting"
                          className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                        >
                          {t("Reporting")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/domesticviolence/intervenue"
                          className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                        >
                          {t("Intervene")}
                        </Link>
                      </li>
                      <Link
                        to="/domesticviolence/map"
                        className="block px-4 py-2  font-oswald   text-black hover:text-black"
                      >
                        {t("Map")}
                      </Link>
                      <Link
                        to="/domesticviolence/chart"
                        className="block px-4 py-2  font-oswald   text-black hover:text-black"
                      >
                        {t("Chart")}
                      </Link>
                    </ul>
                  )}
                </li>
                <li className="py-2" onClick={toggleProjectsDropdown3}>
                  <p className="block font-bold hover:text-gray-300">
                    {t("ABOUT US")}
                  </p>
                  {projectsDropdown3Open && (
                    <ul className="pl-4">
                      <li>
                        <Link
                          to="/aboutus/who-we-are"
                          className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                        >
                          {t("Who We are")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/aboutus/mapeffect"
                          className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                        >
                          {t("Harrasmap Effect")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/aboutus/mapeffect"
                          className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                        >
                          {t("Partners")}
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
