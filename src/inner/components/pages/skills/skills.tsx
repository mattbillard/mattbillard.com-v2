import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card } from 'antd-mobile';

import { DownloadResume } from '../../';
import { getSkillsText, IStoreState } from '../../../redux';
import { ISkillsText } from '../../../types';

export interface ISkillsView {
  skillsText: ISkillsText;
  getSkillsText: typeof getSkillsText;
}

export const SkillsView: React.FC<ISkillsView> = (props) => {
  const { skillsText, getSkillsText } = props;

  useEffect(() => {
    !skillsText && getSkillsText();
  });

  if (!skillsText) {
    return null;
  }

  const { downloadResume, skillGroups } = skillsText;

  return (
    <div>
      <h2>Skills</h2>
      {/* {skillsText && (
        <React.Fragment>
          <pre>{ JSON.stringify(skillsText, null, '  ') }</pre>
        </React.Fragment>
      )} */}

      {/* <h3>{downloadResume.title}</h3> */}
      <DownloadResume resumeText={downloadResume} />

      {skillGroups.map((skillGroup, idx1) => (
        <React.Fragment key={idx1}>
          <h3>{skillGroup.title}</h3>
          {skillGroup.skills.map((skill, idx2) => (
            <Card style={{marginBottom: 10}} key={idx2}>
              <Card.Header title={skill.title} />
              <Card.Body>
                <div>{skill.details}</div>
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
