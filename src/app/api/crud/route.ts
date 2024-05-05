"use server";

import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export const POST = async (req: Request) => {
  const body = await req.json();
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
  const checkUserRole = async () => {
    const session = await getServerSession();
    const user = session?.user;
    const email = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    if (!user) {
      return false;
    } else if (user.email === email) {
      return true;
    }
    return false;
  };

  const isUserAdmin = await checkUserRole();
  // console.log(`Is user admin?: ${isUserAdmin}`);

  if (body.action == "fetch") {
    const handler = async () => {
      try {
        const result = await sqlQuery("SELECT * FROM siswa");
        return result;
      } catch (err) {
        return {
          status: 500,
          message: err,
        };
      }
    };

    const data = await handler();
    return NextResponse.json(data);
  } else if (body.action == "read") {
    if (!body.id) {
      return NextResponse.json({
        status: 500,
        message: "Please provide an ID",
      });
    }
    const handler = async () => {
      try {
        const result = await sqlQuery(
          `SELECT * FROM siswa WHERE nis = ${body.id}`
        );
        return result;
      } catch (err) {
        return {
          status: 500,
          message: err,
        };
      }
    };

    const data = await handler();
    return NextResponse.json(data);
  } else if (body.action == "search") {
    if (!body.query) {
      return NextResponse.json({
        status: 500,
        message: "Please provide a query",
      });
    }
    const handler = async () => {
      try {
        const result = await sqlQuery(
          `SELECT * FROM siswa WHERE nama LIKE '%${body.query}%';`
        );
        return result;
      } catch (err) {
        return {
          status: 500,
          message: err,
        };
      }
    };

    const data = await handler();
    if ((data as any[]).length > 0) {
      return NextResponse.json(data);
    }

    return NextResponse.json({ status: "404", message: "Records not found" });
  }

  // RESTRICTED TO ADMINISTRATOR ONLY
  if (body.action == "insert" && isUserAdmin) {
    const handler = async () => {
      try {
        const result = await sqlQuery(
          `INSERT INTO siswa (nama, kelas, hobi) VALUES ('${body.nama}', '${body.kelas}', '${body.hobi}')`
        );
        return {
          status: 200,
          data: result,
        };
      } catch (err) {
        return {
          status: 500,
          message: err,
        };
      }
    };

    const data = await handler();
    return NextResponse.json(data);
  } else if (body.action == "update" && isUserAdmin) {
    if (!body.id) {
      return NextResponse.json({
        status: 500,
        message: "Please provide an ID",
      });
    }
    const handler = async () => {
      try {
        const result = await sqlQuery(
          `UPDATE siswa SET nama = '${body.nama}', kelas = '${body.kelas}', hobi = '${body.hobi}' WHERE nis = ${body.id}`
        );
        return {
          status: 200,
          data: result,
        };
      } catch (err) {
        return {
          status: 500,
          message: err,
        };
      }
    };
    const data = await handler();
    return NextResponse.json(data);
  } else if (body.action == "delete" && isUserAdmin) {
    if (!body.id) {
      return NextResponse.json({
        status: 500,
        message: "Please provide an ID",
      });
    }
    const handler = async () => {
      try {
        const result = await sqlQuery(
          `DELETE FROM siswa WHERE nis = ${body.id}`
        );
        return {
          status: 200,
          data: result,
        };
      } catch (err) {
        return {
          status: 500,
          message: err,
        };
      }
    };
    const data = await handler();
    return NextResponse.json(data);
  } else if (
    (body.action == "insert" && !isUserAdmin) ||
    (body.action == "update" && !isUserAdmin) ||
    (body.action == "delete" && !isUserAdmin)
  ) {
    return NextResponse.json({
      status: 403,
      message: "You are not authorized to perform this action",
    });
  }
};

export const GET = async () => {
  redirect("/404");
};
