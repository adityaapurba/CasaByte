import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {useAuth} from "../../context/auth";

export default function AdForm ({action, type}){
    //context
    const [auth, setAuth] = useAuth();
    //state
    const [ad, setAd] = useState({
        photos: [],
        uploading: false,
        price: "",
        address: "",
        city: "",
        country: "",
        bedrooms: "",
        bathrooms: "",
        carpark: "",
        landsize: "",
        title: "",
        description: "",
        geolocation :null,
        loading: false,
        type,
        action,
    });
    
    const navigate = useNavigate();


    const handleClick = async () => {
        try{
            setAd((prev) => ({...prev, loading: true, city:prev.city.toLowerCase(), country: prev.country.toLowerCase,}));
            const {data} = await axios.post("/create", ad);
            console.log(data);
            if(data?.error){
                toast.error(data.error);
                setAd({...ad, loading: false});
            }else{
                //data={user,ad}

                //update user in context
                setAuth({...auth, user: data.user});
                //update user in local storage
                const fromLS = JSON.parse(localStorage.getItem("auth"));
                fromLS.user = data.user;
                localStorage.setItem("auth", JSON.stringify(fromLS));

                toast.success("Ad create successfully");
                setAd({...ad, loading: false});
                // navigate("/dashboard");

                //reload page on redirect
                window.location.href = "/dashboard";
            }
        }catch(err){
            console.log(err);
            setAd({...ad, loading: false});
        }
    }

    return (
        <>
            <ImageUpload ad={ad} setAd={setAd} />
                <input 
                className="mb-3 form-control"
                placeholder="adress"
                defaultValue={ad?.address}
                onChange={(e) => setAd({...ad, address: e.target.value})}
                />

                <input 
                className="mb-3 form-control"
                placeholder="city"
                defaultValue={ad?.city}
                onChange={(e) => setAd({...ad, city: e.target.value})}
                />

                <input 
                className="mb-3 form-control"
                placeholder="country"
                defaultValue={ad?.country}
                onChange={(e) => setAd({...ad, country: e.target.value})}
                />
            <div>
                <CurrencyInput 
                intlConfig={{ locale: 'en-IN', currency: 'INR' }}
                placeholder="Enter price" 
                defaultValue={ad.price}
                className="form-control mb-3"
                onValueChange={(value) => setAd({...ad, price: value})}
                />
            </div>

            {type === "House" ? (<>
            <input 
            type="number" 
            min="0" 
            className="form-control mb-3"
            placeholder="Enter no of bedrooms"
            value={ad.bedrooms}
            onChange={(e) => setAd({...ad, bedrooms: e.target.value})}
            />

            <input 
            type="number" 
            min="0" 
            className="form-control mb-3"
            placeholder="Enter no of bathrooms"
            value={ad.bathrooms}
            onChange={(e) => setAd({...ad, bathrooms: e.target.value})}
            />

            <input 
            type="text" 
            className="form-control mb-3"
            placeholder="Enter no of carpark"
            value={ad.carpark}
            onChange={(e) => setAd({...ad, carpark: e.target.value})}
            />
            </>) : ""}
            

            <input 
            type="text" 
            className="form-control mb-3"
            placeholder="Enter size of land. Ex-2000sq ft, 3000m2..."
            value={ad.landsize}
            onChange={(e) => setAd({...ad, landsize: e.target.value})}
            />

            <input 
            type="text" 
            className="form-control mb-3"
            placeholder="Enter title"
            value={ad.title}
            onChange={(e) => setAd({...ad, title: e.target.value})}
            />

            <textarea className="form-control mb-3" placeholder="Enter description" value={ad.description} onChange={(e) => setAd({...ad, description: e.target.value})}></textarea>

            <button 
            onClick={handleClick}
            className={`btn btn-primary mb-5 ${ad.loading ? "disabled" : ""}`}>
            {ad.loading ? "Saving...." : "Submit"}
            </button>

            {/* <pre>{JSON.stringify(ad, null, 4)}</pre> */}
        </>
    )
}