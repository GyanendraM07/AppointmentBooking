import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// const initialRows = {
//  id: { value: 1, editable: false },
//   name: { value: 'John Doe', editable: true },
//   age: { value: 25, editable: true },
//   country: { value: 'USA', editable: true },
//   occupation: { value: 'Engineer', editable: true },
//   email: { value: 'john@example.com', editable: true },
//   status: { value: 'Active', editable: true },
//   hobbies: { value: 'Reading', editable: true },
//   address: { value: '123 Main St', editable: true },
//   phone: { value: '123-456-7890', editable: true },
//   education: { value: 'Bachelor\'s Degree', editable: true },
//   // Add more fields as needed
// };

// const initialRows = {
//     id: { value: 1, editable: false },
//     name: { value: 'John Doe', editable: true },
//     age: { value: 25, editable: true },
//     country: { value: 'USA', editable: true },
//     occupation: { value: 'Engineer', editable: true },
//     email: { value: 'john@example.com', editable: true },
//     status: { value: 'Active', editable: true },
//     hobbies: { value: 'Reading', editable: true },
//     address: { value: '123 Main St', editable: true },
//     phone: { value: '123-456-7890', editable: true },
//     education: { value: 'Bachelor\'s Degree', editable: true },
//     // Add more fields as needed
//   };

export default function EditableTable({initialRows,saveEditedUser,dialogClose,title}) {
  const [open, setOpen] = useState(true);
  const [editedRows, setEditedRows] = useState({ ...initialRows });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleValueChange = (field, value) => {
    setEditedRows((prevRows) => ({
      ...prevRows,
      [field]: { ...prevRows[field], value },
    }));
  };
  

  const fields = Object.keys(initialRows);
  const fieldsInGroups = [];
  for (let i = 0; i < fields.length; i += 3) {
    fieldsInGroups.push(fields.slice(i, i + 3));
  }

  console.log(fieldsInGroups);
  console.log("editedRows",editedRows);
  const handleSubmit = () => {
    console.log("Submitted values:", editedRows);
    // Do further processing or send the values to an API
    saveEditedUser(editedRows);
    //handleClose(); // Close the dialog after submission if needed
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open Editable Table
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="editable-table-dialog"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle style={{ textAlign: 'center', background: '#93726B' }}>{title}</DialogTitle><br></br>
        <DialogContent>
          {fieldsInGroups.map((group, groupIndex) => (
            <div key={groupIndex} style={{ display: 'flex', marginBottom: '8px' }}>
              {group.map((field) => (
                <React.Fragment key={field}>
                {editedRows[field].type === 'text' ? (
                <TextField
                  key={field}
                  label={field}
                  fullWidth
                  variant="standard"
                  value={editedRows[field].value}
                  onChange={(e) => handleValueChange(field, e.target.value)}
                  style={{ marginRight: '8px' }}
                  InputProps={{
                    readOnly: editedRows[field].editable,
                  }}
                />
                ) :(
                  <TextField
                  select
                  label={field}
                  fullWidth
                  variant="standard"
                  value={editedRows[field].value}
                  onChange={(e) => handleValueChange(field, e.target.value)}
                  style={{ marginRight: '8px' }}
                >
                  {editedRows[field].options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                )}
                 </React.Fragment>
              ))}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
