import Footer from "../Common/Footer"
import Header from "../Common/Header"
import Home from "../../pages/Home"
import { TbHomeRibbon } from "react-icons/tb"
import { Outlet } from "react-router-dom"

const UserLayout = () => {
  return (
  <>
  {/* HEADER */}
    <Header />

 
  {/* MAIN CONTENT */}
  <main>

<Outlet /> 
  </main>
 
 {/* FOOTER */}
    <Footer />
  </>
  )
}

export default UserLayout