import { useAuth } from "../context/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm";
import { Link } from "react-router-dom";

export default function Home() {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [adsForSell, setAdsForSell] = useState();
  const [adsForRent, setAdsForRent] = useState();

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get("/ads");
      setAdsForSell(data.adsForSell);
      setAdsForRent(data.adsForRent);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="" style={{ padding: "5rem 7rem" }}>
        <h1 className="display-1" style={{ fontFamily: "Veranda" }}>
          Discover Most Suitable Property
        </h1>
        <p className="pt-4 text-secondary">
          Find a variety of properties that suit you very easily. <br />
          Forget all difficulties in finding a residence for you.
        </p>
        <SearchForm />
      </div>
      <div>
        <div className="" style={{ padding: "1rem 0rem 0rem 5rem" }}>
          <h1 className="display-4" style={{ fontFamily: "Veranda" }}>
            Recent places to Buy
          </h1>
          <Link className="" to={"/buy"}>
            Show more places to Buy...
          </Link>
        </div>
        <div className="container">
          <div className="row">
            {adsForSell?.map((ad) => (
              <AdCard ad={ad} key={ad._id} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="" style={{ padding: "0rem 0rem 0rem 5rem" }}>
          <h1 className="display-4" style={{ fontFamily: "Veranda" }}>
            Recent places for Rent
          </h1>
          <Link className="" to={"/rent"}>
            Show more places for rent....
          </Link>
        </div>
        <div className="container">
          <div className="row">
            {adsForRent?.map((ad) => (
              <AdCard ad={ad} key={ad._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
