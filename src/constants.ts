export const errorConstants = {
    NOT_FOUND: 404,
    VALIDATION_ERROR: 400,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500
};

export enum PaymentStatus {
    APPROVED = 'approved',
    DECLINED = 'declined',
    ERROR = 'error'
  } 