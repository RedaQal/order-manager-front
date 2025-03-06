import Header from "./components/Header"
import "./App.css"
import ListOrders from "./components/ListOrders"
import { Navigate, Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' index element={<Navigate to={"/list-orders"} />} />
        <Route path='/list-orders' element={<ListOrders />} />
      </Routes>
    </>
  )
}

export default App
