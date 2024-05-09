// ERROR in src/initialStates/UserInitialState.tsx:69:40
// TS2304: Cannot find name 'Gestionnaire'.
export type Gestionnaire = {
  matricule_gestionnaire: string;
  id_user: number;
  nom_prenom: string;
  post: string;
  bureau_postal: number;
  acces: {
    client: boolean;
    reclamation: boolean;
    offre: boolean;
  };
  info_sup: {};
};
//result select
// ERROR in src/components/AccuielComponents/Tableau.tsx:7:10
// TS2305: Module '"../../initialStates/UserInitialState"' has no exported member 'User'.
export type User = {
  id_user: number;
  nom: string;
  user_name: string;

  email: string;
  phone: string;

  adresse: string;
  password: string;
  status: number;
};
//ERROR in src/components/AccuielComponents/Admin/CRUD_Gestonnaire/Gestionnaire.tsx:6:3
// TS2305: Module '"../../../../initialStates/UserInitialState"' has no exported member 'Data'.
export type Data = {
  user: any;
  ges: Gestionnaire;
};
// data gestionnaire recuperer du frontend
//ERROR in src/components/AccuielComponents/Admin/CRUD_Gestonnaire/FormEdit.tsx:5:16
// TS2305: Module '"../../../../initialStates/UserInitialState"' has no exported member 'GesDataSend'.
export type GesDataSend = {
  matricule_gestionnaire: string;
  id_user: number | undefined;
  nom_prenom: string;
  email: string;
  phone: string;
  post: string;
  bureau_postal: number;
  acces: {
    client: boolean;
    reclamation: boolean;
    offre: boolean;
  };
};

//data client recuperer du frontend
//ERROR in src/Pages/Connexion.tsx:3:10
//TS2305: Module '"../initialStates/UserInitialState"' has no exported member 'ClientType'.
export type ClientType = {
  civil: string;
  nom_prenom: string;
  brith_lieu: string;
  brith_date: string;
  PI_type: string;
  PI_num: string;
  email: string;
  telephone: string;
  password: string;
};
//ERROR in src/components/AccuielComponents/Admin/CRUD_Gestonnaire/FormAdd.tsx:4:3
//TS2305: Module '"../../../../initialStates/UserInitialState"' has no exported member 'initialStateGestionnaire'.
export const initialStateGestionnaire: Gestionnaire = {
  matricule_gestionnaire: "",
  nom_prenom: "",
  id_user: 0,
  post: "",
  bureau_postal: 1000,
  acces: {
    client: false,
    reclamation: false,
    offre: false,
  },
  info_sup: {},
};

// type Action =
//   | { type: "UPDATE_FIELD"; field: string; value: string }
//   | { type: "MODIFIER_IMBRIQUE"; parent: string; child: string; value: string }
//   | { type: "ADD_ITEM"; section: string; value: any };

// export default function userDataReducer(state: any, action: Action) {
//   console.log(action);

//   switch (action.type) {
//     case "UPDATE_FIELD":
//       return {
//         ...state,
//         [action.field]: action.value,
//       };
//     case "MODIFIER_IMBRIQUE":
//       return {
//         ...state,
//         [action.parent]: {
//           ...state[action.parent],
//           [action.child]: action.value,
//         },
//       };
//     case "ADD_ITEM":
//       console.log([action.section]);
//       return {
//         ...state,
//         [action.section]: [...state[action.section], action.value],
//       };

//     default:
//       return state;
//   }
// }
