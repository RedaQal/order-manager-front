import Header from "./components/Header"
import DetailsOrder from './components/DetailsOrder'
import "./App.css"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/details-order/:id' element={<DetailsOrder />} />
      </Routes>
    </>
  )
}

export default App
