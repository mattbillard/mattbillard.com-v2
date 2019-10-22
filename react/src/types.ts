import * as homeJson from '../public/api/home.json';
import * as aboutJson from '../public/api/about.json';
import * as skillsJson from '../public/api/skills.json';
import * as contactJson from '../public/api/contact.json';

export type IHomeText = typeof homeJson;
export type IAboutText = typeof aboutJson;
export type ISkillsText = typeof skillsJson;
export type IContactText = typeof contactJson;

export interface ITextReducerState {
  homeText?: IHomeText;
  aboutText?: IAboutText;
  skillsText?: ISkillsText;
  contactText?: IContactText;
}