import { t } from "i18next";

function Footer() {
  return (
    <>
    {/* <footer className="py-6 md:py-12 lg:py-6 bg-gradient-to-b from-[#91cedb] via-[#eaedee] to-[#EDFBF9] border border-black dark:border-t-2"> */}
    <footer className="py-6 md:py-12 lg:py-6 bg-black/70 border border-black dark:border-t-2">
  <div className="flex flex-col md:flex-row md:justify-evenly items-center">
    <div className="text-center md:text-left">
    <img src="\assets\Logo123.png" className="h-[62px] w-[130px]" alt="sdasd" />
     
    
    </div>

    <div className="text-center md:text-left pt-3 md:pt-0 items-start ">
      <div className="w-3/4 md:pl-36">
        <div className="text-xl md:text-4x1 text-white font-oswald font-semibold dark:text-white whitespace-nowrap">
          <b>STAY CONNECTED</b>
        </div>
        <p className="mt-3 font-oswald text-white"> Sign up for regular updates </p>
        <div className="mt-4 flex md:flex-row sm:flex-row items-center text-white">
          <input
            type="email"
            placeholder={t('Write your email here')}
            className="px-3 py-2 mt-2 md:mt-0 md:mr-3 border border-blue-500 text-white dark:text-white"
          />
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-oswald font-semibold hover:text-white py-3 px-4 border border-blue-500 hover:border-transparent rounded">
            <b>Subscribe</b>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div className="pt-6 md:pt-10 flex flex-col md:flex-row items-center md:justify-evenly">
    <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 md:w-auto">
      <li>
        <a href="/contact">
          <button className="text-white  font-oswald hover:text-white hover:underline">
            <p >Contact Us</p>
          </button>
        </a>
      </li>
      <li>
        <button className=" text-white  font-oswald hover:text-white hover:underline">
          <p>{t('Terms of use')}</p>
        </button>
      </li>
      <li>
        <button className="text-white  font-oswald hover:text-white hover:underline">
          <p>Inquires</p>
        </button>
      </li>
      <li>
        <button className="text-white  font-oswald hover:text-white hover:underline">
          <p>Join Us</p>
        </button>
      </li>
      <li>
        <button className="text-white  font-oswald hover:text-white hover:underline">
          <p>Donate</p>
        </button>
      </li>
    </ul>
    
    <div className="flex pt-4 md:pt-0  space-x-8">
      <img src="/images/fb.png" alt="facebook" className="filter invert text-white/80 h-6 md:h-7 w-auto" />
      <img src="/images/twit.png" alt="twitter" className="filter invert text-white/80 h-6 md:h-7 w-auto" />
      <img src="/images/insta.png" alt="instagram" className="filter invert text-white/80 h-6 md:h-7 w-auto" />
    </div>
  </div>
</footer>

    </>
  );
}

export default Footer;