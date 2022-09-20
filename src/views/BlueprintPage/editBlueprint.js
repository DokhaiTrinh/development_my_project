import React, { useState, useEffect } from 'react';
import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { yupResolver } from '@hookform/resolvers/yup';
import { createBlueprintApi } from '../../apis/Blueprint/createBlueprint';
import * as yup from 'yup';
import TextFieldComponent from '../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { getAllProjectApi1 } from '../../apis/Project/getAllProject';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Badge from '@mui/material/Badge';
import CancelIcon from '@mui/icons-material/Cancel';
import Select from '@mui/material/Select';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import RenderImage from '../../Components/Render/RenderImage';
import { useParams } from 'react-router-dom';
const editBlueprint = () => {
  return <div>editBlueprint</div>;
};

export default editBlueprint;
