import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const App = () => {
	const navigate = useNavigate();
	return (
		<>
			<Button
				variant="contained"
				onClick={() => {
					navigate("/lærer");
				}}
			>
				Lærer
			</Button>
			<Button
				variant="contained"
				onClick={() => {
					navigate("/elev/1");
				}}
			>
				Elev (Benjamin Falch)
			</Button>
			<Button
				variant="contained"
				onClick={() => {
					navigate("/elev/2");
				}}
			>
				Elev (Malthe Guldkage)
			</Button>
			<Button
				variant="contained"
				onClick={() => {
					navigate("/elev/3");
				}}
			>
				Elev (Flemming Jensen)
			</Button>
		</>
	);
};

export default App;
