import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

export default function NpcForm() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };

  return (
    <React.Fragment>      
               
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField             
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField          
              margin="dense"
              id="race"
              name="race"
              label="Race"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="class"
              name="class"
              label="Class"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="level"
              name="level"
              label="Level"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="background"
              name="background"
              label="Background"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="role"
              name="role"
              label="Role"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="storyFit"
              name="storyFit"
              label="Story Fit"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              select
              margin="dense"
              id="lignment"
              name="alignment"
              label="Alignment"                     
              fullWidth
              variant="standard"              
            >
            <MenuItem value="Lawful Good">Lawful Good</MenuItem>
            <MenuItem value="Neutral Good">Neutral Good</MenuItem>
            <MenuItem value="Chaotic Good">Chaotic Good</MenuItem> 
            <MenuItem value="Lawful Neutral">Lawful Neutral</MenuItem>
            <MenuItem value="True Neutral">True Neutral</MenuItem>
            <MenuItem value="Chaotic Neutral">Chaotic Neutral</MenuItem>
            <MenuItem value="Lawful Evil">Lawful Evil</MenuItem>
            <MenuItem value="Neutral Evil">Neutral Evil</MenuItem>
            <MenuItem value="Chaotic Evil">Chaotic Evil</MenuItem>
            </TextField> 
            <TextField
              margin="dense"
              id="other"
              name="other"
              label="Other Information"
              type="text"
              fullWidth
              variant="standard"
            />
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Stats Included" />
              
            </FormGroup>                    
            
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Generete</Button>
            </DialogActions>
          </form>
       
    </React.Fragment>
  );
}
