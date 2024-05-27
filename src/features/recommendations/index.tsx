import { Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import axios from '@src/utils/axios';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

import * as nodeFetch from 'node-fetch';

import { useEnv } from '@src/env/provider';
import { createApi } from 'unsplash-js';

interface CardDetailsI {
  name: string;
  description: string;
  type: string;
  image?: string;
}

export const PlaceRecommedations = ({ place }: { place: string }) => {
  const { enqueueSnackbar } = useSnackbar();
  const env = useEnv();

  const [cityDetails, setCityDetails] = useState<CardDetailsI[]>([]);

  useEffect(() => {
    if (place) {
      const item = window.sessionStorage.getItem(place);
      item && setCityDetails(JSON.parse(item));
      if (!item) {
        const unsplashApi = createApi({
          accessKey: (env?.NEXT_PUBLIC_USP_KEY as string) ?? '',
          fetch: nodeFetch.default as unknown as typeof fetch
        });
        const fetchCityDetails = async () => {
          try {
            const response = await axios.get('/api/au-tourist-places?city=' + place);

            console.log(response);
            // setCityDetails(response.data);
            fetchImages(response.data);
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

        const fetchImages = async (
          cityDetails: {
            name: string;
            description: string;
            type: string;
            image?: string;
          }[]
        ) => {
          const withImages = cityDetails.map(async (item) => {
            const res = await unsplashApi.search.getPhotos({
              query: item.name,
              page: 1,
              perPage: 1
            });
            if (res.type === 'success') {
              return { ...item, image: res.response.results[0].urls.raw };
            }
            return { ...item, image: '' };
          });
          const value = await Promise.all(withImages);
          window.sessionStorage.setItem(place, JSON.stringify(value));
          setCityDetails(value);
        };

        fetchCityDetails();
      }
    }
  }, [place]);

  return (
    <div style={{ padding: '45px' }}>
      <Typography variant='h2' component={'h2'} align='center'>
        {cityDetails.length > 0
          ? `Some highlights from ${place}`
          : `No Recommendation found, Please view later for more updates`}
      </Typography>
      <ImgMediaCard cityDetails={cityDetails} />
    </div>
  );
};

function ImgMediaCard({ cityDetails }: Readonly<{ cityDetails: CardDetailsI[] }>) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: '20px',
        marginTop: '150px'
      }}
    >
      {cityDetails &&
        cityDetails.length > 0 &&
        cityDetails.map((item) => (
          <Card sx={{ width: 345 }} key={item.name} variant='outlined'>
            <CardMedia component='img' alt={item.name} height='140' image={item.image} />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {item.name}
              </Typography>
              <Chip label={item.type} color='info' variant='outlined' />
              <Typography variant='body2' color='text.secondary'>
                {item.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small'>Share</Button>
              <Button size='small'>Learn More</Button>
            </CardActions>
          </Card>
        ))}
    </div>
  );
}
