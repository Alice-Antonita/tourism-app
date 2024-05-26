import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

interface ActionAreaCardProps {
  image: string;
  title: string;
  description: string;
}

export const ActionAreaCard: React.FC<ActionAreaCardProps> = ({ image, title, description }) => (
  <Card sx={{ maxWidth: 345 }}>
    <CardActionArea>
      <CardMedia component='img' height='140' image={image} alt={title} />
      <CardContent sx={{ height: '150px', overflowY: 'auto' }}>
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
