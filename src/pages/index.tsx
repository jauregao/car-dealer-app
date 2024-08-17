import { Inter } from 'next/font/google';
import FilterForm from '@/components/FilterForm';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`w-full bg-secondary flex justify-center items-center ${inter.className}`}
    >
      <FilterForm />
    </main>
  );
}
