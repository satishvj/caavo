import { Box, Button } from '@material-ui/core'
import './App.css';
import Home from './Home';
import React from 'react'

function App() {

  const [open, setOpen] = React.useState(false);
  const [usersData, setUsersData] = React.useState([]);
  const [groupsData, setGroupsData] = React.useState([]);

const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="App">
      <Box boxShadow={2}>

      <header className="App-header">
    <img src='./caavo.jpg' alt='logo'/>
            <Button  onClick={handleClickOpen}>Create a Group</Button>
            {/* <Avatar src='/team.svg' style={{height:'120px !important'}}/> */}
      </header>
      </Box>
      <Home open={open} handleClose={handleClose} 
      setUsersData={setUsersData} usersData={usersData}
      setGroupsData={setGroupsData} groupsData={groupsData}
      />
    </div>
  );
}

export default App;
