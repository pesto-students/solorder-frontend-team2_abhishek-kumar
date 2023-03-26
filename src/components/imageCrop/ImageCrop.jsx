import React, { useState, useEffect } from 'react'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Box, Button, IconButton, Modal, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRef } from 'react';
import registrationStore from '../../zustang/restaurant/registrationStore';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "max-content",
  bgcolor: 'projPrimary.main',
  // padding: "0px 20px 20px 20px",
  maxHeight: "95vh",
  maxWidth: "95vw",
  display: "flex",
  justifyContent: "center",
  overflow: "auto",
  alignItems: "center",
};

const ImageCrop = () => {
  const { cropModal, handleCropModal, imgFile, setImgFile } = registrationStore(s => s)
  const [imgUrl, setImgUrl] = useState("")
  useEffect(() => { if (cropModal && imgFile) setImgUrl(URL.createObjectURL(imgFile))}, [cropModal])
  let cropperRef = useRef()
  
  const onCropComplete = () => {
    let canvas = cropperRef.current.cropper.getCroppedCanvas();
    let randomName = (Math.random() + 1).toString(36).substring(7);
    randomName = randomName + ".jpeg"
    canvas.toBlob((blob) => {
      let file = new File(
        [blob],
        (imgFile?.name || randomName),
        {
          type: blob.type,
          lastModified: Date.now()
        }
      );
      setImgFile(file)
      handleCropModal(false)
    })
  }

  return (
    <Modal
      open={cropModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack sx={style}>
        <Box display={"flex"} flexDirection="row" justifyContent="flex-end" width={"100%"} mt={1}>
          <IconButton onClick={(e) => { setImgFile(null); handleCropModal(false); }}>
            <CloseIcon color='projDark' />
          </IconButton>
        </Box>
        <Box ml={1} mr={1}>
          <Cropper
            ref={cropperRef}
            src={imgUrl}
            guides={false}
            aspectRatio={3 / 2}
            dragMode="none"
            cropBoxMovable={true}
            cropBoxResizable={true}
            toggleDragModeOnDblclick={false}
            viewMode={1}
            zoomOnWheel={false}
          />
        </Box>
        <Box m={2}>
          <Button variant="contained" onClick={onCropComplete}>Done</Button>
        </Box>
      </Stack>
    </Modal>
  )
}

export default ImageCrop;
