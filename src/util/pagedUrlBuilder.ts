export const pagedUrlBuilder = <T>(sortBy: keyof T, page: number = 1, pageSize: number = 20, sortOrder: "ASC" | "DESC") => {
    let  order = sortOrder === "ASC" ? "" : "-";
   return  `?sortBy=${order}${sortBy.toString()}&pageSize=${pageSize}&page=${page}`;
}


type SortOrder = "ASC" | "DESC";
export class PagedUrlBuilder<T> {

    page:number;
    pageSize:number
    sortBy: keyof T;
    sortOrder: SortOrder;

    constructor(sortBy: keyof T, sortOrder: SortOrder, page: number = 1, pageSize: number = 20) {
        this.sortBy = sortBy;
        this.sortOrder = sortOrder;
        this.pageSize = pageSize;
        this.page = page;
    }


    getUrl(page: number, pageSize: number) {

        let  order = this.sortOrder === "ASC" ? "" : "-";
        return  `?sortBy=${order}${this.sortBy.toString()}&pageSize=${pageSize}&page=${page}`;
    }

    setUrl() {

    }
}