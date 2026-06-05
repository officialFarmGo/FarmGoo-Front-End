import React from 'react'
import '../CSS/HeroSection.css'
import Buttons from '../Props/Buttons'
import TextLogic from '../Data/TextLogic'
const HeroSection = () => {
  return (
    <>
   <main>
     <section>
      <div className='hero-image-container'>
        <main className='overlay'>
        <nav className='hero-text'>
          <p className='hero-button'>Built for Farmers.Designed for growth</p>
        <p className='hero-first-text'>
          <TextLogic/>
        </p>
        <p className='session-text'>FarmGoo connects Nigerian farmers directly to trusted<br/>
         truck drivers — cutting post-harvest losses, eliminating 
        <br/>exploitative middlemen, and putting more money in your<br/> hands.</p>

        <article className='button-container'>
          <Buttons text='Start For Free' className='hero-buttons'/>
           <Buttons text='See how it works' className='hero-button-two'/>
        </article>

        <section className='input-text-two'>

          <div>
             <p className='text-two'>60<span className='span-hero-text'>%</span></p>
            <p className='hero-text-three'> Less Post-Harvest Loss</p>
          </div>
         

         <div>
           <p className='text-two'>3<span className='span-hero-text'>X</span></p>
          <p className='hero-text-three'> Faster Driver Matching</p>
         </div>
          

          <div>
             <p className='text-two'>3<span className='span-hero-text'>+</span></p>
             <p className='hero-text-three'>User Roles Supporting </p>
          </div>
          
        </section>
        </nav>
        </main>
      </div>
     </section>
     </main>
    </>
  )
}

export default HeroSection
