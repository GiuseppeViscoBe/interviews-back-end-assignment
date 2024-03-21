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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let connection = null;
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    if (connection) {
        return connection;
    }
    try {
        const newConnection = yield mongoose_1.default.connect(process.env.CONNECTION_STRING);
        connection = newConnection.connection;
        console.log("Database connected: ", connection.host, connection.name);
        return connection;
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
exports.default = connectDb;
