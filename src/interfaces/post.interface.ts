import { RowDataPacket } from "mysql2";

export interface Post extends RowDataPacket {
    id?: number;
    name: string;
    salary: string;
}