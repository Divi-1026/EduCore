import React from "react"
import ProtectedRoute from "./Routes/protectedRoute"
import MainRoutes from "./Routes/MainRoutes"
import NavBar from "./components/ui/Navbar"
import { useLocation } from "react-router-dom"
const App=()=>{
const location =useLocation();
const hiddenRoute=['/login','/register'];
const shouldHidenNavbar=hiddenRoute.some((route)=>location.pathname.startsWith(route));

 
 return (
    <div>
      {!shouldHidenNavbar && <NavBar></NavBar>}
     
      <MainRoutes></MainRoutes></div>
  )
}
export default App
