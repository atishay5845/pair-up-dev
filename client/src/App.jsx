
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import appStore from "./utils/appStore";

import Navbar from "./Navbar";
import Footer from "./Footer";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Feed from "./Feed";
import Connections from "./Connections";
import Requests from "./Requests";

function App() {
    return (
        <Provider store={appStore}>
            <BrowserRouter>
                <div className="flex min-h-screen flex-col bg-[#090c14]">
                    {/* Shared navigation */}
                    <Navbar />

                    {/* Application pages */}
                    <div className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/feed" element={<Feed />} />
                            <Route
                                path="/connections"
                                element={<Connections />}
                            />
                            <Route path="/requests" element={<Requests />} />
                        </Routes>
                    </div>

                    {/* Shared footer */}
                    <Footer />
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
