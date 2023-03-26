import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';


function Footer() {


  return (
    <AppBar id="FooterEle" position="static" color='projDark'>
      <Container maxWidth="lg" >
        <Toolbar disableGutters sx={{ display: "flex", flexDirection: { xs: "column", sm: 'row' }, justifyContent: 'space-between' }}>
          <Box flexDirection="row" alignItems="center" display={{ xs: "none", sm: 'flex' }}>
            <img
              src="/image/solorder-logo-non-text.svg"
              alt="Solorder Logo"
              loading="lazy"
              width="60"
            />
            <Typography variant='h5' color="#F5F5F5" fontWeight="550" >Solorder</Typography>
          </Box>

          <Box display={"flex"} flexDirection={"column"} justifyContent="center" alignItems="start" mt={{ xs: "5px", sm: '0' }}>
            <Box display={"flex"} flexDirection={"row"} justifyContent="center" alignItems="center" mb="2px">
              <EmailIcon sx={{ color: "#F72200", fontSize: "1.3rem", marginRight: "10px" }} />
              <Typography variant='p' color="#F5F5F5" fontWeight="550">info@solorder.com</Typography>
            </Box>
            <Box display={"flex"} flexDirection={"row"} justifyContent="center" alignItems="center" mt="2px">
              <InstagramIcon sx={{ color: "#EB4B54", fontSize: "1.3rem", marginRight: "10px" }} />
              <Typography variant='p' color="#F5F5F5" fontWeight="550">@solorder</Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Footer;
