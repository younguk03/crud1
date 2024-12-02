import NextAuth from "next-auth"
import github from "next-auth/providers/github"
import google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
   providers: [google, github],
   pages: {
      signIn: '/login'
   },
   callbacks: {
      async signIn({ user, account }) {
         if (account?.provider === 'google' || account?.provider === 'github') {
            try {
               const apiUrl = process.env.API_URL || ''
               const res = await fetch(`${apiUrl}/api/user-auth`, {
                  method: 'POST',
                  headers: {
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ user, account }),
               })
               if (res.ok) {
                  return true
               }
               return false
               // await connectMongoDB()
               // const userExists = await User.findOne({ email })
               // if (!userExists) {
               //    const res = await fetch(`${apiUrl}/api/user`, {
               //       method: 'POST',
               //       headers: {
               //          'Content-Type': 'application/json',
               //       },
               //       body: JSON.stringify({ name, email }),
               //    })
               //    if (res.ok) {
               //       return true
               //    }
               // }
               // const res1 = await fetch(`${apiUrl}/api/log`, {
               //    method: 'POST',
               //    headers: {
               //       'Content-Type': 'application/json',
               //    },
               //    body: JSON.stringify({ email }),
               // })
               // if (res1.ok) {
               //    return true
               // }
            }
            catch (error) {
               console.log(error)
               return false
            }
         }
         return true
      },
   },
})