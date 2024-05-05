import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  const mysql = require("mysql");
  const con = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });
  const sqlQuery = (query: string) => {
    return new Promise((resolve, reject) => {
      con.connect(function (err: any) {
        if (err) reject(err);
        con.query(query, function (err: any, result: any) {
          if (err) reject(err);
          resolve(result);
        });
      });
    });
  };

  try {
    const { email, password } = await request.json();
    // validation for email and password
    console.log({ email, password });

    const hashedPassword = await hash(password, 10);

    const res = await sqlQuery(
      `INSERT INTO users (email, password) VALUES ('${email}', '${hashedPassword}')`
    );
  } catch (e) {
    console.log(e);
  }

  return NextResponse.json({
    status: "200",
    message: "success",
  });
}
