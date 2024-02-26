import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

export const AboutPage = () => {
  const name = 'John Jairo Sandoval Zambrano';
  const phone = '+(57) 313-412-7807';
  const email = 'jjsandoval.negocios@gmail.com';

  return (
    <div style={{ width: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: -1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>            
    <Box sx={{
        padding: '24px',
        borderRadius: '16px',
        boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.8)', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',          
      }}>                
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Acerca de ...
          </Typography>
        </Box>
      <Grid container spacing={2}>
        <Grid item xs={16}>
          <Box sx={{
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.8)',            
          }}>            
  
            <Box sx={{ mb: '16px' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Nombre:
              </Typography>
              <Typography variant="body1">{name}</Typography>
            </Box>
  
            <Box sx={{ mb: '16px' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Teléfono:
              </Typography>
              <Typography variant="body1">{phone}</Typography>
            </Box>
  
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Correo electrónico:
              </Typography>
              <Typography variant="body1">{email}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      </Box>
    </div>
  );  
};  