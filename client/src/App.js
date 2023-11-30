import {BrowserRouter, Routes, Route} from "react-router-dom";
import { AuthProvider } from "./context/auth.js";
import { SearchProvider } from "./context/search.js";
import Main from "./components/nav/main.js";
import {Toaster} from "react-hot-toast";


import Home from "./pages/home.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import Dashboard from "./pages/user/dashboard.js";
import AdCreate from "./pages/user/AdCreate.js";
import PrivateRoute from "./components/routes/PrivateRoute.js";
import SellHouse from "./pages/user/ad/SellHouse.js";
import SellLand from "./pages/user/ad/SellLand.js";
import RentHouse from "./pages/user/ad/RentHouse.js";
import RentLand from "./pages/user/ad/RentLand.js";
import AdView from "./pages/AdView.js";
import Footer from "./components/nav/footer.js";
import Profile from "./pages/user/profile.js";
import Settings from "./pages/user/settings.js";
import AdEdit from "./pages/user/ad/AdEdit.js";
import Wishlist from "./pages/user/wishlist.js";
import Agents from "./pages/Agents.js";
import AgentView from "./pages/AgentView.js";
import Buy from "./pages/buy.js";
import Rent from "./pages/rent.js";
import Search from "./pages/search.js";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <SearchProvider>
        <Main />
        <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={<PrivateRoute/>}>
              <Route path="dashboard" element={<Dashboard />}/>
              <Route path="ad/create" element={<AdCreate />}/>
              <Route path="ad/create/sell/House" element={<SellHouse/>}/>
              <Route path="ad/create/sell/Land" element={<SellLand/>}/>
              <Route path="ad/create/rent/House" element={<RentHouse/>}/>
              <Route path="ad/create/rent/Land" element={<RentLand/>}/>
              <Route path="user/profile" element={<Profile/>}/>
              <Route path="user/settings" element={<Settings />} />
              <Route path="user/ad/:slug" element={<AdEdit />} />
              <Route path="user/wishlist" element={<Wishlist />} />
            </Route>

            <Route path="/agents" element={<Agents/>}/>
            <Route path="/agent/:username" element={<AgentView/>}/>
            <Route path="/ad/:slug" element={<AdView/>} />

            <Route path="/buy" element={<Buy />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/search" element={<Search />} />
          </Routes>
          <Footer />
          </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
