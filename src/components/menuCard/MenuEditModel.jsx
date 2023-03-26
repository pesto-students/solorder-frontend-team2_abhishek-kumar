import React, { useEffect, useState } from 'react';
import { Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { convertOnlyNumber, numToAmount } from '../../utils';
import registrationStore from '../../zustang/restaurant/registrationStore';
import restaurantStore from '../../zustang/restaurant/restaurantStore';
import signInUpStore from '../../zustang/auth/signInUpStore';
import commonStore from '../../zustang/common/commonStore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "max-content",
  bgcolor: 'projPrimary.main',
  maxHeight: "95vh",
  maxWidth: "95vw",
  display: "flex",
  justifyContent: "center",
  overflow: "auto",
  alignItems: "center",
};


const MenuEditModel = () => {
  const {
    addEditModel,
    addCategory,
    categoryData,
    addItem,
    itemData: itemDatas,
    handleModel
  } = registrationStore(s => s)
  const { addUpdateCategory, getMenuItems, addUpdateItem } = restaurantStore(s => s)
  const { userData } = signInUpStore(s => s)
  const { notify, isLoader } = commonStore(state => state)
  const [cateName, setCateName] = useState("");
  const [itemData, setItemData] = useState({
    "name": "",
    "description": "",
    "price": "",
    "isVeg": true
  });
  const [error, setError] = useState({});

  useEffect(() => {
    if (!addEditModel) {
      setCateName("")
      setItemData({
        "name": "",
        "description": "",
        "price": "",
        "isVeg": true
      })
      setError({})
    }
  }, [addEditModel])

  useEffect(() => {
    if (addEditModel && Object.keys(categoryData).length)
      setCateName(categoryData.name);
  }, [categoryData, addEditModel])

  useEffect(() => {
    if (addEditModel && Object.keys(itemDatas).length)
      setItemData({
        "name": itemDatas?.name || "",
        "description": itemDatas?.description || "",
        "price": itemDatas?.price || "",
        "isVeg": itemDatas?.isVeg || false
      });
  }, [itemDatas, addEditModel])

  const handleInput = (name) => (e) => {
    let value = e.target.value;
    if (name === "isVeg")
      value = e.target.checked;
    else if (name === "price")
      value = convertOnlyNumber(value)
    setItemData({ ...itemData, [name]: value })
    setError({})
  }

  const AddUpdateCateData = () => {
    let error = {}
    if (!cateName)
      error["name"] = true
    if (Object.keys(error).length) {
      setError(error)
    } else {
      isLoader(true)
      let args = {
        restaurant_id: (userData?.restaurant_id || ""),
        category_id: categoryData?.category_id || null,
        isNew: addCategory ? 1 : 0,
        data: { name: cateName },
        cb: (res) => {
          if (res.error)
            notify(res.msg, "error")
          else {
            notify(res.msg, "success")
            getMenuItems({restaurant_id:userData?.restaurant_id})
            setCateName("")
            handleModel({ addEditModel: false })
          }
          isLoader(false)
        }
      }
      addUpdateCategory(args)
    }
  }

  const AddUpdateItemData = () => {
    let error = {}
    if (!itemData?.name)
      error["name"] = true
    if (!itemData?.description)
      error["description"] = true
    if (!itemData?.price)
      error["price"] = true
    if (Object.keys(error).length) {
      setError(error)
    } else {
      isLoader(true)
      let args = {
        restaurant_id: (userData?.restaurant_id || ""),
        category_id: addItem || itemDatas?.category_id || null,
        isNew: addItem ? 1 : 0,
        item_id: itemDatas?.item_id || null,
        data: {
          "name": itemData?.name || "",
          "description": itemData?.description || "",
          "price": itemData?.price && Number(itemData.price) || "",
          "isVeg": itemData?.isVeg || false,
        },
        cb: (res) => {
          if (res.error)
            notify(res.msg, "error")
          else {
            notify(res.msg, "success")
            getMenuItems({restaurant_id:userData?.restaurant_id})
            handleModel({ addEditModel: false })
          }
          isLoader(false)
        }
      }
      addUpdateItem(args)
    }
  }

  const onUpdate = () => {
    if (addCategory || Object.keys(categoryData).length)
      AddUpdateCateData()
    else if (addItem || Object.keys(itemDatas).length)
      AddUpdateItemData()
  }

  return (
    <Modal
      open={addEditModel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack sx={style}>
        <Box display={"flex"} flexDirection="row" justifyContent="flex-end" width={"100%"}>
          <IconButton onClick={(e) => { handleModel({ addEditModel: false }) }}>
            <CloseIcon color='projDark' />
          </IconButton>
        </Box>
        <Typography variant='h5' component="div" fontWeight={500} textAlign="center" mb={1} mt={-3}>
          {addCategory ? "Add Category" : ""}
          {(categoryData && Object.keys(categoryData).length) ? "Edit Category" : ""}
          {addItem ? "Add Item" : ""}
          {(itemDatas && Object.keys(itemDatas).length) ? "Edit Item" : ""}
        </Typography>
        {addCategory || (categoryData && Object.keys(categoryData).length) ? <Box ml={1} mr={1} pl={0.5} pr={0.5}>
          <TextField
            id="outlined-basic1"
            label="Category Name"
            variant="outlined"
            value={cateName}
            onChange={(e) => { setCateName(e.target.value); setError({}) }}
            error={error?.name ? true : false}
            helperText={error?.name ? "Enter Category name." : " "}
            color="projDark"
            required
          />
        </Box> : ""}
        {addItem || (itemDatas && Object.keys(itemDatas).length) ? <Stack direction="column" ml={1} mr={1} pl={0.5} pr={0.5}>
          <TextField
            id="outlined-basic1"
            label="Item Name"
            variant="outlined"
            value={itemData?.name || ""}
            onChange={handleInput("name")}
            error={error?.name ? true : false}
            helperText={error?.name ? "Enter Item name." : " "}
            color="projDark"
            required
            margin="dense"
          />
          <TextField
            id="outlined-basic1"
            label="Price"
            variant="outlined"
            value={itemData?.price ? numToAmount(itemData.price) : ""}
            onChange={handleInput("price")}
            error={error?.price ? true : false}
            helperText={error?.price ? "Enter Price." : " "}
            color="projDark"
            required
            margin="dense"
          />
          <TextField
            id="outlined-basic1"
            label="Description"
            variant="outlined"
            value={itemData?.description ? itemData.description : ""}
            onChange={handleInput("description")}
            error={error?.description ? true : false}
            helperText={error?.description ? "Enter description." : " "}
            color="projDark"
            multiline
            rows={4}
            required
          // margin="dense"
          />
          <FormControlLabel control={<Checkbox sx={{ color: "#74B71F", '&.Mui-checked': { color: "#74B71F" } }} checked={itemData?.isVeg} onChange={handleInput("isVeg")} />} label="It is a Vegetarian Item." size="small" />
        </Stack> : ""}
        <Box m={1}>
          <Button variant="contained" onClick={onUpdate}>Done</Button>
        </Box>
      </Stack>
    </Modal>
  )
}

export default MenuEditModel