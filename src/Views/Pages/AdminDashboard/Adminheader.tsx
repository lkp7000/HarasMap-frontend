import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Navigate, useNavigate } from "react-router-dom";
import LanguageSwitcher from "../../../LanguageSwitcher/languageSwitcher";
import { t } from "i18next";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
    // Close other project dropdowns if needed
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

  function classNames(arg0: string, arg1: string): string | undefined {
    throw new Error("Function not implemented.");
  }
  const [agentID, setAgentID] = useState("");
  useEffect(() => {
    const agentIDFromStorage = localStorage.getItem("agentID");

    if (agentIDFromStorage) {
      setAgentID(agentIDFromStorage);
    }
  }, []);
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("agentID");

    navigate("/login");
  };

  return (
    <>
      {isDesktop ? (
        // Code to render for desktop view
        <div className="fixed z-50 w-full">
          <div className="h-8 bg-[#3f3f46]">
            <div className="flex flex-row-reverse px-20">
              <LanguageSwitcher />
              <div>
                <a
                  href="#"
                  className="text-xl flex items-center font-oswald text-white"
                  onClick={handleDropdownToggle}
                >
                  {t('Admin')}
                  <svg
                    className="h-8 w-8 text-white cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={handleDropdownToggle}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
                {isDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-[30px] w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">

                      <a
                        href="/"
                        className="block px-4 py-2 font-oswald text-sm hover:bg-[#bae6fd]"
                        onClick={handleLogout}
                      >
                        <svg className="h-4 w-4 inline text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />  <polyline points="16 17 21 12 16 7" />  <line x1="21" y1="12" x2="9" y2="12" /></svg> {t('Sign Out')}                       </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <header className=" bg-gradient-to-r from-yellow-300 to-pink-400 shadow-xl fixed   w-full  ">
            <nav className="flex items-center justify-between px-6   ">
              <div className="flex items-center flex-shrink-0 text-white mr-6">
                <div className="flex   ">
                  <div className=" items-left mt-4 ">
                    <img src="\assets\Logo123.png" className="h-[62px] w-[130px]" alt="sdasd" />
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
                className={`w-full lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"
                  }`}
              >
                <ul className="text-sm flex  space-x-4 lg:flex-row-reverse md:flex-row-reverse  max-md:flex-col max-md:relative max-md:w-full">
                  <li
                    className="relative"
                    onMouseEnter={handleAboutUsHover}
                    onMouseLeave={handleAboutUsLeave}
                  >
                    <a
                      href="#"
                      className="block mt-4 lg:inline-block font-oswald  text-xl lg:mt-0 text-black hover:text-white mr-4 px-4"
                    >
                      {t('ABOUT US')}
                    </a>
                    {isAboutUsOpen && (
                      <div className="absolute  py-2 w-32 bg-white rounded-lg shadow-md hover:border-2 hover:border-[#fdba74] z-10">
                        <a
                          href="/aboutus/who-we-are"
                          className="block px-4 py-2 font-oswald text-[#fa9859] hover:text-black"
                        >
                          {t('Who We Are')}
                        </a>
                        <hr className=" h-1 bg-gray-100 rounded dark:bg-gray-700"></hr>
                        <a
                          href="/aboutus/mapeffect"
                          className="block px-4 py-2 font-oswald text-[#fa9859] hover:text-black"
                        >
                          {t('Harrasmap Effect')}
                        </a>
                        <hr className=" h-1 bg-gray-100 rounded dark:bg-gray-700"></hr>
                        <a
                          href="/aboutus/mapeffect"
                          className="block px-4 py-2 font-oswald text-[#fa9859] hover:text-black"
                        >
                          {t('Partners')}
                        </a>
                      </div>
                    )}
                  </li>

                  <li
                    className="relative"
                    onMouseEnter={handleOurWorkHover}
                    onMouseLeave={handleOurWorkLeave}
                  >
                    <a
                      href=""
                      className="block mt-4 lg:inline-block text-xl font-oswald  lg:mt-0 text-black hover:text-white mr-4"
                    >
                      {t('DOMESTIC VIOLENCE')}
                    </a>
                    {isOurWorkOpen && (
                      <div className="absolute  py-2 w-32 bg-white  hover:border-2 hover:border-[#fdba74] rounded-lg shadow-md z-10">
                        <a
                          href="/domesticviolence/report"
                          className="block px-4 py-2  font-oswald   text-[#fa9859] hover:text-black"
                        >
                          {t('Report')}
                        </a>
                        <hr className=" h-1 bg-gray-100 rounded dark:bg-gray-700"></hr>
                        <a
                          href="/domesticviolence/reporting"
                          className="block px-4 py-2  font-oswald  text-[#fa9859] hover:text-black"
                        >
                          {t('Reporting')}
                        </a>
                        <hr className=" h-1 bg-gray-100 rounded dark:bg-gray-700"></hr>
                        <a
                          href="/domesticviolence/intervenue"
                          className="block px-4 py-2  font-oswald   text-[#fa9859] hover:text-black"
                        >
                          {t('Intervene')}
                        </a>
                        <hr className=" h-1 bg-gray-100 rounded dark:bg-gray-700"></hr>

                        {/* <a
                          href="/domesticviolence/map"
                          className="block px-4 py-2  font-oswald   text-[#fa9859] hover:text-black"
                        >
                          Map
                        </a> */}
                        <hr className=" h-1 bg-gray-100 rounded dark:bg-gray-700"></hr>

                        <a
                          href="/domesticviolence/chart"
                          className="block px-4 py-2  font-oswald   text-[#fa9859] hover:text-black"
                        >
                          {t('Chart')}
                        </a>
                      </div>
                    )}
                  </li>

                  <li
                    className="relative"
                    onMouseEnter={handleDataHover}
                    onMouseLeave={handleDataLeave}
                  >
                    <a
                      href="#home"
                      className="block mt-4 lg:inline-block lg:mt-0 text-xl  font-oswald  text-black hover:text-white mr-4"
                    >
                      {t('DATA STATISTICS')}
                    </a>
                    {isDataOpen && (
                      <div className="absolute  py-2 w-32 bg-white rounded-lg hover:border-2 hover:border-[#fdba74] shadow-md z-10">
                        <a
                          href="/"
                          className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                        >
                          {t('Map')}
                        </a>
                        <hr className=" h-1 bg-gray-100 rounded dark:bg-gray-700"></hr>
                        <a
                          href="/chart"
                          className="block px-4 py-2 font-oswald   text-[#fa9859] hover:text-black"
                        >
                          {t('Chart')}
                        </a>
                      </div>
                    )}
                  </li>

                  <li
                    className="relative"
                    onMouseEnter={handleDomesticHover}
                    onMouseLeave={handleDomesticLeave}
                  >
                    <a
                      href="#home"
                      className="block mt-4 lg:inline-block lg:mt-0 text-xl  font-oswald  text-black hover:text-white mr-4"
                    >
                      {t('OUR WORK')}
                    </a>
                    {isDomesticOpen && (
                      <div className="absolute  py-2 w-32 bg-white rounded-lg hover:border-2 hover:border-[#fdba74] shadow-md z-10">
                        {/* Dropdown content */}
                        <a
                          href="/ourwork/campaign"
                          className="block px-4 py-2 font-oswald   text-[#fa9859] hover:text-black"
                        >
                          {t('Campaigns')}
                        </a>
                        <hr className=" h-1 bg-gray-100 rounded dark:bg-gray-700"></hr>
                        <a
                          href="/ourwork/research"
                          className="block px-4 py-2 font-oswald   text-[#fa9859] hover:text-black"
                        >
                          {t('Research')}
                        </a>
                        {/* Add more dropdown items as needed */}
                      </div>
                    )}
                  </li>

                  <li>
                    <a
                      href="/home"
                      className="block mt-4 lg:inline-block lg:mt-0 text-xl  font-oswald  text-black hover:text-white mr-4"
                    >
                      {t('HOME')}
                    </a>
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
                  <button className="bg-transparent hover:underline font-sans text-gray-800 ">
                    <div className="whitespace-nowrap">
                      <a
                        href="/login"
                        className=" text-xl  font-oswald text-white"
                      >
                        {t('Admin')}
                        <svg
                          className="h-8 w-8 text-white inline cursor-pointer"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          onClick={handleDropdownToggle}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </a>
                      {isDropdownOpen && (
                        <div className="absolute right-0 z-10 mt-[20px] w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                          <a
                            href="/"
                            className="block px-4 py-2 font-oswald text-sm hover:bg-[#bae6fd]"
                            onClick={handleLogout}
                          >
                            <svg className="h-4 w-4 inline text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />  <polyline points="16 17 21 12 16 7" />  <line x1="21" y1="12" x2="9" y2="12" /></svg>  Sign Out                       </a>
                        </div>

                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-100  min-h-80vh">
            <nav className="bg-gradient-to-r from-yellow-300 to-pink-400 shadow-xl text-white p-4">
              <div className="flex justify-between items-center">
                {/* <div className="text-xl font-bold">Logo</div> */}
                <div className="flex   ">
                  <div className=" items-left mt-4 ">
                    <img src="\assets\Logo123.png" className="h-[62px] w-[130px]" alt="sdasd" />
                  </div>
                </div>
                <div className="block lg:hidden">
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
                    <a
                      href="/home"
                      className="block font-bold hover:text-gray-300"
                    >
                      {t('HOME')}
                    </a>
                  </li>
                  <li className="py-2" onClick={toggleProjectsDropdown0}>
                    <a className="block font-bold hover:text-gray-300">
                      {t('OUR WORK')}
                    </a>
                    {projectsDropdown00pen && (
                      <ul className="pl-4">
                        <li>
                          <a
                            href="/ourwork/campaign"
                            className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                          >
                            {t('Campaigns')}
                          </a>
                        </li>
                        <li>
                          <a
                            href="/ourwork/research"
                            className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                          >
                            {t('Research')}
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li className="py-2" onClick={toggleProjectsDropdown1}>
                    <a className="block font-bold hover:text-gray-300">
                      {t('DATA STATISTICS')}
                    </a>
                    {projectsDropdown1Open && (
                      <ul className="pl-4">
                        <li>
                          <a
                            href="/"
                            className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                          >
                            {t('Map')}
                          </a>
                        </li>
                        <li>
                          <a
                            href="/chart"
                            className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                          >
                            {t('Chart')}
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className="py-2" onClick={toggleProjectsDropdown2}>
                    <a className="block font-bold  hover:text-gray-300">
                      {t('DOMESTIC VIOLENCE')}
                    </a>
                    {projectsDropdown2Open && (
                      <ul className="pl-4">
                        <li>
                          <a
                            href="/domesticviolence/report"
                            className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                          >
                            {t('Report')}
                          </a>
                        </li>
                        <li>
                          <a
                            href="/domesticviolence/reporting"
                            className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                          >
                            {t('Reporting')}
                          </a>
                        </li>
                        <li>
                          <a
                            href="/domesticviolence/intervenue"
                            className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                          >
                            {t('Intervene')}
                          </a>
                        </li>
                        <a
                          href="/domesticviolence/map"
                          className="block px-4 py-2  font-oswald   text-black hover:text-black"
                        >
                          {t('Map')}
                        </a>
                        <a
                          href="/domesticviolence/chart"
                          className="block px-4 py-2  font-oswald   text-black hover:text-black"
                        >
                          {t('Chart')}
                        </a>
                      </ul>
                    )}
                  </li>
                  <li className="py-2" onClick={toggleProjectsDropdown3}>
                    <a className="block font-bold hover:text-gray-300">
                      {t('ABOUTUS')}
                    </a>
                    {projectsDropdown3Open && (
                      <ul className="pl-4">
                        <li>
                          <a
                            href="/aboutus/who-we-are"
                            className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                          >
                            {t('Who We are')}
                          </a>
                        </li>
                        <li>
                          <a
                            href="/aboutus/mapeffect"
                            className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                          >
                            {t('Harrasmap Effect')}
                          </a>
                        </li>
                        <li>
                          <a
                            href="/aboutus/mapeffect"
                            className="block px-4 py-2 font-oswald text-[#121111] hover:text-black"
                          >
                            {t('Partners')}
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
