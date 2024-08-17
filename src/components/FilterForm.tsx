import dynamic from 'next/dynamic';
import FetchData, { IModel } from '@/utils/getData';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type FormValues = {
  model: number;
  year: string;
};

function FilterForm() {
  const {
    handleSubmit,
    register,
    formState: { isValid, isDirty },
  } = useForm<FormValues>({
    mode: 'onChange',
  });
  const [types, setTypes] = useState<IModel[]>([]);
  const router = useRouter();

  const years = (() => {
    const yearsArray = [];
    const currentYear = new Date().getFullYear();
    const startYear = 2015;
    for (let year = currentYear; year >= startYear; year--) {
      yearsArray.push(year);
    }
    return yearsArray;
  })();

  const onSubmit: SubmitHandler<FormValues> = async ({
    model,
    year,
  }: FormValues) => {
    router.push(`/results/${model}/${year}`);
  };

  useEffect(() => {
    (async () => {
      const types = await FetchData();
      setTypes(types);
    })();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[800px] h-max p-20 shadow-lg rounded-lg shadow-black/20 bg-primary flex flex-col items-center justify-between gap-10"
    >
      <div className="w-full text-center flex flex-col gap-5">
        <label
          className="w-full text-3xl font-bold text-center"
          htmlFor="model"
        >
          Model
        </label>
        <select
          className="w-full h-10 rounded-md px-4"
          {...register('model', { required: 'Please select a model' })}
          id="model"
          defaultValue=""
        >
          <option value="" disabled>
            Select a model
          </option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.model}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full text-center flex flex-col gap-5">
        <label className="w-full text-3xl font-bold text-center" htmlFor="year">
          Year
        </label>
        <select
          className="w-full h-10 rounded-md px-4"
          {...register('year', { required: 'Please select a year' })}
          id="year"
          defaultValue=""
        >
          <option value="" disabled>
            Select a year
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <input
        type="submit"
        value="Next"
        className={`py-3 w-full bg-text hover:bg-text/80 transition-colors shadow-black/10 text-primary rounded-md mt-5 uppercase font-bold ${isValid ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
        disabled={!isValid || !isDirty}
      />
    </form>
  );
}

export default dynamic(() => Promise.resolve(FilterForm), { ssr: false });
