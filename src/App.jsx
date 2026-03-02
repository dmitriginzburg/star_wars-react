import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import { useState } from "react";
import { navItems } from "./utils/constants.js";
import { PageContext } from "./utils/context.js";

function App() {
    const [page, setPage] = useState(navItems[0]);

    const changePage = (newPage) => {
        setPage(newPage);
    };

    return (
        <PageContext value={{ page, changePage }}>
            <div className="mx-2">
                <Header />
                <Main />
                <Footer />
            </div>
        </PageContext>
    );
}

export default App;