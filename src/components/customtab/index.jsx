import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./style.css"
import { Divider } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function CustomTab(props) {
  const [value, setValue] = React.useState(0);
  const { TabList, TabCompList } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ display: 'flex', width: "100%", flexDirection: { xl: "row", lg: "row", md: "row", sm: "column", xs: "column" } }}
    >
      <Box sx={{ marginRight: 1, width: "10%", display: { xl: "block", lg: "block", md: "block", sm: "none", xs: "none" } }}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider', bgcolor: 'background.paper', boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
          className="custom-tab-container"
        >
          {Array.isArray(TabList) ? TabList.map((name, idx) => (<Tab className='custom-tab' label={name} {...a11yProps(idx)} />)) : ""}
        </Tabs>
      </Box>
      <Box sx={{ marginBottom: 1, width: "100%", display: { xl: "none", lg: "none", md: "none", sm: "block", xs: "block" }, bgcolor: 'background.paper', boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
        <Tabs
          orientation="horizontal"
          variant="scrollable"
          scrollButtons="auto"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider', margin: "auto" }}
          className="custom-tab-container"
        >
          {Array.isArray(TabList) ? TabList.map((name, idx) => (<Tab className={'custom-tab ' + (idx === 0 ? "margin-left-auto" : (TabList.length === (idx + 1)) ? "margin-right-auto" : "")} label={name} {...a11yProps(idx)} />)) : ""}
        </Tabs>
      </Box>
      <Box sx={{ bgcolor: 'background.paper', boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", width: { xl: "90%", lg: "90%", md: "90%", sm: "100%", xs: "100%" }, minHeight: "85vh" }}>
        <Typography variant="h6" component="div" textAlign="center" width="100%" padding="5px 5px">{(value || (value === 0)) ? TabList[value] : ""}</Typography>
        <Divider />
        {Array.isArray(TabCompList) ? TabCompList.map((Comp, idx) => (<TabPanel value={value} index={idx}>{Comp}</TabPanel>)) : ""}
      </Box>
    </Box>
  );
}