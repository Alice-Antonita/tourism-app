'use client';

import { Grid, LinearProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAppContext } from '@src/context';
import axios from '@src/utils/axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { ActionAreaCard } from './homeCards';

// Define the type for top100Films
interface Film {
  title: string;
}

// Define the type for card data
interface CardData {
  image: string;
  title: string;
  description: string;
}

const cardsData: CardData[] = [
  {
    image: '/images/home/card1.jpg',
    title: 'Our Magical Journey Builder',
    description:
      'Embark on a voyage tailored just for you, as our app crafts enchanting travel itineraries based on your whims and wanderlust.Make your adventure nothing short of extraordinary!'
  },
  {
    image: '/images/home/card2.jpg',
    title: 'The Adventure Alchemist',
    description:
      'Stay ahead of the curve with updates on the hottest spots, coolest events, and irresistible deals, ensuring your journey is as vibrant as the cities you will explore!'
  },
  {
    image: '/images/home/card3.jpg',
    title: 'Wanderlust Wizardry',
    description:
      'Navigate through interactive maps, sprinkle in user reviews, and brew up the perfect trip with customizable filters. With us, every journey is a magical tale waiting to unfold!'
  }
];

const Home: React.FC = () => {
  const [cities, setCities] = useState<ReadonlyArray<{ city: string; admin_name: string }>>([]);
  const [inputValue, setInputValue] = React.useState('');
  const { handleCurrentCity } = useAppContext();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('/api/au-cities');
        console.log(response);
        setCities(response.data);
      } catch (err: any) {
        if (err.response) {
          enqueueSnackbar(err.response.data.error || 'An error occurred', { variant: 'error' });
        } else if (err.request) {
          enqueueSnackbar('No response from server', { variant: 'error' });
        } else {
          enqueueSnackbar('An error occurred', { variant: 'error' });
        }
      }
    };

    fetchCities();
  }, []);

  return (
    <>
      <Box
        sx={{
          height: 550,
          width: '100%',
          // maxWidth: 1520,
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
          src='/images/home/home.jpg'
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
        {!cities && <LinearProgress />}
        {cities && (
          // <Autocomplete
          //   // freeSolo
          //   id='au-cities'
          //   disableClearable
          //   value={value}
          //   options={cities.map((option) => `${option.city}, ${option.admin_name}`)}
          //   inputValue={inputValue}
          //   onInputChange={(event, newInputValue) => {
          //     setInputValue(newInputValue);
          //   }}
          //   onChange={(event: any, newValue: { city: string; admin_name: string } | null) => {
          //     setValue(newValue);
          //   }}
          //   renderInput={(params) => (
          //     <TextField
          //       {...params}
          //       label='Where do you wanna go?'
          //       InputProps={{
          //         ...params.InputProps,
          //         type: 'search'
          //       }}
          //       sx={{
          //         backgroundColor: 'white',
          //         borderRadius: 1,
          //         width: 300
          //       }}
          //     />
          //   )}
          // />
          <Autocomplete
            id='au-cities'
            disableClearable
            options={cities}
            getOptionLabel={(option) => `${option.city}, ${option.admin_name}`}
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
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            onChange={(event, value) => {
              value && handleCurrentCity(value.city);
            }}
          />
        )}
      </Box>
      <Grid container spacing={2} justifyContent='space-evenly' sx={{ mt: 2 }}>
        {cardsData.map((card) => (
          <Grid
            container
            item
            xs={12}
            sm={3}
            md={3}
            justifyContent='center'
            alignItems={'center'}
            key={card.title}
          >
            <ActionAreaCard image={card.image} title={card.title} description={card.description} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
