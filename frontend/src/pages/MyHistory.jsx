
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Hero from '../components/Hero'


const MyHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const { isAuthenticated, user } = useContext(Context);

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/user/patient/appointment", { withCredentials: true });
        setAppointments(data.appointments);
      } catch (error) {
        toast.error("Error fetching appointments");
      }
    };

    if (isAuthenticated) {
      fetchUserAppointments();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
    <Hero title={"Your Scheduled Appointment Status | ZeeCare Medical Institute" } imageUrl={"/signin.png"}/>
    <section className="my-history page">
      <h2>My History</h2>
      <div className="personal-details">
        <h3>Personal Details</h3>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="appointments-history">
        <h3>My Appointments</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.appointmentDate.substring(0, 16)}</td>
                  <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                  <td>{appointment.department}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No Appointments Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
    </>
  );
};

export default MyHistory;

// // // src/pages/MyHistory.js

// import React, { useContext, useEffect, useState } from "react";
// import { Context } from "../main";
// import { Navigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const MyHistory = () => {
//   const [appointments, setAppointments] = useState([]);
//   const { isAuthenticated, user } = useContext(Context);

//   useEffect(() => {
//     const fetchUserAppointments = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:4000/api/v1/user/patient/appointment", { withCredentials: true });
//         setAppointments(data.appointments);
//       } catch (error) {
//         toast.error("Error fetching appointments");
//       }
//     };

//     if (isAuthenticated) {
//       fetchUserAppointments();
//     }
//   }, [isAuthenticated]);

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <section className="my-history page">
//       <h2>My History</h2>
//       <div className="personal-details">
//         <h3>Personal Details</h3>
//         <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//       </div>
//       <div className="appointments-history">
//         <h3>My Appointments</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Doctor</th>
//               <th>Department</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.length > 0 ? (
//               appointments.map((appointment) => (
//                 <tr key={appointment._id}>
//                   <td>{appointment.appointmentDate.substring(0, 16)}</td>
//                   <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
//                   <td>{appointment.department}</td>
//                   <td>{appointment.status}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4">No Appointments Found!</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// };
// export default MyHistory;
