import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Card, DownloadResume } from '../../';
import { getAboutText, IStoreState } from '../../../redux';
import { tellParentToUpdateUrl } from '../../../../shared/utils/utils';

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
      <h2>About</h2>
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
