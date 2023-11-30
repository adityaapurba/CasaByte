import { Badge } from "antd";
import { Link } from "react-router-dom";
import AdFeatures from "../forms/AdFeatures";

export default function UserAdCard({ ad }) {
  return (
    <div className="col-lg-4 p-4 gx-4 gy-4">
      <Link to={`/user/ad/${ad.slug}`}>
        <Badge.Ribbon
          text={`${ad.type} for ${ad.action}`}
          color={ad?.action === "Sell" ? "#7F1D1D" : "#0ebf75"}
        >
          <div className="card hoverable shadow">
            <img
              src={ad?.photos?.[0].url}
              alt={`${ad?.type}-${ad?.address}-${ad?.action}-${ad?.price}`}
              style={{ height: "250px", objectFit: "cover" }}
            />

            <div className="card-body">
              <h3>{`${ad?.price.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
                style: "currency",
                currency: "INR",
              })}`}</h3>
              <p className="card-text">{`${ad?.address}, ${ad?.city}, ${ad?.country}`}</p>

              <AdFeatures ad={ad} />
            </div>
          </div>
        </Badge.Ribbon>
      </Link>
    </div>
  );
}
