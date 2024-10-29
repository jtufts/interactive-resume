import React from 'react';
import {RouterProvider, Link, NavLink} from 'react-router-dom';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import './Sidebar.css';
import { IconButton } from '@mui/material';
import { blue } from '@mui/material/colors';
import Button from '@mui/material/Button';

const Sidebar = ({onClose}) => {
    return (
        <div className="sidebar-bg">
            <div className="sidebar">
                <IconButton onClick={onClose}><MenuOpenIcon /></IconButton>
                <Button onClick={() => {onClose(); document.getElementById("welcome").scrollIntoView(true)}}>Home</Button>
                <Button onClick={() => {onClose(); document.getElementById("executive-summary").scrollIntoView(true)}}>Executive Summary</Button>
                <Button onClick={() => {onClose(); document.getElementById("skills").scrollIntoView(true)}}>Skills</Button>
                <Button onClick={() => {onClose(); document.getElementById("employment-history").scrollIntoView(true)}}>Employment History</Button>
            </div>
        </div>
    );
}

export default Sidebar;