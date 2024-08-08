import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Button from '../../shared/components/FormElements/Button';
import '../components/PlaceList.css';

const UserPlaces = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${backendUrl}/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {
      }
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = deletedPlaceId => {
    setLoadedPlaces(prevPlaces =>
      prevPlaces.filter(place => place.id !== deletedPlaceId)
    );
  };

  return (
    <React.Fragment>
    
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}

{!isLoading && !loadedPlaces && ( // Show message if no places
        <div className="place-list center">
          <Card>
            <h2>No places found. Maybe create one?</h2>
            <Button inverse to="/newPlace">Share Place</Button> {/* Update to correct route */}
          </Card>
        </div>
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
