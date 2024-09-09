import { FC, PropsWithChildren } from "react";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";


const Layout2: FC<PropsWithChildren> = (props) => {
  return (
    <>
      <Header />
      <div className="flex py-2 mt-[104px]">

        <div className="pl-4 w-full shadow-xl">
          {props?.children}
          <Footer/>
      </div>
      
  </div>


    </>
  )
}

export default Layout2