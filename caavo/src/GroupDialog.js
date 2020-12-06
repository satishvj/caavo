import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Avatar, Grid, TextField } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import UserCard from './UserCard';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
  
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

var selectedUarr = []
export default function GroupDialog(props) {
    
    const inputFile = React.useRef(null)
    const [users, setUsers] = React.useState([])
    const [name, setName] = React.useState(null)
    const [desc, setDesc] = React.useState(null)
    const [selectedUsers, setSelectedUsers] = React.useState([])

    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json'

    useEffect(()=>{
        fetch(proxyUrl+targetUrl)
        .then(res=>res.json())
        .then(result=>{
            setUsers(result)
        })
    },[])
    
    useEffect(()=>{
        if(users){
            props.setUsersData(users)
        }
    },[users])

    useEffect(()=>{
        if(selectedUsers){
            var index = selectedUarr.findIndex((us) => us.id === selectedUsers.id);
            // console.log("updateRunBook ", updatedRB, " index = ", index);
           if (index === -1) {
            selectedUarr.push(selectedUsers)
           }
        }
    },[selectedUsers])


    async function loadImage(img) {
        // console.log('img', img)
    }


    function handleUploadFile() {
        inputFile.current.click();
    }

    function handleUpdate(){
        props.handleClose()
        var grpObj = [{name: name, desc: desc, users: selectedUarr}]
        props.setGroupsData(prev => [...prev, ...grpObj])
    }

    return (
        <div>
            <Dialog fullWidth={true} maxWidth='lg' onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open} >
                <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
                    Create Group
        </DialogTitle>
                <DialogContent dividers>
                    <Grid container>
                        <Grid item xs={12} sm={5} md={4} ls={4}>
                            <Avatar className='avatar' src='/grp-profile.svg' variant="square" onClick={(e) => handleUploadFile()} />

                            <Grid container spacing={1} alignItems="flex-end" style={{justifyContent:'center'}}>
                                <Grid item>
                            <PhotoCamera />
                                </Grid>
                                <Grid item>
                            <Typography>Group Logo</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                <input type='file' id='file' accept="application/pdf,image/*" onChange={loadImage} ref={inputFile} style={{ display: 'none' }} value={""}  />

                        <Grid xs={12} sm={7} md={8} ls={8}>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item xs={3} >
                                    <Typography>Name</Typography>
                                </Grid>
                                <Grid item xs={9} >
                                    <TextField id="filled-read-only-input1" onChange={e => setName(e.target.value)} />
                                </Grid>
                            </Grid>



                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item xs={3}>
                                    <Typography>Description</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField id="filled-read-only-input2" onChange={e => setDesc(e.target.value)} />
                                </Grid>
                              
                            </Grid>


                        </Grid>

                    </Grid>
                    <Grid container>
                        {users && users.length > 0 ? users.map((u, indx) => {
                            return (

                                <Grid item xs={12} sm={6} md={2} lg={3} className='m-14' key={indx}>
                                    <UserCard users={users} user={u} setUsers={setUsers} setSelectedUsers={setSelectedUsers}/>
                                </Grid>
                            )
                        }) :
                            ''
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleUpdate} color="primary">
                        Update
          </Button>
                    <Button onClick={props.handleClose} color="primary">
                        Remove
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
