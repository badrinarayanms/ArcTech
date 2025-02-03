import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletepost } from '../slice/postSlice';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Grid, Button, Box, Typography } from '@mui/material';
import Commentview from './Commentview';
 

const Postsview = () => {
   
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  

  const handleDelete = (id) => {
    console.log(id)
    dispatch(deletepost(id));

  };

  

  return (
    <>
      <Box paddingTop={5}>
      <Typography  variant='h1' fontWeight={600} sx={{fontSize: {
          xs: '2rem',   
          sm: '3rem',   
          md: '5rem',         
        }}}   textAlign={'center'}>Post View</Typography>
      

      <Grid container justifyContent="center" sx={{ my: 4 }}>
        <Grid item xs={12} md={6} padding={2}>
          {!loading?<TableContainer  sx={{
                  width: '100%',
                  overflowX: 'auto', // Enable horizontal scrolling for small screens
                }} component={Paper}  elevation={4}>
            <Table   aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Post Content</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '1rem', md: '1.2rem' } }}>{post.title}</TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '1rem', md: '1.2rem' } }}>{post.body}</TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '1rem', md: '1.2rem' } }} >
                    <Box display="flex" flexDirection="column" gap={1}>
                    <Commentview postid={post.id}/> 
                    
                      <Button size='small' onClick={() => handleDelete(post.id)} variant='outlined' fullWidth color="primary">
                        Delete
                      </Button>
                    </Box>
                      
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>:<Typography textAlign={'center'} variant='h1'>LOADING...</Typography>}
        </Grid>
      </Grid>
      </Box>
    </>
  );
};

export default Postsview;
