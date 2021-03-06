import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import SettingsIcon from '@material-ui/icons/Settings';
import Customization from './Customization'

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ModalSettings(
    {
        noteVariable,
        noteSettings,
        photoVariable,
        photoSettings,
        filesVariable,
        filesSettings,
        metadataVariable,
        metadataSettings
    }) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Customization
                noteVariable={noteVariable}
                noteSettings={noteSettings}
                photoVariable={photoVariable}
                photoSettings={photoSettings}
                filesVariable={filesVariable}
                filesSettings={filesSettings}
                metadataVariable={metadataVariable}
                metadataSettings={metadataSettings}
            />
        </div>
    );

    return (
        <div>
            <SettingsIcon fontSize='large' onClick={handleOpen} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
