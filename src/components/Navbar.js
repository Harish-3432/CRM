import React from 'react'
import { Link } from 'react-router-dom';
import '../assets/css/style.css';

export default function Navbar(props) {
  return (
    <>
        <nav className="side-bar" >
            <div className="header_side_bar_open">
                <h2>
                    {props.title}
                </h2>
            </div>
            <hr/>
            <div className="profile_side_bar_open">
                <div className="profile_pic">
                {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHVw73hcnPKL5QIgwwCDi0Aqf2_BmAIB0lWA&usqp=CAU" alt="Profile Photo" /> */}
                </div>
                <div className="profile_name">
                    <h3>{props.profile_name}</h3>
                    <p>jack@gmail.com</p>
                </div>
                
            </div>
            <div className='side_bar_open_menu' >
                <ul>
                    <li><Link className='link_style' to="/" >Dashboard</Link></li>
                    <li><Link className='link_style' to="/task"> Task</Link></li>
                    <li>Email</li>
                    <li><Link className='link_style' to="/contact" >Contact</Link></li>
                    <li><Link className='link_style' to="/chat"> Chat </Link></li>
                    <li>Deals</li>
                </ul>
            </div>
            <hr/>
                    <div className="setting_menu">
                        <ul>
                            <li>
                                Settings
                            </li>
                        </ul>
                    </div>
        </nav>
        
    </>
  )
}
