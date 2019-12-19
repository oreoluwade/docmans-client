import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { makeStyles } from '@material-ui/core/styles';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
import TitleIcon from '@material-ui/icons/Title';
import { connect } from 'react-redux';
import TextFieldGroup from '../base/text-field-group';
import { saveDocument, updateDocument } from '../../actions';
import { FullPageLoader } from '../loaders';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '2rem',
        padding: '2rem',
        backgroundColor: '#CDCDCD',
        height: '70%',
        oveeflow: 'scroll'
    },
    readOnly: {
        margin: '0 auto',
        fontStyle: 'italic',
        fontSize: '0.8rem',
        color: 'rgb(49, 150, 175)'
    },
    inputBox: {
        outline: 'none',
        borderRadius: theme.spacing(2),
        border: 'none',
        fontSize: '1rem',
        paddingLeft: '0.8rem',
        height: '2.5rem',
        width: '25rem'
    },
    textFieldClass: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        overflow: 'hidden',
        marginBottom: theme.spacing(2)
    },
    selectRoot: {
        width: '15rem',
        height: '2rem',
        backgroundColor: 'white',
        borderRadius: '0.8rem',
        overflow: 'hidden',
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    select: {
        width: '15rem',
        border: 'none',
        height: '2rem',
        outline: 'none'
    },
    submit: {
        width: '15rem',
        margin: '0 auto'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    }
}));

const RenderDocument = ({
    match,
    document,
    user,
    history,
    saveDocument,
    updateDocument
}) => {
    const classes = useStyles();

    const [submitting, setSubmitting] = useState(false);
    const [state, setState] = useState({
        errors: {},
        document: document || { access: 'public' },
        editable: true,
        documentId: ''
    });

    useEffect(() => {
        if (match.params.id) {
            setState({
                ...state,
                documentId: match.params.id,
                editable: document && document.ownerId === user.id
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputChange = event => {
        const { id: ownerId, roleId } = user;
        const { name: field, value } = event.target;
        const role = String(roleId);
        setState({
            ...state,
            document: {
                ...state.document,
                [field]: value,
                ownerId
            },
            role
        });
    };

    const handleModelChange = model => {
        setState({
            ...state,
            document: { ...state.document, content: model }
        });
    };

    const createDocument = async e => {
        e.preventDefault();
        try {
            setSubmitting(true);
            await saveDocument(state.document, user.id);
            setSubmitting(false);
            Swal.fire({
                icon: 'success',
                title: 'Document created',
                showConfirmButton: false,
                timer: 1500
            });
            history.push('/dashboard');
        } catch (error) {
            setSubmitting(false);
            console.log('Error', error);
        }
    };

    const editDocument = async e => {
        e.preventDefault();
        try {
            setSubmitting(true);
            await updateDocument(state.document, user.id);
            setSubmitting(false);
            Swal.fire({
                icon: 'success',
                title: 'Document created',
                showConfirmButton: false,
                timer: 1500
            });
            history.push('/dashboard');
        } catch (error) {
            setSubmitting(false);
            console.log('Update Error', error);
        }
    };

    const {
        documentId,
        editable,
        document: { title = '', content = '', access }
    } = state;

    return (
        <div className={classes.root}>
            {submitting ? (
                <FullPageLoader />
            ) : (
                <form className={classes.form}>
                    <TextFieldGroup
                        icon={<TitleIcon />}
                        field="title"
                        label="Title"
                        value={title}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Document Title"
                        inputClass={classes.inputBox}
                        fieldClass={classes.textFieldClass}
                        disabled={!editable}
                    />

                    <FroalaEditor
                        tag="textarea"
                        model={content}
                        onModelChange={handleModelChange}
                        contenteditable={editable}
                    />

                    <div className={classes.selectRoot}>
                        <select
                            name="access"
                            id="accessDropdown"
                            value={access}
                            className={classes.select}
                            onChange={handleInputChange}
                            disabled={!editable}
                        >
                            <option value="" disabled>
                                Document Visibility Access
                            </option>
                            <option value="public">PUBLIC</option>
                            <option value="private">PRIVATE</option>
                            <option value="role">FOR USERS WITH MY ROLE</option>
                        </select>
                    </div>

                    {editable ? (
                        <button
                            type="button"
                            className={`btn-default ${classes.submit}`}
                            onClick={documentId ? editDocument : createDocument}
                        >
                            {documentId ? 'UPDATE' : 'SAVE DOCUMENT'}
                        </button>
                    ) : (
                        <p className={classes.readOnly}>
                            This Document is Read Only
                        </p>
                    )}
                </form>
            )}
        </div>
    );
};

RenderDocument.propTypes = {
    auth: PropTypes.object,
    onChange: PropTypes.func,
    document: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
    user: PropTypes.object,
    saveDocument: PropTypes.func,
    updateDocument: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user.details,
        document: state.documents.find(
            item => item.id === Number(ownProps.match.params.id)
        )
    };
};

export default withRouter(
    connect(mapStateToProps, { saveDocument, updateDocument })(RenderDocument)
);
