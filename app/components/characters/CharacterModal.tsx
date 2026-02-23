'use client'

import {
  Modal,
  Box,
  Typography,
  Chip,
  Stack,
  IconButton,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { selectedCharacterState } from '@/app/stage/atomcharacter';

export default function CharacterModal(){
  const [character, setCharacter] = useRecoilState(selectedCharacterState)

  const handleClose = () => {
    setCharacter(null);
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

            {character.episode && character.episode.length > 0 && (
              <Box>
                <Typography variant='caption' color='text.secondary'>
                  Episodes
                </Typography>
                <Typography variant='body1' fontWeight='medium'>
                  {character.episode.length} episodes
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};