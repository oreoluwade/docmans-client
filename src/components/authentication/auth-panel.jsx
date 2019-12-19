import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LoginForm from './login-form';
import SignupForm from './signup-form';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '57vh',
        minHeight: '40vh',
        [theme.breakpoints.down('sm')]: {
            minHeight: '57vh'
        },
        backgroundColor: '#CDCDCD',
        width: '100%',
        overflow: 'hidden'
    },
    loginTabButton: {
        gridColumn: '1 / 2'
    },
    signupTabButton: {
        gridColumn: '2 / 3'
    },
    form: {
        display: 'grid',
        width: '100%'
    },
    tabSelector: {
        display: 'grid',
        gridTemplateColumns: 'repeat(autofill, minmax(150px, 1fr))'
    }
}));

const AuthPanel = () => {
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(1);

    const selectLoginForm = () => setSelectedTab(1);

    const selectSignupForm = () => setSelectedTab(2);

    return (
        <div className={classes.root}>
            <div className={classes.tabSelector}>
                <Button
                    color="inherit"
                    onClick={selectLoginForm}
                    className={classes.loginTabButton}
                >
                    LOGIN
                </Button>
                <Button
                    color="inherit"
                    onClick={selectSignupForm}
                    className={classes.signupTabButton}
                >
                    SIGNUP
                </Button>
            </div>
            <div className={classes.form}>
                {selectedTab === 1 ? <LoginForm /> : <SignupForm />}
            </div>
        </div>
    );
};

export default AuthPanel;
