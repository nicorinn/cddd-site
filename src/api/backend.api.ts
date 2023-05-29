import axios from 'axios';
import { SearchResults } from '../types';

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
