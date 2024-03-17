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
export type User = {
  id_user: number;
  nom_prenom: string;
  user_name: string;
  contact: {
    email: string;
    telephone: string;
  };
  adresse: {
    rue: string;
    pays: string;
    ville: string;
    code_postal: string;
  };
  password: string;
  status: number;
};
export type Data = {
  user: User;
  ges: Gestionnaire;
};
// data gestionnaire recuperer du frontend
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

type Action =
  | { type: "UPDATE_FIELD"; field: string; value: string }
  | { type: "MODIFIER_IMBRIQUE"; parent: string; child: string; value: string }
  | { type: "ADD_ITEM"; section: string; value: any };

export default function userDataReducer(state: any, action: Action) {
  console.log(action);

  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "MODIFIER_IMBRIQUE":
      return {
        ...state,
        [action.parent]: {
          ...state[action.parent],
          [action.child]: action.value,
        },
      };
    case "ADD_ITEM":
      console.log([action.section]);
      return {
        ...state,
        [action.section]: [...state[action.section], action.value],
      };

    default:
      return state;
  }
}
