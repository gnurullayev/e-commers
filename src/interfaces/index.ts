export interface IList {
  id: number;
  name: string;
}
export interface ISelect {
  value: string;
  label: string;
}
export interface IBreadcrumbData {
  id: number;
  title: JSX.Element;
  href?: string;
}

export interface ICustomApiError {
  status: number;
  message: string;
}
