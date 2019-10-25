import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card } from 'antd-mobile';

import { DownloadResume } from '../../';
import { getContactText, IStoreState } from '../../../redux';
import { IContactText } from '../../../types';
import { tellParentToUpdateUrl } from '../../../../shared/utils/utils';

import './contact.css';

export interface IContactView {
  contactText: IContactText;
  getContactText: typeof getContactText;
}

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
    <div>
      <h2>Contact</h2>

      <DownloadResume />

      {Object.values(contactText).map((contact, idx) => (
        <Card style={{marginBottom: 10}} key={idx}>
          <Card.Header title={contact.title} />
          <Card.Body>
            <a href={contact.href} target="_blank" rel="noopener noreferrer" className="contact-link">
              <i className={`${contact.icon} fa-10x`}></i> 
              <br/>
              {contact.href}
            </a>
          </Card.Body>
        </Card>
      ))}

    </div>
  );
}

const mapStateToProps = (state: IStoreState) => ({
  contactText: state.textReducer.contactText
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    getContactText
  }, dispatch)
);

export const Contact = connect(mapStateToProps, mapDispatchToProps)(ContactView);
