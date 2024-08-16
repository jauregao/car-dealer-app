import api from "../service/api";

export interface IModel {
  id: number;
  model: string;
}

export default async function FetchData(): Promise<IModel[]> {
  const types: IModel[] = [];

  try {
    const response = await api.get('/vehicles/GetMakesForVehicleType/car?format=json');

    const { Results } = response.data;

    if (Array.isArray(Results)) {
      return Results.map((item: any) => ({
        id: item.MakeId,
        model: item.MakeName
      }));
    }

    return Results;

  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return types;
}
