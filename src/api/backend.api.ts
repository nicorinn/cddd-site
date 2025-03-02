import axios from 'axios';
import { Compound, CompoundsListResults, SearchResults } from '../types';

const backendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

export async function searchFullDatabase(query: string) {
  const res = await backendApi.get<SearchResults>(`/search?q=${query}`);
  if (res.status == 200) {
    return res.data;
  } else {
    console.log(res.data);
    console.error(`Error: status code ${res.status}`);
    return null;
  }
}

export async function getCompoundById(id: string) {
  const res = await backendApi.get<Compound>(`/compound/${id}`);
  if (res.status == 200) {
    return res.data;
  } else {
    console.log(res.data);
    console.error(`Error: status code ${res.status}`);
    return null;
  }
}

export async function getCompoundsForAttribute(attribute: string, id: string) {
  const res = await backendApi.get<CompoundsListResults>(
    `/list/${attribute}/${id}`
  );
  if (res.status == 200) {
    return res.data;
  } else {
    console.log(res.data);
    console.error(`Error: status code ${res.status}`);
    return null;
  }
}
