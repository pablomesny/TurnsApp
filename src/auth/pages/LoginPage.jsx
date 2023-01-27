import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth";
import { LoginContainer } from "../components";

export const LoginPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      const authData = JSON.parse(localStorage.getItem('auth'));
      if(authData){
          dispatch( login(authData) );   
      }
    }, [])

    return (
        <main className="container mw-100 mh-100 login-page">
            <div className="row min-vh-100">
                <div className="col-12 col-md-6 p-0 d-flex align-items-center justify-content-center login-page-div">
                    <h1 className="login-title animate__animated animate__fadeInLeft">
                        Turns <span className="d-block">App</span>
                    </h1>
                </div>
                <div className="col-12 col-md-6 p-0 align-items-center justify-content-center login-page-div">
                    <LoginContainer />
                </div>
            </div>
        </main>
    );
};
