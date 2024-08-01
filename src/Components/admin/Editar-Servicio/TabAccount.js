import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCollection } from "../../../Redux/reducer/collection"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const ImgStyled = styled('img')(({ theme }) => ({
  width: 200,
  height: 200,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}));

const Createcollection = () => {
  const [imgSrc, setImgSrc] = useState('/images/logos/iconocam.png');
  const dispatch = useDispatch();
  const currentUserEmail = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('decodedToken')) : null;
  console.log('Email del usuario obtenido del local storage:', currentUserEmail);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
   
    const fileInput = document.querySelector('#upload-image');
    const file = fileInput.files[0];
    if (!file) {
     
      toast.error('Por favor, carga una imagen.');

      return;

    }
  
    
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    for (const key in formValues) {
      if (!formValues[key]) {
       
        toast.error(`Por favor, llena el campo "${key}".`);
        
        return;

      }
    }
  
   
    const collectionData = {
      name: formValues.name,
      seasson: formValues.seasson,
      description: formValues.description,
      owner: currentUserEmail.email, 
      blueprints: '' 
    };
  
   
    const formDataImage = new FormData();
    formDataImage.append('file', file);
    formDataImage.append('upload_preset', 'osbs0ds6'); 
    formDataImage.append('cloud_name', 'dot1uumxf'); 
  
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dot1uumxf/image/upload', {
        method: 'POST',
        body: formDataImage
      });
      const data = await response.json();
      if (!response.ok) {
     
        console.error('Error del servidor:', data);
        throw new Error(data.message || 'Error en la solicitud');
      }
      const imageUrl = data.secure_url;
  
     
      collectionData.blueprints = imageUrl;
  
     
      setImgSrc('/images/logos/iconocam.png');
  
      
      console.log('Datos de la coleccion a enviar:', collectionData);
      await dispatch(createCollection(collectionData));
  
     
      e.target.reset();
  
      
      toast.success('¡Coleccion creada exitosamente!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
     
      console.error('Error al crear Coleccion:', error.message);
      toast.error('Error al crear Coleccion.');
    }
  }
  
  const onChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <CardContent>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <Typography style={{ marginTop: '20px', marginBottom: '20px' }} variant="h6" gutterBottom>
          Crea una nueva Coleccion
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' sx={{width:"300px"}} />
              <Box sx={{ marginLeft: '30px' }}>
                <ButtonStyled component='label' variant='contained' htmlFor='upload-image'>
                  Carga una imagen de la coleccion
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='upload-image'
                  />
                </ButtonStyled>
                <Typography variant='body2' sx={{ marginTop: '5px' }}>
                  Modifica las imágenes. Cárgalas en formato jpg o png.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Nombre' placeholder='Nombre de la coleccion' name='name' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Temporada' placeholder='Temporada del año' name='seasson' />
          </Grid>
          <Grid item xs={12} sm={12}>
      <TextField
        fullWidth
        label='Descripción'
        placeholder='Descripción de la colección'
        name='description'
        multiline
        rows={4} // Puedes ajustar el número de filas según tus necesidades
      />
    </Grid>

        
          <Grid item xs={12} sm={6}>
           
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='contained'>
            Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};


export default Createcollection;
