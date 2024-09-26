export interface TaskRequest {
  title: string;
  description: string;
  userId: number;
  status: 'Pending' | 'In Progress' | 'Completed';
}
