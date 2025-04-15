import React from "react";
import {
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import CustomTextField from "../components/CustomTextField";

export default function FormPage() {
  const location = useLocation();
  const { level, goal } = location.state || { level: "", goal: "" }; // Retrieve level and goal from state

  return (
    <div style={styles.container}>
      <Typography variant="h4" sx={{ color: "#6A9C89" }}>
        Let Us Know More So We Could Customize a Plan{" "}
      </Typography>
      <Typography variant="h6" sx={{ color: "#80AF81", fontWeight: "bold" }}>
        Level: {level}
      </Typography>

      <FormControl fullWidth variant="outlined" margin="normal">
        <CustomTextField
          label="Goal (Exam Name)"
          value={goal}
          InputProps={{ readOnly: true }} // Make it read-only
        />
      </FormControl>

      <FormControl fullWidth variant="outlined" margin="normal">
        <CustomTextField
          label="Level"
          value={level}
          InputProps={{ readOnly: true }} // Make it read-only
        />
      </FormControl>

      <div style={styles.dateContainer}>
        <CustomTextField
          label="No of Days/Months Before Exam"
          type="number"
          variant="outlined"
          style={styles.input}
        />
        <FormControl fullWidth variant="outlined" sx={styles.selectFormControl}>
          <InputLabel sx={styles.inputLabel}>Unit</InputLabel>
          <Select
            defaultValue="days"
            label="Unit"
            sx={styles.select}
            MenuProps={{
              PaperProps: {
                sx: {
                  "& .MuiMenuItem-root.Mui-selected": {
                    backgroundColor: "#80AF81", // background color of selected option
                  },
                },
              },
            }}
          >
            <MenuItem value="days">Days</MenuItem>
            <MenuItem value="months">Months</MenuItem>
            <MenuItem value="years">Years</MenuItem>
          </Select>
        </FormControl>
      </div>

      <FormControl fullWidth variant="outlined" margin="normal">
        <CustomTextField
          label="No of Hours Daily Study"
          type="number"
          variant="outlined"
        />
      </FormControl>

      <Button variant="contained" style={styles.btn}>
        Let's Start
      </Button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "2%",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  dateContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    flex: 3,
    marginRight: "10px",
  },
  btn: {
    marginTop: "20px",
    backgroundColor: "#6A9C89",
    color: "white",
  },
  selectFormControl: {
    flex: 1,
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#80AF81", // Border color on focus for Select component
      },
    },
  },
  inputLabel: {
    "&.Mui-focused": {
      color: "#80AF81", // Label color on focus
    },
  },
  select: {
    "& .MuiOutlinedInput-input": {
      color: "black", // Text color of selected item
    },
    "&:focus": {
      borderColor: "#80AF81", // Border color on focus
    },
  },
};
