// Types
import {
  SET_SHOW_TUTORIAL,
  SET_TUTORIAL_PAGE
} from '../types';

const setShowTutorial = () => {
  return {
    type: SET_SHOW_TUTORIAL
  }
}

const setTutorialPage = (page: number) => {
  return {
    type: SET_TUTORIAL_PAGE,
    payload: page
  }
}

export default {
  setShowTutorial,
  setTutorialPage
}