import { eq } from "drizzle-orm"
import * as schema from '../../db/schema'
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: "Falten camps per introduir" })
  }

  const existingUser = await useDb().query.users.findFirst({
    where: eq(schema.users.email, email)
  })

  // 1. Validacions primeres
  if (!existingUser) {
    throw createError({ statusCode: 400, statusMessage: "L'usuari no existeix" })
  }

  if (!existingUser.password) {
    throw createError({ statusCode: 400, statusMessage: "Contrasenya no vàlida (Github login?)" })
  }

  const isValid = await verifyPassword(existingUser.password, password)
  if (!isValid) {
    throw createError({ statusCode: 400, statusMessage: "Contrasenya incorrecta" })
  }

  // 2. Si tot és correcte, generem el JWT
  const jwtSecret = process.env.JWT_SECRET || 'secret_development';
  const token = jwt.sign(
    { id: existingUser.id, email: existingUser.email },
    jwtSecret,
    { expiresIn: '24h' }
  );

  // 3. Mantenim la cookie (per al front de Nuxt vell)
  setCookie(event, 'pokemon-token', token, { 
    httpOnly: true, // Segueix sent invisible per a JS
    path: '/',
    sameSite: 'lax' 
  });

  // 4. Preparem la sessió de Nuxt Auth Utils
  const { password: _, ...userWithoutPassword } = existingUser
  await setUserSession(event, { user: userWithoutPassword })

  // 5. RETORNEM EL TOKEN AL JSON (Clau per a Quasar!)
  return {
    user: userWithoutPassword,
    token: token // <--- Ara Quasar sí que el veurà
  }
});