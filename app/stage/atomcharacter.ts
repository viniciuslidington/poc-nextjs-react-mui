import { atom } from 'recoil';
import { CharacterApi } from '../types/character';

// Estado da página atual
export const characterPageState = atom<number>({
  key: 'characterPageState',
  default: 1,
});

// Estado do filtro de nome
export const characterNameState = atom<string>({
  key: 'characterNameState',
  default: '',
});

// Estado do personagem selecionado (para o modal)
export const selectedCharacterState = atom<CharacterApi | null>({
  key: 'selectedCharacterState',
  default: null,
});