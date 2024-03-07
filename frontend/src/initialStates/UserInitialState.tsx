export type Gestionnaire = {
  matricule_gestionnaire: string;
  nom_prenom: string;
  email: string;
  phone: number | null;
  post: string;
  bureau_postal: number;
  acces: {
    client: boolean;
    reclamation: boolean;
    offre: boolean;
  };
  info_sup: {};
};

export const initialStateGestionnaire: Gestionnaire = {
  matricule_gestionnaire: "",
  nom_prenom: "",
  email: "",
  phone: null,
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
