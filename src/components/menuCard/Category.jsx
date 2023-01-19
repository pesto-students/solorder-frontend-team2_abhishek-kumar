import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Item from './Item';
import { Box, IconButton, Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/system';
import registrationStore from '../../zustang/restaurant/registrationStore';
import restaurantStore from '../../zustang/restaurant/restaurantStore';
import commonStore from '../../zustang/common/commonStore';
import signInUpStore from '../../zustang/auth/signInUpStore';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(-90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Category(props) {
  const {
    handleModel
  } = registrationStore(s => s)
  const {
    deleteCategory,
    getMenuItems
  } = restaurantStore(s => s)
  const { notify, isLoader } = commonStore(state => state)
  const { userData } = signInUpStore(s => s)
  const [expanded, setExpanded] = React.useState(true);
  const onDeleteCate = (e) => {
    e && e.stopPropagation();
    isLoader(true)
    deleteCategory({
      category_id: (props?.categoryDetail?.category_id || ""),
      restaurant_id: (userData?.restaurant_id || ""),
      cb: (res) => {
        isLoader(false)
        if (res.error) {
          notify(res.msg, "error")
        } else {
          getMenuItems({restaurant_id:userData?.restaurant_id})
          notify(res.msg, "success")
        }
      }
    })
  }
  return (
    <Accordion expanded={(props?.categoryDetail?.items?.length ? expanded : false)} onChange={(e) => { if (props?.categoryDetail?.items?.length) setExpanded(!expanded) }}>
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Stack direction="row" width="100%" justifyContent="space-between">
          <Stack direction="row">
            <Typography alignSelf="center">{props?.categoryDetail?.name || ""}</Typography>
            {props.parent !== 'menu' && <Tooltip title="Add Menu item">
              <IconButton aria-label="Add" onClick={(e) => { e.stopPropagation(); handleModel({ addEditModel: true, addItem: (props?.categoryDetail?.category_id || "") }) }}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip>}
          </Stack>
          {props.parent !== 'menu' && <Stack direction="row">
            <Tooltip title="Delete Category">
              <IconButton aria-label="delete" onClick={onDeleteCate} >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Category">
              <IconButton aria-label="edit" onClick={(e) => { e.stopPropagation(); handleModel({ addEditModel: true, categoryData: { category_id: (props?.categoryDetail?.category_id || ""), name: (props?.categoryDetail?.name || "") } }) }}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Stack>}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        {props?.categoryDetail?.items?.length ? props.categoryDetail.items.map((item) => (<Item {...props} itemDetails={item} />)) : ""}
      </AccordionDetails>
    </Accordion>
  );
}
