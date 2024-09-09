import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  const { t } = useTranslation();
  const links = [
    {
      label: "Add Agent",
      translationKey: "Add Agent",
      path: "/AddAgent",
    },
    {
      label: "Agent View",
      translationKey: "Agent View",
      path: "/AgentView",
    },
    {
      label: "Add News",
      translationKey: "Add News",
      path: "/Addnews",
    },
    {
      label: "Help Center",
      translationKey: "Help Center",
      path: "/helpcenter",
    },
    {
      label: "List Survey",
      translationKey: "List Survey",
      path: "/listsurvey",
    },
  ];

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
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          {" "}
          <polyline points="13 17 18 12 13 7" />{" "}
          <polyline points="6 17 11 12 6 7" />
        </svg>{" "}
      </button>

      <aside
        id="default-sidebar"
        className={`w-60 h-screen  transition-transform ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full   max-sm:hidden sm:translate-x-0"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full bg-gradient-to-r from-yellow-300 to-pink-400 px-3 py-4 overflow-y-auto dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover-bg-gray-700 group"
                >
                  <span className="ml-3 active">{t(link.translationKey)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default AdminSideBar;
