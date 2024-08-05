import React from 'react'

const Commitment = ({imageUrl}) => {
  return (
    <div className='biography container'>
      <div className='banner'>
        <br></br>
        <br></br>
          <img src={imageUrl} alt="aboutimg" style={{ width: '60%', height: 'auto' }}  />
      </div>
      <div className="banner" >
      <p></p>
      <h3>Commitment</h3>
      <p> We are committed to providing the highest quality of care and service to our users, ensuring a smooth and satisfying experience every step of the way. Your health and well-being are our top priorities, and we strive to make every interaction with our platform as beneficial and effective as possible. </p>
      <p>Join us as we redefine the way you manage your healthcare needs, making it easier and more convenient to stay on top of your health.</p>

      </div>
    </div>
  )
}

export default Commitment