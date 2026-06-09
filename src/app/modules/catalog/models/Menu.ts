export interface Menu {
  id: number;
  name: string;
  branch_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

export interface MenuDTO {
  name: string;
  branch_id: number;
}