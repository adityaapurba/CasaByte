import { useAuth } from "../../context/auth";
import {FcLike, FcLikePlaceholder} from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function LikeUnlike({ad}) {
    //context
    const [auth ,setAuth] = useAuth();

    const navigate = useNavigate();

    const handleLike = async () => {
        try{
            if(auth.user === null){
                navigate("/login", {
                    state :`/ad/${ad.slug}`,
                });
                return;
            }
            const {data} = await axios.post("/wishlist", {adId : ad._id});
            setAuth({...auth, user: data});
            const fromLS = JSON.parse(localStorage.getItem("auth"));
            fromLS.user = data;
            localStorage.setItem("auth", JSON.stringify(fromLS));
            toast.success("Added to wishlist");
        }catch(err){
            console.log(err);
        }
    }
    const handleUnlike = async () => {
        try{
            if(auth.user === null){
                navigate("/login");
                return;
            }
            const {data} = await axios.delete(`/wishlist/${ad._id}`);
            setAuth({...auth, user: data});
            const fromLS = JSON.parse(localStorage.getItem("auth"));
            fromLS.user = data;
            localStorage.setItem("auth", JSON.stringify(fromLS));
            toast.success("Removed from wishlist");
        }catch(err){
            console.log(err);
        }
    }
    
    return (
        <>
            {auth.user?.wishlist?.includes(ad?._id) ? <sapn>
            <div className="like-button" onClick={handleUnlike}>
                <FcLike 
                className="h5 mt-2"/>
                </div>
            </sapn> : <span>
            <div className="like-button" onClick={handleLike}>
            <FcLikePlaceholder 
                className="h5 mt-2"
                />
            </div>
            </span>}
        </>
    )

}