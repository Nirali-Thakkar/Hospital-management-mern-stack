import React from 'react'
import Mission from '../components/Mission';
import Biography from '../components/Biography'
import Commitment from '../components/Commitment';

const AboutUs = () => {
  return (
    <>
    {/* <Hero title={"Learn More About us  | ZeeCare Medical Instititute"} imageUrl={"/about.png"}/> */}
    <div style={{ paddingTop: '120px' }}>
  <Biography imageUrl={"/whoweare.png"} />
  <Mission imageUrl={"/about.png"} />
  <Commitment imageUrl={"/whoweare.png"} />
</div>


  
    
    </>
  )
}

export default AboutUs


// import React from 'react';
// import Biography from '../components/Biography'
// import Mission from '../components/Mission';


// const AboutUs = () => {
//   return (
//     <div className="about-us-page">
//       <Biography imageUrl={"/whoweare.png"}/>
//       <Mission imageUrl={"/about.png"} />
//       <div className="about-us-container">
//         <div className="about-us-image">
//           {/* Replace the src with your image path */}
//           <img src="/about.png" alt="About ZeeCare" />
//         </div>
//         <div className="about-us-content">
//           <h1 className="about-us-title">About ZeeCare Medical Institute</h1>
//           <p className="about-us-description">
//             Welcome to ZeeCare Medical Institute, a state-of-the-art facility dedicated to providing comprehensive healthcare services with compassion and expertise. Our team of skilled professionals is committed to delivering personalized care tailored to each patients needs. At ZeeCare, we prioritize your well-being, ensuring a harmonious journey towards optimal health and wellness.
//           </p>
//           <h2 className="about-us-subtitle">Our Mission</h2>
//           <p className="about-us-text">
//             Our mission is to bridge the gap between patients and healthcare providers by offering a seamless and efficient way to book appointments, manage personal health records, and stay informed about your medical status. Whether you are seeking a routine check-up or need to consult a specialist, our platform connects you with qualified doctors across various departments.
//           </p>
//           <h2 className="about-us-subtitle">Who We Are</h2>
//           <p className="about-us-text">
//             Our dedicated team ensures that both users and administrators have access to a secure and responsive environment, enhancing communication and service delivery. Join us as we redefine the way you manage your healthcare needs, making it easier and more convenient to stay on top of your health.
//           </p>
//           <h2 className="about-us-subtitle">Our Commitment</h2>
//           <p className="about-us-text">
//             We are committed to providing the highest quality of care and service to our users, ensuring a smooth and satisfying experience every step of the way. Your health and well-being are our top priorities, and we strive to make every interaction with our platform as beneficial and effective as possible.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;
