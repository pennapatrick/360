import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const { email, password } = loginSchema.parse(credentials)

          const user = await prisma.user.findUnique({
            where: { email }
          })

          if (!user) {
            return null
          }

          const isValidPassword = await bcrypt.compare(password, user.password)
          
          if (!isValidPassword) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch {
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).id = token.sub!
        ;(session.user as any).role = token.role
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Se for logout ou redirecionamento para login, permite
      if (url.includes('/auth/login') || url.includes('signout')) {
        return url
      }
      
      // Redireciona para /events após login bem-sucedido (apenas da página inicial)
      if (url === baseUrl) {
        return baseUrl + '/events'
      }
      
      // Permite redirecionamentos para URLs dentro do domínio
      if (url.startsWith(baseUrl)) {
        return url
      }
      
      // Para URLs externas, redireciona para /events
      return baseUrl + '/events'
    },
  },
  pages: {
    signIn: '/auth/login',
  },
}
