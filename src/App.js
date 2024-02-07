
import { Route, Routes } from 'react-router'
import Brands from './pages/Brands'
import Categories from './pages/Categories'
import Firms from './pages/Firms'
import Login from './pages/Login'
import Products from './pages/Products'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Sales from './pages/Sales'
import Layout from './components/Layout/Layout'
import PrivateRouter from '../src/PrivateRouter'
import Dashboard from './pages/Dashboard'
import Purchases from './pages/Purchases'

  
const App = () => {
 //const getGeocode = async () => {
  //const { lat, lng } = await Geocode(
   // '1775 Tysons Blvd 5th Floor, Tysons, VA 22102, United States'
  //)
 //}
  //getGeocode()
 
 
 return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stock" element={<PrivateRouter />}>
          <Route path="/stock" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="brands" element={<Brands />} />
            <Route path="firms" element={<Firms />} />
            <Route path="products" element={<Products />} />
            <Route path="sales" element={<Sales />} />
            <Route path="purchases" element={<Purchases/>} />
            <Route path="categories" element={<Categories />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App