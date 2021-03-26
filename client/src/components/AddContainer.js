import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';

export default function AddContainer(props) {
    console.log(props);
    return (
        <React.Fragment>
            <Button
                variant='outlined'
                startIcon={<AddIcon/>}
            >Add Container</Button>
        </React.Fragment>
    )
}