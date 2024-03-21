"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const products_1 = __importDefault(require("./routes/products"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
dotenv_1.default.config();
(0, dbConnection_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use("/api/products", products_1.default);
app.get("/", (req, res) => {
    res.send("HELLO INIT!!!");
});
app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
