import { GetStaticPaths, GetStaticProps } from 'next';
import api from '@/service/api';
import IVehicle from '@/types/vehicle';

export interface IVehicleModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const resmodel = await api.get(
      '/vehicles/GetMakesForVehicleType/car?format=json'
    );
    const model: IVehicle[] = resmodel.data.Results;

    const years = (() => {
      const yearsArray = [];
      const currentYear = new Date().getFullYear();
      const startYear = 2015;
      for (let year = currentYear; year >= startYear; year--) {
        yearsArray.push(year);
      }
      return yearsArray;
    })();

    const paths = model.flatMap((make) =>
      years.map((year) => ({
        params: { makeId: make.MakeId.toString(), year: year.toString() },
      }))
    );

    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error('Error fetching model:', error);
    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { makeId, year } = context.params!;
  try {
    const res = await api.get(
      `/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
    const models: IVehicleModel[] = res.data.Results || [];
    const makeName = models.length > 0 ? models[0].Make_Name : '';
    const modelNames = models.map((model) => model.Model_Name);
    return { props: { makeName, modelNames, year: year as string } };
  } catch (error) {
    return { notFound: true, error };
  }
};
