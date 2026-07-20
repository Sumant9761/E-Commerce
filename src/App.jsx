import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './Pages/Home'
import ProductListing from './components/ProductListing'
import Footer from './components/Footer'

function App() {

  return (
   <>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productListing" element={<ProductListing />} />
      </Routes>
      <Footer />
   </>
  )
}

export default App
