import React, { useState } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { Box, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Grid, FormControl, FormLabel, TextField } from '@mui/material';
import { MenuOutlined as MenuIcon, HomeOutlined as HomeIcon, ListOutlined as ListIcon, AddModeratorOutlined as RequestPermissionIcon, InfoOutlined as InfoIcon } from '@mui/icons-material';
import logo from './proteger.png';
import { GetPermissionsPage } from './getPermissions.tsx'; 
import { RequestPermissionPage } from './requestPermission.tsx'; 
import { ModifyPermissionPage } from './modifyPermission.tsx'; 
import { RemovePermissionPage } from './removePermission.tsx'; 
import { AboutPage } from './about.tsx'; 
import Cookies from 'js-cookie';
import { BACKEND_SERVER } from './config.js';

export const HomePage = () => {

  const navigate = useNavigate(); 

  const location = useLocation(); 
  const isHome = location.pathname === '/';

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('user_id') ? false : true);
  const [buttonText, setButtonText] = useState(Cookies.get('user_id') ? 'Iniciar sesión' : 'Cerrar sesión');
  
  const handleClickWithOutURL = (event) => {    
    setIsDrawerOpen(!isDrawerOpen);
  };
  
  const handleClick = (path) => {    
    setIsDrawerOpen(true);
    navigate(path, {replace:true});     
  };

  const [data, setData] = useState({
    User: 'admin',
    Pass: '',
  });

////////////////////////////////////////////////////////////////////////////////////////////////////
  
  const handleLogin = () => {    
    Cookies.remove('user_id');
    setIsLoggedIn(true);
    setButtonText("Cerrar sesión");
    navigate('/', {replace:true});
  };

  const handleLogout = () => {    
    Cookies.set('user_id', data.User, { expires: 7 }); 
    setIsLoggedIn(false);
    setButtonText("Iniciar sesión");
    setData({ ...data, Pass: '' });
    navigate('/', {replace:true});
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    
    try {
      const response = await axios.post(`${BACKEND_SERVER}/api/permiso/basicauthentication`, data);
      console.log('Acceso solicitado:', response.data.user);
      toastr.success('Solicitud de acceso enviada correctamente ', '', {
        positionClass: 'toast-bottom-right',
      });      
      handleLogin();      
    } catch (error) {      
      // Aquí puedes continuar intentando con más servidores si es necesario
      toastr.error('Error al enviar la solicitud de acceso a todas las URL', '', {
        positionClass: 'toast-bottom-right',
      });
      handleLogout();
      }              
  };  

  return (
    <div style={{border: '0'}} >
      <div style={{ backgroundColor: '#2a2b29', color: '#bdd3d6', position: 'fixed', top: '0', left: '0', borderStyle: 'none', border: '0', height: '70px', width: '100%' }}>
          <h1>
            Sistema de Permisos
            {isLoggedIn ? (
              <><Typography style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', }}>Usuario: {Cookies.get('user_id')}</Typography>
              <Button
                variant="contained"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: '#48918b',
                  color: '#1b1d19',
                }}
              onClick={handleLogout}
            >
              {buttonText}
            </Button></>
             ) : (
              <Typography
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}              
            ></Typography>
            )}
          </h1>
        <div>         
        </div>
      </div>           
      
      <Drawer
        open={ isLoggedIn }
        onClose={handleClickWithOutURL}
        variant="persistent"
        anchor="left"        
      >        
        <Box sx={{
            width: isDrawerOpen ? '240px' : '75px',
            backgroundColor: '#2a2b29',
            border: '0',            
            color: '#FFFFFF',
            minHeight: '100%',
            visible: { isLoggedIn },
          }}
        >
          <Button sx={{ ml: 0.6 }} onClick={handleClickWithOutURL}>
            <MenuIcon sx={{  mt: 2, mb: 2, color: '#FFFFFF', }}/>
          </Button>

          <div style={{textAlign: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: isDrawerOpen ? '80px' : '40px', height: isDrawerOpen ? '80px' : '40px' }} />
          </div>

            <List sx={{ padding: '8px' }}>
              <ListItem component="button" onClick={() => handleClick('/')} sx={{color: '#FFFFFF', borderRadius: '8px', backgroundColor: '#2a2b29', '&:hover': { backgroundColor: '#3f403e' } }}>
                <ListItemIcon>
                  <HomeIcon sx={{ color: '#FFFFFF' }}/>
                </ListItemIcon>
                <ListItemText primary={ isDrawerOpen ? "Inicio": ""}  />
              </ListItem>
              <ListItem component="button" onClick={() => handleClick('/getPermissions')} sx={{color: '#FFFFFF', borderRadius: '8px', backgroundColor: '#2a2b29', '&:hover': { backgroundColor: '#3f403e' } }}>
                <ListItemIcon>
                  <ListIcon sx={{ color: '#FFFFFF' }}/>
                </ListItemIcon>
                <ListItemText primary={ isDrawerOpen ? "Listar Permisos": ""} />
              </ListItem>
              <ListItem component="button" onClick={() => handleClick('/requestPermission')} sx={{color: '#FFFFFF', borderRadius: '8px', backgroundColor: '#2a2b29', '&:hover': { backgroundColor: '#3f403e' } }}>
                <ListItemIcon>
                  <RequestPermissionIcon sx={{ color: '#FFFFFF' }}/>
                </ListItemIcon>
                <ListItemText primary={ isDrawerOpen ? "Solicitar Permiso":""} />
              </ListItem>
              <ListItem component="button" onClick={() => handleClick('/about')} sx={{color: '#FFFFFF', borderRadius: '8px', backgroundColor: '#2a2b29', '&:hover': { backgroundColor: '#3f403e' } }}>
                <ListItemIcon>
                  <InfoIcon sx={{ color: '#FFFFFF' }}/>
                </ListItemIcon>
                <ListItemText primary={ isDrawerOpen ? "Acerca de...":""} />
              </ListItem>
            </List>
          </Box>
        </Drawer>
  
        <div style={{ width: '70%'}}>          
          {isHome && isLoggedIn === false ? (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: -1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>            
              <Box sx={{
                  padding: '24px',
                  borderRadius: '16px',
                  boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.8)', 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',          
                }}>
                <img src={logo} alt="Background" style={{ maxWidth: '25%', maxHeight: '25%', objectFit: 'cover', opacity: 1.0 }} />                
                <form onSubmit={handleSubmit} >
                  <Box sx={{ mt: 7, mb: 3 }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      Autenticación
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl style={{width: '80%'}}>
                        <FormLabel>Usuario</FormLabel>
                        <TextField
                          name="User"
                          value={data.User}
                          onChange={handleChange}
                          required
                          error={!data.User}
                          helperText={!data.User && 'Por favor, ingrese su usuario'}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl style={{width: '80%'}}>
                        <FormLabel>Contraseña</FormLabel>
                        <TextField
                          name="Pass"
                          type="password"
                          value={data.Pass}
                          onChange={handleChange}
                          required                          
                          error={!data.Pass}
                          helperText={!data.Pass && 'Por favor, ingrese su contraseña'}
                        />
                      </FormControl>
                    </Grid>             

                    <Grid item xs={12}>
                      <Button 
                          style={{
                            backgroundColor: '#48918b',
                            color: '#1b1d19',
                          }}
                      type="submit" variant="contained">Ingresar</Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </div>
          ) : (
            <div style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={logo} alt="Background" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', opacity: 0.1 }} />
            </div>
          )}
        </div>
       
      <div>
      <Routes>        
        <Route path="/home/*" element={<HomePage />} />
        <Route path="/getPermissions/*" element={<GetPermissionsPage />} />
        <Route path="/requestPermission/*" element={<RequestPermissionPage />} />
        <Route path="/modifyPermission/*/:id" element={<ModifyPermissionPage />} />  
        <Route path="/removePermission/*/:id" element={<RemovePermissionPage />} />    
        <Route path="/about/*" element={<AboutPage />} />  
      </Routes>   
      </div> 
    </div>  
  );
};

