import { FC, PropsWithChildren } from "react";
import Footer from "./Footer";
import SideBar from "./SideBar";
import Agentheader from "../../Pages/AdminPage/Agentheader";
import Header from "./Header";
const Layout: FC<PropsWithChildren> = (props) => {
    return (
        <>
              <Header/>
            <div className=" mt-4 md:mt-28 lg:mt-26 flex py-2" >
                <SideBar />
                <div className="pl-4 w-full shadow-xl">
                    {props?.children}
                </div>
            </div>
            <Footer />

        </>
    );
};

export default Layout;
