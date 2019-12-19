import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AuthPanel from './auth-panel';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '300px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        paddingTop: theme.spacing(5),
        [theme.breakpoints.up('sm')]: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            width: '100%',
            paddingTop: '10rem'
        }
    },
    authWrapper: {
        [theme.breakpoints.up('sm')]: {
            gridColumn: '3 / 4'
        }
    }
}));

const Auth = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.authWrapper}>
                <AuthPanel />
            </div>
        </div>
    );
};

export default Auth;
