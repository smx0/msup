import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookOpen, faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

export default function Header() {

    const navigate = useNavigate()

    return (
        <div className="header">
            <p className="header-msup">
                <span style={{ color: 'red' }}>m</span>
                <span style={{ textDecoration: 'underline dotted red' }}>
                    sup</span> /</p>
            <p className="header-body">
                <span style={{ textDecoration: 'underline dotted red' }}>
                    sup</span>plemental resources for
                <span style={{ color: 'red' }}> m</span>cito</p>
            <FontAwesomeIcon
                className="header-home-icon"
                icon={faBookOpen}
                onClick={ () => navigate('/home')}
                style={{ color: 'white', cursor: 'pointer' }} />
        </div>

    )
};