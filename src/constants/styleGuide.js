import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');
export const hp = percentage => (height * percentage) / 100;
export const wp = percentage => (width * percentage) / 100;

export const COLOR = {
  white: '#fff',
  black: '#000',
  gray: '#9e9e9e',
  primary: '#d4ed91',
};
