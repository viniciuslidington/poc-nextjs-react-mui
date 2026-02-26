import { CharacterApiInterna } from "@/app/types/character";
import { render, screen } from "@testing-library/react";
import CharacterInfos from "./CharacterInfos";

const mockCharacter: CharacterApiInterna = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', id: 1 },
  location: { name: 'Citadel of Ricks', id: 3 },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episodes: [1, 2]
};


describe('CharacterInfos Component', () => {
  
  it('tem que renderizar o personagem - nome e imagem', ()=>{
    render(<CharacterInfos character={mockCharacter}/>)
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();

    const image = screen.getByRole('img', {name:'Rick Sanchez'});
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCharacter.image)
  });

  it('deve renderizar a cor certa dos Chip', () => {
    render(<CharacterInfos character={mockCharacter} />);
    
    const chip = screen.getByText('Alive');
    expect(chip).toBeInTheDocument();
    // MUI adds specific classes based on the color prop. 'success' adds 'MuiChip-colorSuccess'
    expect(chip.closest('.MuiChip-root')).toHaveClass('MuiChip-colorSuccess');
  });

  it('should render an error chip when status is Dead', () => {
    const deadCharacter: CharacterApiInterna = { ...mockCharacter, status: 'Dead' };
    render(<CharacterInfos character={deadCharacter} />);
    
    const chip = screen.getByText('Dead');
    expect(chip).toBeInTheDocument();
    expect(chip.closest('.MuiChip-root')).toHaveClass('MuiChip-colorError');
  });

  it('should render a default chip when status is unknown', () => {
    const unknownCharacter: CharacterApiInterna = { ...mockCharacter, status: 'unknown' };
    render(<CharacterInfos character={unknownCharacter} />);
    
    const chip = screen.getByText('unknown');
    expect(chip).toBeInTheDocument();
    expect(chip.closest('.MuiChip-root')).toHaveClass('MuiChip-colorDefault');
  });
})