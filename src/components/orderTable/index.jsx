import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import "./style.css"
import { numToAmount } from '../../utils';
import { IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
const columns = [
  { id: 'orderId', label: 'Order ID', minWidth: 50, align: 'center' },
  { id: 'name', label: 'Name', minWidth: 100, align: 'center' },
  { id: 'items', label: 'Items', minWidth: 300, align: 'left' },
  {
    id: 'orderDate',
    label: 'Order Date',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'totalAmount',
    label: 'Total\u00a0Amount',
    minWidth: 50,
    align: 'center',
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 50,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export default function OrderTable(props) {
  let { paperStyle, pastOrdersList, handleActiveModel } = props;

  const formatItems = (items) => {
    let str = ""
    items.forEach((item, idx) => {
      if (idx === 0 || (items.length === 1) || (idx === items.length - 1))
        str = str + `${item?.itemData?.name || ""} X ${item?.itemCount || ""}`
      else
        str = str + `${item?.itemData?.name || ""} X ${item?.itemCount || ""}, `
    })
    return str
  }

  const formatDate = (value) => {
    let date = new Date(value)
    var Str =
      ("00" + date.getDate()).slice(-2)
      + "/" + ("00" + (date.getMonth() + 1)).slice(-2)
      + "/" + date.getFullYear() + " "
      + ("00" + date.getHours()).slice(-2) + ":"
      + ("00" + date.getMinutes()).slice(-2)
    return Str
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', ...paperStyle }}>
      <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pastOrdersList && pastOrdersList.length ?
              pastOrdersList.map((order) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={order?.order_id}>

                    <TableCell key={"orderId"} align={"center"}>
                      {order?.order_id || "-"}
                    </TableCell>
                    <TableCell key={"ordnameerId"} align={"center"}>
                      {order?.user?.name || "-"}
                    </TableCell>
                    <TableCell key={"items"} align={"left"}>
                      {order?.items && formatItems(order.items) || "-"}
                    </TableCell>
                    <TableCell key={"orderdate"} align={"center"}>
                      {order?.orderTime && formatDate(order.orderTime) || "-"}
                    </TableCell>
                    <TableCell key={"totalCost"} align={"center"}>
                      {order?.totalCost && numToAmount(order.totalCost) || "-"}
                    </TableCell>
                    <TableCell key={"totalCost"} align={"center"}>
                      <Tooltip title="View Details">
                        <IconButton size='small' onClick={(e) => (handleActiveModel(true, (order?.order_id || ""), true, true))}>
                          <InfoIcon color='projDark' />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              }) : []}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Pagination count={5} color="projSecondary" /> */}
    </Paper>
  );
}