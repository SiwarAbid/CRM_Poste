import React from "react";
/** Je pense en tant que admit il n'a pas necessaire de faire des modification sur l'adresse et mail mais je peut faire modification sur
 * matricule password poste bloqué/débloqué etc..
 */
const FormBloc = () => {
  return (
    <div className="modal-body">
      <div className="form-group">
        <label>Name</label>
        <input type="text" className="form-control" required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" className="form-control" required />
      </div>
      <div className="form-group">
        <label>Address</label>
        <textarea className="form-control" required></textarea>
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input type="text" className="form-control" required />
      </div>
    </div>
  );
};
/** CSS Form Add ** Form Edit*/

export default FormBloc;
