import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AuthPanel from './auth-panel';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: 'repeat(8, 1fr)'
    },
    panelWrapper: {
        gridColumn: '3 / -1',
        gridRow: '2 / 8',
        padding: 0
    }
}));

const Auth = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.panelWrapper}>
                <AuthPanel />
            </div>
        </div>
    );
};

export default Auth;
