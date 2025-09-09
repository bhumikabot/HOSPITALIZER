// 100 sample hospitals for Rajasthan
const hospitals = [
  { name: "SMS Hospital", type: "Government", address: "Jaipur", website: "https://www.smshospitaljaipur.com", helpline: "0141-2560291", timings: "24 Hours", status: "Open", location: "26.9124,75.7873" },
  { name: "Fortis Escorts", type: "Private", address: "Jaipur", website: "https://www.fortishealthcare.com", helpline: "0141-2547000", timings: "24 Hours", status: "Open", location: "26.8854,75.7897" },
  { name: "Mahatma Gandhi Hospital", type: "Private", address: "Jaipur", website: "https://www.mgmch.org", helpline: "0141-2771771", timings: "24 Hours", status: "Open", location: "26.8467,75.8156" },
  { name: "J.K. Lon Hospital", type: "Government", address: "Jaipur", website: "https://www.jklonhospital.com", helpline: "0141-2560291", timings: "24 Hours", status: "Open", location: "26.9124,75.7873" },
  { name: "Apollo Spectra", type: "Private", address: "Jaipur", website: "https://www.apollospectra.com", helpline: "0141-4111000", timings: "8 AM - 8 PM", status: "Open", location: "26.9124,75.7873" },
  { name: "Rajasthan Hospital", type: "Private", address: "Ahmedabad", website: "https://www.rajasthanhospital.org", helpline: "079-22868686", timings: "24 Hours", status: "Open", location: "23.0225,72.5714" },
  { name: "Geetanjali Hospital", type: "Private", address: "Udaipur", website: "https://www.geetanjalihospital.co.in", helpline: "0294-3050000", timings: "24 Hours", status: "Open", location: "24.5854,73.7125" },
  { name: "Pacific Medical College", type: "Private", address: "Udaipur", website: "https://www.pacificmedicalcollege.com", helpline: "0294-3920000", timings: "24 Hours", status: "Open", location: "24.5854,73.7125" },
  { name: "Sardar Patel Medical College", type: "Government", address: "Bikaner", website: "https://www.spmedicalcollegebikaner.com", helpline: "0151-2541010", timings: "24 Hours", status: "Open", location: "28.0229,73.3119" },
  { name: "Medipulse Hospital", type: "Private", address: "Jodhpur", website: "https://www.medipulse.in", helpline: "0291-6669999", timings: "24 Hours", status: "Open", location: "26.2389,73.0243" },
  // ...existing code...
];
for(let i=11;i<=100;i++){
  hospitals.push({
    name: `Rajasthan Hospital #${i}`,
    type: i%2===0 ? "Private" : "Government",
    address: ["Jaipur","Jodhpur","Udaipur","Bikaner","Kota","Ajmer","Alwar","Bharatpur","Sikar","Pali"][i%10],
    website: "https://www.rajasthanhospital.org",
    helpline: `0141-25${60000+i}`,
    timings: i%3===0 ? "8 AM - 8 PM" : "24 Hours",
    status: i%5===0 ? "Closed" : "Open",
    location: `${26.9+i*0.01},${75.7+i*0.01}`
  });
}

module.exports = { hospitals };
