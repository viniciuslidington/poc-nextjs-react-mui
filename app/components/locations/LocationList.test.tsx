import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import LocationList from './LocationList';
import { apiInterna } from '@/app/lib/axios';

jest.mock('@/app/lib/axios', () => ({
  apiInterna: {
    get: jest.fn()
  }
}));

const mockedGet = apiInterna.get as jest.Mock;

const mockLocationsResponse = {
  info: {
    count: 126,
    pages: 7,
    next: 'url-2',
    prev: null
  },
  results: [
    {
      id: 1,
      name: 'Earth (C-137)',
      type: 'Planet',
      dimension: 'Dimension C-137',
      residents: ['url1', 'url2'],
      url: 'url',
      created: 'date'
    },
    {
      id: 2,
      name: 'Abadango',
      type: 'Cluster',
      dimension: 'unknown',
      residents: ['url1'],
      url: 'url',
      created: 'date'
    }
  ]
};

describe('LocationList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.scrollTo = jest.fn();
  });

  it('deve renderizar o estado de loading inicialmente', () => {
    mockedGet.mockReturnValueOnce(new Promise(() => {}));
    
    render(<LocationList />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('deve renderizar a lista de localizações após o carregamento', async () => {
    mockedGet.mockResolvedValueOnce({ data: mockLocationsResponse });
    
    render(<LocationList />);
    
    expect(await screen.findByText('Earth (C-137)')).toBeInTheDocument();
    expect(screen.getByText('Abadango')).toBeInTheDocument();
    
    expect(mockedGet).toHaveBeenCalledWith('location', { params: { page: 1 } });
  });

  it('deve renderizar a paginação com o número correto de páginas', async () => {
    mockedGet.mockResolvedValueOnce({ data: mockLocationsResponse });
    
    render(<LocationList />);
    
    await screen.findByText('Earth (C-137)');
    
    expect(screen.getByRole('button', { name: 'Go to page 7' })).toBeInTheDocument();
  });

  it('deve chamar a API com a nova página ao clicar na paginação', async () => {
    mockedGet.mockResolvedValueOnce({ data: mockLocationsResponse });
    mockedGet.mockResolvedValueOnce({ data: mockLocationsResponse });
    
    render(<LocationList />);
    
    await screen.findByText('Earth (C-137)');
    
    const page2Button = screen.getByRole('button', { name: 'Go to page 2' });
    fireEvent.click(page2Button);
    
    await waitFor(() => {
      expect(mockedGet).toHaveBeenCalledWith('location', { params: { page: 2 } });
    });
    
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('deve lidar com erros da API graciosamente', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockedGet.mockRejectedValueOnce(new Error('Erro na API'));
    
    render(<LocationList />);
    
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
    
    expect(consoleSpy).toHaveBeenCalledWith('Erro ao fetch locations', expect.any(Error));
    
    consoleSpy.mockRestore();
  });
});