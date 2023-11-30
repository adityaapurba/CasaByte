import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";


export default function RedirectRoute(){
    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(()=>{
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        },1000);
        count === 1 && navigate("/login");
        //cleanup
        return () => clearInterval(interval);
    },[count]);

    return(
        <div className="text-center" style={{marginTop: "10%"}}>
            <h2>Please login redirect in {count} seconds</h2>
        </div>
    );
};