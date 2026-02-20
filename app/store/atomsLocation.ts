import { atom } from 'recoil';
import { LocationApi } from '../types/location';

export const locationsState = atom<LocationApi[]>({
  key: 'locationsState',
  default: [],
});

export const locationPageState = atom<number>({
  key: 'locationPageState',
  default: 1,
});

export const locationNameFilterState = atom<string>({
  key: 'locationNameFilterState',
  default: '',
});

export const locationTotalPagesState = atom<number>({
  key: 'locationTotalPagesState',
  default: 1,
});

export const locationLoadingState = atom<boolean>({
  key: 'locationLoadingState',
  default: true,
});