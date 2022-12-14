import { Box, Grid, TextField } from '@mui/material';
import React from 'react';

const Details = () => {
  return (
    <Grid container spacing={2}>
      <Grid xl={4} md={4} sm={6} display="flex" justifyContent="center" >
        <TextField id="outlined-basic1" label="Outlined" variant="outlined" sx={{ width: "90%", mb: 2 }} />
      </Grid>
      <Grid xl={4} md={4} sm={6} display="flex" justifyContent="center" >
        <TextField id="outlined-basic1" label="Outlined" variant="outlined" sx={{ width: "90%", mb: 2 }} />
      </Grid>
      <Grid xl={4} md={4} sm={6} display="flex" justifyContent="center" >
        <TextField id="outlined-basic1" label="Outlined" variant="outlined" sx={{ width: "90%", mb: 2 }} />
      </Grid>
      <Grid xl={4} md={4} sm={6} display="flex" justifyContent="center" >
        <TextField id="outlined-basic1" label="Outlined" variant="outlined" sx={{ width: "90%", mb: 2 }} />
      </Grid>
      <Grid xl={4} md={4} sm={6} display="flex" justifyContent="center" >
        <TextField id="outlined-basic1" label="Outlined" variant="outlined" sx={{ width: "90%", mb: 2 }} />
      </Grid>
      <Grid xl={4} md={4} sm={6} display="flex" justifyContent="center" >
        <TextField id="outlined-basic1" label="Outlined" variant="outlined" sx={{ width: "90%", mb: 2 }} />
      </Grid>
      <Grid xl={12} md={12} sm={12} display="flex" justifyContent="center" >
        <div className="mapouter">
          <div className="gmap_canvas">
            <iframe
              className="gmap_iframe"
              width="100%"
              frameBorder={0}
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src="https://maps.google.com/maps?width=1&height=1&hl=en&q=University of Oxford&t=&z=14&ie=UTF8&iwloc=B&output=embed"
            />
          </div>
          {/* <style
            dangerouslySetInnerHTML={{
              __html:
                ".mapouter{position:relative;text-align:right;width:100%;height:1px;}.gmap_canvas {overflow:hidden;background:none!important;width:100%;height:1px;}.gmap_iframe {height:1px!important;}"
            }}
          /> */}
        </div>
      </Grid>
    </Grid>
  );
}

export default Details;
