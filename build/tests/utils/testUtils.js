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
exports.teardownTestDatabase = exports.setupTestDatabase = void 0;
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
let mongoServer;
function setupTestDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        yield mongoose_1.default.connect(mongoUri);
    });
}
exports.setupTestDatabase = setupTestDatabase;
function teardownTestDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoServer.stop();
    });
}
exports.teardownTestDatabase = teardownTestDatabase;
