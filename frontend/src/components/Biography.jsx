import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='biography container'>
      <div className='banner'>
        <br></br>
        <br></br>
          <img src={imageUrl} alt="aboutimg" style={{ width: '60%', height: 'auto' }}  />
      </div>
      <div className="banner" >
      <p></p>
      <h3>Who We Are</h3>
      <p>Welcome to our online doctor appointment booking system, a comprehensive and user-friendly platform designed to streamline your healthcare experience. Our mission is to bridge the gap between patients and healthcare providers by offering a seamless and efficient way to book appointments, manage personal health records, and stay informed about your medical status. </p>
      <p>Whether you are seeking a routine check-up or need to consult a specialist, our platform connects you with qualified doctors across various departments.</p>

      </div>
    </div>
  )
}

export default Biography