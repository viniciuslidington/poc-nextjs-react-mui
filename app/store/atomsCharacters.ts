import { atom } from 'recoil';
import { CharacterApi } from '../types/character';

export const charactersState = atom<CharacterApi[]>({
  key: 'charactersState',
  default: [],
});

export const characterPageState = atom<number>({
  key: 'characterPageState',
  default: 1,
});

export const characterNameFilterState = atom<string>({
  key: 'characterNameFilterState',
  default: '',
});

export const characterTotalPagesState = atom<number>({
  key: 'characterTotalPagesState',
  default: 1,
});

export const characterLoadingState = atom<boolean>({
  key: 'characterLoadingState',
  default: true,
});