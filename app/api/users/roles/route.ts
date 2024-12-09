// import { NextApiRequest, NextApiResponse } from 'next'
// import {prisma} from '@/lib/prisma' // Assurez-vous que Prisma est bien configuré

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { userId } = req.query 
  
//   if (!userId || typeof userId !== 'string') {
//     return res.status(400).json({ error: 'Invalid user ID' })
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: userId },

//       // Assurez-vous que `roles` est une relation correcte
//     })

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' })
//     }

//     res.status(200).json({ roles: user.role })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: 'Internal server error' })
//   }
// }
