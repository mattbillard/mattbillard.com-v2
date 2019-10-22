import { Reducer } from 'redux';
import {
  GET_ABOUT_TEXT_SUCCESS, 
  GET_CONTACT_TEXT_SUCCESS, 
  GET_HOME_TEXT_SUCCESS, 
  GET_SKILLS_TEXT_SUCCESS, 
} from './';
import { ITextReducerState } from '../../types';

const initialState: ITextReducerState = {
  homeText: undefined,
  aboutText: undefined,
  skillsText: undefined,
  contactText: undefined,
};

export const textReducer: Reducer<ITextReducerState> = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOME_TEXT_SUCCESS:
      return { 
        ...state,
        homeText: action.data 
      };

    case GET_ABOUT_TEXT_SUCCESS:
      return { 
        ...state,
        aboutText: action.data 
      };  

    case GET_SKILLS_TEXT_SUCCESS:
      return { 
        ...state,
        skillsText: action.data 
      };
      
    case GET_CONTACT_TEXT_SUCCESS:  
      return { 
        ...state,
        contactText: action.data 
      };  
  
    default:
      return state;
  }
}
