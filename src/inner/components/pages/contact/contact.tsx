import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Card, DownloadResume } from '../../';
import { getContactText, IStoreState } from '../../../redux';
import { tellParentToUpdateUrl } from '../../../../shared/utils/utils';

import './contact.scss';

export interface IContactView extends StateProps, DispatchProps { }

export const ContactView: React.FC<IContactView> = (props) => {
  const { contactText, getContactText } = props;

  useEffect(() => {
    !contactText && getContactText();
    tellParentToUpdateUrl('contact');
  });

  if (!contactText) {
    return null;
  }

  return (
    <div className="contact">
      <h2>Contact</h2>

      <DownloadResume />

      {Object.values(contactText).map((contact, idx) => (
        <Card title={contact.title} key={idx}>
          <a href={contact.href} target="_blank" rel="noopener noreferrer" className="contact-link">
            <i className={`${contact.icon} fa-10x`}></i>
            <br />
            {contact.text}
          </a>
        </Card>
      ))}

    </div>
  );
}

const mapStateToProps = (state: IStoreState) => ({
  contactText: state.textReducer.contactText
});

const mapDispatchToProps = {
  getContactText
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export const Contact = connect(mapStateToProps, mapDispatchToProps)(ContactView);
