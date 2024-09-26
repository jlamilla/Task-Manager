export interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  roleId: number;
  createDate: Date;
  createBy: string;
  updateDate?: Date;
  updateBy?: string;
}
