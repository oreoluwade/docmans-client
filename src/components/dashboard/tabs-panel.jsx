import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { DocumentList } from '../document';

const TabPanel = props => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(3),
        backgroundColor: theme.palette.background.paper
    },
    tabsBar: {
        backgroundColor: 'rgb(49, 150, 175)'
    }
}));

const TabsPanel = ({ privateDocuments, publicDocuments, roleDocuments }) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.tabsBar}>
                <Tabs
                    value={value}
                    onChange={handleTabChange}
                    aria-label="documents tab"
                    centered
                >
                    <Tab label="Public" {...a11yProps(1)} />
                    <Tab label="Private" {...a11yProps(0)} />
                    <Tab label="Role" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <DocumentList documents={publicDocuments} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DocumentList documents={privateDocuments} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <DocumentList documents={roleDocuments} />
            </TabPanel>
        </div>
    );
};

TabsPanel.propTypes = {
    privateDocuments: PropTypes.array,
    publicDocuments: PropTypes.array,
    roleDocuments: PropTypes.array
};

export default TabsPanel;
