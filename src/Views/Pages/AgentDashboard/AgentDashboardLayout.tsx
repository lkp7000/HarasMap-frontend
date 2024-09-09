import { FC, PropsWithChildren } from "react";
import Header from "../../Component/Layout/Header";
import Footer from "../../Component/Layout/Footer";
import SideBar from "../../Component/Layout/SideBar";

const AgentDashBoardLayout: FC<PropsWithChildren> = (props) => {
    return (
        <>
            <Header />
            <div className="flex md:pt-28" >
                <SideBar/>
                <div className="pl-4  w-full shadow-xl">
                    {props?.children}
                </div>

            </div>
            <Footer />
        </>
    );
};

export default AgentDashBoardLayout;
