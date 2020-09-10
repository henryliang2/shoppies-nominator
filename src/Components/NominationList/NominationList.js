import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import MovieCard from './../MovieCard/MovieCard';
import './NominationList.css'
import { CircleCancelMajorTwotone } from '@shopify/polaris-icons';
import { Icon, DisplayText } from '@shopify/polaris';
import { LinkedIn, GitHub, Email }  from '@material-ui/icons';


const NominationList = (props) => {

  // hoveredIcon state is the index of the currently hovered button
  // allowing the value to be checked by the icon's color attribute
  const [hoveredIcon, setHoveredIcon] = useState(-1);

  // true after submitting nomations
  const [nominationsSubmitted, setNominationsSubmitted] = useState(false);
  /* 
  * this route houses all of the nominations
  */
  if (nominationsSubmitted === false) {

    return (
      <React.Fragment>
        <div className='nomination__header'>
          { props.nominatedMovies.length < 5 
            ? 'My Nominations' 
            : <img alt='Final Nominations' 
                className='nomination__ribbon-final fade-in' 
                src={process.env.PUBLIC_URL + 'ribbon.svg'} /> 
          }
        </div> 

        <div className='nomination__container'>
          {
            props.nominatedMovies.map((movie, i) => {
              return <div className='nomination__moviecard' key={i}>
                  <div className='nomination__poster-container'>
                    <MovieCard
                      classNames={'nomination__poster-image fade-in'}
                      id={`nominated-image-${i}`}
                      title={ movie.Title }
                      posterUrl={ movie.Poster }
                      year={ movie.Year }
                      index={ i }
                    />

                    <div className='nomination__remove-button fade-in'
                      onClick={ () => { props.removeNomination(i) }}
                      onMouseEnter={() => { setHoveredIcon(i) }}
                      onMouseLeave={() => { setHoveredIcon(-1) }}
                      >
                      <Icon source={CircleCancelMajorTwotone}
                        color={ (hoveredIcon === i) ? 'red' : 'inkLighter' } />
                    </div>
                  </div>
                  <p>{movie.Title}</p>
                  <p>({movie.Year})</p>
                </div>
            })
          }

        </div>

        { /* if there are 5 nominations, show submit button */ }
        { ( props.nominatedMovies.length === 5 ) && 
          <div className='nomination__submit-container'>
            <div onClick={() => { setNominationsSubmitted(true) 
              }} className='nomination__submit-button' >
              Submit →</div>
          </div>
        }

      </React.Fragment>
      );


    /* 
    * this route appears after user submits the 5 nominations
    */
    } else if (nominationsSubmitted === true) {

      return <React.Fragment>

          <Confetti
            width={ window.innerWidth - 100 }
            height={ window.innerHeight - 100 }
            numberOfPieces={ 400 }
            tweenDuration={ 20000 }
            recycle={ false }
          />

          <div className='endgame__container'>

            <DisplayText 
              element='h1'
              size='extraLarge'>
                Hooray! Your nominations have been submitted.
            </DisplayText>

            <p>Thank you for checking out my project. I hope you liked it!</p>
            <p>Please check out some of my other personal projects below:</p>

            <ul>
              <li><a href='https://color-cluster.netlify.app/' 
                target='_blank' rel="noopener noreferrer">Color Cluster</a></li>
              <li><a href='https://whatpharmacistsdo.org/' 
                target='_blank' rel="noopener noreferrer">WhatPharmacistsDo</a></li>
              <li><a href='https://www.jsongfitness.com/' 
                target='_blank' rel="noopener noreferrer">JSong Fitness</a></li>
            </ul>

              <div className='endgame__buttons'>
                <a href='https://linkedin.com/in/henryliang2' 
                  target='_blank' rel="noopener noreferrer"><LinkedIn style={{ fontSize: 48 }}/></a>
                <a href='https://github.com/henryliang2' 
                  target='_blank' rel="noopener noreferrer"><GitHub style={{ fontSize: 48 }}/></a>
                <a href='mailto:henryliang@alumni.ubc.ca'><Email style={{ fontSize: 48 }}/></a>

              </div>

            <div className='nomination__submit-container'>
              <div className='nomination__submit-button'
                onClick={() => {
                  setNominationsSubmitted(false);
                }} 
                >
                ← Back to your Nominations
              </div>
              <div className='nomination__submit-button'
                onClick={() => {
                  props.setNominatedMovies([]);
                  setNominationsSubmitted(false);
                }} 
                >
                ← Undo All Nominations
              </div>
            </div>
          </div>
        </React.Fragment>
    }
}

export default NominationList