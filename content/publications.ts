/** Citation details checked against Crossref and the supplied Scholar entry. */
export const scholarProfile = "https://scholar.google.com/citations?user=qI-slo4AAAAJ&hl=en";

type Publication = {
  id: string;
  title: string;
  authors: string[];
  date: string;
  journal?: string;
  volume?: string;
  doi?: string;
  href: string;
  summary: string;
};

export const publications: Publication[] = [
  {
    id: "forearm-heat-transfer",
    title: "Numerical study on the effects of blood perfusion and body metabolism on the temperature profile of human forearm in hyperthermia conditions",
    authors: ["Abolfazl Shirkavand", "Hamid Reza Nazif"],
    date: "2019-08",
    journal: "Journal of Thermal Biology",
    volume: "84",
    doi: "10.1016/j.jtherbio.2019.07.023",
    href: "https://www.sciencedirect.com/science/article/abs/pii/S0306456519301172",
    summary: "A three-dimensional forearm model examining how blood flow, metabolism and external heating affect tissue temperature during hyperthermia.",
  },
  {
    id: "composite-cylinder-buckling",
    title: "Orientation and size effect of a rectangle cutout on the buckling of composite cylinders",
    authors: ["Abolfazl Shirkavand", "Fathollah Taheri-Behrooz", "Milad Omidi"],
    date: "2019-04",
    journal: "Aerospace Science and Technology",
    volume: "87",
    doi: "10.1016/j.ast.2019.02.042",
    href: "https://www.sciencedirect.com/science/article/abs/pii/S1270963818310599",
    summary: "Numerical analysis and physical tests examining how a rectangular opening's size and orientation affect the buckling of thin composite cylinders.",
  },
  {
    id: "double-skin-facade-shading",
    title: "The effects of shading on thermal performance of DSF in the hot-arid climate of Iran",
    authors: ["Sepideh Bazari", "Abolfazl Shirkavand"],
    date: "2019-03",
    href: "https://en.civilica.com/doc/878290/",
    summary: "A simulation study of shading blinds in a double-skin facade, examining inner-skin temperatures during hot-weather conditions in Iran.",
  },
];
