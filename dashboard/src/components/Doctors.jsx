import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdEditNote } from "react-icons/md";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error); // Log the error to the console
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
  }, []);

  const deleteDoctor = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/user/doctors/delete/${id}`,
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        setDoctors(doctors.filter((doctor) => doctor._id !== id));
      } else {
        toast.error("Failed to delete doctor");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting doctor");
    }
  };
  const updateDoctor = (doctor) => {
    navigate("/doctor/addnew", { state: { doctor } });
    // return <Navigate to= {"/doctor/addnew"}  {this.state : {doctor}} />
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
        <section className="page doctors">
      <h1>DOCTORS</h1>
      <div className="banner">
        {doctors && doctors.length > 0 ? (
          doctors.map((element, index) => (
            <div className="card" key={index}>
              <img
                src={element.docAvatar && element.docAvatar.url}
                alt="doctor avatar"
              />
              <h4>{`${element.firstName} ${element.lastName}`}</h4>
              <div className="details">
                <p>
                  Email: <span>{element.email}</span>
                </p>
                <p>
                  Phone: <span>{element.phone}</span>
                </p>
                <p>
                  DOB: <span>{element.dob.substring(0, 10)}</span>
                </p>
                <p>
                  Department: <span>{element.doctorDepartment}</span>
                </p>
                <p>
                  NIC: <span>{element.nic}</span>
                </p>
                <p>
                  Gender: <span>{element.gender}</span>
                </p>
                
              

      </div>
      <div className="icon-container">
                    <div><MdEditNote
                      onClick={() => updateDoctor(element)}
                      style={{ cursor: "pointer" }}
                    /></div>
      <div><FaDeleteLeft
                      onClick={() => deleteDoctor(element._id)}
                      style={{ cursor: "pointer" }}
                    /></div>
    </div>
              </div>
            
            
          ))
        ) : (
          <h1>No Registered Doctors Found!</h1>
        )}
        
      </div>
      
    </section>

    </>
  );
};

export default Doctors;



