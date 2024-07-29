import { Route, Routes, BrowserRouter } from "react-router-dom";
import App from "./App";
import Lærer from "./lærer/Lærer";
import Elev from "./elev/Elev";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/elev" element={<Elev />} />
				<Route path="/lærer" element={<Lærer />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
