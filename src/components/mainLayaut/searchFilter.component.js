import React,{ useState, useContext } from 'react'
import { BlogContext } from '../../store/blogContext';

const SearchFilter = ({data}) => {
    const [searchTextFilter, setSearchFilter] = useState('');
    const { filterDataHandler, filterData } = useContext(BlogContext);


    const handleSearch = () => {
     const filteredData = filterData.filter((blog) => blog.title.toLowerCase().includes(searchTextFilter.toLowerCase()))
     console.log(filteredData);
     filterDataHandler(filteredData)
    }

  return (
    <div class="input-group" style={{ paddingTop: "1rem",paddingRight: "0.5rem", display: "flex", justifyContent: "flex-end"}}>
    <div id="search-autocomplete" class="form-outline" data-mdb-input-init>
      <input type="search" id="form1" class="form-control" placeholder='Search...' onChange={(e) => {setSearchFilter(e.target.value)}} />
      {/* <label class="form-label" for="form1">Search</label> */}
    </div>
    <button onClick={handleSearch} type="button" class="btn btn-primary" data-mdb-ripple-init>
      <i class="fas fa-search"></i>
    </button>
  </div>
  )
}

export default SearchFilter