import { render, screen } from '@testing-library/react';
import LocationInfos from './LocationInfo';
import { LocationApi } from '@/app/types/location';

const mockLocation: LocationApi = {
  id: 1,
  name: 'Earth (C-137)',
  type: 'Planet',
  dimension: 'Dimension C-137',
  residents: [
    '38',
    '45'
  ],
  url: 'url-1',
  created: '2017-11-10T12:42:04.162Z'
};

describe('LocationInfos Component', () => {
  it('deve renderizar o nome da localização corretamente', () => {
    render(<LocationInfos location={mockLocation} />);
    
    expect(screen.getByRole('heading', { name: 'Earth (C-137)' })).toBeInTheDocument();
  });

  it('deve renderizar o tipo da localização no Chip', () => {
    render(<LocationInfos location={mockLocation} />);
    
    expect(screen.getByText('Planet')).toBeInTheDocument();
  });

  it('deve renderizar a dimensão corretamente', () => {
    render(<LocationInfos location={mockLocation} />);
    
    expect(screen.getByText(/Dimension C-137/i)).toBeInTheDocument();
    expect(screen.getByText('Dimension:')).toBeInTheDocument();
  });

  it('deve renderizar a quantidade correta de residentes', () => {
    render(<LocationInfos location={mockLocation} />);
    
    // O mock tem 2 residentes no array
    const residentsText = screen.getByText((content, element) => {
      return element?.textContent === 'Creatures living there: 2';
    });
    expect(residentsText).toBeInTheDocument();
  });
});
