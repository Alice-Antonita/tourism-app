'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Grid } from '@mui/material';

// Define the type for top100Films
interface Film {
  title: string;
}

const top100Films: Film[] = [
  { title: 'Melbourne'}
];

// Define the type for card data
interface CardData {
  image: string;
  title: string;
  description: string;
}

const cardsData: CardData[] = [
  {
    image: '/images/card1.jpg',
    title: 'Our Magical Journey Builder',
    description:
      'Embark on a voyage tailored just for you, as our app crafts enchanting travel itineraries based on your whims and wanderlust.Make your adventure nothing short of extraordinary!'
  },
  {
    image: '/images/card2.jpg',
    title: 'The Adventure Alchemist',
    description:
      'Stay ahead of the curve with updates on the hottest spots, coolest events, and irresistible deals, ensuring your journey is as vibrant as the cities you will explore!'
  },
  {
    image: '/images/card3.jpg',
    title: 'Wanderlust Wizardry',
    description:
      'Navigate through interactive maps, sprinkle in user reviews, and brew up the perfect trip with customizable filters. With us, every journey is a magical tale waiting to unfold!'
  }
];

// Define the props type for ActionAreaCard
interface ActionAreaCardProps {
  image: string;
  title: string;
  description: string;
}

const ActionAreaCard: React.FC<ActionAreaCardProps> = ({ image, title, description }) => (
  <Card sx={{ maxWidth: 345 }}>
    <CardActionArea>
      <CardMedia component='img' height='140' image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

const Home: React.FC = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' color='inherit'>
          <Toolbar>
            <Typography variant='h3' component='div' sx={{ flexGrow: 1, textAlign: 'center' }}>
              WanderCove
            </Typography>
            <Button href='/home' color='inherit'>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          height: 550,
          width: '100%',
          maxWidth: 1520,
          position: 'relative',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Box
          component='img'
          alt='The house from the offer.'
          src='/images/home.jpg'
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            position: 'absolute',
            zIndex: -1,
            top: 0,
            left: 0
          }}
        />
        <Typography
          variant='h3'
          sx={{
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'cursive',
            marginBottom: 2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
          }}
        >
          Let us plan your trip for you
        </Typography>
        <Autocomplete
          freeSolo
          id='free-solo-2-demo'
          disableClearable
          options={top100Films.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Where do you wanna go?'
              InputProps={{
                ...params.InputProps,
                type: 'search'
              }}
              sx={{
                backgroundColor: 'white',
                borderRadius: 1,
                width: 300
              }}
            />
          )}
        />
      </Box>
      <Grid container spacing={2} justifyContent='center' sx={{ mt: 4 }}>
        {cardsData.map((card, index) => (
          <Grid item xs={12} sm={4} md={4} key={index}>
            <ActionAreaCard image={card.image} title={card.title} description={card.description} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
