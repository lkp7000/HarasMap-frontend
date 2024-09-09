import "./App.css";
import HelpCenter from "./Views/Pages/HelpCenter/HelpCenter";
import OrganisationMap from "./Views/Pages/HelpCenter/OrganisationMap";
import DomesticVoilence from "./Views/Pages/DomesticVoilence";
import Employment from "./Views/Pages/Employment";
import Family from "./Views/Pages/Family";
import Health from "./Views/Pages/Health";
import Political from "./Views/Pages/Political";
import ProfileInfo from "./Views/Pages/ProfileInfo";
import Security from "./Views/Pages/Security";
import SexualHarrasmentHarraser from "./Views/Pages/SexualHarrasmentHarraser";
import SexualHarrasmentVictim from "./Views/Pages/SexualHarrasmentVictim";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Views/Pages/HomePage/Home";
import About from "./Views/Pages/AboutPage/About";
import Login from "./Views/Pages/LoginPage/Login";
import Report from "./Views/Pages/Reportpage/Report";
import Work from "./Views/Pages/WorkPage/Work";
import Contact from "./Views/Pages/ContactPage/Contact";
import AdminDashboard from "./Views/Pages/AdminDashboard/AdminDashboard";
import AgentDashboard from "./Views/Pages/AgentDashboard/AgentDashboard";
import AddAgent from "./Views/Pages/AdminPage/AddAgent";
import AgentView from "./Views/Pages/AdminPage/AgentView";
import { Harassmapeffect } from "./Views/Pages/HarrassmapEffect/Harassmapeffect";
import Intervenue from "./Views/Pages/IntervenuePage/Intervenue";
import Chart from "./Views/Pages/ChartPage/Chart";
import { Reportincident } from "./Views/Pages/Report an incident/Reportincident";
import Campaigns from "./Views/Pages/Campaign/Campaigns";
import { Research } from "./Views/Pages/Research/Research";
import { ProfilepageAdmin } from "./Views/Pages/Profilepage/ProfilepageAdmin";
import UpdateAgent from "./Views/Pages/AdminPage/UpdateAgent";
import ReadMore from "./Views/Component/BasicComponents/ReadMore";
import { Reportintervention } from "./Views/Pages/Report an intervention/Reportintervention";
import DomesticChart from "./Views/Pages/ChartPage/DomesticChart";
import Tablereadmore from "./Views/Pages/Tablereadmore";
import DomesticMapComponent from "./Views/Component/BasicComponents/DomesticMapComponent";
import Privateroute from "./Views/Component/BasicComponents/PrivateRoute";
import MapWithMarkers from "./Views/Pages/MapWithMarkers";
import MapComponent1 from "./Views/Pages/MapComonent1";
import WorkMapComponent from "./Views/Pages/WorkMapComponent";
import TableViewPage from "./Views/Pages/TableViewPage";
import React, { useEffect } from "react";
import HelpCenterReadmore from "./Views/Pages/HelpCenter/HelpCenterReadmore";
import AddNews from "./Views/Pages/AdminPage/AddNews";
import ListSurvey from "./Views/Pages/AdminPage/ListSurvey";
import ViewQuestionAnswer from "./Views/Pages/AdminPage/ViewQuestionAnswer";
import ViewSurveyQuestionAnswer from "./Views/Pages/AgentDashboard/ViewSurveyQuestionAnswer";
import Terms from "./Views/Pages/Terms";
import Inquires from "./Views/Pages/Inquires";
import ScrollToTop from "./Views/Component/Layout/ScrollToTop";

const App: React.FC = () => {
  const isAuthenticated = false;

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route
            path="/profilepageadmin"
            element={
              <Privateroute>
                {" "}
                <ProfilepageAdmin />{" "}
              </Privateroute>
            }
          />

          <Route path={"/contact"} element={<Contact />}></Route>

          <Route path="/home" element={<Home />} />
          <Route path="/workreadmore" element={<WorkMapComponent />} />

          <Route path="/helpCenterReadmore" element={<HelpCenterReadmore />} />

          <Route path="/y" element={<MapComponent1 />} />

          <Route path="/domesticviolence/intervenue" element={<Intervenue />} />
          <Route
            path="/domesticviolence/map"
            element={<DomesticMapComponent />}
          />
          <Route path="/reporting" element={<Work />} />
          <Route path="/aboutus/who-we-are" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/domesticviolence/report" element={<Report />} />
          <Route path="/domesticviolence/reporting" element={<Work />} />

          <Route path="/chart" element={<Chart />} />
          <Route
            path="/listsurvey"
            element={
              <Privateroute>
                <ListSurvey />
              </Privateroute>
            }
          />
          <Route
            path="/ViewQuestionAnswer/:agentSurveyId"
            element={
              <Privateroute>
                <ViewQuestionAnswer />
              </Privateroute>
            }
          />
          <Route
            path="/ViewQuestionAnswer"
            element={
              <Privateroute>
                <ViewSurveyQuestionAnswer />
              </Privateroute>
            }
          />
          <Route
            path="/ViewQuestionAnswer/:agentSurveyID"
            element={
              <Privateroute>
                <ViewQuestionAnswer />
              </Privateroute>
            }
          />

          <Route path="/chart1" element={<DomesticChart />} />
          <Route path="/domesticchart" element={<DomesticChart />} />
          <Route path="/" element={<MapWithMarkers />} />
          <Route path="/aboutus/mapeffect" element={<Harassmapeffect />} />
          <Route path="/mapeffect" element={<Harassmapeffect />} />
          <Route path="/organisationmap" element={<OrganisationMap />} />

          <Route path="/aboutus" element={<About />} />
          <Route path="/helpcenter" element={<HelpCenter />} />
          <Route path="/report" element={<Report />} />
          <Route path="/domesticviolence/report" element={<Report />} />
          <Route path="/domesticviolence/chart" element={<DomesticChart />} />
          <Route path="/work/reporting" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/domesticviolence/intervenue" element={<Intervenue />} />

          <Route
            path="/report/report-an-incident"
            element={<Reportincident />}
          />
          <Route path="/ourwork/research" element={<Research />} />
          <Route path="/ourwork/campaign" element={<Campaigns />} />
          <Route path="/report-an-incident" element={<Reportincident />} />
          <Route
            path="/updateagent/:id"
            element={
              <Privateroute>
                <UpdateAgent />
              </Privateroute>
            }
          />

          <Route path="/readmore" element={<ReadMore />} />
          <Route
            path="/report/report-an-intervention"
            element={<Reportintervention />}
          />
          <Route path="/table" element={<Tablereadmore />} />
          <Route
            path="/profileinfo"
            element={
              <Privateroute>
                <ProfileInfo />
              </Privateroute>
            }
          />
          <Route
            path="/family"
            element={
              <Privateroute>
                <Family />
              </Privateroute>
            }
          />
          <Route
            path="/employment"
            element={
              <Privateroute>
                <Employment />
              </Privateroute>
            }
          />
          <Route
            path="/health"
            element={
              <Privateroute>
                <Health />
              </Privateroute>
            }
          />
          <Route
            path="/domesticVoilence"
            element={
              <Privateroute>
                <DomesticVoilence />
              </Privateroute>
            }
          />
          <Route
            path="/sexualHarrasmentHarraser"
            element={
              <Privateroute>
                <SexualHarrasmentHarraser />{" "}
              </Privateroute>
            }
          />
          <Route
            path="/sexualHarrasmentVictim"
            element={
              <Privateroute>
                <SexualHarrasmentVictim />
              </Privateroute>
            }
          />
          <Route
            path="/security"
            element={
              <Privateroute>
                <Security />
              </Privateroute>
            }
          />
          <Route
            path="/political"
            element={
              <Privateroute>
                <Political />
              </Privateroute>
            }
          />
          <Route
            path="/AdminDashboard"
            element={
              <Privateroute>
                <AdminDashboard />
              </Privateroute>
            }
          />
          <Route
            path="/AgentDashboard"
            element={
              <Privateroute>
                <AgentDashboard />
              </Privateroute>
            }
          />
          <Route
            path="/TakeSurvey"
            element={
              <Privateroute>
                <AddAgent />
              </Privateroute>
            }
          />
          <Route
            path="/AgentView"
            element={
              <Privateroute>
                <AgentView />
              </Privateroute>
            }
          />
          <Route
            path="/AddNews"
            element={
              <Privateroute>
                <AddNews />
              </Privateroute>
            }
          />
          <Route
            path="/AgentView"
            element={
              <Privateroute>
                <AgentView />
              </Privateroute>
            }
          />
          <Route
            path="/AddAgent"
            element={
              <Privateroute>
                <AddAgent />
              </Privateroute>
            }
          />
          <Route
            path="/tableviewpage"
            element={
              <Privateroute>
                <TableViewPage />
              </Privateroute>
            }
          />
          <Route path="/terms" element={<Terms />} />
          <Route path="/inquires" element={<Inquires />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
