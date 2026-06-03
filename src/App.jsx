import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar.jsx"
import HomePage from "./pages/home"
import logo from "./assets/logo.png"
import DataAnalytics from "./pages/da.jsx"
import ThankYou from "./pages/thank_you.jsx"
import AboutPage from "./pages/about.jsx"
import Footer from "./sections/footer.jsx"
import Contact from "./pages/contact.jsx"
import AllPlacements from "./pages/all_placements.jsx"

function App() { 

  return (
    <BrowserRouter>   
      <Navbar logoImg={logo} logoText="📞 Call Now" logoLink="tel:+918056477261" />
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/placements' element={<AllPlacements/>}></Route>
        <Route path='/about-us' element={<AboutPage/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/courses/data-analytics' element={<DataAnalytics />}></Route>
        <Route path='/thank-you' element={<ThankYou />}></Route>
      </Routes>
      <Footer />
      </BrowserRouter>
  )
}

export default App