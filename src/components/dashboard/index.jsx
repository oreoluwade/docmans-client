import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TabsPanel from './tabs-panel';

const useStyles = makeStyles(() => ({
    root: {
        overflow: 'scroll',
        height: '80%'
    }
}));

const Dashboard = ({ privateDocuments, publicDocuments, roleDocuments }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TabsPanel
                privateDocuments={privateDocuments}
                publicDocuments={publicDocuments}
                roleDocuments={roleDocuments}
            />
        </div>
    );
};

Dashboard.propTypes = {
    auth: PropTypes.object,
    privateDocuments: PropTypes.array.isRequired,
    roleDocuments: PropTypes.array.isRequired,
    publicDocuments: PropTypes.array.isRequired
};

const filterDocument = (role, documents) => {
    return documents.filter(doc => doc.access === role);
};

const mapStateToProps = state => {
    const {
        user: { documents },
        auth
    } = state;
    const publicDocuments = filterDocument('public', documents);
    const roleDocuments = filterDocument('role', documents);
    const privateDocuments = filterDocument('private', documents);

    return {
        auth,
        publicDocuments,
        roleDocuments,
        privateDocuments
    };
};

export default connect(mapStateToProps, null)(Dashboard);
