import React from 'react'
import UploadImage from '../registration/UploadImage'
import { Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import ImageListView from '../commonComp/ImageListView';
import restaurantStore from '../../zustang/restaurant/restaurantStore';
import menuCheckoutStore from '../../zustang/menucheckout/menuCheckoutStore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "max-content",
  bgcolor: 'projPrimary.main',
  minHeight: "95vh",
  maxWidth: "95vw",
  display: "flex",
  // justifyContent: "center",
  overflow: "auto",
  alignItems: "center",
};

const GalleryModel = () => {
  const { restDetails } = restaurantStore(s => s)
  const { galaryView, handleGalaryView } = menuCheckoutStore(s => s)
  return (
    <Modal
      open={galaryView}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack sx={style}>
        <Box display={"flex"} flexDirection="row" justifyContent="flex-end" width={"100%"}>
          <IconButton >
            <CloseIcon color='projDark' onClick={()=>{handleGalaryView(false)}} />
          </IconButton>
        </Box>
        <ImageListView galaryView galaryImgs={restDetails?.galaryImgs || []} />
      </Stack>
    </Modal>
  )
}

export default GalleryModel