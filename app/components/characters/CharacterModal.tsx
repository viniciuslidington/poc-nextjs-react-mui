'use client'
import { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Chip,
  Stack,
  IconButton,
  Divider,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { selectedCharacterState } from '@/app/stage/atomcharacter';
import EpisodesInfos from '../episodes/EpisodesInfos';
import { apiInterna } from '@/app/lib/axios';
import { InternalResponseEp } from '@/app/types/episodes';


export default function CharacterModal(){
  const [character, setCharacter] = useRecoilState(selectedCharacterState)

  const [episodes, setEpisodes] = useState<InternalResponseEp[]>([])
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(false)

  
  useEffect(() => {
    const fetchEpisodes = async() => {
      
      if (!character?.episodes || character.episodes.length === 0) {
        setEpisodes([]);
        setIsLoadingEpisodes(false);
        return;
      }

      setIsLoadingEpisodes(true)

      try {
       
        const episodesNumber = character.episodes.join(',');


        const response = await apiInterna.get<InternalResponseEp[]>(`/episode/${episodesNumber}`);


        const episodesData = Array.isArray(response.data) 
          ? response.data 
          : [response.data];

        setEpisodes(episodesData);
      } catch (error) {
        console.error('Error fetching episodes:', error);
        setEpisodes([]);
      } finally {

        setIsLoadingEpisodes(false);
      }
    };

    fetchEpisodes();
  }, [character]); 

  const handleClose = () => {
    setCharacter(null);
    setEpisodes([]); 
    setIsLoadingEpisodes(false);
  };


  if (!character) return null

  const statusColor =
    character.status === 'Alive' ? 'success' :
    character.status === 'Dead' ? 'error' : 'default';

  return(
    <Modal
      open={!!character}
      onClose={handleClose}
      aria-labelledby="character-modal-title">
    
      <Box sx={{
        position:'absolute',
        top:'50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '95%', sm: 600, md: 700 },
        maxHeight: '90vh',
        overflow: 'auto',
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 24,
      }}>
        
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8, 
            right: 8, 
            zIndex: 1,
            bgcolor: 'rgba(0,0,0,0.6)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
          }}
        >
          <CloseIcon/>
        </IconButton>

        <Box sx={{ 
          position: 'relative', 
          width: '100%',
          paddingTop: '100%', 
          overflow: 'hidden',
        }}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}>
            <Image
              src={character.image}
              alt={character.name}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </Box>
        </Box>

        <Box sx={{ p: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 2,
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Typography 
              id="character-modal-title"
              variant='h4' 
              fontWeight='bold'
              sx={{ flex: 1 }}
            >
              {character.name}
            </Typography>
            <Chip 
              label={character.status} 
              color={statusColor} 
              variant='filled'
              sx={{ fontWeight: 'bold' }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={2}>
            <Box>
              <Typography variant='caption' color='text.secondary'>
                Species
              </Typography>
              <Typography variant='body1' fontWeight='medium'>
                {character.species}
              </Typography>
            </Box>

            <Box>
              <Typography variant='caption' color='text.secondary'>
                Gender
              </Typography>
              <Typography variant='body1' fontWeight='medium'>
                {character.gender}
              </Typography>
            </Box>

            {character.type && (
              <Box>
                <Typography variant='caption' color='text.secondary'>
                  Type
                </Typography>
                <Typography variant='body1' fontWeight='medium'>
                  {character.type}
                </Typography>
              </Box>
            )}

            <Divider />

            <Box>
              <Typography variant='caption' color='text.secondary'>
                Origin
              </Typography>
              <Typography variant='body1' fontWeight='medium'>
                {character.origin?.name || 'Unknown'}
              </Typography>
            </Box>

            <Box>
              <Typography variant='caption' color='text.secondary'>
                Last Known Location
              </Typography>
              <Typography variant='body1' fontWeight='medium'>
                {character.location?.name || 'Unknown'}
              </Typography>
            </Box>

            {/* ✅ SEÇÃO DE EPISÓDIOS COMPLETA */}
            <Box>
              <Typography variant='caption' color='text.secondary'>
                Episodes ({character.episodes?.length || 0})
              </Typography>
              
              {/* ✅ Loading State */}
              {isLoadingEpisodes ? (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  py: 4 
                }}>
                  <CircularProgress size={32} />
                </Box>
              ) : (
                /* ✅ Lista de Episódios */
                <Stack spacing={1}
                >
                  {episodes.length > 0 ? (
                    episodes.map((episode) => (
                      <EpisodesInfos 
                        key={episode.id} 
                        episode={episode} 
                      />
                    ))
                  ) : (
                    <Typography 
                      variant='body2' 
                      color='text.secondary'
                      sx={{ py: 3, textAlign: 'center' }}
                    >
                      No episodes available
                    </Typography>
                  )}
                </Stack>
              )}
            </Box>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};