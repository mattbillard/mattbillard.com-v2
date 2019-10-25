import React from 'react';
import { Button } from 'antd-mobile';

const resumeText = {
  text: "Download Resume",
  href: "/assets/downloads/Matt-Billard-resume.pdf"
};

export const DownloadResume: React.FC = () => {
  return (
    <Button onClick={() => window.open(resumeText.href, '_blank')} style={{marginBottom:10}}>
      {resumeText.text}
    </Button>
  );
}
