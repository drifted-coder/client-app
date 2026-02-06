export interface User {
  _id: string;
  email: string;
  role: 'admin' | 'agent' | 'user';
  active: boolean;
}
