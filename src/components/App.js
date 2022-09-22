import { Routes, Route} from "react-router-dom";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import User from "../pages/User";
import Atencion from "../pages/Atencion";

function App() {
    return (
        <div className="App">
            <Routes>

                <Route exact path="/" element={<Login />} />
                <Route exact path="/home" element={<User />} />
                <Route exact path="/SignUp" element={<SignUp />} />
                <Route exact path="/Atencion" element={<Atencion />} />
            </Routes>
        </div>
    );
}

export default App;
