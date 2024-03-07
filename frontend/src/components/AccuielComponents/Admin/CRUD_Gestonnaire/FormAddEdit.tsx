import React from "react";
import { Gestionnaire } from "../../../../initialStates/UserInitialState";

/** Je pense en tant que admit il n'a pas necessaire de faire des modification sur l'adresse et mail mais je peut faire modification sur
 * matricule password poste bloqué/débloqué etc..
 */
interface dataProps {
  data: Gestionnaire ;
  setData: React.Dispatch<React.SetStateAction<Gestionnaire>>;
  value: string;
}
const FormBloc: React.FC<dataProps> = ({ data, setData }) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  console.log("data: ", data);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setData({
      ...data,
      acces: {
        ...data.acces,
        client: value === "client",
        reclamation: value === "reclamation",
        offre: value === "offre",
      },
    });
  };
  // console.log("data: ", data);

  return (
    <div className="modal-body">
      <div className="form-group">
        <label>Matricule</label>
        <input
          type="text"
          name="matricule_gestionnaire"
          className="form-control"
          required
          maxLength={11}
          onChange={handleInputChange}
          value={data.matricule_gestionnaire}
        />
      </div>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="nom_prenom"
          className="form-control"
          required
          maxLength={30}
          onChange={handleInputChange}
          value={data.nom_prenom}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          required
          onChange={handleInputChange}
          value={data.email}
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="number"
          name="phone"
          className="form-control"
          maxLength={8}
          minLength={8}
          required
          onChange={handleInputChange}
          value={Number(data.phone)}
        ></input>
      </div>
      <div className="form-group">
        <label>Post</label>
        <select
          name="post"
          className="form-control"
          required
          onChange={handleInputChange}
          value={data.post}
        >
          <option value="">Select</option>
          <option value="chef_bureau">Office manager</option>
          <option value="agent">Agent</option>
          <option value="responsable_marketing">Marketing manager</option>
          <option value="responsable_relation_client">
            Customer relations manager
          </option>
        </select>
      </div>
      <div className="form-group">
        <label>Post Office</label>
        <input
          type="number"
          name="bureau_postal"
          className="form-control"
          maxLength={4}
          minLength={4}
          required
          onChange={handleInputChange}
          value={Number(data.bureau_postal)}
        ></input>
      </div>
      <div className="form-group">
        <label>Access limit</label>
        <select
          name="acces"
          className="form-control"
          required
          onChange={handleSelectChange}
        >
          <option value="">Select</option>
          <option value="client">Manage customers</option>
          <option value="reclamation">Manage tickets</option>
          <option value="offre">Manage offers</option>
        </select>
      </div>
    </div>
  );
};
/** CSS Form Add ** Form Edit*/

export default FormBloc;
