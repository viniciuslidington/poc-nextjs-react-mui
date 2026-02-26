import { render, screen } from '@testing-library/react';
import CardCharacterCarrossel from './CardCharacter';
import { Character } from '../../types/character';

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
} as Character;

describe('CardCharacterCarrossel Component', () => {
  it('deve renderizar o nome e imagem corretamente', () => {
    render(<CardCharacterCarrossel item={mockCharacter} />);
    expect(screen.getByRole('heading', { name: 'Rick Sanchez' })).toBeInTheDocument();

    const image = screen.getByRole('img', { name: 'Rick Sanchez' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCharacter.image);
  });

  it('deve renderizar a espécie e status corretamente', () => {
    render(<CardCharacterCarrossel item={mockCharacter} />);
    expect(screen.getByText('Human - Alive')).toBeInTheDocument();
  });
  
  it('deve renderizar o botão "See Details"', () => {
    render(<CardCharacterCarrossel item={mockCharacter} />);
    
    const button = screen.getByRole('link', { name: 'See Details' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/characters');
  });
})