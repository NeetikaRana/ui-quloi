import React, { Fragment } from 'react';
import { Button, withStyles } from '@material-ui/core';
import background from '../Images/background1.jpeg';
import Google from '../Images/google-logo.jpeg';
import styles from './Main.css';
import { withRouter } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import Fab from '@material-ui/core/Fab'

class Main extends React.Component {
    
    handleOpen = (e,val) => {
      e.preventDefault();
      this.props.history.push(`/Screen/${val}`)
    }

    render() {
        const {classes} = this.props;
      return (
        <Fragment >
            <div className={classes.mainDiv} style={{ backgroundImage: `url(${background})`}}>
            <h2 style={{color: 'white', paddingTop:'30px'}}>Login to Continue</h2>
            <div>
            <Button variant="contained" color="primary" className={classes.btn} onClick={(e)=> this.handleOpen(e,'S')}>
              <Fab className={classes.fabTag} ><FacebookIcon className={classes.fabButton}/> </Fab> Continue with Facebook</Button>
            <Button variant="contained" color="primary" onClick={(e)=> this.handleOpen(e, 'A')}>
              <Fab className={classes.fabTag} ><img src={Google} alt="Google" className={classes.fabButton}/></Fab>
              Continue with Google</Button>
            </div>
            </div>

        </Fragment>
      );
    }
  }

  export default withRouter((withStyles(styles)(Main)));