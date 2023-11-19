import Header from "./header.component";
import { Outlet } from "react-router-dom";
import Footer from "./footer.component";

const MainLayaut = ()=>{
    return(
        <>
        <Header/>
        <Outlet></Outlet>
        <Footer></Footer>
        </>
    )
    }
    export default MainLayaut;