import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollection, updatecollection } from '../../../Redux/reducer/reducer.js'; // Importa updatecollection

const collectionsComponent = () => {
  const [editablecollectionId, setEditablecollectionId] = useState(null);
  const [editablecollectionValues, setEditablecollectionValues] = useState({});
  const [modifiedFields, setModifiedFields] = useState({});

  const dispatch = useDispatch();
  const collectionsFromRedux = useSelector((state) => state.users.entities);

  useEffect(() => {
    dispatch(fetchCollection());
  }, [dispatch]);

  const handleEdit = (collectionId) => {
    setEditablecollectionId(collectionId);
    const collection = collectionsFromRedux.find(collection => collection._id === collectionId);
    setEditablecollectionValues(collection);
    setModifiedFields({});
  };

  const handleInputChange = (field, value) => {
    setEditablecollectionValues(prevValues => ({
      ...prevValues,
      [field]: value
    }));
    setModifiedFields(prevFields => ({
      ...prevFields,
      [field]: true
    }));
  };

  const handleSave = async () => {
    if (window.confirm('¿Estás seguro de que quieres guardar los cambios?')) {
      try {
        const updatedFields = Object.keys(modifiedFields).filter(key => key !== '_id').filter(key => key in editablecollectionValues).reduce((acc, key) => {
          acc[key] = editablecollectionValues[key];

          return acc;

        }, {});
  
        console.log('Objeto a enviar al backend:', updatedFields); 
  
        await dispatch(updatecollection({ id: editablecollectionValues._id, updatedcollection: updatedFields })); 
        setEditablecollectionId(null);
      } catch (error) {
        console.error('Error updating collection:', error);
      }
    }
  };

  const handleCancel = () => {
    setEditablecollectionId(null);
  };

  
  return (
    <div>
      <h2>Tabla de edificios</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Ciudad</TableCell>
              <TableCell>País</TableCell>
              <TableCell>Propietario</TableCell>
              <TableCell>Número de pisos</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collectionsFromRedux && collectionsFromRedux.map(collection => (
              <TableRow key={collection._id}>
                <TableCell>
                  {editablecollectionId === collection._id ? (
                    <TextField
                      value={editablecollectionValues.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  ) : (
                    collection.name
                  )}
                </TableCell>
                <TableCell>
                  {editablecollectionId === collection._id ? (
                    <TextField
                      value={editablecollectionValues.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  ) : (
                    collection.address
                  )}
                </TableCell>
                <TableCell>
                  {editablecollectionId === collection._id ? (
                    <TextField
                      value={editablecollectionValues.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  ) : (
                    collection.description
                  )}
                </TableCell>
                <TableCell>
                  {editablecollectionId === collection._id ? (
                    <TextField
                      value={editablecollectionValues.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                  ) : (
                    collection.city
                  )}
                </TableCell>
                <TableCell>
                  {editablecollectionId === collection._id ? (
                    <TextField
                      value={editablecollectionValues.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                    />
                  ) : (
                    collection.country
                  )}
                </TableCell>
                <TableCell>
                  {editablecollectionId === collection._id ? (
                    <TextField
                      value={editablecollectionValues.owner}
                      onChange={(e) => handleInputChange('owner', e.target.value)}
                    />
                  ) : (
                    collection.owner
                  )}
                </TableCell>
                <TableCell>
                  {editablecollectionId === collection._id ? (
                    <TextField
                      value={editablecollectionValues.numberOfFloors}
                      onChange={(e) => handleInputChange('numberOfFloors', e.target.value)}
                    />
                  ) : (
                    collection.numberOfFloors
                  )}
                </TableCell>
                <TableCell>
                  {editablecollectionId === collection._id ? (
                    <div>
                      <Button onClick={handleSave}><SaveIcon /> Guardar</Button>
                      <Button onClick={handleCancel}><CancelIcon /> Cancelar</Button>
                    </div>
                  ) : (
                    <Button onClick={() => handleEdit(collection._id)}><EditIcon /> Editar</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default collectionsComponent;