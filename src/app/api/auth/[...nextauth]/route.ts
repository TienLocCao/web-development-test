import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "@/lib/prisma";

const handler = NextAuth({
//   adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async session({ session, user }) {
//       // Gắn thêm id từ DB vào session
//       if (session.user) {
//         session.user.id = user.id;
//       }
//       return session;
//     },
//   },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // nếu login bằng popup thì redirect về popup callback
      // if (url.includes('/popup')) {
      //   return `${baseUrl}/auth/callback-popup`;
      // }
      // return baseUrl;
      if (url.includes('/auth/popup-callback')) {
        return url; // giữ nguyên để xử lý postMessage
      }
      return baseUrl;
    },
  }
});

export { handler as GET, handler as POST };

