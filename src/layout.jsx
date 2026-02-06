import { Outlet } from "react-router-dom";
import FooterComponent from "./components/NavFooter/FooterComponent";
import NavbarComponent from "./components/NavFooter/NavbarComponent";



export default function RootLayout() {
  return (
    <div>
         <NavbarComponent />
            <Outlet/>
         <FooterComponent/>
      
    </div>
  )
}
