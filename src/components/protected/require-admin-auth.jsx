import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
    class RequireAdminAuth extends React.Component {
        componentDidMount() {
            if (!this.props.isAuthenticated) {
                this.props.history.push('/login');
            }
            if (this.props.isAuthenticated && !this.props.isAdmin) {
                console.log('Not admin, no access');
            }
        }

        componentDidUpdate(prevProps) {
            if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
                this.props.history.push('/login');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    RequireAdminAuth.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        isAdmin: PropTypes.bool.isRequired,
        history: PropTypes.object
    };

    const mapStateToProps = state => {
        return {
            isAuthenticated: state.auth.isAuthenticated,
            isAdmin: state.user.details.roleId === 1
        };
    };

    return withRouter(connect(mapStateToProps, null)(RequireAdminAuth));
}
