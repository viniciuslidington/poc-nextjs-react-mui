import { render, screen } from '@testing-library/react';
import EpisodesInfos from './EpisodesInfos';
import { InternalResponseEp } from '../../types/episodes';

const mockEpisode: InternalResponseEp = {
  id: 1,
  name: 'Pilot',
  air_date: 'December 2, 2013',
  episode: 'S01E01',
  characters: [
    'https://rickandmortyapi.com/api/character/1',
    'https://rickandmortyapi.com/api/character/2'
  ]
};

describe('EpisodesInfos Component', () => {
  it('deve renderizar o nome do episódio corretamente', () => {
    render(<EpisodesInfos episode={mockEpisode} />);
    
    expect(screen.getByRole('heading', { name: 'Pilot' })).toBeInTheDocument();
  });

  it('deve renderizar a data de lançamento (air date) corretamente', () => {
    render(<EpisodesInfos episode={mockEpisode} />);
    
    expect(screen.getByText(/December 2, 2013/i)).toBeInTheDocument();
    expect(screen.getByText('Air date:')).toBeInTheDocument();
  });

  it('deve renderizar o código do episódio corretamente', () => {
    render(<EpisodesInfos episode={mockEpisode} />);
    
    expect(screen.getByText(/S01E01/i)).toBeInTheDocument();
    expect(screen.getByText('Episode Code:')).toBeInTheDocument();
  });

  it('deve renderizar a quantidade correta de personagens no episódio', () => {
    render(<EpisodesInfos episode={mockEpisode} />);
    
    const charactersText = screen.getByText((content, element) => {
      return element?.textContent === 'Characters in this Episode: 2';
    });
    expect(charactersText).toBeInTheDocument();
  });
});
