import React from 'react'
import HeroSection from './sections/hero'

function HomePage() {
  return (
    <div>
      <HeroSection />

      <div className="info" style={{height: '100vh'}}>
        Info section
      </div>

      <div className="playCTA" style={{height: '100vh', background: 'teal'}}>
        Lets PLay
      </div>
    </div>
  )
}

export default HomePage