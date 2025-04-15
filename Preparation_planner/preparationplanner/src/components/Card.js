// Card.js
import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function MediaCard({title, description, imageUrl}){
  const navigate = useNavigate();
  const handleCardClick = () => {
    if (title === "Computer Engineering Placement Preparation"){
      navigate('/classification'); // Navigate to the form/question page
    }else{
      console.log("No database of this exam exists right now");
    }
    
  };

  return (
    <Card sx={{ maxWidth: 345 , height: 380, margin: '45px'}}>
      <CardMedia
        sx={{ height: 180 }}
        image={imageUrl}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" sx = {{color:'#80AF81', fontWeight:'bold'}} onClick={handleCardClick}>
          Create a Plan
        </Button>
      </CardActions>
    </Card>
  );
};


