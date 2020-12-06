import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
  root: {
   padding: '1px'
  },
});

export default function UserCard(props) {
  
  const classes = useStyles();
    const [checked, setChecked] = React.useState(true);
    React.useEffect(() => {
        if(props.user){
            if (props.user['checked'] === undefined){
                props.user['checked'] = false
            }
        }
        setChecked(false)
    }, [props.user])


 function handleOnclick(e){
    props.user['checked'] = !checked
    var index = props.users.findIndex((u) => u.id === props.user.id);
    props.setUsers(prev => {
        var index = prev.findIndex((u) => u.id === props.user.id);
        prev[index] = props.user;
        return [...prev]
    });
     props.setSelectedUsers(props.user)
     setChecked(props.user.checked)
 }
  return (
    <Card className={classes.root}>
          <CardActionArea onClick={(e) => { handleOnclick() }}>
          <div className='flex'>

        <CardMedia
          className='media'
          image={props.user.Image}
          title="Contemplative Reptile"
          />
       <div>
      <Checkbox
        checked={checked}
        onChange={handleOnclick}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      
    </div>
          </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           {props.user.name}
          </Typography>
          
        </CardContent>
      </CardActionArea>
      
    </Card>
  );
}
