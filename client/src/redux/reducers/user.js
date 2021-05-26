import { produce } from "immer";
import { initialUserData } from "../api/user";

function user(state = initialUserData, action) {
  return produce(state, (draft) => {
    const type = action.type;
    switch (type) {
      case "sign-in":
        draft.username = action.payload.username;
        draft.created_at = action.payload.created_at;
        draft.id = action.payload.id;
        break;
      case "sign-up":
        draft.username = action.payload.username;
        draft.created_at = action.payload.created_at;
        draft.id = action.payload.id;
        break;
      case "verify":
        draft.username = action.payload.username;
        draft.created_at = action.payload.created_at;
        draft.id = action.payload.id;
        break;

      default:
        return draft;
    }
  });
}

export default user;
