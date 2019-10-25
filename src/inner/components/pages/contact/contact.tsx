import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card } from 'antd-mobile';

import { getContactText, IStoreState } from '../../../redux';
import { IContactText } from '../../../types';
import { tellParentToUpdateUrl } from '../../../../shared/utils/utils';

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

  const { gitHub, linkedIn } = contactText;

  return (
    <div>
      <h2>Contact</h2>
      {/* {contactText && (
        <React.Fragment>
          <pre>{ JSON.stringify(contactText, null, '  ') }</pre>
        </React.Fragment>
      )} */}

      <Card style={{marginBottom: 10}}>
        <Card.Header title={gitHub.title} />
        <Card.Body>
          <a href={gitHub.href}>{gitHub.href}</a>
        </Card.Body>
      </Card>

      <Card style={{marginBottom: 10}}>
        <Card.Header title={linkedIn.title} />
        <Card.Body>
          <a href={linkedIn.href}>{linkedIn.href}</a>
        </Card.Body>
      </Card>
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
