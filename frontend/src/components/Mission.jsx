import React from 'react'

const Mission = ({imageUrl}) => {
  return (
    <div className='container biography'>
      
      <div className="banner">
      <p></p>
      
      <p>
      <h3>Mission</h3> Our mission is to bridge the gap between patients and healthcare providers by offering a seamless and efficient way to book appointments, manage personal health records, and stay informed about your medical status. Whether you are seeking a routine check-up or need to consult a specialist, our platform connects you with qualified doctors across various departments.
      <br></br>
      Our dedicated team ensures that both users and administrators have access to a secure and responsive environment, enhancing communication and service delivery.</p>

      </div>

      <div className='banner'>
  <img src={imageUrl} alt="aboutimg" style={{ width: '60%', height: 'auto' }} />
</div>
    </div>
  )
}

export default Mission