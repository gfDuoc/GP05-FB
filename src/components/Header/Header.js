import React, { useImperativeHandle } from 'react';
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../constants/apiContants';
import { FaSignOutAlt } from 'react-icons/fa';
function Header(props) {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    let title = capitalize(props.location.pathname.substring(1, props.location.pathname.length))
    if (props.location.pathname === '/') {
        console.log("let's go!")
    }
    function renderLogout() {
        if (props.location.pathname === '/home') {
            return (
                <div className="text-left">
                   
                    <button className="btn btn-danger" onClick={() => handleLogout()}>Salir  <FaSignOutAlt/></button>
                </div>
            )
        }
    }
    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/login')
    }

    function tipeHeader(title) {
        if (title === 'null' || title === 'Login') {
            return (
                <img src={window.location.origin + '/logo-a.png'} alt="Logo" className="img-fluid mx-auto d-block" width="20%" eight="20%" />
            )
        } else {
            return (
                <div>
                    <div className="row">
                        <div className="col">
                            <a className="navbar-brand" href="/home">
                                <img src={window.location.origin + '/logo-a.png'} alt="Logo" width="40%" eight="40%" />
                            </a>
                        </div>
                        <div className="col">
                            <span className="h3">{title}</span>
                        </div>
                        <div className="col">
                            <div className="row">
                                <div className="col">     <p>{props.userName}</p></div>
                                <div className="col">  {renderLogout()}</div>
                            </div>      
                        </div>
                    </div>
                </div>
            )
        }
    }
    return (
        <nav className="navbar navbar-dark bg-secondary">
            {console.log(title)}
            {tipeHeader(title)}
        </nav>
    )
}
export default withRouter(Header);
