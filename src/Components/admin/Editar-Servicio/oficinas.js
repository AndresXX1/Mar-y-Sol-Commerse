import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  CardContent,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  styled,
} from '@mui/material';
import { Widget } from 'cloudinary-react';
import CloseIcon from '@mui/icons-material/Close';
import BuildingSelect2 from './selectcollection';
import { fetchCollectionById } from '../../../Redux/reducer/collection';
import { createproducts } from '../../../Redux/reducer/products';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
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

const TabSecurity = () => {
  const [imgSrc, setImgSrc] = useState('/images/logos/iconocam.png');
  const [floorPlanImage, setFloorPlanImage] = useState('/images/logos/iconocam.png');
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const [offices, setOffices] = useState([
    {
      office: 'Oficina 1',
      name: '',
      offer: '',
      description: '',
      size: [],
      color: [], // Asegúrate de que este valor sea un array
      booking: [],
      state: '',
    },
  ]);

  const [images, setImages] = useState([]);
  const [cloudinaryImages, setCloudinaryImages] = useState([]);
  const [plans, setPlans] = useState(''); // Estado para la imagen del plano de piso
  const [showMessage, setShowMessage] = useState(false);
  const [selectedcollectionId, setSelectedcollectionId] = useState('');
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.async = true;
    script.onload = () => {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: 'dot1uumxf',
          uploadPreset: 'osbs0ds6',
          theme: 'dark',
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            console.log('Imagen subida exitosamente:', result.info.secure_url);
            setImages((prevImages) => [...prevImages, result.info.secure_url]);
            setCloudinaryImages((prevImages) => [...prevImages, result.info]);
          } else {
            console.error('Error al subir la imagen:', error);
          }
        }
      );
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleBuildingSelect = (id) => {
    setSelectedcollectionId(id); // Actualiza el ID del edificio seleccionado
    dispatch(fetchCollectionById(id));
    console.log('Selected Building ID:', id);
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    const updatedCloudinaryImages = [...cloudinaryImages];
    updatedCloudinaryImages.splice(index, 1);
    setCloudinaryImages(updatedCloudinaryImages);
  };

  const handleOfficeChange = (e, index, field) => {
    const { value } = e.target;
    const newValue = field === 'floor' ? parseInt(value, 10) : value;
    const newOffices = [...offices];
    newOffices[index][field] = newValue;
    setOffices(newOffices);
  };


  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'osbs0ds6');
  
    const response = await fetch('https://api.cloudinary.com/v1_1/dot1uumxf/image/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setPlans(data.secure_url); 
    setFloorPlanImage(data.secure_url); 
  };


  const handleSubmit = () => {
    const officeData = offices[0]; 

    const productData = {
      
      name: officeData.name,
      booking: [],
      description: officeData.description,
      size: officeData.size,
      color: officeData.color,
      type: officeData.type,
      images: images,
      plans: plans,
      state: officeData.state
    };
    console.log('Datos a enviar:', {
      collectionId: selectedcollectionId,
      productData,
    });

    if (selectedcollectionId) {
      dispatch(createproducts({ collectionId: selectedcollectionId, productData }))
        .unwrap()
        .then((response) => {
          toast.success('¡Oficina creada exitosamente!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log('Room created successfully:', response);
          

        })
        .catch((error) => {
          toast.error('Error al crear la oficina.');
          console.error('Error creating room:', error);
          
        });
    } else {
      toast.error('No building selected');
      console.error('No building selected');
      
    }
  };

  const handleButtonClick = () => {
    router.push('/Admin/tablaOficinas/');
  };

  return (
    <React.Fragment>
      <Typography style={{ marginTop: '50px', marginLeft: '20px', textAlign: 'left' }} variant="h6" gutterBottom>
        CREA UN NUEVO PRODUCTO
      </Typography>
      <CardContent sx={{ paddingBottom: 0 }}>
      <ToastContainer />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ marginTop: '-60px', marginLeft: '70px', marginBottom: '30px' }}>
              <Button variant="contained" onClick={handleButtonClick}>
                Edicion de todas las oficinas
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: '20px' }}>
          <Typography style={{ marginTop: '20px', marginBottom: '10px' }} variant="h6" gutterBottom>
            Seleccione la coleccion donde creara el producto
          </Typography>
          <Box sx={{ marginBottom: '10px' }}>
            <BuildingSelect2 onSelectBuilding={handleBuildingSelect} />
          </Box>
        </Box>
        <Typography style={{ marginTop: '30px', marginBottom: '-12px' }} variant="h6" gutterBottom>
            Datos del producto nuevo
          </Typography>
      </CardContent>
      <form>
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          {offices.map((office, index) => (
            <Box key={index} mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    value={office.name}
                    onChange={(e) => handleOfficeChange(e, index, 'name')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id={`size-label-${index}`}>Talles disponibles</InputLabel>
                    <Select
                      labelId={`size-label-${index}`}
                      multiple
                      value={office.size}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 300,
                            marginTop: 8,
                            position: 'fixed',
                          },
                        },
                      }}
                      onChange={(event) => {
                        const selectedValues = event.target.value;
                        if (selectedValues.length <= 6) {
                          const newOffices = [...offices];
                          newOffices[index].size = selectedValues;
                          setOffices(newOffices);
                        } else {
                          setShowMessage(true);
                        }
                      }}
                    >
                      <MenuItem value="rojo">SS</MenuItem>
                      <MenuItem value="Negro">S</MenuItem>
                      <MenuItem value="Azul">L</MenuItem>
                      <MenuItem value="Verde">X</MenuItem>
                      <MenuItem value="Amarillo">XL</MenuItem>
                      <MenuItem value="Violeta">XXL</MenuItem>

                    </Select>
                    {showMessage && (
                      <Typography variant="body2" color="error">
                        Solo puede elegir 6 colores disponibles.
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Descripción"
                    value={office.description}
                    multiline
                    rows={4}
                    onChange={(e) => handleOfficeChange(e, index, 'description')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id={`color-label-${index}`}>Colores disponibles</InputLabel>
                    <Select
                      labelId={`color-label-${index}`}
                      multiple
                      value={office.color}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 300,
                            marginTop: 8,
                            position: 'fixed',
                          },
                        },
                      }}
                      onChange={(event) => {
                        const selectedValues = event.target.value;
                        if (selectedValues.length <= 6) {
                          const newOffices = [...offices];
                          newOffices[index].color = selectedValues;
                          setOffices(newOffices);
                        } else {
                          setShowMessage(true);
                        }
                      }}
                    >
                      <MenuItem value="rojo">Rojo</MenuItem>
                      <MenuItem value="Negro">Negro</MenuItem>
                      <MenuItem value="Azul">Azul</MenuItem>
                      <MenuItem value="Verde">Verde</MenuItem>
                      <MenuItem value="Amarillo">Amarillo</MenuItem>
                      <MenuItem value="Violeta">Violeta</MenuItem>
                      <MenuItem value="Naranja">Naranja</MenuItem>
                      <MenuItem value="Ocre">Ocre</MenuItem>
                      <MenuItem value="Dorado">Dorado</MenuItem>
                    </Select>
                    {showMessage && (
                      <Typography variant="body2" color="error">
                        Solo puede elegir 6 amoblamientos.
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Descripcion de oferta"
                    value={office.offer}
                    onChange={(e) => handleOfficeChange(e, index, 'location')}
                  />
                </Grid>
                <Grid item xs={12} >
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select label='País' defaultValue='' name='state' onChange={(e) => handleOfficeChange(e, index, 'state')}>
                      <MenuItem value='Activo'>Activo</MenuItem>
                      <MenuItem value='Inactivo'>Inactivo</MenuItem>
                    </Select>
            </FormControl>
          </Grid>
              </Grid>
            </Box>
          ))}
        </Paper>
      </form>
      <Typography style={{ marginTop: '30px', marginBottom: '50px', textAlign: "center" }} variant="h6" gutterBottom>
            SELECCIONA IMAGENES PARA TU NUEVO PRODUCTO
          </Typography>
      <Box style={{ marginLeft: '0px', marginBottom: '20px', marginTop: '20px' }}>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={7}>
            <Grid item xs={12} md={6} sx={{ borderRight: '1px solid #ccc', paddingRight: '30px', marginTop: 4.8, marginBottom: 5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '30px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '16px' }}>
                  <ButtonStyled
                    component="label"
                    variant="contained"
                    htmlFor="plano-oficina-upload-image"
                    sx={{ top: '-10px', marginLeft: '-20px' }}
                    onClick={(event) => {
                      event.preventDefault();
                      if (widgetRef.current) {
                        widgetRef.current.open();
                      } else {
                        console.error('Widget de carga no está inicializado');
                      }
                    }}
                  >
                    Subir imágenes
                  </ButtonStyled>
                </Box>
                <Box sx={{ marginBottom: '20px' }}>
                  <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Sube imagenes de la oficina jpg o png.
                  </Typography>
                </Box>
              </Box>
              {images.length > 0 ? (
                <React.Fragment>
                  <Grid container spacing={1} sx={{ marginLeft: '6px' }}>
                    {images.slice(0, 6).map((image, index) => (
                      <Grid key={index} item xs={4}>
                        <Box position="relative">
                          <IconButton
                            sx={{
                              position: 'absolute',
                              top: 2,
                              right: 2,
                              zIndex: 1,
                              backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            }}
                            onClick={() => handleImageDelete(index)}
                          >
                            <CloseIcon />
                          </IconButton>
                          <ImgStyled
                            src={image}
                            alt={`Imagen ${index}`}
                            sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  {images.length > 6 && (
                    <Typography variant="body2" color="textSecondary">
                      y {images.length - 6} más...
                    </Typography>
                  )}
                </React.Fragment>
              ) : (
                <ImgStyled src={imgSrc} alt="Plano de Oficina" sx={{ width: '300px', marginLeft: '110px' }} />
              )}
            </Grid>
            <Grid item xs={12} md={6} sx={{ paddingLeft: '20px', marginTop: 4.8, marginBottom: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '0px' }}>
                <Box style={{ marginLeft: '50px' }}>
                  <ButtonStyled
                    sx={{ marginTop: '5px' }}
                    component="label"
                    variant="contained"
                    htmlFor="plano-oficina-upload-image"
                  >
                    Plano del piso
                    <input hidden type="file" onChange={handleImageUpload} accept="image/png, image/jpeg" id="plano-oficina-upload-image" />
                  </ButtonStyled>
                  <Typography variant="body2" sx={{ marginTop: 5, marginLeft: '-80px' }}>
                    Sube el plano de la oficina en formato jpg o png.
                  </Typography>
                </Box>
              </Box>
              <ImgStyled src={floorPlanImage} alt="Plano de Oficina" sx={{ width: '300px', marginLeft: '105px', marginTop: '18px' }} />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Grid item xs={12}>
        <Button
          style={{ marginTop: '30px', width: '95%', marginLeft: '20px', marginBottom: '23px' }}
          variant="contained"
          fullWidth
          onClick={handleSubmit}
        >
          Crear nueva oficina
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default TabSecurity;