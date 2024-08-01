import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSelectedCollectionId } from '../../../Redux/reducer/products';

const CollectionSelect2 = ({ onSelectcollection }) => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCollectionId, setSelectedCollectionIdLocal] = useState('');
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchCollectionNames = async () => {
            try {
                const response = await axios.get('/collection');
                setCollections(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching collection names:', error);
                setLoading(false);
            }
        };

        fetchCollectionNames();
    }, []);
    
    const handleCollectionChange = (event) => {
        const selectedId = event.target.value;
        console.log("Selected collection ID:", selectedId);
        setSelectedCollectionIdLocal(selectedId);
        dispatch(setSelectedCollectionId(selectedId)); 
        if (typeof onSelectcollection === 'function') {
            onSelectcollection(selectedId);
        } else {
            console.error('onSelectcollection no es una función');
        }
        console.log("Fetching products for collection ID:", selectedId);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel>Coleccion</InputLabel>
                <Select
                    labelId="collection-select-label"
                    id="collection-select"
                    value={selectedCollectionId}
                    onChange={handleCollectionChange}
                    fullWidth
                >
                    {collections.map(collection => (
                        <MenuItem key={collection._id} value={collection._id}>
                            {collection.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default CollectionSelect2;