import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, Select, MenuItem, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchproductsByCollection, updateproducts } from '../../../Redux/reducer/products';
import Selecteeed from './Select';
import { setSelectedCollectionId } from '../../../Redux/reducer/collection';

const ProductsComponent = () => {
  const [editableRoomId, setEditableRoomId] = useState(null);
  const [editableRoomValues, setEditableRoomValues] = useState({});
  const [modifiedFields, setModifiedFields] = useState({});
  const dispatch = useDispatch();
  const productsFromRedux = useSelector((state) => state.products.products);
  const selectedcollectionId = useSelector((state) => state.products.selectedcollectionId);

  useEffect(() => {
    if (selectedcollectionId) {
      dispatch(fetchproductsByCollection(selectedcollectionId));
    }
  }, [selectedcollectionId, dispatch]);

  const handleEdit = (roomId) => {
    setEditableRoomId(roomId);
    const room = productsFromRedux.find(room => room._id === roomId);
    setEditableRoomValues(room);
    setModifiedFields({});
  };

  const handleInputChange = (field, value) => {
    setEditableRoomValues(prevValues => ({
      ...prevValues,
      [field]: value
    }));
    setModifiedFields(prevFields => ({
      ...prevFields,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      if (!selectedcollectionId) {
        console.error('Error: selectedcollectionId is undefined');
        return;
      }
      await dispatch(
        updateproducts({
          collectionId: selectedcollectionId,
          roomId: editableRoomId,
          updateproductsData: modifiedFields,
        })
      );
      setEditableRoomId(null);
      setModifiedFields({});
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  const handleCancel = () => {
    setEditableRoomId(null);
  };

  return (
    <div>
      <div style={{ marginBottom: "30px", marginTop: "30px" }}>
        <Selecteeed
          onSelectcollection={(collectionId) => {
            dispatch(setSelectedCollectionId(collectionId));
            dispatch(fetchproductsByCollection(collectionId));
          }}
        />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Imágenes</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(productsFromRedux) && productsFromRedux.map(room => (
              <TableRow key={room._id}>
                <TableCell>
                  {editableRoomId === room._id ? (
                    <TextField
                      value={editableRoomValues.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  ) : (
                    room.name
                  )}
                </TableCell>

                <TableCell>
                  {editableRoomId === room._id ? (
                    <TextField
                      value={editableRoomValues.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  ) : (
                    room.description
                  )}
                </TableCell>

                <TableCell sx={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {editableRoomId === room._id ? (
                    <TextField
                      value={editableRoomValues.images}
                      onChange={(e) => handleInputChange('images', e.target.value)}
                    />
                  ) : (
                    room.images
                  )}
                </TableCell>
                <TableCell>
                  {editableRoomId === room._id ? (
                    <Select
                      value={editableRoomValues.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      fullWidth
                    >
                      <MenuItem value="Activo">Activo</MenuItem>
                      <MenuItem value="Inactivo">Inactivo</MenuItem>
                    </Select>
                  ) : (
                    room.state
                  )}
                </TableCell>
                <TableCell>
                  {editableRoomId === room._id ? (
                    <div>
                      <Button onClick={handleSave}><SaveIcon /> Guardar</Button>
                      <Button onClick={handleCancel}><CancelIcon /> Cancelar</Button>
                    </div>
                  ) : (
                    <Button onClick={() => handleEdit(room._id)}><EditIcon /> Editar</Button>
                  )}
                </TableCell>
              </TableRow>
            )) || []}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductsComponent;