type elev = {
	Elevnr: number;
	Navn: string;
	Email: string;

	Fag: Karakter[];
};

type Karakter = {
	Fag: string;
	karakter: -3 | 0 | 2 | 4 | 7 | 10 | 12;
};
