import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'toastr/build/toastr.min.css';
import { useNavigate, Routes, Route } from 'react-router-dom';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,  
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { HomePage } from './home.tsx'; 
import { RequestPermissionPage } from './requestPermission.tsx'; 
import { ModifyPermissionPage } from './modifyPermission.tsx'; 
import { RemovePermissionPage } from './removePermission.tsx'; 

export const GetPermissionsPage = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);  
  const navigate = useNavigate();

// Interface for the 'permission' object
interface Data {
  id: number;
  nombreEmpleado: string;
  apellidoEmpleado: string;
  tipoPermiso: string;
  fechaPermiso: Date;
}

  const handleClick = async (path: string, id: number) => {    
    navigate(path+id, {replace:true});     
  };

  const handleDeletePermission = async (path: string, id: number) => {   
    navigate(path+id, {replace:true}); 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/permiso/getpermissions');
        setPermissions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching permissions:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        <div style={{ marginLeft: '300px', paddingTop:'80px', width: '75%', margin: '100 auto', borderColor: '#2a2b29' }}>
        <Box>
            <Box sx={{ mt: 1, mb: 3 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Listado de Permisos
              </Typography>
            </Box>
            {loading ? (
                <Typography variant="body1">Cargando permisos...</Typography>
            ) : (
                <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><Typography variant="h6">Id</Typography></TableCell>
                    <TableCell><Typography variant="h6">Nombre del Empleado</Typography></TableCell>
                    <TableCell><Typography variant="h6">Apellido del Empleado</Typography></TableCell>
                    <TableCell><Typography variant="h6">Tipo de Permiso</Typography></TableCell>
                    <TableCell><Typography variant="h6">Fecha de Permiso</Typography></TableCell>
                    <TableCell><Typography variant="h6">Acciones</Typography></TableCell>
                  </TableRow>                  
                </TableHead>
                <TableBody>
                  {permissions.map((permission: Data) => (
                    <TableRow key={permission.id}>
                      <TableCell>{permission.id}</TableCell>
                      <TableCell>{permission.nombreEmpleado}</TableCell>
                      <TableCell>{permission.apellidoEmpleado}</TableCell>
                      <TableCell>{permission.tipoPermiso}</TableCell>
                      <TableCell>{new Date(permission.fechaPermiso).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <IconButton aria-label="editar" onClick={() => handleClick('/modifyPermission/*/', permission.id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="eliminar" onClick={() => handleDeletePermission('/removePermission/*/', permission.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
        </Box>
            <div>
            <Routes>
                <Route path="/home/*" element={<HomePage />} />                
                <Route path="/requestPermission/*" element={<RequestPermissionPage />} />
                <Route path="/modifyPermission/*/:id" element={<ModifyPermissionPage />} />  
                <Route path="/removePermission/*/:id" element={<RemovePermissionPage />} />           
            </Routes>   
            </div>  
        </div>      
    </div>
  );
};
