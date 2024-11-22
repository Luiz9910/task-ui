export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'P' | 'C' | 'A';
  createdDate: string;
  limitDate: string | null; 
  userId: number;
}
