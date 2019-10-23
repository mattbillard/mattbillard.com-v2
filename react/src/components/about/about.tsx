import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { getAboutText, IStoreState } from '../../redux';
import { IAboutText } from '../../types';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export interface IAboutView {
  aboutText: IAboutText;
  getAboutText: typeof getAboutText;
}

export const AboutView: React.FC<IAboutView> = (props) => {
  const classes = useStyles();
  const { aboutText, getAboutText } = props;

  useEffect(() => {
    !aboutText && getAboutText();
  });

  return (
    <div>
      {/* <h2>About</h2>
      {aboutText && (
        <React.Fragment>
          <pre>{ JSON.stringify(aboutText, null, '  ') }</pre>
        </React.Fragment>
      )} */}

      <Paper className={classes.root}>
        <Typography variant="h1">Heading 1</Typography>
        <Typography variant="h2">Heading 2</Typography>
        <Typography variant="h3">Heading 3</Typography>
        <Typography variant="h4">Heading 4</Typography>
        <Typography variant="h5">Heading 5</Typography>

        <Typography variant="h5" component="h3">Heading</Typography>
        <Typography component="p">Lorem ipsum</Typography>
      </Paper>

      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Heading
        </Typography>
        <Typography component="p">
          Lorem ipsum
        </Typography>
      </Paper>

      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Heading
        </Typography>
        <Typography component="p">
          Lorem ipsum
        </Typography>
      </Paper>

      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Heading
        </Typography>
        <Typography component="p">
          Lorem ipsum
        </Typography>
      </Paper>
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
