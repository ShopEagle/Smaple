import React, {useEffect} from 'react';

import {Animated} from 'react-native';
import {Container, Ball} from './styles';

export default function Loader() {
  const animations = {
    one: new Animated.Value(0),
    two: new Animated.Value(0),
    three: new Animated.Value(0),
  };

  function onAnimate(animation, nextAnimation) {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: -10,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(nextAnimation, 200);
  }

  function onStartAnimate() {
    function onThreeAnimation() {
      onAnimate(animations.three, () => {
        setTimeout(onStartAnimate, 800);
      });
    }

    function onTwoAnimation() {
      onAnimate(animations.two, onThreeAnimation);
    }

    onAnimate(animations.one, onTwoAnimation);
  }

  useEffect(() => {
    onStartAnimate();
  }, []);

  return (
    <Container>
      <Ball
        style={{transform: [{translateY: animations.one}]}}
        color="#36853a"
      />
      <Ball
        style={{transform: [{translateY: animations.two}]}}
        color="#abd33e"
      />
      <Ball
        style={{transform: [{translateY: animations.three}]}}
        color="#136a37"
      />
    </Container>
  );
}
