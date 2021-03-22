import React, {useState} from 'react';
import {fade, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from "@material-ui/core/Grid";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from "@material-ui/core/Toolbar";
import PropTypes from 'prop-types';
import Box from "@material-ui/core/Box";
import AddProject from "./AddProject";
import OpenProjects from "./OpenProjects";
import ClosedProjects from "./ClosedProjects";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        margin: theme.spacing(8,0,0,8),
        backgroundColor: "#eeeeee",
        height: "100vh",
    },
    appBar: {
        backgroundColor: "grey",
    },
    tap: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    content: {
        margin: theme.spacing(3, 3, 3, 3),
        backgroundColor: "lightblue",
        padding: theme.spacing(1),
    },
    test : {
        backgroundColor: "orange",
        maxHeight: 100
    }
}));


function TabContent(props) {
    const {children, value, index, ...other} = props;

    return (
        <Grid
            item xs={12}
            role="tappanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </Grid>
    );
}
TabContent.propTypes = {
    children: PropTypes.node,
    value: PropTypes.any.isRequired,
    index: PropTypes.any.isRequired,
};


export default function Projects() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [openProjects, setOpenProjects] = useState("");
    const [closedProjects, setClosedProjects] = useState("");


    const handleContentChange = (event, newValue) =>{
        setValue(newValue)
    };


    return (
        <div className={classes.root}>
            <Grid container justify="center">
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Tabs value= {value} onChange={handleContentChange} aria-label="projects tabs" className={classes.tap}>
                            <Tab label="Open" id="tab-0" aria-controls = "tabpanel-0"/>
                            <Tab label="Closed" id="tab-1" aria-controls = "tabpanel-1"/>
                            <AddProject/>
                        </Tabs>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                <TabContent value={value} index={0}>
                    <Grid className={classes.content}>
                        <OpenProjects/>
                    </Grid>
                </TabContent>
                <TabContent value={value} index={1}>
                    <Grid className={classes.content}>
                        <ClosedProjects/>
                    </Grid>
                </TabContent>

            </Grid>

        </div>
    )
}