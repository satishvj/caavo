import React from 'react'
import { Grid, Avatar } from '@material-ui/core'
import ListComp from './ListComp'
import GroupDialog from './GroupDialog'

export default function Home(props){
    return(
        <Grid container>
                <Avatar src='/group.svg' className='grpImg'/>
           <Grid>
               <ListComp groupsData={props.groupsData}/>
            </Grid>
        
            <GroupDialog open={props.open} handleClose={props.handleClose} 
            setGroupsData={props.setGroupsData} groupsData={props.groupsData}
            setUsersData={props.setUsersData} usersData={props.usersData} />
          
        </Grid>
    )

}