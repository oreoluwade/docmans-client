import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { deleteUser } from '../../actions';

const useStyles = makeStyles(theme => ({
    cardRoot: {
        minWidth: 275,
        [theme.breakpoints.down('sm')]: {
            minWidth: 200
        },
        backgroundColor: '#CDCDCD',
        maxHeight: '14rem',
        overflow: 'hidden'
    },
    name: {
        fontSize: 16,
        textTransform: 'uppercase',
        fontWeight: 800
    },
    role: {
        fontSize: 14,
        color: 'rgb(49, 150, 175)'
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    delete: {
        height: '1.5rem',
        width: '2rem',
        color: '#8B0000'
    },
    action: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    bodyTwo: {
        overflow: 'hidden'
    },
    username: {
        fontWeight: 600
    },
    email: {
        fontWeight: 600
    },
    uname: {
        color: 'cornflowerblue',
        fontStyle: 'italic'
    },
    uemail: {
        color: 'cornflowerblue'
    }
}));

const UserCard = ({ user, deleteUser }) => {
    const classes = useStyles();

    const destroyUser = async userId => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgb(80, 143, 202)',
            cancelButtonColor: '#8B0000',
            confirmButtonText: 'Yes, delete it!'
        }).then(async result => {
            if (result.value) {
                await deleteUser(userId);
                Swal.fire({
                    title: 'User deleted',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };

    return (
        <Card className={classes.cardRoot}>
            <CardContent className={classes.cardHeader}>
                <Typography className={classes.name} color="textSecondary">
                    {user.firstname} {user.lastname}
                </Typography>
                <Typography className={classes.role}>
                    {user.Role.title}
                </Typography>
            </CardContent>
            <CardContent className={classes.bodyOne}>
                <Typography className={classes.username}>
                    USERNAME:{' '}
                    <span className={classes.uname}>{user.username}</span>
                </Typography>
            </CardContent>
            <CardContent className={classes.bodyTwo}>
                <div className={classes.email}>
                    EMAIL: <span className={classes.uemail}>{user.email}</span>
                </div>
            </CardContent>
            <CardContent className={classes.action}>
                <Tooltip title={`Delete ${user.firstname} ${user.lastname}`}>
                    <DeleteIcon
                        className={classes.delete}
                        onClick={() => destroyUser(user.id)}
                    />
                </Tooltip>
            </CardContent>
        </Card>
    );
};

UserCard.propTypes = {
    user: PropTypes.object.isRequired,
    deleteUser: PropTypes.func.isRequired
};

export default connect(null, { deleteUser })(UserCard);
