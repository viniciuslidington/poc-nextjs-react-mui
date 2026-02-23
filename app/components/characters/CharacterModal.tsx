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
          transform: 'translate(-50%, -50%)', // Centraliza perfeitamente
          width: { xs: '90%', sm: 600 }, // Responsivo: mobile=90%, desktop=600px
          maxHeight: '90vh', // Máximo 90% da altura da tela
          overflow: 'auto', // Scroll se conteúdo for maior que maxHeight
          bgcolor: 'background.paper', // Cor de fundo do tema
          borderRadius: 3, // Bordas arredondadas
          boxShadow: 24, // Sombra para destacar do fundo
        }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute', // Posicionado sobre a imagem
              top: 8, 
              right: 8, 
              zIndex: 1, // Garante que fica sobre todos os elementos
              bgcolor: 'rgba(0,0,0,0.6)', // Fundo semi-transparente escuro
              color: 'white',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' } // Mais escuro no hover
            }}
          >
            <CloseIcon/>
          </IconButton>
          <Box
            sx={{position: 'relative', width: '100%', height: 350}}
          >
            <Image 
              src={character.image} 
              alt={character.name} 
              fill
              style={{ objectFit:'cover'}}
              priority
               />
          </Box>
          <Box sx={{p:3}}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 2,
            flexWrap: 'wrap', // Quebra linha em telas pequenas
            gap: 2 // Espaço entre itens quando quebra linha
          }}>
            <Typography 
              id="character-modal-title" // ID para aria-labelledby
              variant='h4' 
              fontWeight='bold'
              sx={{ flex: 1 }} // Ocupa espaço disponível
            >
              {character.name}
            </Typography>
            
            {/* Chip indicador de status */}
            <Chip 
              label={character.status} 
              color={statusColor} // Cor dinâmica baseada no status
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

            <Divider/>

            <Box>
              <Typography variant='caption' color='text.secondary'>
                Origin
              </Typography>
              <Typography variant='body1' fontWeight='medium'>
                {character.origin?.name || 'Unknown'} {/* Fallback se não tiver origem */}
              </Typography>
            </Box>

            {/* Campo: Last Known Location */}
            <Box>
              <Typography variant='caption' color='text.secondary'>
                Last Known Location
              </Typography>
              <Typography variant='body1' fontWeight='medium'>
                {character.location?.name || 'Unknown'} {/* Fallback se não tiver localização */}
              </Typography>
            </Box>

            <Box>
              <Typography variant='caption' color='text.secondary'>
                Episodes
              </Typography>
              <Typography variant='body1' fontWeight='medium'>
                {character.episode.length} episodes
              </Typography>
            </Box>
            
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};