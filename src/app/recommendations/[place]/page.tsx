'use client';

import { useRouter } from 'next/navigation';

const PlaceDetailsPage = ({ params }: { params: { place: string } }) => {
  const { push } = useRouter();
  console.log(params.place);
  return <div onClick={() => push('/home')}>Place Details page</div>;
};

export default PlaceDetailsPage;
