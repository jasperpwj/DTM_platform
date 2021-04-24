import React, {useState, useEffect} from 'react';
import {fade, IconButton, makeStyles} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from "@material-ui/core/Grid";
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from "@material-ui/core/Toolbar";
import PropTypes from 'prop-types';
import Box from "@material-ui/core/Box";
import AddProject from "./AddProject";
import OpenProjects from "./OpenProjects";
import ClosedProjects from "./ClosedProjects";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from "react-router-dom";


const projectService = require("../services/projects.service");
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        margin: theme.spacing(8,0,0,8),
        backgroundColor: "#eeeeee",
        height: "100vh",
        minWidth: 800,
    },
    appBar: {
        backgroundColor: "white",
    },
    tap: {
        flexGrow: 1,
        color: 'black'
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
        paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
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
        margin: theme.spacing(2, 2, 2, 3),
    },
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
    
    const handleContentChange = (event, newValue) =>{
        setValue(newValue)
    };

    const history = useHistory();

    // get the whole list
    const ProjectList = [
        // { name: 'The Shawshank Redemption', id: 1994 },
    ];
    const [openProject, setOpenProjects] = useState([]);
    const [closeProject, setClosedProjects] = useState([]);
    useEffect(()=> {
        projectService.getOpenProjects().then(res => {
            if(!(res.data.length)) {
                setOpenProjects(res.data);
            } else {
                setOpenProjects(res.data);
            }
        })
    }, []);
    useEffect(()=> {
        projectService.getClosedProjects().then(res => {
            if(!(res.data.length)) {
                setClosedProjects(res.data);
            } else {
                setClosedProjects(res.data);
            }
        })
    }, []);
    
    for (let i = 0; i < openProject.length; i++){
        ProjectList.push({name: openProject[i].projectName, id: openProject[i]._id})
    }
    for (let i = 0; i < closeProject.length; i++){
        ProjectList.push({name: closeProject[i].projectName, id: closeProject[i]._id})
    }
    const [zhi, setZhi] = useState(0);

    const handleClick = (e) => {
        e.preventDefault();
        if (zhi === 0) {
            setZhi(0)
        } else {
            let path = 'projects/'+ zhi.id;
            history.push(path);
            setZhi(0)
        }
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
                            <Autocomplete
                                value={zhi}
                                onChange={(event, newValue) => {
                                    setZhi(newValue);
                                }}
                                id="inPut"
                                options={ProjectList}
                                getOptionLabel={(option) => option.name}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} id="inPut" variant="outlined" color="secondary" />}
                            />
                        </div>
                        <IconButton 
                            onClick={handleClick} >
                            <SearchIcon style={{fill:"black"}}/>
                        </IconButton>                        
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
