import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios'

function SideBar(props) {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    let title = capitalize(props.location.pathname.substring(1, props.location.pathname.length))
    if (props.location.pathname === '/') {
        console.log("let's go!")
    }

    function tipeMenu(title) {
        if (title === 'null' || title === 'Login') {
            return (<div className="hide-it"></div>)
        }
        else {
            return (
                <div className="col-2">
                <nav id="sidebar" className="sidebar-wrapper">
                    <div className=" sidebar-item sidebar-menu">
                        <ul>
                            <li className="header-menu">
                                <span>General</span>
                            </li>
                        </ul>
                    </div>
                </nav>
                </div>
            )
        }
    }

    return (
        tipeMenu(title)
    )
}


export default withRouter(SideBar);