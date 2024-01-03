import React ,{useState} from 'react';
import axios from 'axios';
import "../assets/css/style.css";

const initialDataContact = {
    ContactName:"",
    ContactEmail:"",
    ContactContact:"",
    ContactDob:""
}

export default function ContactForm({setToggleBtn}) {

    const [contactData,setContactData] = useState(initialDataContact)

    const handleContactFormChange =(e) => {
        const {name,value} = e.target;
        switch(name){
            case "ContactName":
                setContactData((prev)=>({...prev,ContactName:value}));
                break;
            case "ContactEmail":
                setContactData((prev)=>({...prev,ContactEmail:value}));
                break;
            case "ContactContact":
                setContactData((prev)=>({...prev,ContactContact:value}));
                break;
            case "ContactDob":
                setContactData((prev)=>({...prev,ContactDob:value}));
                break;
            default:
                break;
            
        }
    }

    

    const handleSubmitContact = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4300/contacts",contactData).then((res)=>{
            setToggleBtn(false);
        }).catch((err)=>{
            console.log(err)
        })
      }

  return (
    <>
<div className="main-contactForm">
<div className='contactForm' >
        <form onSubmit={handleSubmitContact} >
            <h1>Add Details</h1>
            <input autoComplete='off' name="ContactName" onChange={(e)=>handleContactFormChange(e)} required placeholder='Enter Name' />
            <input autoComplete='off' name="ContactEmail" onChange={(e)=>handleContactFormChange(e)} required placeholder='Enter Email ' />
            <input autoComplete='off' name="ContactContact" onChange={(e)=>handleContactFormChange(e)} required type='number' placeholder='Enter Contact ' />
            <input autoComplete='off' name="ContactDob" onChange={(e)=>handleContactFormChange(e)} required type="date" placeholder='Enter DOB ' />
            <button type='submit' className='btn-primary btn-contact-submit' >Submit</button>
        </form>
        </div>
</div>
    </>
  )
}
