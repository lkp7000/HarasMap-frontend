import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faLanguage } from "@fortawesome/free-solid-svg-icons";

const LanguageSwitcher = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("selectedLanguage", lng || "fr");
  };

  return (
    <div className="relative z-10 ">
      <button
        onClick={toggleDropdown}
        className="bg-brown text-white px-4 py-2 rounded flex space-y-4"
      >
        <FontAwesomeIcon icon={faLanguage} />
      </button>
      {isDropdownOpen && (
        <div className="absolute mt-2 w-[90px]  bg-white border border-gray-200 rounded-md z-10">
          <button
            onClick={() => {
              changeLanguage("en");
              toggleDropdown();
            }}
            className="flex py-1 text-sm text-gray-700 hover:bg-gray-100"
          >
            <img
              src="\assets\englishFlagIcon.png" // Replace with the actual path to your image
              alt="English"
              className=" h-4 mt-1 mx-2" // Adjust the width and height as needed
            />
            English
          </button>
          <button
            onClick={() => {
              changeLanguage("fr");
              toggleDropdown();
            }}
            className="flex py-1 text-sm text-gray-700 hover:bg-gray-100"
          >
            <img
              src="\assets\frenchImage.png" // Replace with the actual path to your image
              alt="English"
              className="h-4 mt-1 mx-2" // Adjust the width and height as needed
            />
            Français
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
