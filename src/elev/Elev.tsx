import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router";
import { db } from "../firebase";
import { useEffect, useState } from "react";

const Elev = () => {
	const params = useParams();

	const [Elever, SetElever] = useState<elev[]>([]);
	const [Elev, SetElev] = useState<elev>();

	const GetData = async () => {
		console.log("gotten data");
		const data = await getDoc(doc(db, "data", "yessir"));
		await SetElever(data.data()?.data as elev[]);
	};

	useEffect(() => {
		GetData();
	}, []);

	useEffect(() => {
		Elever.map((elev) => {
			if (String(elev.Elevnr) === params.id) {
				SetElev(elev);
			}
		});
	}, [Elever]);

	return (
		<>
			{Elev ? (
				<>
					<div>
						<center>
							<h1>{Elev.Navn}</h1>
							<p>{Elev.Elevnr}</p>
						</center>
					</div>
					{Elev.Fag.map((elev) => {
						return (
							<>
								<h1>
									{elev.Fag}: {elev.karakter}
								</h1>
							</>
						);
					})}
				</>
			) : (
				<p>loading...</p>
			)}
		</>
	);
};

export default Elev;
