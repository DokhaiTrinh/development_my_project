import React from 'react'
import { useHistory } from 'react-router-dom';
import IconButtonCus from './IconButtonCus';
import UpdateIcon from '@mui/icons-material/Update';

export const UpdateButton = (path) => {
    const history = useHistory();
    return (
        <IconButtonCus onClick={() => {history.push(path)}} icon={<UpdateIcon/>}/>
    )
}

export default UpdateButton