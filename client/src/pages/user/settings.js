import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "../../components/nav/Sidebar";

export default function ProfileUpdate() {
  // state
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // console.log(username, name, email, company, address, phone, about, photo);
      const { data } = await axios.put("/update-password", { password });
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        toast.success("Password updated");
      }
    } catch (err) {
      console.log(err);
      toast.error("Password update failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div class="container" style={{padding: "2rem"}}>
        <div class="row">
          <div class="mx-auto">
            <h1 className="display-4 text-center" style={{ fontFamily: "Veranda" }}>
              Settings
            </h1>
            <Sidebar />
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="container mt-2">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 mt-5">
              <form onSubmit={handleSubmit}>
                <input
                  name="password"
                  type="password"
                  placeholder="Update your password"
                  className="form-control mb-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  className="btn btn-primary col-12 mb-4"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
