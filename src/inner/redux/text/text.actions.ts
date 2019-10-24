import axios from 'axios';
import { config } from '../../config';

export const GET_ABOUT_TEXT_SUCCESS =   'GET_ABOUT_TEXT_SUCCESS';
export const GET_CONTACT_TEXT_SUCCESS = 'GET_CONTACT_TEXT_SUCCESS';
export const GET_HOME_TEXT_SUCCESS =    'GET_HOME_TEXT_SUCCESS';
export const GET_SKILLS_TEXT_SUCCESS =  'GET_SKILLS_TEXT_SUCCESS';

const { apiUrls } = config;

export const getHomeText = () => async (dispatch) => {
  const response = await axios.get(apiUrls.home);
  dispatch({ type: GET_HOME_TEXT_SUCCESS, data: response.data});
}

export const getAboutText = () => async (dispatch) => {
  const response = await axios.get(apiUrls.about);
  dispatch({ type: GET_ABOUT_TEXT_SUCCESS, data: response.data});
}

export const getSkillsText = () => async (dispatch) => {
  const response = await axios.get(apiUrls.skills);
  dispatch({ type: GET_SKILLS_TEXT_SUCCESS, data: response.data});
}

export const getContactText = () => async (dispatch) => {
  const response = await axios.get(apiUrls.contact);
  dispatch({ type: GET_CONTACT_TEXT_SUCCESS, data: response.data});
}

