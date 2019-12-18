import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LoginForm from './login-form';
import SignupForm from './signup-form';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gridTemplateRows: '50px',
        height: '57vh',
        backgroundColor: '#CDCDCD',
        boxShadow: 'rgb(0, 0, 0, 0.7)'
    },
    loginTabButton: {
        gridColumn: '2 / 4',
        gridRow: '1 / 1'
    },
    signupTabButton: {
        gridColumn: '4 / -1',
        gridRow: '1 / 2'
    },
    form: {
        display: 'grid',
        gridRow: '2 / -1',
        gridColumn: '1 / -1'
    },
    tabSelector: {
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        width: '30rem'
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
