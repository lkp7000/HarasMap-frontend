import { FC, PropsWithChildren } from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const Layout1: FC<PropsWithChildren> = (props) => {
  return (
    <>
      <Header />
      <div className="flex pt-28" >
        <div className=" w-full shadow-xl">
          {props?.children}
        </div>
      </div>
      <Footer />

    </>
  )
}

export default Layout1