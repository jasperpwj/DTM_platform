import React from 'react';
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Avatar from "@material-ui/core/Avatar";
import ProjectMembers from "./ProjectMembers";
import AddMember from "./AddMember";
import ProjectSettingButton from "./projectSettingButton";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
    title: {
        padding: theme.spacing(2,2,1,2),
        spacing: theme.spacing(1),
        backgroundColor: "white",
    },
    button_group: {
        backgroundColor: "white",
        padding: theme.spacing(0,0,0,1),
    },
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
}));

export default function ProjectMenuBar(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid container className={classes.title}>
                <Grid item xs>
                    <Typography align="left" variant='h6'>
                        {props.value.projectName}
                    </Typography>
                </Grid>
                <Grid container item xs justify="flex-end" spacing={1}>
                    <Grid item>
                        <AvatarGroup spacing={2}>
                            <Avatar className={classes.avatar}>M</Avatar>
                            <Avatar className={classes.avatar}>M</Avatar>
                            <Avatar className={classes.avatar}>M</Avatar>
                            <Avatar className={classes.avatar}>M</Avatar>
                            <Avatar className={classes.avatar}>M</Avatar>
                        </AvatarGroup>
                    </Grid>
                    <Grid item>
                        <ProjectMembers id={props.value.projectId}/>
                    </Grid>
                    <Grid item>
                        <AddMember id={props.value.projectId}/>
                    </Grid>
                    <Grid item>
                        <ProjectSettingButton value={props.value.projectId}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container className={classes.button_group}>
                <Button size="small"><Link href={`/projects/${props.value.projectId}`}>Project</Link></Button>
                <Button size="small"><Link href={`/projects/${props.value.projectId}/tasks`} >Tasks</Link></Button>
                <Button size="small"><Link href={`/projects/${props.value.projectId}/history`} >History</Link></Button>
                <Button size="small"><Link href={`/projects/${props.value.projectId}/issues`} >Issues</Link></Button>
                <Button size="small"><Link href={`/projects/${props.value.projectId}/dashboard`} >Dashboard</Link></Button>
            </Grid>
            <Divider/>
        </React.Fragment>
    )
}