import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import '../styles/AddProperty.css'


function AddProperty() {
    const navigate = useNavigate ();
    const [property, setProperty] = useState({
        id: '',
        title: '',
        description: '',
        address: '',
        bedrooms: 0,
        bathrooms: 0,
        price: 0,
        userId: 1,
      });

    // Fetch existing property IDs
    useEffect(() => {
        fetch('http://realty-connect-dev.eba-gxhpdprt.ca-central-1.elasticbeanstalk.com/api/property')
        .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const existingIds = data.map((property) => property.id);
        const nextAvailableId = findNextAvailableId(existingIds);
        setProperty((prevProperty) => ({
          ...prevProperty,
          id: nextAvailableId.toString(),
        }));
      })
      .catch((error) => {
        console.error('There was a problem fetching property IDs: ', error);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://realty-connect-dev.eba-gxhpdprt.ca-central-1.elasticbeanstalk.com/api/property',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(property),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('New property added successfully');
      navigate('/property');
      // Handle success: Redirect or perform any necessary action
    } catch (error) {
      console.error('There was a problem adding the property: ', error);
    }
  };

  return (
    <div className="add-property-container">
      <h2>Add Property</h2>
      <form onSubmit={handleSubmit}>
        <div hidden>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={property.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={property.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={property.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={property.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="bedrooms">Bedrooms:</label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={property.bedrooms}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="bathrooms">Bathrooms:</label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={property.bathrooms}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={property.price}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
}

export default AddProperty;
