import { useAuth } from "../context/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm";
import { useSearch } from "../context/search";

export default function Search() {
  //context
  const [search, setSearch] = useSearch();
  return (
    <div>
      <div className="text-center" style={{padding: "2rem"}}>
            <h1 className="display-4" style={{fontFamily:"Veranda"}}>
            Search for Properties by Location
            </h1>
            <SearchForm />
        </div>

      <div className="container">
        <div className="row">
          {search.results?.length > 0 ? (
            <>
              <div className="col-md-12 text-center p-5">
                Found {search.results?.length} results
              </div>
            </>
          ) : (
            <div className="col-md-12 text-center p-5">No properties found</div>
          )}
        </div>
        
        <div className="row">
            {search.results?.map((item) => (
              <AdCard ad={item} key={item._id}/>
            ))}
        </div>
      </div>
    </div>
  );
}
