import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleEmailChange = (e: any) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsValidEmail(validateEmail(inputEmail));
  };

  const validateEmail = (email: any) => {
    // Regular expression for validating email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = () => {
    if (isValidEmail) {
      localStorage.setItem("email", email);
      navigate("/contact");
    } else {
      toast("Please enter a valid email address.");
    }
  };
  const navigateToPage = () => {
    if (location.pathname === "/") {
      window.scrollTo(0, 0); // Scroll to top if already on the same page
    } else {
      navigate("/"); // Navigate to the target page
    }
  };

  return (
    <>
      <footer className="py-6 md:py-12 lg:py-6 bg-gradient-to-t from-transparent to-[#454545] bg-black">
        <div className="lg:md:grid lg:md:grid-cols-10 mx-24 gap-3 text-white">
          <div className="space-y-4 lg:md:col-span-4">
            <h3>{t("ABOUT US")}</h3>
            <p>
              {t(
                "HarassMap is based on the idea that if more people start takingv action when sexual harassment happens in their presence, we can end this epidemic."
              )}
            </p>
            <Link to={"/aboutus/who-we-are"} className="underline">
              {" "}
              {t("Read More")}
            </Link>
          </div>
          <div className="lg:md:col-span-4 space-y-4 my-8 lg:md:my-0">
            <h3> {t("STAY CONNECTED")}</h3>
            <h3>{t("Subscribe to our mailing list:")}</h3>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-[95%] text-black ${
                isValidEmail ? "" : "border-red-500"
              }`}
              placeholder={t("Your Email")}
            />
            <br />
            <button
              className=" w-2/5 border border-[#f6aa5a] py-1.5 bg-white text-[#f6aa5a]"
              onClick={handleSubmit}
            >
              {t("SUBSCRIBE")}
              <ToastContainer />
            </button>
          </div>
          <div className="lg:md:col-span-2 my-auto">
            <div className="">
              <img
                src="\assets\Logo123.png"
                onClick={navigateToPage}
                className="w-3/6 lg:md:w-full cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="border-b mt-10 border-[#f6aa5a] "></div>
        <div className="flex flex-col lg:md:flex-row lg:md:justify-between items-center mx-24 text-[#9b9b9b] mt-7 ">
          <div>
            <ul className="flex gap-6 ">
              <li className="hover:text-[white]">
                <Link to={"/contact"}>{t("Contact Us")}</Link>
              </li>
              <li className="hover:text-[white]">
                <Link to={"/inquires"}>{t("Inquires")}</Link>
              </li>
              <li className="hover:text-[white]">
                <Link to={"/report"}>{t('Report sexual harassment')}</Link>
              </li>
              <li className="hover:text-[white]">
                <Link to={"/terms"}>{t("Terms of use")}</Link>
              </li>
            </ul>
          </div>
          <div className="flex gap-4 mt-16 lg:md:mt-1">
            <img
              src="/images/fb.png"
              alt="facebook"
              className="filter invert text-white/80 h-6 md:h-7 w-auto"
            />
            <img
              src="/images/twit.png"
              alt="twitter"
              className="filter invert text-white/80 h-6 md:h-7 w-auto"
            />
            <img
              src="/images/insta.png"
              alt="instagram"
              className="filter invert text-white/80 h-6 md:h-7 w-auto"
            />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
