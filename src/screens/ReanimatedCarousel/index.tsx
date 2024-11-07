import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PexelsWallpapers from './components/PexelsWallpapers'

const queryClient = new QueryClient()  

const ReanimatedCarousel = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PexelsWallpapers />
    </QueryClientProvider>
  )
}

export default ReanimatedCarousel

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


