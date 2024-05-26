import { Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import axios from '@src/utils/axios';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

export const PlaceRecommedations = ({ place }: { place: string }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [cityDetails, setCityDetails] = useState<
    {
      name: string;
      deescription: string;
      type: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchCityDetails = async () => {
      try {
        const response = await axios.get('/api/au-tourist-places?city=' + place);
        console.log(response);
        setCityDetails(response.data);
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

    fetchCityDetails();
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

//TODO UPDATE IMAGE ACCORDING TO PLACE
function ImgMediaCard({
  cityDetails
}: {
  cityDetails: {
    name: string;
    deescription: string;
    type: string;
  }[];
}) {
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
            <CardMedia
              component='img'
              alt={item.name}
              height='140'
              image={'https://source.unsplash.com/random/?' + item.name}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {item.name}
              </Typography>
              <Chip label={item.type} color='info' variant='outlined' />
              <Typography variant='body2' color='text.secondary'>
                {item.deescription}
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
