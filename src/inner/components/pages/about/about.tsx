import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card } from 'antd-mobile';

import { DownloadResume } from '../../';
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

  const { downloadResume, summary, workExperience } = aboutText;

  return (
    <div>
      <h2>About</h2>

      {/* <h3>{downloadResume.title}</h3> */}
      {/* <Card style={{marginBottom: 10}}>
        <Card.Body>
          <a href={downloadResume.href}>{downloadResume.text}</a>
        </Card.Body>
      </Card> */}
      <DownloadResume resumeText={downloadResume} />

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
          <Card.Header title={job.company} />
          <Card.Body>
            <div>{job.title}</div>
            <div>{job.dates}</div>
            <div>{job.location}</div>
          </Card.Body>
        </Card>
      ))}


      {/* 
      {aboutText && (
        <React.Fragment>
          <pre>{ JSON.stringify(aboutText, null, '  ') }</pre>
        </React.Fragment>
      )} */}

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
