import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Card, DownloadResume } from '../../';
import { getAboutText, IStoreState } from '../../../redux';
import { IAboutText } from '../../../types';

export interface IAboutView {
  aboutText: IAboutText;
  getAboutText: typeof getAboutText;
}

export const AboutView: React.FC<IAboutView> = (props) => {
  const { aboutText, getAboutText } = props;

  useEffect(() => {
    !aboutText && getAboutText();
  });

  if (!aboutText) {
    return null;
  }

  const { education, summary, workExperience } = aboutText;

  return (
    <div>
      <h2>About</h2>
      <DownloadResume />

      <h3>{summary.title}</h3>
      <Card>
        {summary.details1} <br/>
        {summary.details2}
      </Card>

      <h3>{workExperience.title}</h3>
      {workExperience.jobs.map((job, idx) => (
        <Card title={job.company} key={idx}>
          <strong>{job.role1}</strong> <br/>
          {job.role2 && <strong>{job.role2}<br/></strong>}
          {job.dates} <br/>
          {job.location}
        </Card>
      ))}

      <h3>{education.title}</h3>
      <Card title={education.university}>
        {education.details1} <br/>
        {education.details2} <br/>
        {education.details3}
      </Card>

    </div>
  );
}

const mapStateToProps = (state: IStoreState) => ({
  aboutText: state.textReducer.aboutText
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    getAboutText
  }, dispatch)
);

export const About = connect(mapStateToProps, mapDispatchToProps)(AboutView);
