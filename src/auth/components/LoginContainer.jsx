import { useDispatch } from "react-redux";
import { startGoogleSignIn } from "../../store/auth";

export const LoginContainer = () => {

    const dispatch = useDispatch();

    const onGoogleSignIn = () => {
        dispatch( startGoogleSignIn() );
    }

    return (
        <aside className="login-container container h-100">
            <div className="row">
                <div className="col-12">
                    <h1>LOGIN</h1>
                </div>
                <div className="col-12 d-flex justify-content-center">
                    <button onClick={onGoogleSignIn}>
                        Ingresar con Google
                    </button>
                </div>
            </div>
        </aside>
    );
};
