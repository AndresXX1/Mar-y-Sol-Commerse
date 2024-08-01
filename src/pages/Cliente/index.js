import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchproductsByCollection, updateproducts,setSelectedcollectionId } from '../../Redux/reducer/products';
import Selecteeed from '../../pages/Admin/tablaOficinas/Select';
import Cards from '../../Components/Cliente/Cards/cards'; // Asegúrate de que este es el componente correcto
import { Grid } from '@mui/material';
import Filter from "../../Components/Cliente/Filter/filter"

const productsComponent = () => {
  const [editableRoomId, setEditableRoomId] = useState(null);
  const [editableRoomValues, setEditableRoomValues] = useState({});
  const [modifiedFields, setModifiedFields] = useState({});
  const dispatch = useDispatch();
  const productsFromRedux = useSelector((state) => state.products.products);
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
      setOpenDescriptionDialog({});
      setOpenLocationDialog({});
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div style={{ marginBottom: "30px", marginTop: "30px" }}>
          <Selecteeed
            onSelectcollection={(collectionId) => {
              dispatch(setSelectedcollectionId(collectionId));
              dispatch(fetchproductsByCollection(collectionId));
            }}
          />
        </div>
        <Grid item xs={10} sx={{marginBottom: "20px"}}>
        <Filter />
        </Grid>
      </Grid>
      <Grid item xs={20}>
        <Cards data={productsFromRedux} />
      </Grid>
    </Grid>
  );
};

export default productsComponent;