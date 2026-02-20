"use client"

import { useEffect, useState, useCallback } from 'react';
import { Box, Typography, IconButton, MobileStepper } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CardCharacterCarrossel from '../characters/CardCharacter';
import { apiInterna } from '@/app/lib/axios';
import type { CharacterApi } from '../../types/character';

export function Carrossel() {
  const [character, setCharacter] = useState<CharacterApi[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    async function load() {
      const response = await apiInterna.get('character', { params: { page: 1 } });
      setCharacter(response.data.results);
    }
    load();
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep((prev) => (prev + 1) % character.length);
  }, [character.length]);

  const handleBack = useCallback(() => {
    setActiveStep((prev) => (prev - 1 + character.length) % character.length);
  }, [character.length]);

  // Auto play
  useEffect(() => {
    if (character.length === 0) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [character.length, handleNext]);

  if (character.length === 0) return null;

  return (
    <Box sx={{ maxWidth: 800, width: '100%', margin: '0 auto' }}>
      <Typography variant='h5' color='primary' sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
        Characters
      </Typography>

      <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
        <Box sx={{ transition: 'opacity 0.5s ease' }}>
          <CardCharacterCarrossel item={character[activeStep]} />
        </Box>

        <IconButton
          onClick={handleBack}
          sx={{
            position: 'absolute',
            top: '50%',
            left: 8,
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0,0,0,0.4)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 8,
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0,0,0,0.4)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <MobileStepper
        variant="dots"
        steps={character.length}
        position="static"
        activeStep={activeStep}
        sx={{ justifyContent: 'center', bgcolor: 'transparent', mt: 1 }}
        nextButton={null}
        backButton={null}
      />
    </Box>
  );
}
