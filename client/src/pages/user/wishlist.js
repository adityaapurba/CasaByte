import { useEffect, useState } from "react";
import Sidebar from "../../components/nav/Sidebar";
import { useAuth } from "../../context/auth"
import axios from "axios";
// copy of AdCard
import AdCard from "../../components/cards/AdCard";

export default function Wishlist() {
    //context
  const [auth, setAuth] = useAuth();

  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAds();
  }, [auth.token !== ""]);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/wishlist");
      setAds(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <div class="container" style={{padding: "2rem"}}>
        <div class="row">
          <div class="mx-auto">
            <h1 className="display-4 text-center" style={{ fontFamily: "Veranda" }}>
              Wishlist
            </h1>
            <Sidebar />
          </div>
        </div>
      </div>

      {!ads.length ? (
        <div
          className="d-flex justify-content-center align-items-center vh-100"
          style={{ marginTop: "-10%" }}
        >
          <h2>
            {" "}
            Hey {auth.user?.name ? auth.user?.name : auth.user?.username},
            Like some Properties!!
          </h2>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 mt-4 mb-4">
              <p className="text-center"> You have liked {ads?.length} properties</p>
            </div>
          </div>
          <div className="row">
            {ads?.map((ad) => (
              <>
                <AdCard ad={ad} key={ad._id}/>
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
