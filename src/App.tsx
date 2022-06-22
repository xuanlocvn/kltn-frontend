import React, { Suspense } from "react"
import { BrowserRouter } from "react-router-dom"
import "./App.scss"
import SpinnerApp from "./components/shared/Spinner/Spinner"
import Header from "./components/shared/Header/Header"
import Footer from "./components/shared/Footer/Footer"
import Router from "./routes/routes"
import Popup from "./components/shared/Popup/Popup"

function App() {
  return (
    <div className="App">
      <Suspense fallback={<SpinnerApp />}>
        <div className="container">
          <BrowserRouter>
            <Header />
            <Router />
            <Popup></Popup>
            <Footer />
          </BrowserRouter>
        </div>
      </Suspense>
    </div>
  )
}
export default App
