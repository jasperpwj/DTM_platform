import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },

    content: {
        flexGrow: 1,
        marginTop: theme.spacing(8),
        padding: theme.spacing(2),

    },

    paper: {
        marginLeft: '5%',
    }
}));

const example_data = [
    { year: 'Container 1', population: 1 },
    { year: 'Container 2', population: 0 },
    { year: 'Container 3', population: 2 },
    { year: 'Container 4', population: 5 },
  ];

export default function DashboardPage() {
    const classes = useStyles();
    const navBarInfo = {
        title: "Account"
    };

    return (
        <div className={classes.root}>
            <main className={classes.content}>
                <div className={classes.toolbar}>
                    <Typography paragraph>
                        Dashboard page
                    </Typography>
                    <Paper elevation={0} className={classes.paper}>
                        <Chart
                        data={example_data}
                        >
                        <ArgumentAxis />
                        <ValueAxis max={7} />

                        <BarSeries
                            valueField="population"
                            argumentField="year"
                        />
                        <Title text="Example" />
                        <Animation />
                        </Chart>
                    </Paper>
                    
                </div>
            </main>
        </div>
    )
}