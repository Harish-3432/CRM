import React from 'react';
import '../assets/css/style.css';
// import Navbar from './Navbar';

export default function Dashboard() {
  return (
        <>
            <div className="dashboard">
                <h2>TO-DO Dashboard</h2>
            </div>

            <div className='deals' >
               <h2>TO-DO Deals</h2>
           </div>

           <div className='tasks'>
             <h2>TO-DO Tasks</h2>
           </div>
        </>
  )
}
