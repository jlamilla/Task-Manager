export interface Task {
  id: string;
  title: string;
  description: string;
  userId: number;
  createDate: Date;
  createBy: string;
  updateDate?: Date;
  updateBy?: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}
