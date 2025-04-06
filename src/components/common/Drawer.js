import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Sidebar from './Sidebar';


export default function TemporaryDrawer(props) {
  const {open, setOpen, currentTab,setCurrentTab, bgGradient} = props;

  const handleClose = () => {
    setOpen(false);
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleClose}>
      <List>
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} bgGradient={bgGradient} />
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={handleClose} >
        {DrawerList}
      </Drawer>
    </div>
  );
}
