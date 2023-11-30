import { useState } from "react";
import Sidebar from "../../components/nav/Sidebar";
import { useNavigate } from "react-router-dom";

export default function AdCreate() {

    const [sell, setSell] = useState(false);
    const [rent, setRent] = useState(false);

    const navigate = useNavigate();

    const handelSell = () => {
        setSell(true);
        setRent(false);
    }; 
    const handelRent = () => {
        setRent(true);
        setSell(false);
    };

    return (
        <div>
        <div class="container" style={{padding: "2rem"}}>
        <div class="row">
          <div class="mx-auto">
            <h1 className="display-4 text-center" style={{ fontFamily: "Veranda" }}>
              Create Listing
            </h1>
            <Sidebar />
          </div>
        </div>
      </div>

            <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "5%"}}>
                <div className="col-lg-6">
                    <button onClick={handelSell} 
                    className="btn btn-primary btn-lg col-12 p-3">
                    Sell
                    </button>
                    {sell && (
                        <div className="my-1">
                            <button onClick={() => navigate("/ad/create/sell/House")} 
                                    className="btn btn-secondary p-3 col-6">House</button>
                            <button onClick={() => navigate("/ad/create/sell/Land")}
                                    className="btn btn-secondary p-3 col-6">Land</button>
                        </div>
                    )}
                </div>
                <div className="col-lg-6">
                    <button onClick={handelRent}
                    className="btn btn-primary btn-lg col-12 p-3">
                    Rent
                    </button>
                    {rent && (
                        <div className="my-1">
                            <button onClick={() => navigate("/ad/create/rent/House")}
                                    className="btn btn-secondary p-3 col-6">House</button>
                            <button onClick={() => navigate("/ad/create/rent/Land")}
                                    className="btn btn-secondary p-3 col-6">Land</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};