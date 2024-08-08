import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceForm.css';

const NewPlace = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      },
      latitude: {
        value: '',
        isValid: false
      },
      longitude: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const placeSubmitHandler = async event => {
    event.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value);
      formData.append('latitude', formState.inputs.latitude.value);
      formData.append('longitude', formState.inputs.longitude.value);
      // console.log('latitude', formState.inputs.latitude.value);

      // You can uncomment the following lines to send the request
      await sendRequest(`${backendUrl}/places`, 'POST', formData, {
        Authorization: 'Bearer ' + auth.token
      });
      navigate('/' + auth.userId + '/places');
    } catch (err) {
      console.error('Error submitting place:', err);
    }
  };

  return (
    <React.Fragment>
      <br></br>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
        />
        <Input
          id="latitude"
          element="input"
          type="number"
          label="Latitude"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid latitude."
          onInput={inputHandler}
        />
        <Input
          id="longitude"
          element="input"
          type="number"
          label="Longitude"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid longitude."
          onInput={inputHandler}
        />
        <Button inverse type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;