class apiResponse{
    constructor(statusCode, data, message="Success"){
        this.statusCode=statusCode,
        this.data=data,
        this.message=message,
        this.success=statusCode < 400
    }
}
class apiQuueryResponse{
    constructor(statusCode, page = 1, pageSize = 10, totalItems = 0, totalPages = 0, data, message="Success"){
        this.statusCode=statusCode,
        this.page=page,
        this.pageSize=pageSize,
        this.totalItems=totalItems,
        this.totalPages=totalPages,
        this.data=data,
        this.message=message,
        this.success=statusCode < 400
    }
}



export { apiResponse, apiQuueryResponse }