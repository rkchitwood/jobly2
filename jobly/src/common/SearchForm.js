import React, { useState } from "react";
import "./SearchForm.css";

/** search widget that appears on companylist and joblist so user can filter results */

function SearchForm({ searchFor }){
    const [searchTerm, setSearchTerm] = useState("");

    /** tell parent to filter */
    function handleSubmit(evt){
        evt.preventDefault();
        searchFor(searchTerm.trim() || undefined);
        setSearchTerm(evt.target.value);
    }
    return (
        <div className="SearchForm mb-4">
          <form className="form-inline" onSubmit={handleSubmit}>
            <input
                className="form-control form-control-lg flex-grow-1"
                name="searchTerm"
                placeholder="Enter search term.."
                value={searchTerm}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn-lg btn-primary">
              Submit
            </button>
          </form>
        </div>
    );
}
  
export default SearchForm;
