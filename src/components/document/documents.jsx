import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { loadAllDocuments } from '../../actions';
import DocumentCard from './document-card';
import SelectAccess from './select-access';
import Search from './search';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        height: '80%',
        overflow: 'scroll',
        backgroundColor: 'whitesmoke'
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    accessFilter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    },
    filterText: {
        marginRight: theme.spacing(3)
    },
    filterGroup: {
        display: 'flex',
        padding: 0,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2)
        }
    }
}));

const filterDocuments = (checkedState, documents) => {
    const categoriesIncluded = Object.keys(checkedState).filter(
        cat => !!checkedState[cat]
    );

    if (categoriesIncluded.length === 0) {
        return documents;
    } else {
        return documents.filter(doc => categoriesIncluded.includes(doc.access));
    }
};

const Documents = ({ allDocuments, loadAllDocuments }) => {
    const classes = useStyles();
    const [documents, setDocuments] = useState([]);
    const [checkedState, setCheckedState] = useState({
        public: false,
        private: false,
        role: false
    });
    const [query, setQuery] = useState('');

    useEffect(() => {
        loadAllDocuments().then(() => {
            setDocuments(allDocuments);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const filteredDocuments = filterDocuments(checkedState, allDocuments);
        setDocuments(filteredDocuments);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkedState]);

    useEffect(() => {
        setDocuments(allDocuments);
    }, [allDocuments]);

    const handleChecked = event => {
        setCheckedState({
            ...checkedState,
            [event.target.name]: event.target.checked
        });
    };

    // Needs fixing
    const handleQueryChange = e => {
        e.persist();
        setQuery(e.target.value.trim().toLowerCase());
        const queriedDocs = allDocuments.filter(
            doc =>
                doc.title.toLowerCase().includes(query) ||
                doc.content.toLowerCase().includes(query)
        );
        const filteredDocuments = filterDocuments(checkedState, queriedDocs);
        setDocuments(filteredDocuments);
    };

    return (
        <div className={classes.root}>
            <div className={classes.accessFilter}>
                <Search query={query} handleQueryChange={handleQueryChange} />
                <div className={classes.filterGroup}>
                    <h4 className={classes.filterText}>Filter: </h4>
                    <SelectAccess
                        publicChecked={checkedState.public}
                        privateChecked={checkedState.private}
                        roleChecked={checkedState.role}
                        handleChecked={handleChecked}
                    />
                </div>
            </div>
            <Grid container spacing={2}>
                {documents.map(document => (
                    <Grid item xs={12} sm={3} key={document.id}>
                        <DocumentCard document={document} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

Documents.propTypes = {
    auth: PropTypes.object,
    loadAllDocuments: PropTypes.func,
    allDocuments: PropTypes.array
};

const mapStateToProps = state => {
    const { documents, auth } = state;

    return {
        auth,
        allDocuments: documents
    };
};

export default connect(mapStateToProps, { loadAllDocuments })(Documents);
