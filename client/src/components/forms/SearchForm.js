import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";
import { sellPrices, rentPrices } from "./priceList";
import queryString from "query-string";
import axios from "axios";

export default function SearchForm() {
    const [search, setSearch] = useSearch();

    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
        setSearch({...search, loading:true})
        const {results, page, price, ...rest} = search;
        const query = queryString.stringify(rest);
        console.log(query);

        const {data} = await axios.get(`/search?${query}`);
        console.log(data)
        if(search?.page !== "/search"){
            setSearch((prev) => ({
                ...prev,
                results: data,
                loading:false,
            }));
            navigate("/search");
        }else{
            setSearch((prev) => ({
                ...prev,
                results: data,
                loading:false,
                page: window.location.pathname,
            }));
        }
        } catch (err) {
          console.log(err);
          setSearch((prev) => ({
            ...prev,
            loading:false,
        }));
        }
      };

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-10 offset-1">
                        <div className="d-flex mx-auto ">
                            <input
                                className="form-control mr-sm-2"
                                type="search"
                                placeholder="Search"
                                defaultValue={search?.address}
                                onChange={(e) => setSearch({...search, address: e.target.value})}
                            />
                        
                            <button
                            disabled={search.loading}
                                onClick={handleSearch}
                                className="btn btn-primary my-2 my-sm-0 col-lg-2"
                                type="submit">
                                {search.loading ? "Please wait" :"Search"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-3">
                    <button 
                    onClick={() => setSearch({ ...search, action: "Buy", price: "" })}
                    className= {`col-lg-1 btn ${search.action === "Buy" ? "btn-primary" : "btn-outline-primary"} mr-1`}>
                    Buy</button>
                    <button 
                    onClick={() => setSearch({ ...search, action: "Rent", price: "" })}
                    className={`col-lg-1 btn ${search.action === "Rent" ? "btn-primary" : "btn-outline-primary"} mr-1`}>
                    Rent</button>
                    <button 
                    onClick={() => setSearch({ ...search, type: "House" })}
                    className={`col-lg-1 btn ${search.type === "House" ? "btn-primary" : "btn-outline-primary"} mr-1`}>
                    House</button>
                    <button 
                    onClick={() => setSearch({ ...search, type: "Land" })}
                    className={`col-lg-1 btn ${search.type === "Land" ? "btn-primary" : "btn-outline-primary"} mr-1`}>
                    Land</button>
                    <div className="dropdown">
                        <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            &nbsp;{search?.price ? search.price : "Price Range"}
                        </button>
                        <ul className="dropdown-menu">
                            {search.action === "Buy" ? (
                                <>
                                    {sellPrices?.map((p) => (
                                        <li key={p._id}>
                                            <a
                                                className="dropdown-item"
                                                onClick={() =>
                                                    setSearch({
                                                        ...search,
                                                        price: p.name,
                                                        priceRange: p.array,
                                                    })
                                                }
                                            >
                                                {p.name}
                                            </a>
                                        </li>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {rentPrices?.map((p) => (
                                        <li key={p._id}>
                                            <a
                                                className="dropdown-item"
                                                onClick={() =>
                                                    setSearch({
                                                        ...search,
                                                        price: p.name,
                                                        priceRange: p.array,
                                                    })
                                                }
                                            >
                                                {p.name}
                                            </a>
                                        </li>
                                    ))}
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
