import Header from "./components/Header"
import DetailsOrder from './components/DetailsOrder'
import "./App.css"
import ListOrders from "./components/ListOrders"
import { Navigate, Route, Routes } from "react-router-dom"
import AddOrder from "./components/AddOrder"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' index element={<Navigate to={"/list-orders"} />} />
        <Route path='/list-orders' element={<ListOrders />} />
        <Route path='/details-order/:id' element={<DetailsOrder />} />
        <Route path='/new-order' element={<AddOrder />} />
      </Routes>
    </>
  )
}

export default App
