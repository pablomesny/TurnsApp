import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, startGoogleSignIn } from "../../store/auth";

export const LoginPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      const authData = JSON.parse(localStorage.getItem('auth'));
      if(authData){
          dispatch( login(authData) );   
      }
    }, [])
    

    const onGoogleSignIn = () => {
        dispatch( startGoogleSignIn() );
    }

    return (
        <div className="login-container container">
            <div className="row">
                <div className="col-12">
                    <h1>LOGIN</h1>
                </div>
                <div className="col-12 d-flex justify-content-center">
                    <button
                        onClick={ onGoogleSignIn }
                    >
                        Ingresar con Google
                    </button>
                </div>
            </div>
        </div>
    );
};
