import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CharacterModal from './CharacterModal';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { apiInterna } from '@/app/lib/axios';
import { selectedCharacterState } from '@/app/stage/atomcharacter';
import { useEffect } from 'react';
import { CharacterApiInterna } from '@/app/types/character';

jest.mock("@/app/lib/axios", () => ({
  apiInterna: {
    get: jest.fn() 
  }
}));

const mockedGet = apiInterna.get as jest.Mock;

const mockCharacter:CharacterApiInterna = {
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

const mockEpisodes = [
  { id: 1, name: 'Pilot', air_date: 'December 2, 2013', episode: 'S01E01', characters: [] },
  { id: 2, name: 'Lawnmower Dog', air_date: 'December 9, 2013', episode: 'S01E02', characters: [] }
];


const RecoilStateSetter = ({ character }: { character: CharacterApiInterna }) => {
  const setCharacter = useSetRecoilState(selectedCharacterState);
  useEffect(() => {
    setCharacter(character);
  }, [character, setCharacter]);
  return null;
};

describe('CharacterModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when no character is selected', () => {
    render(
      <RecoilRoot>
        <CharacterModal />
      </RecoilRoot>
    );
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });

  it('should render character details when a character is selected', async () => {
    mockedGet.mockResolvedValueOnce({ data: mockEpisodes });

    render(
      <RecoilRoot>
        <RecoilStateSetter character={mockCharacter} />
        <CharacterModal />
      </RecoilRoot>
    );

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
  });

  it('should fetch and display episodes', async () => {
    mockedGet.mockResolvedValueOnce({ data: mockEpisodes });

    render(
      <RecoilRoot>
        <RecoilStateSetter character={mockCharacter} />
        <CharacterModal />
      </RecoilRoot>
    );

    expect(mockedGet).toHaveBeenCalledWith('/episode/1,2');

    expect(await screen.findByText('Pilot')).toBeInTheDocument();
    expect(screen.getByText('S01E01')).toBeInTheDocument();
    expect(screen.getByText('Lawnmower Dog')).toBeInTheDocument();
    expect(screen.getByText('S01E02')).toBeInTheDocument();
  });

  it('should handle single episode response correctly', async () => {
    const singleEpisode = mockEpisodes[0];
    mockedGet.mockResolvedValueOnce({ data: singleEpisode });

    render(
      <RecoilRoot>
        <RecoilStateSetter character={{ ...mockCharacter, episodes: [1] }} />
        <CharacterModal />
      </RecoilRoot>
    );

    expect(mockedGet).toHaveBeenCalledWith('/episode/1');
    expect(await screen.findByText('Pilot')).toBeInTheDocument();
  });

  it('should handle API error when fetching episodes', async () => {
    mockedGet.mockRejectedValueOnce(new Error('API Error'));

    render(
      <RecoilRoot>
        <RecoilStateSetter character={mockCharacter} />
        <CharacterModal />
      </RecoilRoot>
    );

    expect(await screen.findByText('No episodes available')).toBeInTheDocument();
  });

  it('should close the modal when close button is clicked', async () => {
    mockedGet.mockResolvedValueOnce({ data: mockEpisodes });

    render(
      <RecoilRoot>
        <RecoilStateSetter character={mockCharacter} />
        <CharacterModal />
      </RecoilRoot>
    );

    const closeButton = await screen.findByTestId('CloseIcon');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Rick Sanchez')).not.toBeInTheDocument();
    });
  });
});

