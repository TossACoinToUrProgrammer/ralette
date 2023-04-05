import React from 'react'
import AboutGameSection from './sections/aboutGame'
import HeroSection from './sections/hero'
import PlayCTA from './sections/playCta'

function HomePage() {
  return (
    <div>
      <HeroSection />

      <AboutGameSection />

      <PlayCTA />
    </div>
  )
}

export default HomePage