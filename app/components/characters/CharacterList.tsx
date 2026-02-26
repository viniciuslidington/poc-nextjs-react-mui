'use client'

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Pagination, 
  CircularProgress,
  Container,
  TextField 
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { apiInterna } from '@/app/lib/axios';
import { ApiInternaResponseCharacter, CharacterApiInterna } from '@/app/types/character';
import CharacterInfos from './CharacterInfos';
import CharacterModal from './CharacterModal';
import { characterPageState,
         characterNameState,
         selectedCharacterState
       } from '@/app/stage/atomcharacter';
import { useRecoilState, useSetRecoilState } from 'recoil';
import axios from 'axios';



export default function CharacterList(){
  const [inputName, setInputName] = useState("")
  const [characters, setCharacters] = useState<CharacterApiInterna[]>([]);
  const [totalPages, setTotalPages] = useState(1); 
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [page, setPage] = useRecoilState(characterPageState);
  const [name, setName] = useRecoilState(characterNameState);
  const setSelectedCharacter = useSetRecoilState(selectedCharacterState)
  
  useEffect(()=>{
    setInputName(name);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setName(inputName);
    }, 500 );

    return () => clearTimeout(timer);
  }, [inputName, setName])

  useEffect(()=> {
  const fetchCharacters = async ()=>{
      setLoading(true);
      setErrorMessage(null);
      try{
        const response = await apiInterna.get<ApiInternaResponseCharacter>(
          '/character',
          {params:{page:page, name:name}}
        );
        const { info, results } = response.data;

        setCharacters(results)
        setTotalPages(info.pages)
      }catch(error){
        if(axios.isAxiosError(error) && error.response?.status === 404){
          setErrorMessage("Don't exist characters with this name")
        }if(axios.isAxiosError(error) && error.response?.status === 500){
          setErrorMessage("An error occurred while fetching characters")
        }
        setCharacters([])
        setTotalPages(1)

      }finally{
        setLoading(false)
      }
    };
    fetchCharacters();
    },[page, name]);

  useEffect(() => {
    setPage(1);
  }, [name, setPage]);
  
  const handleChangePage = (event:React.ChangeEvent<unknown>, value: number)=> {
    setPage(value);
    window.scrollTo({top:0, behavior: 'smooth'});
  };

  const handleCardClik = (character: CharacterApiInterna) => {
    setSelectedCharacter(character);
  };

  return(
    <Container maxWidth='lg'>
      <Box sx={{ mb: 4, mt: 2 }}>
        <TextField
          fullWidth
          label="Filter by name"
          variant="outlined"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Digite o nome do personagem..."
        />
      </Box>

      {loading ? (
        <Box sx={{display:'flex', justifyContent:'center', my:10}}>
          <CircularProgress size={60}/>
        </Box>
      ):(
        <>
          <Grid container spacing={4}>
            {characters.map((char:CharacterApiInterna)=>(
              <Grid 
                key={char.id}
                size={{ xs: 12, sm: 6, md: 4 }}
                onClick={()=>handleCardClik(char)}  
                sx={{cursor:'pointer'}}
              >
              <CharacterInfos character={char}/>
              </Grid>
               ))}
          </Grid>

          {errorMessage && (
          <Box sx={{ mb: 2, color: "error.main", fontWeight: 600, display:'flex', justifyContent:'center' }}>
            {errorMessage}
          </Box>
          )}
          
          {!errorMessage && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                color='primary'
                size='large'
                variant='outlined'
                shape='rounded'
              />
            </Box>
          )}
        </>
      )}
      <CharacterModal/>
    </Container>
  )

}


