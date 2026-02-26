import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import EpisodeList from './EpisodesList';
import { apiInterna } from '@/app/lib/axios';

// Mock do axios
jest.mock('@/app/lib/axios', () => ({
  apiInterna: {
    get: jest.fn()
  }
}));

const mockedGet = apiInterna.get as jest.Mock;

const mockEpisodesResponse = {
  info: {
    count: 51,
    pages: 3,
    next: 'https://rickandmortyapi.com/api/episode?page=2',
    prev: null
  },
  results: [
    {
      id: 1,
      name: 'Pilot',
      air_date: 'December 2, 2013',
      episode: 'S01E01',
      characters: ['url1', 'url2']
    },
    {
      id: 2,
      name: 'Lawnmower Dog',
      air_date: 'December 9, 2013',
      episode: 'S01E02',
      characters: ['url1', 'url2', 'url3']
    }
  ]
};

describe('EpisodeList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock do window.scrollTo que é chamado na paginação
    window.scrollTo = jest.fn();
  });

  it('deve renderizar o estado de loading inicialmente', () => {
    // Retorna uma promise que não resolve imediatamente para testar o loading
    mockedGet.mockReturnValueOnce(new Promise(() => {}));
    
    render(<EpisodeList />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('deve renderizar a lista de episódios após o carregamento', async () => {
    mockedGet.mockResolvedValueOnce({ data: mockEpisodesResponse });
    
    render(<EpisodeList />);
    
    // Espera o loading sumir e os dados aparecerem
    expect(await screen.findByText('Pilot')).toBeInTheDocument();
    expect(screen.getByText('Lawnmower Dog')).toBeInTheDocument();
    
    // Verifica se a API foi chamada corretamente
    expect(mockedGet).toHaveBeenCalledWith('/episode', { params: { page: 1 } });
  });

  it('deve renderizar a paginação com o número correto de páginas', async () => {
    mockedGet.mockResolvedValueOnce({ data: mockEpisodesResponse });
    
    render(<EpisodeList />);
    
    // Espera os dados carregarem
    await screen.findByText('Pilot');
    
    // Verifica se a paginação renderizou o botão da página 3 (baseado no mock info.pages)
    expect(screen.getByRole('button', { name: 'Go to page 3' })).toBeInTheDocument();
  });

  it('deve chamar a API com a nova página ao clicar na paginação', async () => {
    // Primeira chamada (montagem)
    mockedGet.mockResolvedValueOnce({ data: mockEpisodesResponse });
    // Segunda chamada (após clicar na página 2)
    mockedGet.mockResolvedValueOnce({ data: mockEpisodesResponse });
    
    render(<EpisodeList />);
    
    // Espera os dados carregarem
    await screen.findByText('Pilot');
    
    // Clica na página 2
    const page2Button = screen.getByRole('button', { name: 'Go to page 2' });
    fireEvent.click(page2Button);
    
    // Verifica se a API foi chamada novamente com a página 2
    await waitFor(() => {
      expect(mockedGet).toHaveBeenCalledWith('/episode', { params: { page: 2 } });
    });
    
    // Verifica se o scroll para o topo foi chamado
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('deve lidar com erros da API graciosamente', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockedGet.mockRejectedValueOnce(new Error('Erro na API'));
    
    render(<EpisodeList />);
    
    // Espera o loading sumir
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
    
    // Verifica se o erro foi logado
    expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar episodes: ', expect.any(Error));
    
    consoleSpy.mockRestore();
  });
});