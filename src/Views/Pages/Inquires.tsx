import React from "react";
import Header from "../Component/Layout/Header";
import Footer from "../Component/Layout/Footer";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Inquires() {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="mt-36 mb-20 mx-24 space-y-5">
        <div className="flex ">
          <h1 className="text-2xl">{t('CONTACT')}</h1>
        </div>
        <div className="my-7 flex gap-16 flex-col lg:md:flex-row">
          <h1 className="text-[#f6aa5a] text-xl">
            {t('We would love to hear from you!')}
          </h1>
          <p>
            {t('General inquiries')}:{" "}
            <Link to={"mailto:your-email@example.com"} className="underline">
              {t('info@harassmap.org')}
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
