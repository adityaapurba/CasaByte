import { useAuth } from "../context/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm";

export default function Rent() {
    //context
    const [auth, setAuth] = useAuth();
    //state
    const [ads, setAds] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAds();
    },[]);

    useEffect(() => {
        if (page === 1) return;
        // execute
        fetchAds();
      }, [page]);

    const fetchAds = async() => {
        try{
            setLoading(true);
            const {data} = await axios.get(`/ads-for-rent/${page}`);
            setAds([...ads, ...data.ads]);
            setTotal(data.total);
            setLoading(false);
        }catch(err){
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <div>
        <div>
        <div className="text-center" style={{padding: "2rem"}}>
            <h1 className="display-4" style={{fontFamily:"Veranda"}}>
            Rent Your Dream Space
            </h1>
            <SearchForm />
        </div>
            <div className="container">
                <div className="row">
                    {ads?.map(ad => (
                        <AdCard ad={ad} key={ad._id} />
                    ))}
                </div>
                <div className="row">
            {ads && ads.length < total && (
              <div className="col text-center mt-4 mb-4">
                <button
                  disabled={loading}
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading
                    ? "Loading..."
                    : `${ads?.length} / ${total} Load more`}
                </button>
              </div>
            )}
          </div>
            </div>
        </div>
        </div>
    );
};