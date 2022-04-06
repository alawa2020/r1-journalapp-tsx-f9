export interface Note {
  id: string;
  title: string;
  description: string;
  date: number;
  imgUrl: string;
}

export interface UploadedNote {
  title: string;
  description: string;
  date: number;
  imgUrl: string;
}