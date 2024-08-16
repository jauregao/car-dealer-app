// app/results/[makeId]/[year]/page.tsx
import { Suspense } from 'react';
import { getStaticPaths, getStaticProps } from '@/utils/data';

type VehicleModel = {
  name: string;
};

type Props = {
  models: VehicleModel[];
  makeId: string;
  year: string;
};

const ResultPage = ({ models, makeId, year }: Props) => {
  return (
    <div className='p-10'>
      <h1 className='text-4xl font-bold mb-5'>Results for {makeId} - {year}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ul className='list-disc pl-5'>
          {models.length > 0 ? (
            models.map((model, index) => (
              <li key={index} className='text-lg mb-2'>{model.name}</li>
            ))
          ) : (
            <li>No models found.</li>
          )}
        </ul>
      </Suspense>
    </div>
  );
};

export { getStaticPaths, getStaticProps };
export default ResultPage;