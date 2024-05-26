'use client';

import { PlaceRecommedations } from '@src/features/recommendations';

const PlaceDetailsPage = ({ params }: { params: { place: string } }) => {
  return <PlaceRecommedations place={params.place} />;
};

export default PlaceDetailsPage;
