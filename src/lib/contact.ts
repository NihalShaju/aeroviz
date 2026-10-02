export const CONTACT = {
  companyName: "Aeroviz Adventure Tourism LLC",
  phones: [
    { display: "+971 56 700 3467", tel: "+971567003467", wa: "971567003467" },
    { display: "+971 50 704 2125", tel: "+971507042125", wa: "971507042125" },
  ],
  primaryWa: "971567003467",
  email: "info@aeroviztourism.com",
  website: "aeroviztourism.com",
  websiteUrl: "https://aeroviztourism.com",
  address: "Omer bin dhaher building, Al quasis 2, Dubai, United Arab Emirates",
  shortAddress: "Al Qusais 2, Dubai, UAE",
  instagram: "https://www.instagram.com/aeroviztourism?stkn=amN1YmE5dzVnNGU5",
  team: [
    { name: "Nishad Haneefa", role: "Marketing Manager" },
    { name: "Adhila latheef", role: "Operation Manager" },
  ],
};

export const waLink = (message: string, number = CONTACT.primaryWa) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

