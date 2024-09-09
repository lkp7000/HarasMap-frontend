import React, { useState } from "react";
import Header from "../../Component/Layout/Header"
import Footer from "../../Component/Layout/Footer"
import { useTranslation } from 'react-i18next';

const Intervenue = () => {
    const [showAdditionalContent, setShowAdditionalContent] = useState(false);

    // Function to toggle the visibility of additional content
    const toggleAdditionalContent = () => {
      setShowAdditionalContent(!showAdditionalContent);
    };
  const { t } = useTranslation();

    return (
        <><Header />
            <div className="container-3 md:pt-28" >
                <div className="content-5">
                   {t("There are many ways to stand up to sexual harassment, when it happens and at other times.")}
                    <br />
                    <br />
                   {t("Here are some ideas.")}
                </div>
                <div className="content-4">
                    <h3>{t("Intervene in any way you feel comfortable with when you see sexual harassment happen.")}
                    </h3>
                    <br />
                    <ul>
                        <li>{t("If you feel uncomfortable intervening alone, call out for other bystanders to intervene with you.")}</li>
                        <li>{t("If you are in a crowded place and see someone harassing, go and stand between the harasser and the harassed person to stop the harasser from getting access to the person being harassed.")}</li>
                        <li>{t("Take the harasser to one side and calmly say: What you are doing is unacceptable.")}</li>
                        <li>{t("Jump in and interrupt – tell the harasser to stop immediately.")}</li>
                        <li>{t("Offer to go with the harassed person to make a police report and be a witness if she/he wants it.")}</li>
                        <li>{t("Divert attention - start talking to the harasser or the harassed person, asking for directions or the time.")}</li>
                        <li>{t("Ask if the harassed person needs help.")}</li>
                        <li>{t("If the harasser is an employee/employer or in a closed place, report the incident to the management/security and insist that they take action against the harasser.")}</li>
                        <li>{t("If you see someone else is intervening, support them.")}
                        </li>
                    </ul>
                    <h3>
                        <br />
                        {t("Speak up – choose what you feel is right for you and the situation.")}
                    </h3>
                    <br />
                    <ul>
                        <li>{t("Report what happened, when and where to HarassMap here or Facebook/Twitter. Reports are anonymous.")}</li>
                        <li>{t("Show those who have reported it that you care - read the reports on HarassMap, and express your support with just one click.")}</li>
                        <li>{t("Talk about it – with friends, your family, colleagues, or on social media. We need to let more people understand the magnitude of the problem, and make it clear that we do not tolerate it.")}</li>
                       <li>{t("Call people out if you hear jokes or conversations that condone sexual harassment.")}</li>
                       <li>{t("Educate yourself about it. Our Resources is a good start.")}  </li>
                       <li>{t("Use the free services that exist – psychological counselling and legal advice for example. Here is a list.")}</li>
                       <li>{t("Report it to the police. Sexual harassment is a crime. Check out this page for more details for how to go about this, or contact Nazra for Feminist Studies (01011910917) for free legal advice.")}</li>
                       <li>{t("Use social media to reach out to as many people as possible - follow us on Instagram, Twitter, or on Facebook, and invite your friends to do it too.")}</li>
                    </ul>
                    <br />
                    <h3>{t("Every action counts.")}</h3>
                    <br />
                   {t("Each time we speak up or intervene, we make a statement and inspire others to do the same next time.")}
                    <br />
                    <br />
                    <button  onClick={toggleAdditionalContent}>{t('LEARN MORE')}</button>
                    {showAdditionalContent && (
            <div>
              {/* Add your additional content here */}
              <p>{t("This is additional content that appears on the button click. But at the same time they happened with great labor and pain. For to come to the smallest detail, no one should practice any kind of work unless he derives some benefit from it.")}</p>
            </div>
          )}
                </div>

            </div>

            <Footer /></>
    )
}

export default Intervenue