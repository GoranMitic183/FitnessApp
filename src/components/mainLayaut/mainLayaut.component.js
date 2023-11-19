import Header from "./header.component";
import { Outlet } from "react-router-dom";
import Footer from "./footer.component";
import { Toaster } from "react-hot-toast";

const MainLayaut = ()=>{
    return(
        <>
        <Header/>
        <Toaster />
        <Outlet></Outlet>
        <Footer></Footer>
        </>
    )
    }
    export default MainLayaut;