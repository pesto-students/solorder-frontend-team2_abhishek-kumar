import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import commonStore from '../../zustang/common/commonStore';

export default function Loader() {
  const { loader: open } = commonStore(state => state);
  return (
    <Backdrop
      sx={{ color: '#fff', bgcolor: "rgba(111, 126, 140, 0.2)", backdropFilter: "blur(4px)", zIndex: (theme) => theme.zIndex.drawer + 200 }}
      open={open}
    >
      <img src="/image/loaderIcon.gif" alt="Loading..." height="110vh" style={{ zIndex: 1400 }} />
    </Backdrop>
  );
}