import logo from './logo.svg';
import './App.css';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import * as defaultAnimationData from './resources/girl-normal.json';
import {styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { spacing } from '@mui/system';
import { Container } from '@mui/material';
import { ButtonBase } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const defaultOptions = {
  loop: true,
  autoplay: true, 
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const Colors = {
  COLOR1: '#E1F0DA',
  COLOR2: '#D4E7C5',
  COLOR3: '#BFD8AF',
  COLOR4: '#99BC85'
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const avatarFiles = {
  0: {
      path: './resources/girl-normal.json',
      emotion: 'neutral',
      duration: null
  },
  1: {
    path: './resources/girl-laughing-raw.json',
    emotion: 'laugh',
    duration: 1800
  }
}

const AvatarProvider = ({files, emotion, setEmotion}) => {
  const [animationData, setAnimationData] = useState(defaultAnimationData);
  useEffect(() => {
    // Dynamically import the Lottie JSON file based on the provided file path
    import(`${files[emotion].path}`)
      .then((module) => {
        setAnimationData(module.default);
      })
      .catch((error) => {
        console.error(`Error loading Lottie JSON: ${error}`);
      });
  }, [emotion]);

  useEffect(() => {
    if (emotion !== 0) {
      setTimeout(() => {
        setEmotion(0)
      }, files[emotion].duration)

    }
  }, [emotion])

  return <>
  <Lottie options={{...defaultOptions, animationData: animationData,}} />
  </>
}

function App() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [currentEmotion, setCurrentEmotion] = useState(0)

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    ContactBar: {
      width: windowDimensions.width,
      height: 'auto',
      width: '80%',
      borderRadius: 20,
      backgroundColor: Colors.COLOR4,
      overflow: 'hidden',
    }
  }


  return (
    <div className='App' style={{
      position: 'fixed',
      height: '100%',
      padding: 0,
      backgroundColor: Colors.COLOR1
    }}>
      <Container fixed style={styles.ContactBar}>
        <p>Sulogna Mobile</p>
      </Container>
      <div style={{
        width: '100%'
      }}>
        <AvatarProvider files={avatarFiles} emotion={currentEmotion} setEmotion={setCurrentEmotion} />
      </div>
      <ButtonBase style={{
        width: 'auto',
      }} onClick={() => {
        setCurrentEmotion(1)
      }}><Item style={{
        padding: 20,
        backgroundColor: Colors.COLOR4,
        width: 'auto',
      }}><img width="50" height="50" src="https://img.icons8.com/ios/50/smiling.png" alt="smiling"/></Item></ButtonBase>
    </div>
  );
}

export default App;
