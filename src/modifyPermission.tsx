import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { useNavigate, useParams, Routes, Route } from 'react-router-dom';
import {
  Button,
  TextField,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  Box,
  MenuItem,
  Select,  
} from '@mui/material';
import { HomePage } from './home.tsx'; 
import { GetPermissionsPage } from './getPermissions.tsx'; 
import { RequestPermissionPage } from './requestPermission.tsx';  
import { RemovePermissionPage } from './removePermission.tsx'; 

export const ModifyPermissionPage = () => {  
  const { id } = useParams();
  console.log(useParams());
  const fullUrl = "http://localhost:8080/api/permiso/modifypermission/" + id;
  const queryId = "http://localhost:8080/api/Permiso/GetPermission/" + id;
  const navigate = useNavigate(); 
    
  interface Data {
    id: number;
    nombreEmpleado: string;
    apellidoEmpleado: string;
    tipoPermiso: string;
    fechaPermiso: string;
  }

  const [data, setData] = useState<Data>({
    id: 0,
    nombreEmpleado: '',
    apellidoEmpleado: '',
    tipoPermiso: '',
    fechaPermiso: '',
  });

  const fetchData = async () => {
    try {
      const response = await axios.get<Data>(queryId);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dateString = data.fechaPermiso;
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; 
  const year = date.getFullYear();
  const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {                  
      const response = await axios.put(fullUrl, data);
      console.log('Permiso modificado:', response.data);
      toastr.success('Modificación del permiso enviada correctamente', '', {
        positionClass: 'toast-bottom-right',
      });
      navigate('/getPermissions', {replace:true});
    } catch (error) {
      console.error('Error al modificar permiso, para el id: ' + {id}, error);
      toastr.error('Error al enviar la modificación del permiso, para el id: ' + {id}, '', {
        positionClass: 'toast-bottom-right',
      });
    }
  };

  return (    
    <div>
        <div style={{ marginLeft: '300px', paddingTop:'80px', width: '75%', margin: '100 auto', borderColor: '#2a2b29' }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mt: 1, mb: 3 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Modificar Permiso: {id}
              </Typography>
            </Box>

            <Grid container spacing={2}>                         
              <Grid item xs={12}>
                <FormControl style={{width: '50%'}}>
                  <FormLabel>Nombre</FormLabel>
                  <TextField
                    name="nombreEmpleado"
                    value={data.nombreEmpleado}
                    onChange={handleChange}
                    required                    
                    error={!data.nombreEmpleado}
                    helperText={!data.nombreEmpleado && 'Por favor, ingrese su nombre'}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl style={{width: '50%'}}>
                  <FormLabel>Apellido</FormLabel>
                  <TextField
                    name="apellidoEmpleado"
                    value={data.apellidoEmpleado}
                    onChange={handleChange}
                    required
                    error={!data.apellidoEmpleado}
                    helperText={!data.apellidoEmpleado && 'Por favor, ingrese su apellido'}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl style={{width: '25%'}}>
                  <FormLabel>Tipo de permiso</FormLabel>
                  <Select
                    name="tipoPermiso"
                    value={data.tipoPermiso}
                    onChange={handleChange}
                    required
                    error={!data.tipoPermiso}
                  >
                    <MenuItem value={1}>Administrador</MenuItem>
                    <MenuItem value={2}>Operador</MenuItem>
                    <MenuItem value={3}>Cliente</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl style={{width: '25%'}}>
                  <FormLabel>Fecha de Permiso</FormLabel>
                  <TextField
                    name="fechaPermiso"
                    value={formattedDate}                    
                    onChange={handleChange}
                    required
                    error={!data.fechaPermiso}
                    helperText={!data.fechaPermiso && 'Por favor, seleccione una fecha'}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained">Modificar Permiso</Button>
              </Grid>
            </Grid>
          </form>
      </div>
      <div>
      <Routes>        
        <Route path="/home/*" element={<HomePage />} />
        <Route path="/getPermissions/*" element={<GetPermissionsPage />} />
        <Route path="/requestPermission/*" element={<RequestPermissionPage />} />
        <Route path="/modifyPermission/*/:id" element={<ModifyPermissionPage />} />
        <Route path="/removePermission/*/:id" element={<RemovePermissionPage />} />
      </Routes>   
      </div>   
    </div>  
  );
};
