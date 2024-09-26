export interface Role {
  id: number;
  roleName: string;
  createDate: Date;
  createBy: string;
  updateDate?: Date;
  updateBy?: string;
}
