"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHandler = void 0;
const paginationHandler = (model) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skipIndex = (page - 1) * limit;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = {
            products: [],
        };
        if (endIndex < (yield model.countDocuments().exec())) {
            result.next = {
                page: page + 1,
                limit: limit,
            };
        }
        if (startIndex > 0) {
            result.previous = {
                page: page - 1,
                limit: limit,
            };
        }
        try {
            result.products = yield model.find().limit(limit).skip(skipIndex);
            res.results = result;
            next();
        }
        catch (e) {
            next(e);
        }
    });
};
exports.paginationHandler = paginationHandler;
exports.default = exports.paginationHandler;
