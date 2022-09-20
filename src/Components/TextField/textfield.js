import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

const TextFieldComponent = (props) => {
  const {
    register,
    name,
    label,
    errors,
    isPassword,
    maxRows,
    multiline,
    defaultValue,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      {...register(name)}
      error={errors != null}
      variant="outlined"
      // margin="normal"
      fullWidth
      defaultValue={defaultValue}
      placeholder={label}
      autoComplete={name}
      autoFocus
      multiline={multiline}
      rows={maxRows}
      helperText={errors?.message}
      type={isPassword ? (showPassword ? 'text' : 'password') : ''}
      InputProps={
        isPassword && {
          // <-- This is where the toggle button is added.
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }
      }
    />
  );
};
export default TextFieldComponent;
