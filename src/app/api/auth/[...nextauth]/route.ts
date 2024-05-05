import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
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
        const response: any = await sqlQuery(
          `SELECT * FROM users WHERE email='${credentials?.email}'`
        );

        const user = response[0];

        const passwordCorrect = await compare(
          credentials?.password || "",
          user.password
        );

        console.log({ passwordCorrect });

        if (passwordCorrect) {
          return {
            id: user.id,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
