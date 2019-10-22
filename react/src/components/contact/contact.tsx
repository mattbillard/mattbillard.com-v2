import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getContactText, IStoreState } from '../../redux';
import { IContactText } from '../../types';

export interface IContactView {
  contactText: IContactText;
  getContactText: typeof getContactText;
}

export const ContactView: React.FC<IContactView> = (props) => {
  const { contactText, getContactText } = props;

  useEffect(() => {
    !contactText && getContactText();
  });

  return (
    <div>
      <h2>Contact</h2>
      {contactText && (
        <React.Fragment>
          <pre>{ JSON.stringify(contactText, null, '  ') }</pre>
        </React.Fragment>
      )}
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
