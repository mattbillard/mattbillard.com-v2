import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

  return (
    <div>
      <h2>Skills</h2>
      {skillsText && (
        <React.Fragment>
          <pre>{ JSON.stringify(skillsText, null, '  ') }</pre>
        </React.Fragment>
      )}
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
