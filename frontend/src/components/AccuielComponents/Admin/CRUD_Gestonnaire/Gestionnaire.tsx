import React, { useEffect, useState } from "react";
import TableauEmployes from "../../Tableau";
import {
  User,
  Gestionnaire,
  Data,
} from "../../../../initialStates/UserInitialState";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormAdd from "./FormAdd";
import FormDelete from "../../FormDelete";
import FormEdit from "./FormEdit";

function GestionnaireSection() {
  const [gestionnaireArray, setGestionnaireArray] = useState<Gestionnaire[]>(
    []
  );
  const [userArray, setUserArray] = useState<User[]>([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);
  const [showEdit, setShowformEdit] = useState<boolean>(false);
  const [data, setData] = useState<Data>({
    user: {
      id_user: 0,
      nom: "",
      user_name: "",
      email: "",
      phone: "",
      adresse: "",
      password: "",
      status: 0,
    },
    ges: {
      matricule_gestionnaire: "",
      id_user: 0,
      nom_prenom: "",
      post: "",
      bureau_postal: 0,
      acces: {
        client: false,
        reclamation: false,
        offre: false,
      },
      info_sup: {},
    },
  });
  const [showOneDel, setShowformOneDelete] = useState<boolean>(false);
  const [id, setId] = useState<number[]>([]);
  // const [showDel, setShowformDelete] = useState<boolean>(false);
  // const [showAdd, setShowformAdd] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [showAdd, setShowAdd] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/gestionnaires${selectedFilter}`
        );
        console.log("response", response);
        if (response.ok) {
          const data = await response.json();
          let dataArray = Array.from(data.user);
          console.log("data: ", data);
          setUserArray(dataArray as User[]);
          dataArray = Array.from(data.gestionnaire);
          setGestionnaireArray(dataArray as Gestionnaire[]);
        } else {
          throw new Error("Erreur lors de la récupération des données");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [data, selectedFilter]);
  const handleCheckboxChange = (id: number) => {
    const updatedCheckboxes = selectedCheckboxes.includes(id)
      ? selectedCheckboxes.filter((checkboxId) => checkboxId !== id)
      : [...selectedCheckboxes, id];
    setSelectedCheckboxes(updatedCheckboxes);
  };
  const listeGestionnaire = () => {
    return userArray.map((user, index) => {
      const gestionnairesAssocies = gestionnaireArray.filter(
        (ges) => ges.id_user === user.id_user
      );
      return (
        <tr key={index}>
          {/*<td>
             <span className="custom-checkbox">
              <input
                type="checkbox"
                id={`checkbox${index}`}
                name="options[]"
                value={user.id_user}
                checked={selectedCheckboxes.includes(user.id_user)}
                onChange={() => handleCheckboxChange(user.id_user)}
              />
              <label htmlFor={`checkbox${index}`}></label>
            </span>
          </td> */}
          <td>{user.nom}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          {gestionnaireArray
            .filter((ges) => ges.id_user === user.id_user)
            .map((ges, i) => (
              <React.Fragment key={i}>
                <td>{ges.post}</td>
                <td>{ges.bureau_postal}</td>
              </React.Fragment>
            ))}

          <td>
            <button className="edit" data-toggle="modal">
              <i
                className="material-icons"
                data-toggle="tooltip"
                title="Edit"
                onClick={() => {
                  setShowformEdit(true);
                  setData({
                    user: user,
                    ges: gestionnairesAssocies[0],
                  });
                }}
              >
                <ModeEditIcon />
              </i>
            </button>
            <button className="delete" data-toggle="modal">
              <i
                className="material-icons"
                data-toggle="tooltip"
                title="Delete"
                onClick={() => {
                  setShowformOneDelete(true);
                  setId([user.id_user]);
                }}
              >
                <DeleteIcon />
              </i>
            </button>
          </td>
        </tr>
      );
    });
  };
  return (
    <div>
      <TableauEmployes
        nameTable="Employee"
        listAtt={["Post", "Post Office", "Actions"]}
        liste={listeGestionnaire}
        showAdd={{ open: showAdd, setOpen: setShowAdd }}
        FormAdd={<FormAdd elements={{ open: true, setOpen: setShowAdd }} />}
      />
      {showEdit ? (
        <FormEdit
          gestionnaire={data}
          elements={{ open: true, setOpen: setShowformEdit }}
        />
      ) : showOneDel ? (
        <FormDelete
          ids={id}
          elements={{ open: true, setOpen: setShowformOneDelete }}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default GestionnaireSection;
