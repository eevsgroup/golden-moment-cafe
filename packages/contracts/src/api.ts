
export interface ApiError {
    error: string;
    status: number;
}

export interface ApiResult<T> {
    data: T | null;
    error: string | null;
    status: number;
}
