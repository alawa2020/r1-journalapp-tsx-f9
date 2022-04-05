export type AuthAction = 
  | { 
      type: '[AUTH] sign in'; 
      payload: {
        uid: string; 
        userName: string 
      } 
    }
  | { 
      type: '[AUTH] sign out' 
    }

export type NotesAction =
    | { type: '[Notes] something'}