import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import { VictoryChart, VictoryGroup, VictoryArea, VictoryPolarAxis, VictoryLabel, VictoryTheme } from 'victory';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
export default function Dashboard(props) {
    const characterData = [
        { requested: 13, completed: 40, issue: 14},
        { requested: 20, completed: 10, issue: 2},
        { requested: 10, completed: 20, issue: 5 }
    ];
    const getMaxima = (data) => {
        const groupedData = Object.keys(data[0]).reduce((memo, key) => {
            memo[key] = data.map((d) => d[key]);
            return memo;
        }, {});
        return Object.keys(groupedData).reduce((memo, key) => {
            memo[key] = Math.max(...groupedData[key]);
            return memo;
        }, {});
    };

    const processData = (data) =>{
        const maxByGroup = getMaxima(data);
        const makeDataArray = (d) => {
            return Object.keys(d).map((key) => {
                return { x: key, y: d[key] / maxByGroup[key] };
            });
        };
        return data.map((datum) => makeDataArray(datum));
    };
    const [data, setData] = useState(processData(characterData));
    const [maxima, setMaxima] = useState(getMaxima(characterData));
    console.log(data)
    return (
        <div style={{marginLeft: 100,}}>
            <Grid container justify='center' direction='column' style={{ width: 400, height: 600,}}>
                <br/><br/><br/><br/><br/><br/>
                <Grid item style={{}}>
                    <Typography align='left'>Team contributions</Typography>
                </Grid>

                <Grid item >
                    <VictoryChart polar
                                  theme={VictoryTheme.material}
                                  domain={{ y: [ 0, 1 ] }}
                    >
                        <VictoryGroup colorScale={["gold", "orange", "tomato"]}
                                      style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
                        >
                            {data.map((data, i) => {
                                return <VictoryArea key={i} data={data}/>;
                            })}
                        </VictoryGroup>
                        {
                            Object.keys(maxima).map((key, i) => {
                                return (
                                    <VictoryPolarAxis key={i} dependentAxis
                                                      style={{
                                                          axisLabel: { padding: 20 },
                                                          axis: { stroke: "none" },
                                                          grid: { stroke: "grey", strokeWidth: 0.5, opacity: 0.5 }
                                                      }}
                                                      tickLabelComponent={
                                                          <VictoryLabel labelPlacement="vertical"/>
                                                      }
                                                      labelPlacement="perpendicular"
                                                      axisValue={i + 1} label={key}
                                                      tickFormat={(t) => Math.ceil(t * maxima[key])}
                                                      tickValues={[0.25, 0.5, 0.75, 1]}
                                    />
                                );
                            })
                        }
                        <VictoryPolarAxis
                            labelPlacement="parallel"
                            tickFormat={() => ""}
                            style={{
                                axis: { stroke: "none" },
                                grid: { stroke: "grey", opacity: 0.5 }
                            }}
                        />
                    </VictoryChart>
                </Grid>

            </Grid>
        </div>
    );
}
