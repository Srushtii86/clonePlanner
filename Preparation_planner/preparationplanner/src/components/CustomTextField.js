import React from 'react';
import { TextField } from '@mui/material';

const CustomTextField = React.forwardRef((props, ref) => {
  return (
    <TextField
      {...props}
      ref={ref}
      sx={{
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "#80AF81", // Change border color on focus
          },
        },
        "& .MuiInputLabel-root": {
          color: "#000000", // Default label color
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#80AF81", // Label color when focused
        },
      }}
    />
  );
});

export default CustomTextField;
