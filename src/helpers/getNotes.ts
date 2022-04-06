import { getDocs, query, collection, orderBy } from 'firebase/firestore';

import { db } from '../firebase/config';
import { Note } from '../interfaces/interfaces';


export const getNotes = async( uid: string ) => {
  try {
    const collectionRef = collection( db, `/${ uid }/journal/notes`);
    const q = query( collectionRef, orderBy('date', 'desc'));
    let notes: Note[] = [];
    const snapShot = await getDocs( q );
    snapShot.forEach( snap => {
      notes.push({
        id: snap.id,
        ...snap.data(),
      } as Note)
    });
    return notes;
  } catch (err) {
    console.log(err)
  }
}