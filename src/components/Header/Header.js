import React, { useState,useEffect,useContext } from 'react';
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME, userContext } from '../../constants/apiContants';
import { FaSignOutAlt } from 'react-icons/fa';
function Header(props) {
    const [userName, setUserName] = useState(null);
    const {user, setUser} = useContext(userContext);
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    useEffect(() => {
        function checkuser(){
            var existe = 'email' in userContext.Provider
            if (userName != null && existe){
                setUserName(userContext.Consumer);
                console.log(userName)
            } else {
               // handleLogout()
               console.log("header!")
            }
		};
		checkuser();
	}, []);

    let title = capitalize(props.location.pathname.substring(1, props.location.pathname.length))
    if (props.location.pathname === '/') {
        console.log("let's go!")
    }
    function renderLogout() {
        if (props.location.pathname === '/home') {
            return (
                <div className="text-left">
                    <button className="btn btn-danger" onClick={() => handleLogout()}>Salir  <FaSignOutAlt /></button>
                </div>
            )
        }
    }
    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/login')
    }

    function editTitle(text){
      var num = text.indexOf('/')
      if (num > 0){  return( text.substring(0,num))} else { return text} 
     }

    function tipeHeader(title) {
        if (title === 'null' || title === 'Login') {
            return (
                <nav className="navbar navbar-dark bg-secondary">
                    <img src={window.location.origin + '/logo-a.png'} alt="Logo" width="20%" eight="20%" className="mx-auto d-block" />
                </nav>
            )
        } else {
            return (
                <nav className="navbar navbar-expand-sm bg-secondary navbar-dark">
                    <a className="navbar-brand maximunA" href="/home">
                        <img src={window.location.origin + '/logo-a.png'} alt="Logo" width="30%" className="float-left" />
                    </a>
                    <span className="navbar-text h3  ">
                        {editTitle(title)}
                    </span>
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                            <ul >
                                <li className="badge badge-light">{userName}</li>
                                <li className="badge badge-light">Empresa</li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            {renderLogout()}
                        </li>
                    </ul>
                </nav>

            )
        }
    }
    return (
        tipeHeader(title)
    )
}
export default withRouter(Header);
