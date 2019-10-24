import axios from 'axios';
import { config } from '../../../config';

export const GET_ABOUT_TEXT_SUCCESS =   'GET_ABOUT_TEXT_SUCCESS';
export const GET_CONTACT_TEXT_SUCCESS = 'GET_CONTACT_TEXT_SUCCESS';
export const GET_HOME_TEXT_SUCCESS =    'GET_HOME_TEXT_SUCCESS';
export const GET_SKILLS_TEXT_SUCCESS =  'GET_SKILLS_TEXT_SUCCESS';

const { uris } = config;

export const getHomeText = () => async (dispatch) => {
  const response = await axios.get(uris.home.api);
  dispatch({ type: GET_HOME_TEXT_SUCCESS, data: response.data});
}

export const getAboutText = () => async (dispatch) => {
  const response = await axios.get(uris.about.api);
  dispatch({ type: GET_ABOUT_TEXT_SUCCESS, data: response.data});
}

export const getSkillsText = () => async (dispatch) => {
  const response = await axios.get(uris.skills.api);
  dispatch({ type: GET_SKILLS_TEXT_SUCCESS, data: response.data});
}

export const getContactText = () => async (dispatch) => {
  const response = await axios.get(uris.contact.api);
  dispatch({ type: GET_CONTACT_TEXT_SUCCESS, data: response.data});
}

