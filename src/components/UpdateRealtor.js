import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import '../styles/UpdateRealtor.css'

function UpdateRealtor() {
  const { id } = useParams();
  const [realtor, setRealtor] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
  });
  const navigate = useNavigate ();

  useEffect(() => {
    // Fetch data for the specific realtor using the ID from the URL
    fetch(`http://realty-connect-dev.eba-gxhpdprt.ca-central-1.elasticbeanstalk.com/api/realtor/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched realtor data:', data);
        setRealtor(data);
      })
      .catch((error) => {
        console.error('There was a problem fetching the realtor data: ', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRealtor((prevRealtor) => ({
      ...prevRealtor,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://realty-connect-dev.eba-gxhpdprt.ca-central-1.elasticbeanstalk.com/api/realtor/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(realtor), // Assuming 'realtor' state holds updated data
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Handle success: Realtor details updated successfully
      console.log('Realtor details updated successfully');
      navigate('/realtor');
    } catch (error) {
      // Handle error
      console.error('There was a problem updating the realtor details: ', error);
    }
  };

  return (
    <div className="update-realtor-container">
      <h2>Edit Realtor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={realtor.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={realtor.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={realtor.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateRealtor;
