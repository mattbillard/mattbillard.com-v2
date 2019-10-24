import React from 'react';
// import { Card } from 'antd-mobile';
import { Button } from 'antd-mobile';

import { IResumeText } from '../../types';

export interface IDownloadResume {
  resumeText: IResumeText;
}

export const DownloadResume: React.FC<IDownloadResume> = (props) => {
  const { resumeText } = props;

  return (
    // <div>
    //   <Card style={{marginBottom: 10}}>
    //     <Card.Body>
    //       <a href={resumeText.href}>{resumeText.text}</a>
    //     </Card.Body>
    //   </Card>
    // </div>
    <Button onClick={() => window.open(resumeText.href, '_blank')}>
      {resumeText.text}
    </Button>
  );
}
