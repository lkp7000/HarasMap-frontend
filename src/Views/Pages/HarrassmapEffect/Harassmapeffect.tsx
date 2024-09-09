import React from "react";
import Header from "../../Component/Layout/Header";
import Footer from "../../Component/Layout/Footer";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export const Harassmapeffect = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div className="mx-4 sm:mx-8 md:mx-20 lg:mx-32 xl:mx-40 mt-4 md:mt-36 lg:mt-32">
        <div className="h-auto md:h-[800px] ">
          <div className="">
            <p className="text-bold font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              {" "}
              {t("THE HARASSMAP EFFECT")}
            </p>{" "}
            <hr className="h-px my-4 sm:my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-[50%]">
              <p className="text-bold text-xl sm:text-2xl text-[#0e7490]">
                {" "}
                {t("HarassMap is working to build a future in which neighbourhoods, schools, universities, cafes and restaurants are all safe spaces that never tolerate sexual harassment and always help people when they are harassed.")}
              </p>
            </div>
            <div className="w-full sm:w-[50%]">
              <div className="pl-0 sm:pl-8 md:pl-16 lg:pl-24">
                <p className="text-black font-sans text-xl sm:text-2xl font-bold">
                  {" "}
                  {t("Step 1")}
                </p>{" "}
                <br />
                <p className="text-black text-sm sm:text-base">
                  {" "}
                  {t(
                    "The first step towards this future is establishing people belief that sexual harassment is a crime that is the fault of the harasser and not the person being harassed, and creating rules for how to act when it happens."
                  )}
                </p>
                <br />
                <p className="text-black font-sans text-xl sm:text-2xl font-bold">
                  {t("Step 2")}
                </p>{" "}
                <br />
                <p className="text-black text-sm sm:text-base">
                  {" "}
                  {t(
                    "The second step involves educating individuals about the repercussions of sexual harassment and building a supportive framework to address and prevent such incidents."
                  )}
                </p>
                <br />
                <p className="text-black font-sans text-xl sm:text-2xl font-bold">
                  {" "}
                  {t("Step 3")}{" "}
                </p>{" "}
                <br />
                <p className="text-black text-sm sm:text-base">
                  {" "}
                  {t(
                    "Creating a community of advocates and resources that provide assistance, guidance, and solidarity to those affected by sexual harassment."
                  )}
                </p>
                <br />
                <p className="text-black font-sans text-xl sm:text-2xl font-bold">
                  {" "}
                  {t("Step 4")}{" "}
                </p>{" "}
                <br />
                <p className="text-black text-sm sm:text-base">
                  {" "}
                  {t(
                    "Implementing policies and measures that foster safe environments and hold perpetrators accountable for their actions."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
