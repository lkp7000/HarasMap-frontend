import Header from "../../Component/Layout/Header";
import Footer from "../../Component/Layout/Footer";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />

      <div className="container-1 md:mt-16 pt-4">
        <div
          className="content pb-4 tracking-wide
"
        >
          {t(
            "HarassMap is an award-winning volunteer-based initiative founded in late 2010."
          )}{" "}
          <br />
          <br />
          {t(
            "We are working to engage all of Egyptian society to create an environment that does not tolerate sexual harassment."
          )}
          <img src="\assets\image-1.jpg" alt="" />
        </div>
        <div
          className="content-1 tracking-wide
"
        >
          {t("HarassMap is based on the idea that if more people start taking action when sexual harassment happens in their presence, we can end this epidemic together. We support individuals and institutions to stand up to sexual harassment before or when they see it happen. By taking a collective stand against sexual harassment, re-establishing social consequences for harassers and making role models of people who stand up to them we believe that harassers can be deterred from harassing again.")}
          {/* <button>More on how can we stop sexxual harrasment</button> */}
          <br />
          <br />
          <h1>{t("MISSION")} :</h1>
          <div>
            {t(
              "To engage all of Egyptian society to create an environment that does not tolerate sexual harassment."
            )}
          </div>
          <br />
          <h1>{t("VISION")} :</h1>
          <div>
            {t(
              "To build a society that guarantees the safety of all people from sexual and gender based violence."
            )}
          </div>
          {/* <button>OUR STORY</button> */}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
