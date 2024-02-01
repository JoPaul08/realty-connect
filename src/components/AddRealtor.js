import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import '../styles/AddRealtor.css'

function AddRealtor() {
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate ();

  // Fetch existing realtor IDs
  useEffect(() => {
    fetch('http://realty-connect-dev.eba-gxhpdprt.ca-central-1.elasticbeanstalk.com/api/realtor')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const existingIds = data.map((realtor) => realtor.id);
        const nextAvailableId = findNextAvailableId(existingIds);
        setId(nextAvailableId.toString());
      })
      .catch((error) => {
        console.error('There was a problem fetching realtor IDs: ', error);
      });
  }, []);

  // Function to find the next available ID
  const findNextAvailableId = (existingIds) => {
    let nextId = 1;
    while (existingIds.includes(nextId)) {
      nextId++;
    }
    return nextId;
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a JSON object with the new realtor data
    const newRealtor = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    try {
      const response = await fetch(
        'http://realty-connect-dev.eba-gxhpdprt.ca-central-1.elasticbeanstalk.com/api/realtor',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRealtor),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle success: Realtor added successfully
      console.log('New realtor added successfully');
      navigate('/realtor');
    } catch (error) {
      // Handle error
      console.error('There was a problem adding the realtor: ', error);
    }
  };

  return (
    <div className="add-realtor-container">
      <h2>Add Realtor</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for ID, firstName, lastName, email */}
        <div hidden>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={handleIdChange}
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddRealtor;
