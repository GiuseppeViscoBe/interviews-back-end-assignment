"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.errorConstants = void 0;
exports.errorConstants = {
    NOT_FOUND: 404,
    VALIDATION_ERROR: 400,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500
};
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["APPROVED"] = "approved";
    PaymentStatus["DECLINED"] = "declined";
    PaymentStatus["ERROR"] = "error";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
