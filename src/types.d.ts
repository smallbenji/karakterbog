type elev = {
	Elevnr: number;
	Navn: string;
	Email: string;

	Fag: Karakter[];
};

type Karakter = {
	id: string;
	Fag: string;
	karakter: -3 | 0 | 2 | 4 | 7 | 10 | 12;
};

type DataIncoming = {
	data: elev[];
};
