import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import Footer from "../Layout/Footer";
import { t } from "i18next";

const FilterSideBar = ({ filterHandler }: any) => {
  const [data, setData] = useState<any>({});

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


  const HealthData = [
    {
      label: "Have you ever done an HIV test?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "health_takenHIVTest",
    },

    {
      label: "If HIV positive, are you Under any treatment?",
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
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
        { label: "Once", value: "Once" },
        { label: "More than once", value: "More than once" },
      ],
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

  const personalLinks = [
    {
      label: "Your Age?",
      option: [
        { label: "Under 18", value: "Under 18" },
        { label: "18-30", value: "18-30" },
        { label: "30-60", value: "30-60" },
        { label: "Over 60", value: "Over 60" },
      ],
      keyName: "personal_age",
    },
    {
      label: "Marital Status?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
        { label: "Cohabiting", value: "Cohabiting" },
      ],
      keyName: "personal_married",
    },
    {
      label: "Education Level?",
      option: [
        { label: "None", value: "None" },
        { label: "Alphabetized", value: "Alphabetized" },
        { label: "Primary", value: "Primary" },
        { label: "Secondary", value: "Secondary" },
        { label: "University", value: "University" },
      ],
      keyName: "personal_attendedSchool",
    },
    {
      label: "Victim of Rap?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
        { label: "Once", value: "Once" },
        { label: "More than once", value: "More than once" },
      ],
      keyName: "personal_violatedOnce",
    },
    {
      label: "Do you have multiple Partners?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
        { label: "More than two", value: "More than two" },
      ],
      keyName: "personal_multiplePartners",
    },
    {
      label: "Do you have any kids?",
      option: [
        { label: "None", value: "None" },
        { label: "One", value: "One" },
        { label: "Two", value: "Two" },
        { label: "More than two", value: "More than two" },
      ],
      keyName: "personal_haveKids",
    },
    // ... other personal dropdown configurations ...
  ];

  const employmentLinks = [
    {
      label: "Employment Status?",
      option: [
        { label: "Unemployed", value: "Unemployed" },
        { label: "Employee", value: "Employee" },
        { label: "Prostitute", value: "Prostitute" },
      ],
      keyName: "employment_workingNow",
    },
    {
      label: "Are you a street vendor?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
        { label: "Prostitute", value: "Prostitute" },
      ],
      keyName: "employment_streetVendor",
    },
    {
      label: "Your monthly income?",
      // path: "/Employment",
      option: [
        {
          label: "Less than 1000 G per Month",
          value: "Less than 1000 G per Month",
        },
        {
          label: "Less than 10000 G per Month",
          value: "Less than 10000 G per Month",
        },
        {
          label: "Less than 45000 G per Month",
          value: "Less than 45000 G per Month",
        },
        {
          label: "More than 45000 G per Month",
          value: "More than 45000 G per Month",
        },
        {
          label: "More than 100000 G per Month",
          value: "More than 100000 G per Month",
        },
      ],
      keyName: "employment_weeklyEarnings",
    },
    {
      label: "Do you have bank account?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
        { label: "Unibanque", value: "Unibanque" },
        { label: "Sogebanque", value: "Sogebanque" },
        { label: "Capital Bank", value: "Capital Bank" },
        { label: "BNC", value: "BNC" },
        { label: "BUH", value: "BUH" },
        { label: "BPH", value: "BPH" },
      ],
      keyName: "employment_bankAccount",
    },
    {
      label: "Are you aware of your partners earning?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "employment_knowPartnerIncome",
    },
    {
      label: "Receipt of International Transfers?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
        { label: "1 per month", value: "1 per month" },
        { label: "More than 1 per month", value: "More than 1 per month" },
      ],
      keyName: "employement_transfer",
    },
    // ... other employment-related dropdown configurations ...
  ];

  const familyData = [
    {
      label: "Is the Man violent? ",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "family_manviolent",
    },

    {
      label: "How many kids do you have?",
      option: [
        { label: "0", value: "0" },
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "2+", value: "2+" },
      ],
      keyName: "family_numberOfChildren",
    },
    {
      label: "Does your husband work ?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "family_husbandEmployed",
    },
    {
      label: "Are all the kids enrolled in school? ",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
        { label: "Only one", value: "Only one" },
        { label: "Two of them", value: "Two of them" },
        { label: "More than two", value: "More than two" },
        { label: "All of them", value: "All of them" },
      ],
      keyName: "family_childrenInSchool",
    },
  ];

  const DomesticVoilence = [
    {
      label: "Do your husband or partner hit you?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "dv_partnerHits",
    },
    {
      label: "Anyone else in the house hit you?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      keyName: "dv_otherHits",
    },
    {
      label: "Anyone else in the house violate you?",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
        { label: "Father", value: "Father" },
        { label: "Cousin", value: "Cousin" },
      ],
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
    // ... other employment-related dropdown configurations ...
  ];

  const personalHandler = (key: string, value: string) => {
    setData((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const employmentHandler = (key: string, value: string) => {
    setData((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const FamilyChangeHandler = (key: string, value: string) => {
    setData((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const HealthChangeHandler = (key: any, value: any) => {
    setData((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const DomesticChangeHandler = (key: any, value: any) => {
    setData((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const SideBarHandler = () => {
    setCollapseFilter({
      ...collapseFilter,
      personal: !collapseFilter.personal,
    });
  };

  const FamilyHandler = () => {
    setCollapseFilter({
      ...collapseFilter,
      family: !collapseFilter.family,
    });
  };

  const HealthHandler = () => {
    setCollapseFilter({
      ...collapseFilter,
      health: !collapseFilter.health,
    });
  };
  const EmploymentHandler = () => {
    setCollapseFilter({
      ...collapseFilter,
      employee: !collapseFilter.employee,
    });
  };

  const DomesticVoileceHandler = () => {
    setCollapseFilter({
      ...collapseFilter,
      domesticVoilence: !collapseFilter.domesticVoilence,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data1 = {
      requestMap: data,
    };
    filterHandler(data1);
  };

  const resetHandler = () => {
    setData({});
    const defaultPayload = {
      requestMap: {
        ALL: "yes",
      },
    };
    filterHandler(defaultPayload);
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="relative flex flex-col sm:flex-row  sm:space-x-10 border border-gray-500 p-4">
            {/* <div className="flex ">
              <div style={{  }}></div>

              <img className="w-3 h-3 sm:w-4 sm:h-4 md:w-10 md:h-10 lg:w-6 lg:h-6" src="assets\blue-circle.webp.png" alt="" />
              <b className="ml-2 text-xs sm:text-lg">Total no. of Survey</b>
            </div>

            <div className="flex">
              <img className="w-3 h-3 sm:w-4 sm:h-4 md:w-10 md:h-10 lg:w-6 lg:h-6 " src="\assets\green-circle-icon.webp" alt="" />
              <b className="ml-2 text-xs sm:text-lg">Incident with Intervention</b>
            </div> */}
            <div style={{ marginRight: "42rem" }}></div>
            <div className="flex justify-end bg-transparent p-2">
              <button
                type="submit"
                className="px-2 py-2 w-20 sm:w-36 sm:px-4 sm:py:4 bg-green-400 "
              >
                Apply Filters
              </button>
              <div className="mx-4"></div>
              <button
                type="reset"
                onClick={resetHandler}
                className="px-0 py-0 w-20 sm:w-36 sm:px-4 sm:py:4 bg-gray-400"
              >
                Reset
              </button>
              <div className="mx-4"></div>

              <button
                className="printButton px-0 py-0 w-20 sm:w-36 sm:px-4 sm:py:4 bg-red-400 "
                onClick={print}
              >
                Print
              </button>
            </div>
          </div>

          <div className="font-bold bg-gradient-to-r from-yellow-300 to-pink-400 pl-20 overflow-y-auto dark:bg-gray-800">
            {t("personalize the display of your Social Statistics data card.")}
          </div>
          <div className="flex w-full bg-gradient-to-r from-yellow-300 to-pink-400 overflow-y-auto dark:bg-gray-800">
            <div className="flex  sm:flex-row  w-[100%]  font-medium items-center  sm:pl-16 p-3">
              <div onClick={() => SideBarHandler()} className="py-2 sm:w-1/2">
                <p className="rounded-lg bg-gradient-to-r from-pink-100 to-pink-300 sm:p-2 inline text-xs sm:text-lg">
                  Personal:{" "}
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
              <div
                onClick={() => EmploymentHandler()}
                className="py-2 sm:w-1/2 "
              >
                <p className="rounded-lg bg-gradient-to-r from-pink-100 to-pink-300 sm:p-2 text-xs sm:text-lg inline">
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
              <div onClick={() => FamilyHandler()} className=" py-2 sm:w-1/2">
                <p className="rounded-lg bg-gradient-to-r from-pink-100 to-pink-300  sm:p-2 text-xs sm:text-lg inline">
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
              </div>
              <div onClick={() => HealthHandler()} className="py-2 sm:w-1/2">
                <p className="rounded-lg bg-gradient-to-r from-pink-100 to-pink-300  sm:p-2 text-xs sm:text-lg inline">
                  Health:{" "}
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
              <div
                onClick={() => DomesticVoileceHandler()}
                className="py-2 sm:w-1/2"
              >
                <p className="rounded-lg bg-gradient-to-r from-pink-100 to-pink-300  sm:p-2 text-xs sm:text-lg inline">
                  Domestic Voilence:{" "}
                  <svg
                    className="w-4 h-2 text-gray-800 dark:text-white inline sm:font-size-[20%]"
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
          <div className="flex ">
            <div style={{ width: "256px" }} className=" ">
              {collapseFilter.personal && (
                <>
                  {personalLinks.map((link, index) => (
                    <div key={index} className="p-2">
                      <Autocomplete
                        options={link?.option}
                        placeholder={link?.label}
                        id={link.keyName}
                        value={
                          data?.[link.keyName] ? data?.[link.keyName] : null
                        }
                        renderInput={(params) => (
                          <TextField {...params} label={link?.label} />
                        )}
                        onChange={(e: any, selec: any) => {
                          personalHandler(link.keyName, selec?.value);
                        }}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
            <div style={{ width: "256px" }} className=" ">
              {collapseFilter.employee && (
                <>
                  {employmentLinks.map((link, index) => (
                    <div key={index} className="p-2">
                      <Autocomplete
                        options={link?.option}
                        placeholder={link?.label}
                        id={link.keyName}
                        value={
                          data?.[link.keyName] ? data?.[link.keyName] : null
                        }
                        renderInput={(params) => (
                          <TextField {...params} label={link?.label} />
                        )}
                        onChange={(e: any, selec: any) => {
                          employmentHandler(link.keyName, selec?.value);
                        }}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
            <div style={{ width: "256px" }} className=" ">
              {collapseFilter.family && (
                <>
                  {familyData.map((link, index) => (
                    <div key={index} className="p-2">
                      <Autocomplete
                        options={link?.option}
                        placeholder={link?.label}
                        id={link.keyName}
                        value={
                          data?.[link.keyName] ? data?.[link.keyName] : null
                        }
                        renderInput={(params) => (
                          <TextField {...params} label={link?.label} />
                        )}
                        onChange={(e: any, selec: any) => {
                          FamilyChangeHandler(link.keyName, selec?.value);
                        }}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
            <div style={{ width: "256px" }} className=" ">
              {collapseFilter.health && (
                <>
                  {HealthData.map((link, index) => (
                    <div key={index} className="p-2">
                      <Autocomplete
                        options={link?.option}
                        placeholder={link?.label}
                        id={link.keyName}
                        value={
                          data?.[link.keyName] ? data?.[link.keyName] : null
                        }
                        renderInput={(params) => (
                          <TextField {...params} label={link?.label} />
                        )}
                        onChange={(e: any, selec: any) => {
                          HealthChangeHandler(link.keyName, selec?.value);
                        }}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
            <div style={{ width: "256px" }} className=" ">
              {collapseFilter.domesticVoilence && (
                <>
                  {DomesticVoilence.map((link, index) => (
                    <div key={index} className="p-2">
                      <Autocomplete
                        options={link?.option}
                        placeholder={link?.label}
                        id={link.keyName}
                        value={
                          data?.[link.keyName] ? data?.[link.keyName] : null
                        }
                        renderInput={(params) => (
                          <TextField {...params} label={link?.label} />
                        )}
                        onChange={(e: any, selec: any) => {
                          DomesticChangeHandler(link.keyName, selec?.value);
                        }}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default FilterSideBar;
