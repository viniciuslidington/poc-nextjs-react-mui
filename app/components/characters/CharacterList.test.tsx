import { render, screen } from '@testing-library/react';
import CharacterList from './CharacterList';
import { RecoilRoot } from 'recoil';
import { apiInterna } from '@/app/lib/axios';


jest.mock("@/app/lib/axios", () => ({
  apiInterna: {
    get: jest.fn() }
}));

const mockedGet = apiInterna.get as jest.Mock;

test('renderiza personagens retornados pela API interna', async () => {
  mockedGet.mockResolvedValueOnce({
    data: {
      info: { pages: 1 },
      results: [{id:1, name: 'Rick Sanchez'}],
    },
  });

  render(
    <RecoilRoot>
      <CharacterList />
    </RecoilRoot>
  );
  
  expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
});

test('exibe mensagem de erro quando a API retorna 404', async () => {
  mockedGet.mockRejectedValueOnce({
    response: { status: 404 },
    isAxiosError: true,
  });

  render(
    <RecoilRoot>
      <CharacterList />
    </RecoilRoot>
  );

  expect(await screen.findByText("Don't exist characters with this name")).toBeInTheDocument();
});


test('exibe mensagem de erro quando a API retorna 500', async ()=> {
  mockedGet.mockRejectedValueOnce({
    response:{status: 500},
    isAxiosError: true,
  });

  render(
    <RecoilRoot>
      <CharacterList/>
    </RecoilRoot>
  )

  expect(await screen.findByText("An error occurred while fetching characters")).toBeInTheDocument();
})
