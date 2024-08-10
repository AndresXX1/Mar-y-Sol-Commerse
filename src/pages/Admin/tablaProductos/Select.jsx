import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setSelectedCollectionId } from '../../../Redux/reducer/products';

const Selecteeed = ({ onSelectcollection }) => {
    const [collections, setcollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedcollectionId, setSelectedcollectionIdLocal] = useState('');
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchcollectionNames = async () => {
            try {
                const response = await axios.get('/collection');
                setcollections(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching collection names:', error);
                setLoading(false);
            }
        };

        fetchcollectionNames();
      }, []);
      
      const selectedcollection = collections.find(collection => collection._id === selectedcollectionId);
      const selectedcollectionName = selectedcollection ? selectedcollection.name : '';

    const handlecollectionChange = (event) => {

        const selectedId = event.target.value;
        console.log("Selected collection ID:", selectedId);
        setSelectedcollectionIdLocal(selectedId);
        dispatch(setSelectedCollectionId(selectedId));
        onSelectcollection(selectedId);
        console.log("Fetching products for collection ID:", selectedId);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
      <div>
         <div style={{marginBottom:"35px"}}>
          <h2 >Coleccion:  {selectedcollectionName}</h2>
         </div>
      <FormControl fullWidth>
          <InputLabel >Coleccion</InputLabel>
          <Select
              labelId="collection-select-label"
              id="collection-select"
              value={selectedcollectionId}
              onChange={handlecollectionChange}
              fullWidth
          >
              
              {collections.map(collection => (
                  <MenuItem key={collection._id} value={collection._id}>{collection.name}</MenuItem>
              ))}
          </Select>
      </FormControl>
      </div>
  );
};

export default Selecteeed;

