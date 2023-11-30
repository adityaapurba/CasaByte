import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "../../../components/forms/ImageUpload";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../../../components/nav/Sidebar";
//firebase
import { app } from "../../../firebase";
import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";

export default function AdEdit({ action, type }) {
  const [ad, setAd] = useState({
    _id: "",
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
    loading: false,
    type,
    action,
  });

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) fetchAd();
  }, [params?.slug]);

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`/ad/${params.slug}`);
      setAd(data.ad); // {ad: {}, related: []}
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async () => {
    try {
      if(!ad.photos?.length){
        toast.error("Photo is required");
        return;
      }
      if(!ad.price){
        toast.error("Price is required");
        return;
      }
      if(!ad.description){
        toast.error("Description is required");
        return;
      }
      if(!ad.address){
        toast.error("Address is required");
        return;
      }
      if(!ad.city){
        toast.error("City is required");
        return;
      }
      if(!ad.country){
        toast.error("Country is required");
        return;
      }
      setAd((prev) => ({
        ...prev,
        loading: true,
        city: prev.city.toLowerCase(),
        country: prev.country.toLowerCase,
      }));
      const { data } = await axios.put(`/adupdate/${ad._id}`, ad);
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
        setAd({ ...ad, loading: false });
      } else {
        toast.success("Ad updated successfully");
        setAd({ ...ad, loading: false });
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };

  const handleDelete = async () => {
    try{
      setAd({...ad, loading:true});
      ad?.photos.map(async (photo) => {
        await handleDeleteImage(photo)
      });

      const {data} = await axios.delete(`/ad/${ad._id}`);

      if(data?.error){
        toast.error(data.error);
        setAd({...ad, loading:false});
      }else{
        toast.success("Ad deleted successfully");
        setAd({...ad, loading:false});
        navigate("/dashboard");
      }


    }catch(err){
      console.log(err);
      setAd({...ad, loading:false});
    }
  };

  const handleDeleteImage = async (file) => {
    try {
        const storage = getStorage(app);
        const desertRef = ref(storage, file.key);
        deleteObject(desertRef);
    } catch (err) {
        console.log(err);
    }
};

  return (
    <div>
    <div class="container" style={{padding: "2rem"}}>
        <div class="row">
          <div class="mx-auto">
            <h1 className="display-4 text-center" style={{ fontFamily: "Veranda" }}>
              Edit Listing
            </h1>
            <Sidebar />
          </div>
        </div>
      </div>
    <div className="container mt-4">
      <ImageUpload ad={ad} setAd={setAd} />
      <input
        className="mb-3 form-control"
        placeholder="adress"
        defaultValue={ad?.address}
        onChange={(e) => setAd({ ...ad, address: e.target.value })}
      />

      <input
        className="mb-3 form-control"
        placeholder="city"
        defaultValue={ad?.city}
        onChange={(e) => setAd({ ...ad, city: e.target.value })}
      />

      <input
        className="mb-3 form-control"
        placeholder="country"
        defaultValue={ad?.country}
        onChange={(e) => setAd({ ...ad, country: e.target.value })}
      />
      {ad?.price ? <div>
        <CurrencyInput
          intlConfig={{ locale: "en-IN", currency: "INR" }}
          placeholder="Enter price"
          defaultValue={ad.price}
          className="form-control mb-3"
          onValueChange={(value) => setAd({ ...ad, price: value })}
        />
      </div> : ""}

      {ad.type === "House" ? (
        <>
          <input
            type="number"
            min="0"
            className="form-control mb-3"
            placeholder="Enter no of bedrooms"
            value={ad.bedrooms}
            onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
          />

          <input
            type="number"
            min="0"
            className="form-control mb-3"
            placeholder="Enter no of bathrooms"
            value={ad.bathrooms}
            onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter no of carpark"
            value={ad.carpark}
            onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
          />
        </>
      ) : (
        ""
      )}

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter size of land. Ex-2000sq ft, 3000m2..."
        value={ad.landsize}
        onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
      />

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter title"
        value={ad.title}
        onChange={(e) => setAd({ ...ad, title: e.target.value })}
      />

      <textarea
        className="form-control mb-3"
        placeholder="Enter description"
        value={ad.description}
        onChange={(e) => setAd({ ...ad, description: e.target.value })}
      ></textarea>
      <div className="d-flex justify-content-between">
      <button
        onClick={handleClick}
        className={`btn btn-primary mb-5 ${ad.loading ? "disabled" : ""}`}
      >
        {ad.loading ? "Saving...." : "Submit"}
      </button>
         
      <button
        onClick={handleDelete}
        className={`btn btn-primary mb-5 ${ad.loading ? "disabled" : ""}`}
      >
        {ad.loading ? "Deleting...." : "Delete"}
      </button>
        </div>
      </div>
    </div>
  );
}
