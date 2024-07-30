import { useEffect, useState } from "react";
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	ButtonGroup,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	TextField,
	DialogActions,
	Grid,
} from "@mui/material";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import CloseIcon from "@mui/icons-material/Close";

const Lærer = () => {
	const [Elever, SetElever] = useState<elev[]>();
	const [SelectedElev, SetSelectedElev] = useState<elev>({
		Elevnr: 0,
		Email: "",
		Navn: "",
		Fag: [
			{
				Fag: "",
				id: "",
				karakter: 0,
			},
		],
	});
	const [open, setOpen] = useState<boolean>(false);

	const [NewFag, SetNewFag] = useState<string>("");

	const [Karakterer, SetKarakterer] = useState<number[]>([]);

	const handleClose = () => {
		setOpen(false);
	};

	const OpretFag = () => {
		SetSelectedElev({
			...SelectedElev,
			Fag: [
				...SelectedElev.Fag,
				{
					id: crypto.randomUUID(),
					Fag: NewFag,
					karakter: 0,
				},
			],
		});
		handleClose();
		SetNewFag("");
	};

	useEffect(() => {
		console.log(Karakterer);
	}, [Karakterer]);

	const getData = async () => {
		const data = (await getDoc(doc(db, "data", "yessir"))).data()
			?.data as elev[];

		SetElever(data);
	};

	useEffect(() => {
		getData();
		console.log(SelectedElev);
	}, []);

	useEffect(() => {
		UpdateElever();
		console.log(SelectedElev);
	}, [SelectedElev]);

	const UpdateElever = async () => {
		await SetElever(
			Elever?.map((elev) => {
				if (elev.Elevnr === SelectedElev.Elevnr) {
					return SelectedElev;
				} else {
					return elev;
				}
			})
		);
		await SetKarakterer(
			SelectedElev.Fag.map((e) => {
				return e.karakter as number;
			})
		);
	};

	const handleKarakter = (
		id: string,
		karakter: -3 | 0 | 2 | 4 | 7 | 10 | 12
	) => {
		const temp: Karakter[] = [];

		SelectedElev.Fag.map((fag) => {
			if (fag.id == id) {
				temp.push({
					...fag,
					karakter: karakter,
				});
			} else {
				temp.push(fag);
			}
		});

		SetSelectedElev({
			...SelectedElev,
			Fag: temp,
		});
	};

	const uploadData = async () => {
		await UpdateElever();
		console.log(Elever);
		await setDoc(doc(db, "data", "yessir"), { data: Elever });
		alert("uploaded...");
	};

	const CalcMedian = () => {
		var total: number = 0;
		Karakterer.map((k) => {
			total += k;
		});
		var median = total / Karakterer.length;
		return median;
	};

	const Delete = (id: string) => {
		var nyeFag: Karakter[] = [];

		SelectedElev.Fag.map((fag) => {
			if (fag.id != id) {
				nyeFag.push(fag);
			}
		}),
			SetSelectedElev((prev) => ({
				...prev,
				Fag: [...nyeFag],
			}));
	};

	return (
		<>
			<FormControl fullWidth>
				<InputLabel>Vælg elev</InputLabel>
				<Select
					value={SelectedElev}
					onChange={(e) => {
						UpdateElever();
						SetSelectedElev(e.target.value as elev);
					}}
				>
					{Elever?.map((elev) => {
						//@ts-ignore
						return <MenuItem value={elev}>{elev.Navn}</MenuItem>;
					})}
				</Select>
			</FormControl>

			{SelectedElev.Navn != "" ? (
				<>
					<h1>Valgt elev: {SelectedElev.Navn}</h1>
					<p>Elevnr: {SelectedElev.Elevnr}</p>
					<h3>Email: {SelectedElev.Email}</h3>

					<Button
						onClick={() => {
							setOpen(!open);
						}}
						variant="contained"
					>
						Opret Fag
					</Button>
					<Grid container>
						{SelectedElev.Fag.map((fag) => {
							return (
								<Grid item xs={12} sm={6} md={6} lg={3}>
									<Button
										variant="contained"
										color="error"
										onClick={() => {
											Delete(fag.id);
										}}
									>
										<CloseIcon />
									</Button>
									<h1>{fag.Fag}</h1>

									<ButtonGroup>
										<Button
											onClick={() => {
												handleKarakter(fag.id, -3);
											}}
											variant={
												fag.karakter == -3
													? "contained"
													: "outlined"
											}
										>
											-3
										</Button>
										<Button
											onClick={() => {
												handleKarakter(fag.id, 0);
											}}
											variant={
												fag.karakter == 0
													? "contained"
													: "outlined"
											}
										>
											00
										</Button>
										<Button
											onClick={() => {
												handleKarakter(fag.id, 2);
											}}
											variant={
												fag.karakter == 2
													? "contained"
													: "outlined"
											}
										>
											02
										</Button>
										<Button
											onClick={() => {
												handleKarakter(fag.id, 4);
											}}
											variant={
												fag.karakter == 4
													? "contained"
													: "outlined"
											}
										>
											4
										</Button>
										<Button
											onClick={() => {
												handleKarakter(fag.id, 7);
											}}
											variant={
												fag.karakter == 7
													? "contained"
													: "outlined"
											}
										>
											7
										</Button>
										<Button
											onClick={() => {
												handleKarakter(fag.id, 10);
											}}
											variant={
												fag.karakter == 10
													? "contained"
													: "outlined"
											}
										>
											10
										</Button>
										<Button
											onClick={() => {
												handleKarakter(fag.id, 12);
											}}
											variant={
												fag.karakter == 12
													? "contained"
													: "outlined"
											}
										>
											12
										</Button>
									</ButtonGroup>
									<div style={{ marginTop: "20px" }}></div>
									{/* <p>Valgt: {fag.karakter}</p> */}
								</Grid>
							);
						})}
					</Grid>
				</>
			) : null}

			<p>Laveste karakter: {Karakterer.sort((a, b) => a - b)[0]}</p>
			<p>
				Højeste karakter:{" "}
				{Karakterer.sort((a, b) => a + b)[Karakterer.length - 1]}
			</p>
			<p>Gennemsnit: {CalcMedian()}</p>

			<Button
				variant="contained"
				fullWidth
				onClick={() => {
					uploadData();
				}}
			>
				{" "}
				Gem{" "}
			</Button>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Opret Fag</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Hvad er navnet på faget du vil oprette?
					</DialogContentText>
					<TextField
						autoFocus
						required
						margin="dense"
						label="Navn på fag"
						fullWidth
						variant="standard"
						value={NewFag}
						onChange={(e) => {
							SetNewFag(e.target.value);
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Fortryd</Button>
					<Button onClick={OpretFag}>Opret fag</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default Lærer;
