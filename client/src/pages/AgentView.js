import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "../components/cards/UserCard";
import AdCard from "../components/cards/AdCard";

export default function AgentView() {
  const params = useParams();

  const [agent, setAgent] = useState(null);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.username) fetchAgent();
  }, [params?.username]);

  const fetchAgent = async () => {
    try {
      const { data } = await axios.get(`/agent/${params.username}`);
      setAgent(data.user);
      setAds(data.ads);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ marginTop: "-7%" }}
      >
        <div className="display-1">Loading...</div>
      </div>
    );
  }

  return (
    <div>
    <div className="text-center pt-2">
            <h1 className="display-4" style={{fontFamily:"Veranda"}}>
            {agent?.username ?? agent?.name}
            </h1>
        </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-4"></div>
          <UserCard user={agent} />
          <div className="col-lg-4"></div>
        </div>
      </div>

      <h2 className="text-center m-5">Recent listings</h2>

      <div className="container">
        <div className="row">
          {ads?.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
