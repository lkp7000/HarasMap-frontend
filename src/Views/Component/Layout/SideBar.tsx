import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [isSurveyVisible, setIsSurveyVisible] = useState(
    localStorage.getItem("IsSurveyVisible")
  );
  const [change, setChange] = useState(true);
  const surveyIDExists = localStorage.getItem("surveyID");

  const links = [
    {
      label: "Profile Info",
      translationKey: "Profile Info",
      path: "/profileInfo",
    },
    {
      label: "Employment",
      translationKey: "Employment",
      path: "/employment",
    },
    {
      label: "Family",
      translationKey: "Family",
      path: "/family",
    },
    {
      label: "Sexual Harrasment Victim",
      translationKey: "Sexual Harassment Victim",
      path: "/sexualHarrasmentVictim",
    },
    {
      label: "Sexual Harassment Harasser",
      translationKey: "Sexual Harassment Harasser",
      path: "/sexualHarrasmentHarraser",
    },
    {
      label: "Health",
      translationKey: "Health",
      path: "/health",
    },
    {
      label: "Political",
      translationKey: "Political",
      path: "/political",
    },
    {
      label: "Domestic Violence",
      translationKey: "Domestic Violence",
      path: "/domesticVoilence",
    },
    {
      label: "Security",
      translationKey: "Security",
      path: "/security",
    },
  ];

  const SideBarHandler = () => {
    setChange(!change);
    let newValue = true;
    if (isSurveyVisible === "true") {
      newValue = false;
    }
    localStorage.setItem("IsSurveyVisible", JSON.stringify(newValue));
  };

  useEffect(() => {
    let a = localStorage.getItem("IsSurveyVisible");
    setIsSurveyVisible(a);
  }, [change]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleSidebar}
        className="block sm:hidden  top-4 right-4"
      >
        {isOpen ? "" : ""}
        <svg
          className="h-8 w-8 text-blue"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="13 17 18 12 13 7" />
          <polyline points="6 17 11 12 6 7" />
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`w-64 h-screen  transition-transform ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full   max-sm:hidden sm:translate-x-0"
        }`}
        aria-label="Sidebar"
      >
        <div
          style={{ height: "620px" }}
          className="bg-gradient-to-r from-yellow-300 to-pink-400 px-3 py-4 dark:bg-gray-800"
        >
          <ul className="space-y-1 font-medium">
            <Link to="/agentdashboard">
              <button
                style={{ width: "230px" }}
                className="font-bold mb-2 text-2xl"
                onClick={(e) => {
                  localStorage.removeItem("surveyID");
                }}
              >
                {t("Agent Dashboard")}
              </button>
            </Link>
            <button
              onClick={() => SideBarHandler()}
              style={{ width: "235px" }}
              className="font-bold text-xl w-[107%]"
            >
              {t("Take Survey")}
              {surveyIDExists ? (
                <svg
                  className="h-6 w-6 text-black ml-8 inline"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              ) : (
                ""
              )}
            </button>
            {surveyIDExists
              ? links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className={`flex items-center p-2 mx-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover-bg-gray-700 group 
                    ${location.pathname === link.path ? "bg-gray-100" : ""}`}
                    >
                      <span className="ml-3 active">
                        {t(link.translationKey)}
                      </span>
                    </Link>
                  </li>
                ))
              : ""}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
