import React, { useEffect, useState } from "react";
import "../assets/css/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ContactForm from "./ContactForm";

export default function Contact() {
  const [finalData, setFinalData] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [contactSearch, setContactSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4300/contacts")
      .then((res) => {
        setFinalData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toggleBtn, fetchData]);

  const handleDeleteContact = (data) => {
    toast("Deleted",{ autoClose: 200 })
    const ContactId = data.id;
    axios
      .delete("http://localhost:4300/contacts/" + ContactId)
      .then((res) => {
        setFetchData(!fetchData);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleContactSearch=(e) => {
    setContactSearch(e.target.value);
  }

  return (
    <>
      <div className="contacts_container">
        <div className="btn_container">
          <div className="contact-search">
            <input onChange={(e) => handleContactSearch(e)} placeholder="Search..." />
          </div>
          <button
            onClick={() => setToggleBtn(!toggleBtn)}
            className="btn btn-primary"
          >
            {toggleBtn ? "View Contact" : "Add Contact"}
          </button>
        </div>
        <div className="contact">
          {toggleBtn && toggleBtn ? (
            <ContactForm setToggleBtn={setToggleBtn} />
          ) : (
            <>
              <table className="table-contact">
                <thead>
                  <tr style={{fontWeight:"bolder",fontSize:"18px"}}>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Contact</td>
                    <td>Date of Birth</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {finalData?.filter((item)=>{
                    return(
                        item.ContactName.toLowerCase().includes(contactSearch)
                    );
                  }).map((item) => {
                    return (
                      <tr style={{lineHeight:"40px"}}>
                        <td>{item.ContactName}</td>
                        <td>{item.ContactEmail}</td>
                        <td>{item.ContactContact}</td>
                        <td>{item.ContactDob}</td>
                        <td>
                          <button
                            style={{
                              color: "white",
                              backgroundColor: "red",
                              padding: "6px 4px",
                            }}
                            className="btn-delete"
                            onClick={() => handleDeleteContact(item)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}
