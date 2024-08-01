import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchproductsByCollection, updateproducts } from '../../../Redux/reducer/products';
import Selecteeed from './Select';
import { setSelectedCollectionId } from '../../../Redux/reducer/collection'; 
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const productsComponent = () => {
    const [editableRoomId, setEditableRoomId] = useState(null);
    const [editableRoomValues, setEditableRoomValues] = useState({});
    const [modifiedFields, setModifiedFields] = useState({});
    const dispatch = useDispatch();
    const productsFromRedux = useSelector((state) => state.products.products);
    console.log("products from Redux:", productsFromRedux);
    const selectedcollectionId = useSelector((state) => state.products.selectedcollectionId);
    const [openDescriptionDialog, setOpenDescriptionDialog] = useState({});
    const [openLocationDialog, setOpenLocationDialog] = useState({});
  

    useEffect(() => {
        console.log("Selected collection ID:", selectedcollectionId);
        if (selectedcollectionId) {
            dispatch(fetchproductsByCollection(selectedcollectionId));
        }
    }, [selectedcollectionId, dispatch]);

    useEffect(() => {
        console.log("products from Redux:", productsFromRedux);
    }, [productsFromRedux]);

    
  const handleEdit = (roomId) => {
    setEditableRoomId(roomId);
    const room = productsFromRedux.find(room => room._id === roomId); 
    console.log("Editing Room:", room);
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

  const openDescriptionDialogFunc = (roomId) => {
    setOpenDescriptionDialog(prev => ({...prev, [roomId]: true }));
  };
  
  const closeDescriptionDialog = (roomId) => {
    setOpenDescriptionDialog(prev => ({...prev, [roomId]: false }));
  };
   
   const openLocationDialogFunc = (roomId) => {
    setOpenLocationDialog(prev => ({...prev, [roomId]: true }));
   };
   
   const closeLocationDialog = (roomId) => {
    setOpenLocationDialog(prev => ({...prev, [roomId]: false }));
   };


  return (
    <div>
      
      <div style={{marginBottom:"30px",marginTop:"30px"}}>

      <Selecteeed  
  onSelectcollection={(collectionId) => {
    dispatch(setSelectedCollectionId(collectionId)); 
    dispatch(fetchproductsByCollection(collectionId));
    console.log("ACAAAAAAAAA:", productsFromRedux); 
  }} 
/> 
      </div>
     
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Ubicación</TableCell>
              <TableCell>Equipamiento</TableCell>
           
              <TableCell>Número de piso</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Imágenes</TableCell>
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
  {editableRoomId === room._id? (
    <TextField
      value={editableRoomValues.location}
      onChange={(e) => handleInputChange('location', e.target.value)}
      onClick={() => {
        
        if (openLocationDialog[room._id]) {
          closeLocationDialog(room._id);
        }
        
        openLocationDialogFunc(room._id);
      }}
    />
  ) : (
    room.location
  )}
  <Dialog open={openLocationDialog[room._id]} onClose={() => closeLocationDialog(room._id)}>
    <DialogTitle>Escribir ubicacion</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="Descripción"
        type="text"
        fullWidth
        multiline
        rows={4}
        rowsMax={10}
        value={editableRoomValues.location || ''}     
        onChange={(e) => {
          setEditableRoomValues(prevValues => ({
           ...prevValues,
            location: e.target.value, 
          }));
        }}
        variant="outlined"
        sx={{ width: '500px' }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => closeLocationDialog(room._id)}>Cancelar</Button>
      <Button onClick={() => closeLocationDialog(room._id)}>Guardar</Button>
    </DialogActions>
  </Dialog>
</TableCell>
                <TableCell>
                  {editableRoomId === room.id ? (
                    <TextField
                      value={editableRoomValues.equipment}
                      onChange={(e) => handleInputChange('equipment', e.target.value)}
                    />
                  ) : (
                    room.equipment
                  )}
                </TableCell>

                <TableCell>
                  {editableRoomId === room._id ? (
                    <TextField
                      type="number"
                      value={editableRoomValues.floorNumber}
                      onChange={(e) => handleInputChange('floorNumber', parseInt(e.target.value))}
                    />
                  ) : (
                    room.floorNumber
                  )}
                </TableCell>
                <TableCell>
  {editableRoomId === room._id? (
    <TextField
      value={editableRoomValues.description}
      onChange={(e) => handleInputChange('description', e.target.value)}
      onClick={() => {
      
        if (openDescriptionDialog[room._id]) {
          closeDescriptionDialog(room._id);
        }
      
        openDescriptionDialogFunc(room._id);
      }}
    />
  ) : (
    room.description
  )}
  <Dialog open={openDescriptionDialog[room._id]} onClose={() => closeDescriptionDialog(room._id)}>
    <DialogTitle>Escribir descripción</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="Descripción"
        type="text"
        fullWidth
        multiline
        rows={4}
        rowsMax={10}
        value={editableRoomValues.description || ''}     
        onChange={(e) => {
          setEditableRoomValues(prevValues => ({
         ...prevValues,
            description: e.target.value, 
          }));
        }}
        variant="outlined"
        sx={{ width: '500px' }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => closeDescriptionDialog(room._id)}>Cancelar</Button>
      <Button onClick={() => closeDescriptionDialog(room._id)}>Guardar</Button>
    </DialogActions>
  </Dialog>
</TableCell>
                <TableCell>
                  {editableRoomId === room.id ? (
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

export default productsComponent;