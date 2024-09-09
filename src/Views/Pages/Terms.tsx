import React from "react";
import Header from "../Component/Layout/Header";
import Footer from "../Component/Layout/Footer";
import { useTranslation } from "react-i18next";

export default function Terms() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div className="mt-36 mb-20 mx-24 space-y-5">
        <div className="flex">
          <h1 className="text-2xl">{t('TERMS OF USE')}</h1>
        </div>
        <div className="space-y-6 text-gray-600">
          <p className=" text-justify ">
            <span className="text-black">{t('Acceptance of Terms.')} </span>

            {t("HarassMap (HarassMap / 'we' / 'us') makes the content of the website www.harassmap.org (the Website) available as an online tool for documenting sexual harassment through a web interface, an API, and other means (the Services). By accessing or using the Services you are agreeing to be bound by the following terms and conditions (Terms of Use), including any subsequent changes or modifications to them.")}

          </p>
          <p className=" text-justify">
            <span className="text-black"> {t('Emails.')} </span>
           {t('You agree to us sending email notifications to the email that is linked to your user account.')}
          </p>
          <p className=" text-justify">
            <span className="text-black">Content. </span>
            {t('You acknowledge and agree that the content accessible through the Services is community-authored and -moderated, and that HarassMap assumes no liability for any content posted by users. HarassMap is a hosting service and may choose to moderate content to the extent of standardization of format and/or to preserve anonymity of all parties, but is not responsible for the completeness, accuracy, appropriateness, or decency of content posted on its Services. The views expressed by content authors are not necessarily the views of the website or its agents.')}
          </p>
          <p className=" text-justify">
            <span className="text-black"> {t('License.')} </span>
            {t('You acknowledge and agree that any content you submit to HarassMap is automatically licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License. You may not post copyrighted information to HarassMap.')}
          </p>

          <p className=" text-justify">
            <span className="text-black"> {t('Third-Party Content.')} </span>
            {t('HarassMap allows the posting of links to third-party websites. We have no control over third-party websites and the provision of links in no way constitutes an endorsement, authorization, or representation of our connection to that third party.')}
          </p>
          <p className=" text-justify">
            <span className="text-black"> {t('Security.')} </span>
            {t('You are responsible for safeguarding your own password and should never disclose it to any third party. HarassMap is unable to retrieve user passwords.')}
          </p>
          <p className=" text-justify">
            <span className="text-black"> {t('Acceptable Behavior.')} </span>
            {t('HarassMap reserves the right to deny Services to users who do not follow our standards of acceptable behavior, which are intended to ensure fair access and courteous treatment of all users. Prohibited behavior includes, but is not limited to:')}
            <ul className="list-disc ml-10 mt-4 space-y-2">
              <li>
                {t('Providing false information, including impersonation or misrepresentation during registration or login to the Services or when contacting HarassMap.')}
              </li>
              <li>
                {t('Excessive or disruptive traffic to the website or API, whether willful or not, including any attempts to subvert the API query limit by any means.')}
              </li>
              <li>
                <h3>
                  {t('Harassment or disrespect of others through the Services.')}
                </h3>
              </li>
              <li>
                {t('Solicitation for commercial purposes through the Services.')}
              </li>
            </ul>
          </p>
          <p className=" text-justify">
            <span className="text-black italic"> {t('To reiterate,')} </span>
            {t('although HarassMap deals with documentation, it is not a forum to defame, abuse, disrespect, preach to, politicize the contributions of, harass, or otherwise abuse other users or the Services.')}
          </p>
          <p className=" text-justify">
            <span className="text-black"> {t('Changes.')} </span>
            {t('We reserve the right to change these Terms of Use at any time. The date on which the latest update was made is indicated at the bottom of this page. We recommend that you revisit this page from time to time to ensure that you are aware of any changes. Your continued use of the Services signifies your acceptance of any changes.')}
          </p>
          <p className=" text-justify">
            <span className="text-black"> {t('Termination.')} </span>
            {t('We reserve the right to terminate this agreement at any time. You (user) may terminate this agreement by seizing use of the website at anytime. We shall terminate this agreement without notice if in it’s our sole judgment, you breach by violating any of our terms of conditions.')}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
