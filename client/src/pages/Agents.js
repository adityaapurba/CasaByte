import { useAuth } from "../context/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/cards/UserCard";


export default function Agents() {
    //context
    const [auth, setAuth] = useAuth();
    //state
    const [agents, setAgents] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAgents();
    },[])

    const fetchAgents = async() => {
        try{
            const {data} = await axios.get("/agents");
            setAgents(data);
            setLoading(false);
        }catch(err){
            console.log(err);
        }
    }

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
            Real Estate Agents
            </h1>
        </div>
            <div className="container">
                <div className="row">
                    {agents?.map(agent => (
                        <UserCard user={agent} key={agent._id}/>
                    ))}
                </div>
            </div>
        </div>
    );
};