import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ImageListView from '../commonComp/ImageListView';
import restaurantStore from '../../zustang/restaurant/restaurantStore';
import commonStore from '../../zustang/common/commonStore';
import registrationStore from '../../zustang/restaurant/registrationStore';
import { useParams } from 'react-router-dom';

const UploadImage = ({ getSetRegistrationData, isDasboard }) => {
  const { cropModal, handleCropModal, imgFile, setImgFile } = registrationStore(s => s)
  const { uploadImg, setDefaultImg, deleteImage, restDetails } = restaurantStore(s => s)

  const { notify, isLoader } = commonStore(s => s)
  let { restaurant_id } = useParams();

  React.useEffect(() => {
    if (!cropModal && imgFile) {
      let formData = new FormData();
      formData.append("img", imgFile)
      setImgFile(null)
      isLoader(true)
      uploadImg({
        restaurant_id, data: formData, cb: (res) => {
          if (res.error) {
            notify(res.msg, "error")
            isLoader(false)
          } else {
            notify(res.msg, "success")
            getSetRegistrationData()
          }
        }
      })
    }
  }, [cropModal, imgFile])

  const imgUpload = (e) => {
    setImgFile(e.target.files[0])
    handleCropModal(true)
  }

  const onDeleteImg = imgId => {
    isLoader(true)
    deleteImage({
      restaurant_id, imgId: imgId, cb: (res) => {
        if (res.error) {
          notify(res.msg, "error")
          isLoader(false)
        } else {
          notify(res.msg, "success")
          getSetRegistrationData()
        }
      }
    })
  }

  const onSetDefaultImg = imgId => {
    isLoader(true)
    let data = { "imgId": imgId }
    setDefaultImg({
      restaurant_id, data: data, cb: (res) => {
        if (res.error) {
          notify(res.msg, "error")
          isLoader(false)
        } else {
          notify(res.msg, "success")
          getSetRegistrationData()
        }
      }
    })
  }

  return (
    <Stack spacing={2} alignItems="center" pt={isDasboard ? 2 : 0}>
      <Button variant="outlined" component="label" endIcon={<FileUploadIcon />} sx={{
        width: "130px",
        color: "projDark.darker",
        borderColor: "projDark.darker",
        '&:hover': {
          color: "projDark.darker",
          borderColor: "projDark.darker"
        }
      }}>
        Upload
        <input hidden accept="image/*" type="file" onChange={imgUpload} />
      </Button>
      <ImageListView editView galaryImgs={restDetails?.galaryImgs || []} onDeleteImg={onDeleteImg} onSetDefaultImg={onSetDefaultImg} />
    </Stack>
  )
}

export default UploadImage