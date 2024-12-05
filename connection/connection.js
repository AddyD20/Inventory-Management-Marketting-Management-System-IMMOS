import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app=express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Dairy",
    password: "PassworD",
    port: 5432
});
db.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

