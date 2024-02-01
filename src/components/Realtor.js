import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/Realtor.css'

function Realtor() {
  const [realtorData, setRealtorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    fetch('http://realty-connect-dev.eba-gxhpdprt.ca-central-1.elasticbeanstalk.com/api/realtor')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);
        setRealtorData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('There was a problem fetching the data: ', error);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    // Perform deletion logic here using the ID
    fetch(`http://realty-connect-dev.eba-gxhpdprt.ca-central-1.elasticbeanstalk.com/api/realtor/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // If deletion was successful, update the realtorData state to remove the deleted realtor
        setRealtorData(realtorData.filter((realtor) => realtor.id !== id));
      })
      .catch((error) => {
        console.error('There was a problem deleting the realtor: ', error);
      });
  };

  const handleAddRealtor = () => {
    navigate('/addrealtor');
  };

  const handleEditRealtor = (realtorId) => {
    navigate(`/updaterealtor/${realtorId}`);
  };

  return (
    <div className="realtor-container">
      <h2>Realtors</h2>
      <button onClick={handleAddRealtor}>Add Realtor</button>
      <table>
        <thead>
          <tr>
            <th hidden>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="6">Loading...</td>
            </tr>
          ) : realtorData.length === 0 ? (
            <tr>
              <td colSpan="6">No realtor data available</td>
            </tr>
          ) : (
            realtorData.map((realtor) => (
              <tr key={realtor.id}>
                <td hidden>{realtor.id}</td>
                <td>{realtor.firstName}</td>
                <td>{realtor.lastName}</td>
                <td>{realtor.email}</td>
                <td>
                  <button aria-label="Edit Realtor" onClick={() => handleEditRealtor(realtor.id)}>
                    <FaEdit />
                  </button>
                </td>
                <td>
                  <button aria-label="Delete Realtor" onClick={() => handleDelete(realtor.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Realtor;
