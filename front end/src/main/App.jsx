import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css"

// --- IMPORTAÇÕES QUE FALTAVAM ---
import Nav from "../components/templates/Nav.jsx"
import Footer from "../components/templates/Footer.jsx"
import Main from "../components/templates/Main.jsx"
import Header from "../components/templates/Header.jsx"

export default props => {
  return (
      <div className="app"> 
        <Header />
        <Nav />
        <Main />
        <Footer />
      </div>
  )
}