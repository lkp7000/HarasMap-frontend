import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import { t } from "i18next";
import Footer from "../Layout/Footer";
import { useTranslation } from "react-i18next";
const FilterSideBar = ({ filterHandler, currentView }: any) => {
  const [data, setData] = useState<any>({});
  const { t } = useTranslation();

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
      label: t("Tester pour HIV"),
      option: [
        { label: t("Yes"), value: t("Yes") },
        { label: t("No"), value: t("No") },
      ],
      keyName: "health_takenHIVTest",
    },

    {
      label: t("Attainment of AIDS"),
      option: [
        { label: t("Yes"), value: t("Yes") },
        { label: t("No "), value: t("No ") },
      ],
      keyName: "health_hivPositiveAndMedicated",
    },

    {
      label: t("Avortement"),
      option: [
        { label: t("Yes"), value: t("Yes") },
        { label: t("No"), value: t("No") },
        { label: t("Once"), value: t("Once") },
        { label: t("More than once"), value: t("More than once") },
      ],
      keyName: "health_abortion",
    },

    {
      label: t("MSTs"),
      option: [
        { label: t("Yes"), value: t("Yes") },
        { label: t("No"), value: t("No") },
      ],
      keyName: "health_std",
    },
    {
      label: t("Planning"),
      option: [
        { label: t("Yes"), value: t("Yes") },
        { label: t("No"), value: t("No") },
      ],
      keyName: "health_birthControl",
    },
  ];

  const personalLinks = [
    {
      label: t("Age"),
      option: [
        { label: t("Under 18"), value: t("Under 18") },
        { label: t("18-30"), value: t("18-30") },
        { label: t("30-60"), value: t("30-60") },
        { label: t("Over 60"), value: t("Over 60") },
      ],
      keyName: "personal_age",
    },
    {
      label: t("Marital status"),
      option: [
        { label: t("Yes"), value: t("Yes") },
        { label: t("No"), value: t("No") },
        { label: t("Cohabiting"), value: t("Cohabiting") },
      ],
      keyName: "personal_married",
    },
    {
      label: t("Education level"),
      option: [
        { label: t("None"), value: t("None") },
        { label: t("Alphabetized"), value: t("Alphabetized") },
        { label: t("Primary"), value: t("Primary") },
        { label: t("Secondary"), value: t("Secondary") },
        { label: t("University"), value: t("University") },
      ],
      keyName: "personal_attendedSchool",
    },
    {
      label: t("Victim of rap"),
      option: [
        { label: t("Yes"), value: t("Yes") },
        { label: t("No"), value: t("No") },
        { label: t("Once"), value: t("Once") },
        { label: t("More than once"), value: t("More than once") },
      ],
      keyName: "personal_violatedOnce",
    },
    {
      label: t("Multiple partners"),
      option: [
        { label: t("Yes"), value: t("Yes") },
        { label: t("No"), value: t("No") },
        { label: t("More than two"), value: t("More than two") },
      ],
      keyName: "personal_multiplePartners",
    },
    {
      label: t("Number of children"),
      option: [
        { label: t("None"), value: t("None") },
        { label: t("One"), value: t("One") },
        { label: t("Two"), value: t("Two") },
        { label: t("More than two"), value: t("More than two") },
      ],
      keyName: "personal_haveKids",
    },
  ];

  const employmentLinks = [
    {
      label: t("Employment Status"),
      option: [
        { label: t("Unemployed"), value: t("Unemployed") },
        { label: t("Employed"), value: t("Employed") },
        { label: t("Prostitute"), value: t("Prostitute") },
      ],
      keyName: "employment_workingNow",
    },
    {
      label: t("Street vendor"),
      option: [
        { label: t("Yes"), value: t("Yes") },
        { label: t("No"), value: t("No") },
        { label: t("Prostitute"), value: t("Prostitute") },
      ],
      keyName: "employment_streetVendor",
    },
    {
      label: t("Monthly Revenues"),
      option: [
        {
          label: t("Less than 1000 G per Month"),
          value: t("Less than 1000 G per Month"),
        },
        {
          label: t("Less than 10000 G per Month"),
          value: t("Less than 10000 G per Month"),
        },
        {
          label: t("Less than 45000 G per Month"),
          value: t("Less than 45000 G per Month"),
        },
        {
          label: t("More than 45000 G per Month"),
          value: t("More than 45000 G per Month"),
        },
        {
          label: t("More than 100000 G per Month"),
          value: t("More than 100000 G per Month"),
        },
      ],
      keyName: "employment_weeklyEarnings",
    },
    {
      label: t("Bank account"),
      option: [
        { label: t("Yes"), value: t("Yes") },
        { label: t("No"), value: t("No") },
        { label: t("Unibanque"), value: t("Unibanque") },
        { label: t("Sogebanque"), value: t("Sogebanque") },
        { label: t("Capital Bank"), value: t("Capital Bank") },
        { label: t("BNC"), value: t("BNC") },
        { label: t("BUH"), value: t("BUH") },
        { label: t("BPH"), value: t("BPH") },
      ],
      keyName: "employment_bankAccount",
    },
    {
      label: t(`Aware of the Partner's Gain`),
      option: [
        { label: t("Yes"), value: t("Yes") },
        { label: t("No"), value: t("No") },
      ],
      keyName: "employment_knowPartnerIncome",
    },
    {
      label: t("Receiving International Transfers"),
      option: [
        { label: t("Yes"), value: t("Yes") },
        { label: t("No"), value: t("No") },
        { label: t("1 per month"), value: t("1 per month") },
        {
          label: t("More than 1 per month"),
          value: t("More than 1 per month"),
        },
      ],
      keyName: "employement_transfer",
    },
  ];

  const familyData = [
    {
      label: t("Married to an Abusive Home"),
      option: [
        { label: t("Yes"), value: t("Yes") },
        { label: t("No"), value: t("No") },
      ],
      keyName: "family_manviolent",
    },
    {
      label: t("Number of children"),
      option: [
        { label: t("0"), value: t("0") },
        { label: t("1"), value: t("1") },
        { label: t("2"), value: t("2") },
        { label: t("2+"), value: t("2+") },
      ],
      keyName: "family_numberOfChildren",
    },
    {
      label: t("Spouse's Employment Status"),
      option: [
        { label: t("Yes"), value: t("Yes") },
        { label: t("No"), value: t("No") },
      ],
      keyName: "family_husbandEmployed",
    },
    {
      label: t("Children's Schooling"),
      option: [
        { label: t("Yes"), value: t("Yes") },
        { label: t("No"), value: t("No") },
        { label: t("Only one"), value: t("Only one") },
        { label: t("Two of them"), value: t("Two of them") },
        { label: t("More than two"), value: t("More than two") },
        { label: t("All of them"), value: t("All of them") },
      ],
      keyName: "family_childrenInSchool",
    },
  ];

  const DomesticVoilence = [
    {
      label: t("Abusive husband or partner"),
      option: [
        { label: t("Yes"), value: t("Yes") },
        { label: t("No"), value: t("No") },
      ],
      keyName: "dv_partnerHits",
    },
    {
      label: t("Other Aggressor in the House"),
      option: [
        { label: t("Yes"), value: t("Yes") },
        { label: t("No"), value: t("No") },
      ],
      keyName: "dv_otherHits",
    },
    {
      label: t("Other Rapper in the House"),
      option: [
        { label: t("Yes"), value: t("Yes") },
        { label: t("No"), value: t("No") },
        { label: t("Father"), value: t("Father") },
        { label: t("Cousin"), value: t("Cousin") },
      ],
      keyName: "dv_violate",
    },
    {
      label: t("Reported/Denounced"),
      option: [
        { label: t("Yes"), value: t("Yes") },
        { label: t("No"), value: t("No") },
      ],
      keyName: "dv_filedComplaint",
    },
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
          <div className="relative flex flex-col sm:flex-row items-center pl-2 sm:space-x-10 border border-gray-500 p-">
            {/* Left side buttons */}
            {currentView == "map" && (
              <>
                <div className="flex items-center pt-2">
                  <img
                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-10 md:h-10 lg:w-6 lg:h-6"
                    src="assets\blue-circle.webp.png"
                    alt=""
                  />

                  <b className="ml-2 text-xs sm:text-lg">
                    {t("Total no. of Cases")}
                  </b>
                </div>
                <div className="flex items-center pt-2">
                  <img
                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-10 md:h-10 lg:w-6 lg:h-6 "
                    src="\assets\orange-circle-icon.webp"
                    alt=""
                  />
                  <b className="ml-2 text-xs sm:text-lg">{t("Cases")}</b>
                </div>
              </>
            )}

            {/* Spacer */}
            <div style={{ flex: 1 }}></div>

            {/* Right side buttons */}
            <div className="flex justify-end bg-transparent p-2 space-x-4">
              <button
                type="submit"
                className="px-1 py-1 w-15 sm:w-29 sm:px-4 sm:py:4 bg-green-400"
              >
                {t("Apply Filters")}
              </button>
              <button
                type="reset"
                onClick={resetHandler}
                className="px-0 py-0 w-20 sm:w-[104px] sm:px-4 sm:py:4 bg-gray-400"
              >
                {t("Reset")}
              </button>
              <button
                className="printButton px-0 py-0 w-20 sm:w-[100px] sm:px-4 sm:py:4 bg-red-400"
                onClick={print}
              >
                {t("Print")}
              </button>
            </div>
          </div>

          <div className="font-bold bg-gradient-to-r from-yellow-300 pl-20 to-pink-400 overflow-y-auto dark:bg-gray-800">
            {t("Personalize the display of your Social Statistics data card.")}
          </div>
          <div className="flex w-full bg-gradient-to-r from-yellow-300 to-pink-400 overflow-y-auto dark:bg-gray-800">
            <div className="flex   py-3 w-full justify-between mx-10  font-medium ">
              <div onClick={() => SideBarHandler()} className="py-2 ">
                <p className="rounded-lg bg-gradient-to-r px-[2rem] py-2 from-pink-100 to-pink-300  inline text-xs sm:text-lg">
                  {t("Personal")}
                  <svg
                    className="w-4 h-2 text-gray-800 dark:text-white inline ml-3 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 10"
                  >
                    <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
                  </svg>
                </p>
              </div>
              <div onClick={() => EmploymentHandler()} className="py-2  ">
                <p className="rounded-lg bg-gradient-to-r from-pink-100 to-pink-300 px-[2rem] py-2 text-xs sm:text-lg inline">
                  {t("Employment")}
                  <svg
                    className="w-4 h-2 ml-3 text-gray-800 dark:text-white inline"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 10"
                  >
                    <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
                  </svg>
                </p>
              </div>
              <div onClick={() => FamilyHandler()} className=" py-2 ">
                <p className="rounded-lg bg-gradient-to-r from-pink-100 to-pink-300  px-[2rem] py-2 text-xs sm:text-lg inline">
                  {t("Family")}
                  <svg
                    className="w-4 h-2 ml-3 text-gray-800 dark:text-white inline"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 10"
                  >
                    <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
                  </svg>
                </p>
              </div>
              <div onClick={() => HealthHandler()} className="py-2 ">
                <p className="rounded-lg bg-gradient-to-r from-pink-100 to-pink-300  px-[2rem] py-2 text-xs sm:text-lg inline">
                  {t("Health")}
                  <svg
                    className="w-4 h-2 ml-3 text-gray-800 dark:text-white inline"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 10"
                  >
                    <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
                  </svg>
                </p>
              </div>
              <div onClick={() => DomesticVoileceHandler()} className="py-2 ">
                <p className="rounded-lg bg-gradient-to-r from-pink-100 to-pink-300  px-[2rem] py-2 text-xs sm:text-lg inline">
                  {t("Domestic Violence")}
                  <svg
                    className="w-4 h-2 ml-3 text-gray-800 dark:text-white inline sm:font-size-[20%]"
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
          <div className="flex justify-between mx-7">
            <div style={{}} className="w-[200px]">
              {collapseFilter.personal && (
                <>
                  {personalLinks.map((link, index) => (
                    <div key={index} className="p-2 ">
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
                          personalHandler(link.keyName, selec?.label);
                        }}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
            <div style={{}} className="w-[300px] ">
              {collapseFilter.employee && (
                <>
                  {employmentLinks.map((link, index) => (
                    <div key={index} className="p-2 ">
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
            <div style={{}} className=" w-[280px]">
              {collapseFilter.family && (
                <>
                  {familyData.map((link, index) => (
                    <div key={index} className="p-2 ">
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
            <div style={{}} className=" w-[250px]">
              {collapseFilter.health && (
                <>
                  {HealthData.map((link, index) => (
                    <div key={index} className="p-2 ">
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
            <div style={{}} className="w-[280px] ">
              {collapseFilter.domesticVoilence && (
                <>
                  {DomesticVoilence.map((link, index) => (
                    <div key={index} className="p-2 ">
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
