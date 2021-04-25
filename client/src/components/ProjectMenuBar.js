import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import ProjectMembers from "./ProjectMembers";
import AddMember from "./AddMember";
import ProjectSettingButton from "./projectSettingButton";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";
const projectService = require("../services/projects.service");

const useStyles = makeStyles((theme) => ({
    title: {
        padding: theme.spacing(2, 2, 1, 2),
        spacing: theme.spacing(1),
        backgroundColor: "white",
    },
    button_group: {
        backgroundColor: "white",
        padding: theme.spacing(0, 0, 0, 1),
    },
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
}));

export default function ProjectMenuBar(props) {
    const classes = useStyles();

    const [identity, setIdentity] = useState(null);

    useEffect(() => {
        projectService.getUserIdentity(props.value.projectId).then(res => {
            if (res) {
                setIdentity(res.userIdentity);
            }
        });
    }, []);

    return (
        <React.Fragment>
            <Grid container className={classes.title}>
                <Grid item xs>
                    <Typography align="left" variant='h5' component='h2'>
                        {props.value.projectName} {props.title && props.title}
                    </Typography>
                </Grid>
                <Grid container item xs justify="flex-end" spacing={1}>
                    <Grid item>
                        <AvatarGroup spacing={2}>
                        </AvatarGroup>
                    </Grid>
                    <Grid item>
                        <ProjectMembers id={props.value.projectId} value={{ userIdentity: props.value.userIdentity }} />
                    </Grid>
                    {(identity === "owner") ? (
                        <Grid item>
                            <AddMember id={props.value.projectId} />
                        </Grid>) : null}
                    {(identity === "owner" || identity === "developer") ? (
                        <Grid item>
                            <ProjectSettingButton value={props.value.projectId} />
                        </Grid>) : null}
                </Grid>
            </Grid>
            <Grid container className={classes.button_group}>
                <Button size="small"><Link href={`/projects/${props.value.projectId}`}>Project</Link></Button>
                <Button size="small"><Link href={`/projects/${props.value.projectId}/tasks`} >Tasks</Link></Button>
                <Button size="small"><Link href={`/projects/${props.value.projectId}/history`} >History</Link></Button>
                <Button size="small"><Link href={`/projects/${props.value.projectId}/issues`} >Issues</Link></Button>
                <Button size="small"><Link href={`/projects/${props.value.projectId}/dashboard`} >Dashboard</Link></Button>
            </Grid>
            <Divider />
        </React.Fragment>
    )
}