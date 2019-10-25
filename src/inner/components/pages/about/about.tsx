import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card } from 'antd-mobile';

import { DownloadResume } from '../../';
import { getAboutText, IStoreState } from '../../../redux';
import { IAboutText } from '../../../types';
import { tellParentToUpdateUrl } from '../../../../shared/utils/utils';

export interface IAboutView {
  aboutText: IAboutText;
  getAboutText: typeof getAboutText;
}

export const AboutView: React.FC<IAboutView> = (props) => {
  const { aboutText, getAboutText } = props;

  useEffect(() => {
    !aboutText && getAboutText();
    tellParentToUpdateUrl('about');
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
      <Card style={{marginBottom: 10}}>
        <Card.Body>
          <div>{summary.details1}</div>
          <div>{summary.details2}</div>
        </Card.Body>
      </Card>

      <h3>{workExperience.title}</h3>
      {workExperience.jobs.map((job, idx) => (
        <Card style={{marginBottom: 10}} key={idx}>
          <Card.Header title={job.company} style={{fontWeight: 'bold'}} />
          <Card.Body>
            <div><strong>{job.role1}</strong></div>
            {job.role2 && <div><strong>{job.role2}</strong></div>}
            <div>{job.dates}</div>
            <div>{job.location}</div>
          </Card.Body>
        </Card>
      ))}

      <h3>{education.title}</h3>
        <Card style={{marginBottom: 10}}>
          <Card.Header title={education.university} style={{fontWeight: 'bold'}} />
          <Card.Body>
            <div>{education.details1}</div>
            <div>{education.details2}</div>
            <div>{education.details3}</div>
          </Card.Body>
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
