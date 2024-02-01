import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/UpdateProperty.css'

function UpdateProperty() {
  const { id } = useParams();
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
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data for the specific property using the ID from the URL
    fetch(`http://realty-connect-dev.eba-gxhpdprt.ca-central-1.elasticbeanstalk.com/api/property/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched property data:', data);
        setProperty(data);
      })
      .catch((error) => {
        console.error('There was a problem fetching the property data: ', error);
      });
  }, [id]);

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
      const response = await fetch(`http://realty-connect-dev.eba-gxhpdprt.ca-central-1.elasticbeanstalk.com/api/property/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(property),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Property details updated successfully');
      navigate('/property');
    } catch (error) {
      console.error('There was a problem updating the property details: ', error);
    }
  };

  return (
    <div className="update-property-container">
      <h2>Edit Property</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateProperty;
