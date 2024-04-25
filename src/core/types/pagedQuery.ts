export interface IPagedQuery <T>{
    page: number;
    pageSize: number;
    sortBy: keyof T;
    sortOrder: "ASC" | "DESC";
}