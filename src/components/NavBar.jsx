import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { startLogout } from '../store/auth/thunks';

export const NavBar = () => {

    const dispatch = useDispatch();
    const { displayName } = useSelector( state => state.auth );

    const onLogout = () => {
        dispatch( startLogout() );
        localStorage.removeItem('auth');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    { displayName }
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink 
                                className={ ({isActive}) =>
                                `nav-link ${isActive ? 'active' : ''}`
                                }
                                aria-current="page"
                                to="/dates"
                            >
                                Turnos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={ ({isActive}) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                                aria-current="page"
                                to="/clients"
                            >
                                Clientes
                            </NavLink>
                        </li>
                    </ul>
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                    <button 
                        className="btn btn-danger"
                        onClick={ onLogout }
                    >
                        LOGOUT
                    </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
