export type IUser = {
  id: string;
  name: string;
  middle_name: string;
  last_name: string;
  picture: string;
  token: string;
  error: string;
  message: string;
};

export interface ICustomError {
  id: string;
  error: string;
  message: string;
}

export type PathType = "auth";
