import React from 'react'
import "../assets/css/style.css";


export default function FilterTask(props) {

    const handleFilterTask = (e) => {
            props.filterValueSelected(e.target.value);
    }
  return (
        <> 
            <div className="filter-task">
                <select className='filter-task-select' name = "status" onChange={(e)=>handleFilterTask(e)}>
                    <option value="All">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            
            </div>
        </>
  )
}
