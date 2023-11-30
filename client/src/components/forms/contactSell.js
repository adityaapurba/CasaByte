import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ContactSeller({ ad }) {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // hooks
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      setName(auth.user?.name);
      setEmail(auth.user?.email);
      setPhone(auth.user?.phone);
    }
  }, [auth?.user]);

  return (
    <div className="row">
      <div className="col-lg-8 offset-lg-2">
        <div className="row mx-2 mb-3 mt-3">
          <div>
            <h4>
              Contact{" "}
              <Link to={`/agent/${ad?.postedBy?.username}`}>
                {ad?.postedBy?.name ? ad?.postedBy?.name : ad?.postedBy?.username}
              </Link>
            </h4>
            <p className="text-secondary">
              About {ad?.type} in {ad?.address} for {ad?.action} ${ad?.price}
            </p>
          </div>

          <input
            name="name"
            type="text"
            className="form-control mb-3 text-success"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={auth?.user?.name}
            required
          />

          {/* <input
                type="email"
                placeholder="Enter your email"
                className="form-control mb-3 text-success"
                value={email}
                onChange={(e) => setEmail(e.target.value?.toLowerCase())}
                disabled={auth?.user?.email}
                required
              /> */}

          <input
            name="phone"
            type="text"
            className="form-control mb-3 text-success"
            placeholder="Enter your phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={auth?.user?.phone}
          />

          <textarea
            className="form-control mb-3"
            name="message"
            value={message}
            placeholder="✍️ Write description"
            onChange={(e) => setMessage(e.target.value)}
          />

          <Link
            className={`btn btn-primary ${!name || loading ? "disabled" : ""}`}
            to={`mailto:${ad?.postedBy?.email}?subject=Regarding ${ad?.title}&body=${message} 
                My Name- ${name}
                My Number-${phone}`}
          >
            {loading ? "Please wait.." : "Send enquiry"}
          </Link>
        </div>
      </div>
    </div>
  );
}
