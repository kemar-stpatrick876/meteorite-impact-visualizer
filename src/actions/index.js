import { SET_DISPLAY_RANGE } from '../constants';

export function setDisplayRange(payload) {
  console.log('payload ', payload);
  return { type: SET_DISPLAY_RANGE, payload };
}
