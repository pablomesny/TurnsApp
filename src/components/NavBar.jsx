import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { startLogout } from '../store/auth';
import Swal from 'sweetalert2';

export const NavBar = () => {

    const dispatch = useDispatch();
    const { displayName } = useSelector( state => state.auth );

    const onLogout = () => {
        Swal.fire({
            title: 'Estás seguro?',
            text: "Te desconectarás de tu cuenta",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch( startLogout() );
            }
          })
        
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand navbar-text-title ms-2" to="/">
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
                    <span className="navbar-toggler-icon">
                        <i className="fas fa-bars"></i>
                    </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink 
                                className={ ({isActive}) =>
                                `nav-link ${isActive ? 'active navbar-text' : 'navbar-text'}`
                                }
                                aria-current="page"
                                to="/turns"
                            >
                                Turnos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={ ({isActive}) =>
                                    `nav-link ${isActive ? 'active navbar-text' : 'navbar-text'}`
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
                        className="btn btn-danger me-2"
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
