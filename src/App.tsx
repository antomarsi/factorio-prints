import Footer from "./components/Footer";
import routes from "./routes";

function App() {
    return (
        <>
            <div className="px-4">
                {routes}
            </div>
            <Footer />
        </>
    );
}

export default App;
