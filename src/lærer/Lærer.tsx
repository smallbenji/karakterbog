import { useEffect, useState } from "react";
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	ButtonGroup,
	Button,
} from "@mui/material";

const Lærer = () => {
	const [Elever, SetElever] = useState<elev[]>();
	const [SelectedElev, SetSelectedElev] = useState<elev | undefined>();

	useEffect(() => {
		SetElever([
			{
				Elevnr: 1,
				Navn: "Benjamin Falch",
				Email: "benjaminkfalch@gmail.com",
				Fag: [
					{
						Fag: "Dansk",
						karakter: 4,
					},
				],
			},
		]);
	}, []);

	return (
		<>
			<FormControl fullWidth>
				<InputLabel>Vælg elev</InputLabel>
				<Select
					value={SelectedElev}
					onChange={(e) => {
						SetSelectedElev(e.target.value as elev);
					}}
				>
					{Elever?.map((elev) => {
						//@ts-ignore
						return <MenuItem value={elev}>{elev.Navn}</MenuItem>;
					})}
				</Select>
			</FormControl>

			{SelectedElev ? (
				<>
					<h1>Valgt elev: {SelectedElev.Navn}</h1>
					<p>Elevnr: {SelectedElev.Elevnr}</p>
					<h3>Email: {SelectedElev.Email}</h3>

					{SelectedElev.Fag.map((fag, index) => {
						return (
							<>
								<ButtonGroup>
									<Button onClick={() => {}}>-3</Button>
									<Button>00</Button>
									<Button>02</Button>
									<Button>4</Button>
									<Button>7</Button>
									<Button>10</Button>
									<Button>12</Button>
								</ButtonGroup>

								<p>valgt: {fag.karakter}</p>
							</>
						);
					})}
				</>
			) : null}
		</>
	);
};

export default Lærer;
