import React from 'react';

import { Button } from '../';
import '../../styles/theme-base.scss';

const resumeText = {
  text: "Download Resume",
  href: "/assets/downloads/Matt-Billard-resume.pdf"
};

export const DownloadResume: React.FC = () => {
  return (
    <Button onClick={() => window.open(resumeText.href, '_blank')}>
      {resumeText.text}
    </Button>
  );
}
