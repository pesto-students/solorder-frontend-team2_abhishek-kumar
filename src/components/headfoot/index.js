import React from 'react'
import Footer from './Footer';
import Header from './Header';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import SocketHelper from '../../common/socketHelper';

const HeadFoot = ({ children, ...props }) => {

  return (
    <>
      <SocketHelper />
      <Header {...props} />
      <Box
        sx={{
          width: "100%",
          paddingTop: `${74}px`,
          backgroundColor: 'projBg.main',
          paddingBottom: `${20}px`
        }}
      >
        <Container maxWidth="lg" >
          {children}
        </Container>
      </Box>
      <Footer {...props} />
    </>
  )
}

export default HeadFoot;
