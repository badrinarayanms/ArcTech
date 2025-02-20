import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { fetchComments  } from '../slice/commentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider } from '@mui/material';

export default function ScrollDialog({postid=1}) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
  const dispatch = useDispatch();
  
 
  const commentslist = useSelector((state) => state.comments.comments );
  const loading = useSelector((state) => state.comments.loading);
 
 

  const handleClickOpen = (scrollType) => () => {
    dispatch(fetchComments(postid));
    setOpen(true);
    setScroll(scrollType);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <React.Fragment>
      <Button size='small' sx={{textAlign:"center", fontSize: { xs: '0.4rem', sm: '1rem', md: '1.2rem' } }}fullWidth variant='contained' onClick={handleClickOpen('paper',postid)}>View Comments</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth='lg'
        fullWidth
        
      >
        <DialogTitle id="scroll-dialog-title">Comments</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
           
            
              {!loading?
  commentslist.map((com) => (
    
     
    <Box key={com.id}>
        <DialogContentText
        sx={{ fontSize: { xs: '0.8rem', sm: '1rem', md: '1.2rem' } }}
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            
          >Name: {com.name}  <br/> Mail: {com.email}<br/> Comment: {com.body} <br/> </DialogContentText><Divider/>
    </Box>
  )):"loading..."
}
               
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
           
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
