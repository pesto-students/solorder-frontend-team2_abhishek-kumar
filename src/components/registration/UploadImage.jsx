import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ImageListView from '../commonComp/ImageListView';

const UploadImage = () => {
  return (
    <Stack spacing={2} alignItems="center">
      <Button variant="outlined" endIcon={<FileUploadIcon />} sx={{
        width: "130px", color: "projDark.darker", borderColor: "projDark.darker", '&:hover': {
          color: "projDark.darker", borderColor: "projDark.darker"
        }
      }}>
        Upload
      </Button>
      <ImageListView />
    </Stack>
  )
}

export default UploadImage