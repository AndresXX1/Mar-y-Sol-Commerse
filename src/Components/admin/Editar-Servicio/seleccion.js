import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollectionById } from "../../../Redux/reducer/collection";
import { updatecollection } from "../../../Redux/reducer/reducer";
import axios from 'axios';
import React from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

// ** Custom Component Imports
import Selecteeed from '../../../pages/Admin/tablaProductos/Select';

// ** Toastify Imports
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImgStyled = styled('img')(({ theme }) => ({
  width: 200,
  height: 200,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center',
  },
}));

const TabAccount = () => {
  const [imgSrc, setImgSrc] = useState('/images/logos/iconocam.png');
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    seasson: '',
    description: '',
  });

  const dispatch = useDispatch();
  const collection = useSelector((state) => state.collection.collection);

  useEffect(() => {
    if (collection) {
      console.log('Fetched collection Data:', collection);
      setImgSrc(collection.blueprints || '/images/logos/iconocam.png');
      setFormData({
        name: collection.name || '',
        seasson: collection.seasson || '',
        description: collection.description || '',
      });
    }
  }, [collection]);

  console.log("dsdsdasds", collection?.name)

  const onChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(files[0]);
      setImageFile(files[0]);
    }
  };

  const handlecollectionSelect = (id) => {
    dispatch(fetchCollectionById(id));
    console.log('Selected collection ID:', id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedFormData = { ...formData };

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'osbs0ds6');
      formData.append('cloud_name', 'dot1uumxf');
      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dot1uumxf/image/upload', formData);
        updatedFormData.blueprints = response.data.secure_url;
      } catch (error) {
        toast.error('Error uploading image', { autoClose: 2000, onClose: () => window.location.reload() });
        return;
      }
    }

    console.log('Updated Form Data:', updatedFormData);

    try {
      await dispatch(updatecollection({ id: collection._id, updatedcollection: updatedFormData }));
      toast.success('Collection updated successfully', { autoClose: 1200, onClose: () => window.location.reload() });
    } catch (error) {
      toast.error('Error updating collection', { autoClose: 1200, onClose: () => window.location.reload() });
    }
  };

  return (
    <CardContent>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <Selecteeed onSelectcollection={handlecollectionSelect} />
        <Typography style={{ marginTop: '10px', marginBottom: '20px' }} variant="h6" gutterBottom>
          Seleccione una Coleccion
        </Typography>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '0px' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' sx={{ width: "300px" }} />
              <Box style={{ marginLeft: '30px' }}>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Cambia la imagen de la coleccion
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Modifica las imagenes! :D Cargalas en formato jpg y png.
                </Typography>
              </Box>
            </Box>
            <Typography style={{ marginTop: '70px', marginBottom: '-20px' }} variant="h6" gutterBottom>
              Modifica los datos del servicio
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Nombre'
              placeholder={collection?.name || 'Ej: complejo Esperanza'}
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Temporada'
              placeholder={collection?.seasson || 'Ej: Primavera'}
              name='seasson'
              value={formData.seasson}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label='Descripción'
              placeholder={collection?.description || 'Ej: Descripción del servicio'}
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
            />
          </Grid>
        </Grid>

        <Grid container spacing={6}>
          {/* Aquí puede ir el textarea para Bio si es necesario */}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button style={{ marginTop: '60px' }} type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
            Guardar Cambios
          </Button>
        </Grid>
      </form>
    </CardContent>
  );
}

export default TabAccount;