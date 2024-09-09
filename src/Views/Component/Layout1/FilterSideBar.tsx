import { Autocomplete, TextField } from "@mui/material";
import { t } from "i18next";
import React, { useEffect, useState } from "react";

const FilterSideBar = ({ filterHandler }: any) => {
  const [isSurveyVisisble, setIsSurveyVisible] = useState(
    localStorage.getItem("IsSurveyVisible")
  );

  const [collapseFilter, setCollapseFilter] = useState<{
    personal: boolean;
    employee: boolean;
    family: boolean;
    harresmentVictim: boolean;
    harresmentHarasser: boolean;
    health: boolean;
    votedBefore: boolean;
    domesticVoilence: boolean;
    security: boolean;
  }>({
    personal: false,
    employee: false,
    family: false,
    harresmentVictim: false,
    harresmentHarasser: false,
    health: false,
    votedBefore: false,
    domesticVoilence: false,
    security: false,
  });
  const [isEmploymentVisible, setEmploymentVisible] = useState(
    localStorage.getItem("IsEmployment")
  );
  const [change, setChange] = useState(true);
  const [empchange, setEmpchange] = useState(true);
  const [age, setAge] = useState<number | "">("");
  const [fromAge, setFromAge] = useState<number | "">("");
  const [toAge, setToAge] = useState<number | "">("");
  const [password, setPassword] = useState("");
  const [isIncorrectAge, setIsIncorrectAge] = useState(false);
  const [filterPayload, setFilterPayload] = useState<any>();

  const links = [
    {
      label: "Age?",
      // path: "/Employment",
      option: [
        { label: "Under 18", value: "Under 18" },
        { label: "18-30", value: "18-30" },
        { label: "30-60", value: "30-60" },
        { label: "Over 60", value: "Over 60" },
      ],
      // option: [
      //   { label: "yes", value: "yes" },
      //   { label: "No", value: "No" },
      // ],
      keyName: "personal_age",
    },

    {
      label: "Married?",
      // path: "/Health",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "married",
    },
    {
      label: "Have you attended any school?",
      // path: "/Health",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "personal_attendedSchool",
    },

    {
      label: "Have you been violated once?",
      // path: "/DomesticVoilence",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "personal_violatedOnce",
    },

    {
      label: "Do you have multiple partners?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "personal_multiplePartners",
    },
    {
      label: "Do you have any kids?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "personal_haveKids",
    },
  ];

  const links1 = [
    {
      label: "Are you actually working?",
      // path: "/Employment",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "employment_workingNow",
    },

    {
      label: "Are you a street vendor?",
      // path: "/Health",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "employment_streetVendor",
    },

    {
      label: "How much do you earn (per week)?",
      // path: "/DomesticVoilence",
      option: [
        { label: "Below $100? / $100-$500? ", value: "Yes" },
        { label: "$500-$1,000?", value: "No" },
        { label: "Above $1,000?", value: "No" },
      ],
      keyName: "employment_weeklyEarnings",
    },

    {
      label: "Do you have a bank account?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "employment_bankAccount",
    },
    {
      label: "Know about Partner's income?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "employment_knowPartnerIncome",
    },
  ];
  const familyData = [
    {
      label: "Married?",
      // path: "/Employment",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "family_married",
    },

    {
      label: "Is the Man violent? ",
      // path: "/Health",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "family_manviolent",
    },

    {
      label: "How many kids do you have?",
      // path: "/DomesticVoilence",
      option: [
        { label: "0", value: "Yes" },
        { label: "1-2", value: "No" },
        { label: "3-4", value: "No" },
        { label: "5+", value: "No" },
      ],
      keyName: "family_numberOfChildren",
    },

    {
      label: "No. of people live in the same house?",
      option: [
        { label: "1-2", value: "Yes" },
        { label: "3-5", value: "No" },
        { label: "6-8", value: "No" },
        { label: "9+", value: "No" },
      ],
      keyName: "family_householdSize",
    },
    {
      label: "Does your husband work?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "family_husbandEmployed",
    },
    {
      label: "Are all the kids enrolled in schools? ",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "family_childrenInSchool",
    },
  ];

  const harresmentVictimData = [
    {
      label: "Harassed before? ",
      // path: "/Employment",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "harasser_harassedBefore",
    },

    {
      label: "Harasser's relation? ",
      // path: "/Health",
      option: [
        { label: "Friend", value: "Yes" },
        { label: "Family ", value: "No" },
        { label: "Colleague", value: "No" },
        { label: "Stranger", value: "No" },
      ],
      keyName: "",
    },

    {
      label: "Job loss due to harassment? ",
      // path: "/DomesticVoilence",
      option: [{ label: "Yes", value: "Yes" }, { label: "No" }],
      keyName: "",
    },

    {
      label: "Seeking resolution for harassment? ",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "",
    },
    {
      label: "Know partner's income? ",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "",
    },
  ];

  const harresmentHarraserData = [
    {
      label: "Harassed a woman before?",
      // path: "/Employment",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "",
    },

    {
      label: "Employed?",
      // path: "/Health",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No ", value: "No" },
      ],
      keyName: "",
    },

    {
      label: "Hit a woman regularly?",
      // path: "/DomesticVoilence",
      option: [{ label: "Yes", value: "Yes" }, { label: "No" }],
      keyName: "",
    },

    {
      label: "Undergone HIV test?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "",
    },
    {
      label: "HIV positive and on medication? ",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "",
    },
  ];
  const HealthData = [
    {
      label: "Have  ever done an HIV test?",
      // path: "/Employment",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "health_takenHIVTest",
    },

    {
      label: "Are you HIV positive? under any treatment?",
      // path: "/Health",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No ", value: "No" },
      ],
      keyName: "health_hivPositiveAndMedicated",
    },

    {
      label: "Have you ever had an abortion?",
      // path: "/DomesticVoilence",
      option: [{ label: "Yes", value: "Yes" }, { label: "No" }],
      keyName: "health_abortion",
    },

    {
      label: "Contracted any STDs?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "health_std",
    },
    {
      label: "On birth control?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "health_birthControl",
    },
  ];

  const VotedBefore = [
    {
      label: "Have you ever vote in you life?",
      // path: "/Employment",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "political_voted",
    },

    {
      label: "Support any current political leaders? ",
      // path: "/Health",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No ", value: "No" },
      ],
      keyName: "political_supportLeader",
    },

    {
      label: "Do you talk politics with your husband or partner?",
      // path: "/DomesticVoilence",
      option: [{ label: "Yes", value: "Yes" }, { label: "No" }],
      keyName: "political_discussPolitics",
    },

    {
      label: "Do you have a college degree?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "political_collegeDegree",
    },
  ];
  const DomesticVoilence = [
    {
      label: "Do your husband or partner hit you? ",
      // path: "/Employment",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "dv_partnerHits",
    },

    {
      label: "Anyone else in the house hit you?",
      // path: "/Health",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No ", value: "No" },
      ],
      keyName: "dv_otherHits",
    },

    {
      label: "Anyone else in the house violate you?",
      // path: "/DomesticVoilence",
      option: [{ label: "Yes", value: "Yes" }, { label: "No" }],
      keyName: "dv_violate",
    },

    {
      label: "Have you ever filled a formal complaint?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "dv_filedComplaint",
    },
  ];

  const SideBarHandler = () => {
    setCollapseFilter({
      ...collapseFilter,
      personal: !collapseFilter.personal,
    });
  };

  const EmploymentHandler = () => {
    // setEmpchange(!empchange)
    // let newValue = true;
    // if (isEmploymentVisible == "true") {
    //   newValue = false
    // }
    // localStorage.setItem("IsEmployment", JSON.stringify(newValue))\
    setCollapseFilter({
      ...collapseFilter,
      employee: !collapseFilter.employee,
    });
  };

  const FamilyHandler = () => {
    // setEmpchange(!empchange)
    // let newValue = true;
    // if (isEmploymentVisible == "true") {
    //   newValue = false
    // }
    // localStorage.setItem("IsEmployment", JSON.stringify(newValue))\
    setCollapseFilter({
      ...collapseFilter,
      family: !collapseFilter.family,
    });
  };

  const HarresmentVictimHandler = () => {
    setCollapseFilter({
      ...collapseFilter,
      harresmentVictim: !collapseFilter.harresmentVictim,
    });
  };

  const HarresmentHarrasserHandler = () => {
    // setEmpchange(!empchange)
    // let newValue = true;
    // if (isEmploymentVisible == "true") {
    //   newValue = false
    // }
    // localStorage.setItem("IsEmployment", JSON.stringify(newValue))\
    setCollapseFilter({
      ...collapseFilter,
      harresmentHarasser: !collapseFilter.harresmentHarasser,
    });
  };

  const HealthHandler = () => {
    // setEmpchange(!empchange)
    // let newValue = true;
    // if (isEmploymentVisible == "true") {
    //   newValue = false
    // }
    // localStorage.setItem("IsEmployment", JSON.stringify(newValue))\
    setCollapseFilter({
      ...collapseFilter,
      health: !collapseFilter.health,
    });
  };
  const VotedBeforeHandler = () => {
    // setEmpchange(!empchange)
    // let newValue = true;
    // if (isEmploymentVisible == "true") {
    //   newValue = false
    // }
    // localStorage.setItem("IsEmployment", JSON.stringify(newValue))\
    setCollapseFilter({
      ...collapseFilter,
      votedBefore: !collapseFilter.votedBefore,
    });
  };

  const DomesticVoilenceHandler = () => {
    // setEmpchange(!empchange)
    // let newValue = true;
    // if (isEmploymentVisible == "true") {
    //   newValue = false
    // }
    // localStorage.setItem("IsEmployment", JSON.stringify(newValue))\
    setCollapseFilter({
      ...collapseFilter,
      domesticVoilence: !collapseFilter.domesticVoilence,
    });
  };

  useEffect(() => {
    let a = localStorage.getItem("IsSurveyVisible");
    setIsSurveyVisible(a);

    let b = localStorage.getItem("IsEmployment");
    setEmploymentVisible(b);
  }, [change]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  // const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const inputAge = e.target.value;

  //   if (inputAge === '' || (inputAge.length <= 2 && /^\d+$/.test(inputAge))) {

  //     setAge(inputAge === '' ? '' : parseInt(inputAge, 10));
  //   }

  // };
  // const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let inputAge = e.target.value;

  //   inputAge = inputAge.replace(/\D/g, '');

  //   const sanitizedInput = inputAge.slice(0, 2);

  //   setAge(sanitizedInput === '' ? '' : parseInt(sanitizedInput, 10));
  // };

  const handleFromAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAge = e.target.value;
    const sanitizedInput = inputAge.replace(/\D/g, "").slice(0, 2);
    setFromAge(sanitizedInput === "" ? "" : parseInt(sanitizedInput, 10));
  };

  // ...

  const handleToAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAge = e.target.value;
    const sanitizedInput = inputAge.replace(/\D/g, "").slice(0, 2);
    const toAgeValue =
      sanitizedInput === "" ? "" : parseInt(sanitizedInput, 10);

    // Check if toAgeValue is greater than fromAge
    if (
      fromAge !== "" &&
      toAgeValue !== "" &&
      !isNaN(fromAge) &&
      !isNaN(toAgeValue) &&
      toAgeValue >= fromAge
    ) {
      setToAge(toAgeValue);
      setIsIncorrectAge(false);
    } else {
      setIsIncorrectAge(true); // Set error flag if not greater
    }
  };
  const personalHandler = (e: any, select: any) => {
    const key = e.target.id;
    const [keych] = key.split("-");
    const value = select?.value;
    const payload = {
      requestMap: {
        [keych]: value,
      },
    };
    setFilterPayload(payload);
    filterHandler(payload);
  };

  const employeeHandler = (e: any, select: any) => {
    const key = e.target.id;
    const [keych] = key.split("-");
    const value = select?.value;
    const payload = {
      // ...filterPayload,
      requestMap: {
        [keych]: value,
      },
    };
    setFilterPayload(payload);
    filterHandler(payload);
  };

  const FamilyChangeHandler = (e: any, select: any) => {
    const key = e.target.id;
    const [keych] = key.split("-");
    const value = select?.value;
    const payload = {
      // ...filterPayload,
      requestMap: {
        [keych]: value,
      },
    };
    setFilterPayload(payload);
    filterHandler(payload);
  };

  const harrasVictimHandler = (e: any, select: any) => {
    const key = e.target.id;
    const [keych] = key.split("-");
    const value = select?.value;
    const payload = {
      // ...filterPayload,
      requestMap: {
        [keych]: value,
      },
    };
    setFilterPayload(payload);
    filterHandler(payload);
  };

  const harresmentHarasserHandler = (e: any) => {
    setFilterPayload({
      ...filterPayload,

      [e.target.name]: e.target.value,
    });
    filterHandler(filterPayload);
  };

  const HealthChangeHandler = (e: any, select: any) => {
    const key = e.target.id;
    const [keych] = key.split("-");
    const value = select?.value;
    const payload = {
      // ...filterPayload,
      requestMap: {
        [keych]: value,
      },
    };
    setFilterPayload(payload);
    filterHandler(payload);
  };

  const VotedBeforChangeHandler = (e: any, select: any) => {
    const key = e.target.id;
    const [keych] = key.split("-");
    const value = select?.value;
    const payload = {
      // ...filterPayload,
      requestMap: {
        [keych]: value,
      },
    };
    setFilterPayload(payload);
    filterHandler(payload);
  };

  const DomesticVoilenceChangeHandler = (e: any, select: any) => {
    const key = e.target.id;
    const [keych] = key.split("-");
    const value = select?.value;
    const payload = {
      // ...filterPayload,
      requestMap: {
        [keych]: value,
      },
    };
    setFilterPayload(payload);
    filterHandler(payload);
  };
  return (
    <>
      <div>
        <div className="flex  w-full bg-gradient-to-r from-yellow-300 to-pink-400 px-2 py-2 overflow-y-auto dark:bg-gray-800">
          <div className="flex flex-row inline gap-36 mx-10  w-[100%] space-y-2  font-medium items-center">
            <div onClick={() => SideBarHandler()} className=" py-4 ">
              <p className="rounded-lg bg-gradient-to-r from-pink-100 to-pink-300 p-2 inline">
                Personal{" "}
                <svg
                  className="w-4 h-2 text-gray-800 dark:text-white inline"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 10"
                >
                  <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
                </svg>
              </p>
            </div>
            <div onClick={() => EmploymentHandler()} className=" py-4  ">
              <p className="rounded-lg bg-gradient-to-r from-pink-100 to-pink-300 p-2 inline">
                Employment:{" "}
                <svg
                  className="w-4 h-2 text-gray-800 dark:text-white inline"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 10"
                >
                  <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
                </svg>
              </p>
            </div>
            {/* <div onClick={() => FamilyHandler()} className="py-4 ">
            <p className="rounded-lg bg-gradient-to-r from-pink-100 to-pink-300 p-2 inline">
              Family:{" "}
              <svg
                className="w-4 h-2 text-gray-800 dark:text-white inline"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 10"
              >
                <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
              </svg>
            </p>
          </div> */}
            {/* <div onClick={() => HarresmentVictimHandler()} className=" py-4 w-[200px]">
            <button className="rounded-lg bg-gradient-to-r from-pink-100 to-pink-300 p-2 inline ">
              Harassment  Victim:
              <svg
                className="w-4 h-2 text-gray-800 dark:text-white inline"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 10"
              >
                <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
              </svg>
            </button>
          </div> */}

            {/* <div       onClick={() => HarresmentHarrasserHandler()}
             className=" py-4 ">
            <button className="rounded-lg bg-gradient-to-r from-pink-100 to-pink-300 p-2 inline ">
              Harassment Harasser:
              <svg
                className="w-4 h-2 text-gray-800 dark:text-white inline"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 10"
              >
                <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
              </svg>
            </button>
          </div> */}
            {/* <div      onClick={() => HealthHandler()}
             className=" py-4 ">
            <button className="rounded-lg bg-gradient-to-r from-pink-100 to-pink-300 p-2 inline ">
          Health
              <svg
                className="w-4 h-2 text-gray-800 dark:text-white inline"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 10"
              >
                <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
              </svg>
            </button>
          </div> */}
            {/* <div onClick={() => VotedBeforeHandler()} className="py-4 w-[200px] ">
            <p className="rounded-lg bg-gradient-to-r from-pink-100 to-pink-300 p-2 inline">
              Voted Before
              <svg
                className="w-4 h-2 text-gray-800 dark:text-white inline"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 10"
              >
                <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
              </svg>
            </p>
          </div> */}
            <div onClick={() => DomesticVoilenceHandler()} className=" py-4  ">
              <p className="rounded-lg bg-gradient-to-r from-pink-100 to-pink-300 p-2 ">
                {t("Domestic Violence")}
                <svg
                  className="w-4 h-2 text-gray-800 dark:text-white inline"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 10"
                >
                  <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
                </svg>
              </p>
            </div>
          </div>
        </div>

        <div className="flex bg-gradient-to-r from-yellow-200 to-pink-500 ">
          <div style={{ width: "300px" }} className=" ">
            {collapseFilter.personal && (
              <>
                {links.map((link, index) => (
                  <div key={index} className="p-2">
                    <Autocomplete
                      options={link?.option}
                      placeholder={link?.label}
                      renderInput={(params) => (
                        <TextField {...params} label={link?.label} />
                      )}
                      id={link.keyName}
                      onChange={(e: any, selec: any) => {
                        personalHandler(e, selec);
                      }}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
          <div style={{ width: "300px" }}>
            {collapseFilter.employee && (
              <>
                {links1.map((link, index) => (
                  <div key={index} className="p-2">
                    <Autocomplete
                      options={link?.option}
                      placeholder={link?.label}
                      id={link.keyName}
                      renderInput={(params) => (
                        <TextField {...params} label={link?.label} />
                      )}
                      onChange={(e: any, selec: any) => {
                        employeeHandler(e, selec);
                      }}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
          {/* <div style={{ width: "320px" }}>
          {collapseFilter?.family && (
            <>
              {familyData.map((link, index) => (
                <div key={index} className="p-2">
                  {link.label === "Age" ? (
                    <div className="flex items-left">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          From Age
                        </label>
                        <input
                          type="number"
                          defaultValue={fromAge !== "" ? fromAge : ""}
                          onChange={handleFromAgeChange}
                          placeholder="Enter age"
                          className="border rounded-md w-[60%] focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          To Age
                        </label>
                        <input
                          type="number"
                          defaultValue={toAge !== "" ? toAge : ""}
                          onChange={handleToAgeChange}
                          placeholder="Enter age"
                          className="border rounded-md w-[60%] focus:outline-none focus:border-blue-500"
                        />
                        {isIncorrectAge && (
                          <div className="error-message">
                            Incorrect age. Please try again.
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Autocomplete
                      options={link?.option}
                      placeholder={link?.label}
                      id={link.keyName}
                      renderInput={(params) => (
                        <TextField {...params} label={link?.label} />
                      )}
                      onChange={(e: any, selec: any) => {
                        FamilyChangeHandler(e, selec);
                      }}
                    />
                  )}
                </div>
              ))}
            </>
          )}
        </div> */}
          {/* <div style={{ width: "350px" }}>
          {collapseFilter?.harresmentVictim && (
            <>
              {harresmentVictimData.map((link, index) => (
                <div key={index} className="p-2">
                  {link.label === "Age" ? (
                    <div className="flex items-left">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          From Age
                        </label>
                        <input
                          type="number"
                          defaultValue={fromAge !== "" ? fromAge : ""}
                          onChange={handleFromAgeChange}
                          placeholder="Enter age"
                          className="border rounded-md w-[60%] focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          To Age
                        </label>
                        <input
                          type="number"
                          defaultValue={toAge !== "" ? toAge : ""}
                          onChange={handleToAgeChange}
                          placeholder="Enter age"
                          className="border rounded-md w-[60%] focus:outline-none focus:border-blue-500"
                        />
                        {isIncorrectAge && (
                          <div className="error-message">
                            Incorrect age. Please try again.
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Autocomplete
                      options={link?.option}
                      placeholder={link?.label}
                      id={link.keyName}
                      renderInput={(params) => (
                        <TextField {...params} label={link?.label} />
                      )}
                      onChange={(e: any, selec: any) => {
                        harrasVictimHandler(e, selec);
                      }}
                    />
                  )}
                </div>
              ))}
            </>
          )}
        </div> */}
          {/* <div style={{ width: "full" }}>
          {collapseFilter?.harresmentHarasser && (
            <>
              {harresmentHarraserData.map((link, index) => (
                <div key={index} className="p-2">
                  {link.label === "Age" ? (
                    <div className="flex items-left">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          From Age
                        </label>
                        <input
                          type="number"
                          defaultValue={fromAge !== "" ? fromAge : ""}
                          onChange={handleFromAgeChange}
                          placeholder="Enter age"
                          className="border rounded-md w-[60%] focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          To Age
                        </label>
                        <input
                          type="number"
                          defaultValue={toAge !== "" ? toAge : ""}
                          onChange={handleToAgeChange}
                          placeholder="Enter age"
                          className="border rounded-md w-[60%] focus:outline-none focus:border-blue-500"
                        />
                        {isIncorrectAge && (
                          <div className="error-message">
                            Incorrect age. Please try again.
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <AutoCompleteDropDown
                      option={link?.option}
                      placeholder={link?.label}
                      onChange={harresmentHarasserHandler}
                    />
                  )}
                </div>
              ))}
            </>
          )}
        </div> */}
          {/* <div style={{ width: "350px" }}>
          {collapseFilter?.health && (
            <>
              {HealthData.map((link, index) => (
                <div key={index} className="p-2">
                  {link.label === "Age" ? (
              
                    <div className="flex items-left">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          From Age
                        </label>
                        <input
                          type="number"
                          defaultValue={fromAge !== "" ? fromAge : ""}
                          onChange={handleFromAgeChange}
                          placeholder="Enter age"
                          className="border rounded-md w-[60%] focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          To Age
                        </label>
                        <input
                          type="number"
                          defaultValue={toAge !== "" ? toAge : ""}
                          onChange={handleToAgeChange}
                          placeholder="Enter age"
                          className="border rounded-md w-[60%] focus:outline-none focus:border-blue-500"
                        />
                        {isIncorrectAge && (
                          <div className="error-message">
                            Incorrect age. Please try again.
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Autocomplete
                      options={link?.option}
                      id={link.keyName}
                      renderInput={(params) => (
                        <TextField {...params} label={link?.label} />
                      )}
                      onChange={(e: any, selec: any) => {
                        HealthChangeHandler(e, selec);
                      }}
                      placeholder={link?.label}
                    />
                  )}
                </div>
              ))}
            </>
          )}
        </div> */}
          {/* <div style={{ width: "300px" }}>
          {collapseFilter?.votedBefore && (
            <>
              {VotedBefore.map((link, index) => (
                <div key={index} className="p-2">
                  {link.label === "Age" ? (
                    <div className="flex items-left">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          From Age
                        </label>
                        <input
                          type="number"
                          defaultValue={fromAge !== "" ? fromAge : ""}
                          onChange={handleFromAgeChange}
                          placeholder="Enter age"
                          className="border rounded-md w-[60%] focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          To Age
                        </label>
                        <input
                          type="number"
                          defaultValue={toAge !== "" ? toAge : ""}
                          onChange={handleToAgeChange}
                          placeholder="Enter age"
                          className="border rounded-md w-[60%] focus:outline-none focus:border-blue-500"
                        />
                        {isIncorrectAge && (
                          <div className="error-message">
                            Incorrect age. Please try again.
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Autocomplete
                      options={link?.option}
                      id={link.keyName}
                      renderInput={(params) => (
                        <TextField {...params} label={link?.label} />
                      )}
                      onChange={(e: any, selec: any) => {
                        VotedBeforChangeHandler(e, selec);
                      }}
                      placeholder={link?.label}
                    />
                  )}
                </div>
              ))}
            </>
          )}
        </div> */}
          <div style={{ width: "350px" }}>
            {collapseFilter?.domesticVoilence && (
              <>
                {DomesticVoilence.map((link, index) => (
                  <div key={index} className="p-2">
                    {link.label === "Age" ? (
                      <div className="flex items-left">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            From Age
                          </label>
                          <input
                            type="number"
                            defaultValue={fromAge !== "" ? fromAge : ""}
                            onChange={handleFromAgeChange}
                            placeholder="Enter age"
                            className="border rounded-md w-[60%] focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            To Age
                          </label>
                          <input
                            type="number"
                            defaultValue={toAge !== "" ? toAge : ""}
                            onChange={handleToAgeChange}
                            placeholder="Enter age"
                            className="border rounded-md w-[60%] focus:outline-none focus:border-blue-500"
                          />
                          {isIncorrectAge && (
                            <div className="error-message">
                              Incorrect age. Please try again.
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <Autocomplete
                        options={link?.option}
                        id={link.keyName}
                        renderInput={(params) => (
                          <TextField {...params} label={link?.label} />
                        )}
                        onChange={(e: any, selec: any) => {
                          DomesticVoilenceChangeHandler(e, selec);
                        }}
                        placeholder={link?.label}
                      />
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSideBar;
