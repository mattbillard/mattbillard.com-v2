import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card } from 'antd-mobile';

import { DownloadResume } from '../../';
import { getSkillsText, IStoreState } from '../../../redux';
import { ISkillsText } from '../../../types';
import { tellParentToUpdateUrl } from '../../../../shared/utils/utils';

import './skills.css';

export interface ISkillsView {
  skillsText: ISkillsText;
  getSkillsText: typeof getSkillsText;
}

export const SkillsView: React.FC<ISkillsView> = (props) => {
  const { skillsText, getSkillsText } = props;

  useEffect(() => {
    !skillsText && getSkillsText();
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
            <Card style={{marginBottom: 10}} key={idx2}>
              <Card.Body>
                <div className="skill">
                  <div className="left">
                    <i className={`${skill.icon} fa-2x`}></i> 
                  </div>
                  <div className="right">
                    <h3><strong>{skill.title}</strong></h3>
                    <div>{skill.details}</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </React.Fragment>
      ))}

    </div>
  );
}

const mapStateToProps = (state: IStoreState) => ({
  skillsText: state.textReducer.skillsText
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    getSkillsText
  }, dispatch)
);

export const Skills = connect(mapStateToProps, mapDispatchToProps)(SkillsView);
