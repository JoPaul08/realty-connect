import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/Property.css'

function Property() {
  const [propertyData, setPropertyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    fetch('http://realty-connect-dev.eba-gxhpdprt.ca-central-1.elasticbeanstalk.com/api/property')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched property data:', data);
        setPropertyData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('There was a problem fetching the property data: ', error);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    // Perform deletion logic here using the ID
    fetch(`http://realty-connect-dev.eba-gxhpdprt.ca-central-1.elasticbeanstalk.com/api/property/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // If deletion was successful, update the propertyData state to remove the deleted property
        setPropertyData(propertyData.filter((property) => property.id !== id));
      })
      .catch((error) => {
        console.error('There was a problem deleting the property: ', error);
      });
  };

  const handleAddProperty = () => {
    navigate('/addproperty');
  };

  const handleEditProperty = (propertyId) => {
    navigate(`/updateproperty/${propertyId}`);
  };

  return (
    <div className="property-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : propertyData.length > 0 ? (
        <div>
          <h2>Properties</h2>
          <button onClick={handleAddProperty}>Add Property</button>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Address</th>
                <th>Bedrooms</th>
                <th>Bathrooms</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {propertyData.map((property) => (
                <tr key={property.id}>
                  <td>{property.id}</td>
                  <td>{property.title}</td>
                  <td>{property.description}</td>
                  <td>{property.address}</td>
                  <td>{property.bedrooms}</td>
                  <td>{property.bathrooms}</td>
                  <td>${property.price}</td>
                  <td>
                  <button aria-label="Edit Property" onClick={() => handleEditProperty(property.id)}>
                    <FaEdit />
                  </button>
                </td>
                <td>
                <button aria-label="Delete Property" onClick={() => handleDelete(property.id)}>
                    <FaTrash />
                  </button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No property data available</p>
      )}
    </div>
  );
}

export default Property;
