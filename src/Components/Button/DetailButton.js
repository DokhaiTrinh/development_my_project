import React from 'react'
import { useHistory } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import IconButtonCus from './IconButtonCus';

export const DetailButton = (path) => {
    const history = useHistory();

    return (
        <IconButtonCus onClick={() => {history.push(path)}} icon={<InfoIcon />}/>
    )
}

export default DetailButton