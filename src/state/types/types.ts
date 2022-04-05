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