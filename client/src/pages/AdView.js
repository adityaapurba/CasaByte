import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { BiSolidShare } from "react-icons/bi";
import toast from "react-hot-toast";
import LikeUnlike from "../components/misc/LikeUnlike";
import AdFeatures from "../components/forms/AdFeatures";
import AdCard from "../components/cards/AdCard";
import { FaLocationDot } from "react-icons/fa6";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MapContainer, TileLayer, Marker, Popup, } from "react-leaflet";
import ContactSeller from "../components/forms/contactSell";

dayjs.extend(relativeTime);

export default function AdView() {
  //state
  const [ad, setAd] = useState();
  const [related, setRelated] = useState([]);
  const [copied, setCopied] = useState(false);
  const [position, setPostion] = useState(["48.8","2.34"]);
  //hooks
  const params = useParams();

  useEffect(() => {
    if (params?.slug) fetchAd();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [params?.slug]);

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`/ad/${params.slug}`);
      setAd(data?.ad);
      setRelated(data?.related);
      setPostion([data?.ad?.lat,data?.ad?.lng]);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {ad?.photos.map((photo, index) => (
          <SwiperSlide key={index}>
            <div>
              <img src={photo.url} alt="house" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="copy-button"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          !copied && toast.success("link copied");
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }}
      >
        <BiSolidShare className="h5 mt-2" />
      </div>
      <LikeUnlike ad={ad} />

      <div className="container mb-5">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 mt-4">
            {ad ? <MapContainer
              center={position}
              zoom={10}
              scrollWheelZoom={false}
              style={{ height: "45vh", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer> : ""}
          </div>
          <div className="col-lg-8 offset-lg-2 mt-3">
            <div className="mt-3">
              <span className="display-4" style={{ fontFamily: "Veranda" }}>
                {ad?.title} -{" "}
              </span>
              <span className="h3">{`${ad?.price.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
                style: "currency",
                currency: "INR",
              })}`}</span>
            </div>
            <div className="d-flex flex-wrap items-center mt-3">
              <FaLocationDot className="mt-1" />
              <p className="pl-2 text-dark-emphasis">
                {ad?.address}, {ad?.city}, {ad?.country}
              </p>
            </div>

            <p className="text-secondary mt-n2">
              {dayjs(ad?.createdAt).fromNow()}
            </p>
            <div>
              {ad?.action === "Sell" ? (
                <button
                  className="btn btn-secondary w-25 mt-n2"
                  style={{ backgroundColor: "#7F1D1D", outline: "none" }}
                >
                  {ad?.type === "House" ? "House For Sell" : "Land For Sell"}
                </button>
              ) : (
                <button
                  className="btn btn-secondary w-25 mt-n2"
                  style={{ backgroundColor: "#0ebf75", outline: "none" }}
                >
                  {ad?.type === "House" ? "House For Rent" : "Land For Rent"}
                </button>
              )}
              <button className="btn btn-primary ml-4 w-25 mt-n2">
                {ad?.sold ? "✖️Out of Market" : "✔️In Market"}
              </button>
            </div>
            <div className="mt-2">
              <AdFeatures ad={ad} />
            </div>
            <hr />

            <p>
              <span className="h4 font-weight-">Description -</span>{" "}
              {ad?.description}
            </p>
            
          </div>
          
        </div>
      </div>
      <hr />
      <div className="container">
        <ContactSeller ad={ad}/>
      </div>
      <div className="container-fluid">
        <h4 className="text-center mb-3 fw-bold">Related Properties</h4>
        <hr style={{ width: "33%" }} />
        <div className="row">
          {related?.map((ad) => (
            <AdCard key={ad._id} ad={ad} />
          ))}
        </div>
      </div>
    </>
  );
}
