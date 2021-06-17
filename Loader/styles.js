import styled from 'styled-components/native';
import {Animated} from 'react-native';

export const Container = styled.View`
  margin-top : 10px;
  width: 60px;
  height: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Ball = styled(Animated.View)`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({color}) => color || '#777'};
`;
