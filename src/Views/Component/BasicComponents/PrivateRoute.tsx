import type { FC, PropsWithChildren } from "react";
import { Navigate, Route } from 'react-router';


const Privateroute: FC<PropsWithChildren> = (props) => {
  const token = localStorage.getItem("token")
  const isAuth = token

  return (
    <>
    {isAuth ? props.children : <Navigate to={"/login"}/>}
    </>
  )
}

export default Privateroute