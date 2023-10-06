
import { useContext } from "react";
import TodoContext from "../../context/TodoContext";
const FilterTodos = () => {
  const { getTodos } = useContext(TodoContext)
  const handleFilter= async (e) =>{
   await getTodos(e.target.value)
  }

  return (
    <div className='col-md-12'>
      <div className="row">
        <div className='col-md-2'>
          <h6>Filter:</h6>
          <select onChange={(e)=>handleFilter(e)} className="form-select form-select-sm">
            <option>All</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="60">60</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterTodos;
