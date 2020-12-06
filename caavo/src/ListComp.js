import { Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

export default function ListComp(props) {
    const [groups, setGroups] = useState(null)

    useEffect(() => {
        setGroups(props.groupsData)
    }, [props.groupsData])


    return (
        <Grid container className='listcomp'>
                                <Grid item xs={12}>
            <div className='flex justifyAround' style={{borderBottom:'1px solid'}}>
                           <Typography>Sl. No.</Typography>
                           <Typography>Name</Typography>
                           <Typography>Description</Typography>
                           </div> 
            </Grid>
            {groups && groups.length > 0 ? groups.map((g, indx) => {
                return (
                    <Grid item xs={12} key={indx}>
                       <div className='flex justifyAround'>
                            <Typography>{indx + 1}</Typography>
                           <Typography>{g.name}</Typography>
                           <Typography className='ellipsis'>{g.desc}</Typography>
                           </div> 
                    </Grid>
                )

            }) :
            <Typography>
                No groups created yet
            </Typography>

            }
        </Grid>
    )
}