import React, { useState } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { useNavigate, Routes, Route } from 'react-router-dom';
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
import { ModifyPermissionPage } from './modifyPermission.tsx'; 
import { RemovePermissionPage } from './removePermission.tsx'; 
import { BACKEND_SERVER } from './config.js';

export const RequestPermissionPage = () => {
  const [data, setData] = useState({
    nombreEmpleado: '',
    apellidoEmpleado: '',
    tipoPermiso: '',
    fechaPermiso: '',
  });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_SERVER}/api/permiso/requestpermission`, data);
      console.log('Permiso solicitado:', response.data);
      toastr.success('Solicitud de permiso enviada correctamente', '', {
        positionClass: 'toast-bottom-right',
      });
      navigate('/getPermissions', {replace:true});
    } catch (error) {
      console.error('Error al solicitar permiso:', error);
      toastr.error('Error al enviar la solicitud de permiso', '', {
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
                Solicitar Permiso
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
                    type="date"
                    value={data.fechaPermiso}
                    onChange={handleChange}
                    required
                    error={!data.fechaPermiso}
                    helperText={!data.fechaPermiso && 'Por favor, seleccione una fecha'}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button 
                    style={{
                      backgroundColor: '#48918b',
                      color: '#1b1d19',
                    }}                
                type="submit" variant="contained">Solicitar Permiso</Button>
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

