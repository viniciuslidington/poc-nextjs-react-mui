import { Episode } from '@/app/types/episodes';
import { atom } from 'recoil';

export const episodesState = atom<Episode[]>({
  key: 'episodesState',
  default: [],
});

export const episodePageState = atom<number>({
  key: 'episodePageState',
  default: 1,
});

export const episodeNameFilterState = atom<string>({
  key: 'episodeNameFilterState',
  default: '',
});

export const episodeTotalPagesState = atom<number>({
  key: 'episodeTotalPagesState',
  default: 1,
});

export const episodeLoadingState = atom<boolean>({
  key: 'episodeLoadingState',
  default: true,
});