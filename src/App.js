import "./App.scss";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import Routes from "./pages/Routes";
import { useAuthContext } from "./context/AuthContext";

function App() {
    const { isAppLoading } = useAuthContext();

    if (isAppLoading) return (
        <main className="d-flex justify-content-center vh-100 align-items-center bg-white" >
            <div class="loadingio-spinner-eclipse-w23hk98k28h"><div class="ldio-fvb20zqbnun">
                <div></div>
            </div></div>
        </main>
    )
    return (
        <>
            <Routes />
        </>
    );
}
export default App;