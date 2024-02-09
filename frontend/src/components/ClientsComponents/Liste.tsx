import React, { useState, useEffect } from "react";

interface Client {
  id: number;
  nom: string;
  email: string;
  num_tel: number;
  adresse: string;
}

export const Liste: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  // const [derPage] = useState<number>(10);
  // const nextPage = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
  //   setPage(pageNumber);
  // };
  //   const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     setPerPage(parseInt(e.target.value));
  // };

  const fetchClients = async () => {
    try {
      const response = await fetch(`http://localhost:3000/clients`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          "Une erreur s'est produite lors de l'affichage des clients (fetch_clients)."
        );
      }
      console.log("response: ", response);
      const data = await response.json();
      setClients(data.result);
      console.log("data clients: ", data.result);
      console.log("Succès !");
    } catch (error) {
      console.error("Erreur lors de la récupération des clients:", error);
    }
    console.log(clients);
  };

  useEffect(() => {
    fetchClients();
  },[] );
  return (
    <>
      <div>
        <h4>Clients</h4>
        <ul>
           {clients.map((client) => (
            <li key={client.id}>
              {client.nom} :: email: {client.email} - téléphone:{" "}
              {client.num_tel} - adresse: {client.adresse}
            </li>
          ))}
        
        </ul>
      </div>
    </>
  );
};
