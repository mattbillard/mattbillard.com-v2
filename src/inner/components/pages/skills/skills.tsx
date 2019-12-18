import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Card, DownloadResume } from '../../';
import { getSkillsText, IStoreState } from '../../../redux';
import { tellParentToUpdateUrl } from '../../../../shared/utils/utils';

import './skills.scss';

export interface ISkills { }

export const Skills: React.FC<ISkills> = (props) => {
  const skillsText = useSelector((state: IStoreState) => state.textReducer.skillsText);
  const dispatch = useDispatch();

  useEffect(() => {
    !skillsText && dispatch(getSkillsText());
    tellParentToUpdateUrl('skills');
  });

  if (!skillsText) {
    return null;
  }

  const { skillGroups } = skillsText;

  return (
    <div className="skills">
      <h2>Skills</h2>

      <DownloadResume />

      {skillGroups.map((skillGroup, idx1) => (
        <React.Fragment key={idx1}>

          <h3>{skillGroup.title}</h3>

          {skillGroup.skills.map((skill, idx2) => (
            <Card key={idx2}>
              <div className="skill-left">
                <i className={`${skill.icon} fa-2x`}></i>
              </div>
              <div className="skill-right">
                <h4><strong>{skill.title}</strong></h4>
                <div>{skill.details}</div>
              </div>
            </Card>
          ))}
        </React.Fragment>
      ))}

    </div>
  );
}
