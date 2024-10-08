import { Suspense } from 'react';
import { getStaticPaths, getStaticProps } from '@/utils/data';
import { useRouter } from 'next/router';
import Image from 'next/image';

type Props = {
  makeName: string;
  modelNames: string[];
  year: string;
};

const ResultPage = ({ makeName, modelNames = [], year }: Props) => {
  const router = useRouter();

  const onClick = async () => {
    router.push(`/`);
  };

  return (
    <div className="sm:w-3/4 w-full h-full">
      <Image
        className="sm:-mb-14 sm:ml-6 -mb-8 ml-2 sm:h-30 sm:w-30 rotate-90 cursor-pointer"
        src="/back_arrow_icon_134660.svg"
        width={20}
        height={20}
        alt="voltar"
        onClick={() => onClick()}
      ></Image>
      <div className="text-text h-fit bg-primary p-10 sm:p-20 rounded-lg shadow-black/80 flex justify-center flex-col ">
        <h1 className="text-2xl sm:text-4xl font-bold mb-10">
          Results for {makeName} - {year}
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ul className="list-disc pl-5 font-bold grid grid-cols-1 sm:grid-cols-3 gap-4">
            {modelNames.length > 0 ? (
              modelNames.map((model, index) => (
                <li key={index} className="text-lg mb-2">
                  {model}
                </li>
              ))
            ) : (
              <li>No models found for this manufacturer in this year.</li>
            )}
          </ul>
        </Suspense>
      </div>
    </div>
  );
};

export { getStaticPaths, getStaticProps };
export default ResultPage;
