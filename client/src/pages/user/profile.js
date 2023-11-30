import Sidebar from "../../components/nav/Sidebar";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import ProfileImageUpload from "../../components/forms/profileImageUpload";

export default function Profile() {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  //hookes
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(auth?.user?.username);
    setName(auth?.user?.name);
    setEmail(auth?.user?.email);
    setCompany(auth?.user?.company);
    setAddress(auth?.user?.address);
    setPhone(auth?.user?.phone);
    setPhoto(auth?.user?.photo);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        setLoading(true);
        const {data} = await axios.put("/update-profile", {
        username,
        name,
        email,
        company,
        address,
        phone,
        about,
        photo,
        });
        if(data?.error){
            toast.error(data.error);
        }else{
            setAuth({...auth, user:data});

            let fromLS = JSON.parse(localStorage.getItem("auth"));
            fromLS.user = data;
            localStorage.setItem("auth", JSON.stringify(fromLS));

            setLoading(false);
            toast.success("Profile updated");
        }
    }catch(err){
        console.log(err);
    }
  }

  return (
    <>
    <div>
      <div class="container" style={{padding: "2rem"}}>
        <div class="row">
          <div class="mx-auto">
            <h1 className="display-4 text-center" style={{ fontFamily: "Veranda" }}>
              Profile
            </h1>
            <Sidebar />
          </div>
        </div>
      </div>
        <div className="container mt-2">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 mt-1">
              <form onSubmit={handleSubmit}>
                
                <ProfileImageUpload 
                photo={photo} setPhoto={setPhoto}
                uploading={uploading}
                setUploading={setUploading}
                />
                
                <div className="d-flex justify-content-between mt-3">
                <label className="">
                    <small>Username Must be unique</small>
                </label>
                </div>
                <input
                  name="username"
                  type="text"
                  placeholder="Update your username"
                  className="form-control mb-4"
                  value={username}
                  onChange={(e) =>
                    setUsername(slugify(e.target.value.toLowerCase()))
                  }
                />

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="form-control mb-4"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder={email}
                  className="form-control mb-4"
                  disabled={true}
                />
                <input
                  type="text"
                  placeholder="Enter your company name"
                  className="form-control mb-4"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter address"
                  className="form-control mb-4"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="form-control mb-4"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <textarea
                  placeholder="Write something interesting about yourself"
                  className="form-control mb-4"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />

                <button
                  className="btn btn-primary col-12 mb-4"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Update profile"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
