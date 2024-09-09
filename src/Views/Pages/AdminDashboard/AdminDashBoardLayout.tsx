import { FC, PropsWithChildren } from "react";
import Footer from "../../Component/Layout/Footer";
import AdminSideBar from "./AdminSideBar";
import Header from "../../Component/Layout/Header";



const Layout: FC<PropsWithChildren> = (props) => {
    return (
        <>
        <Header/>
            <div className="flex md:pt-28 " >
                <AdminSideBar />
                <div className="pl-4 w-full shadow-xl">
                    {props?.children}
                </div>

            </div>
            <Footer />
        </>
    );
};

export default Layout;
