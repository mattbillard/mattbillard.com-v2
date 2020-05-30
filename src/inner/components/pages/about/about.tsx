import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Card, DownloadResume } from '../../';
import { getAboutText, IStoreState } from '../../../redux';
import { tellParentToUpdateUrl } from '../../../../shared/utils/utils';

// BOTH WORK - with CreatReactApp CSS modules and typed css/scss modules 
// COMMAND - either works 
// - typed-css-modules
//     npx tcm -w -c -p 'src/**/*.module.scss'
// - typed-scss-modules (seems more maintained)
//     npx tsm src/**/*.module.scss -w
import * as styles from './about.module.scss';


console.log('---styles', styles);

export interface IAbout { }

export const About: React.FC<IAbout> = (props) => {
  const aboutText = useSelector((state: IStoreState) => state.textReducer.aboutText);
  const dispatch = useDispatch();

  useEffect(() => {
    !aboutText && dispatch(getAboutText());
    tellParentToUpdateUrl('about');
  });

  if (!aboutText) {
    return null;
  }

  const { education, summary, workExperience } = aboutText;

  return (
    <div>
      <h2 className={styles.test}>About - {styles.test}</h2>
      <h2 className={styles.testTest}>About - {styles.testTest}</h2>
      <h2 className={styles['test-test']}>About - {styles['test-test']}</h2>
      <DownloadResume />

      <h3>{summary.title}</h3>
      <Card>
        {summary.details1} <br />
        {summary.details2}
      </Card>

      <h3>{workExperience.title}</h3>
      {workExperience.jobs.map((job, idx) => (
        <Card title={job.company} key={idx}>
          <strong>{job.role1}</strong> <br />
          {job.role2 && <strong>{job.role2}<br /></strong>}
          {job.dates} <br />
          {job.location}
        </Card>
      ))}

      <h3>{education.title}</h3>
      <Card title={education.university}>
        {education.details1} <br />
        {education.details2} <br />
        {education.details3}
      </Card>

    </div>
  );
}
