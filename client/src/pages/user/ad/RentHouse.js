import Sidebar from "../../../components/nav/Sidebar";
import AdForm from "../../../components/forms/AdForm";

export default function RentHouse() {

    return (
        <div>
            <div class="container" style={{padding: "2rem"}}>
        <div class="row">
          <div class="mx-auto">
            <h1 className="display-4 text-center" style={{ fontFamily: "Veranda" }}>
              Rent House
            </h1>
            <Sidebar />
          </div>
        </div>
      </div>
            <Sidebar />
            <div className="container mt-2">
                <AdForm action="Rent" type="House"/>
            </div>
        </div>
    );
};