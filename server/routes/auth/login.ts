import { eq } from "drizzle-orm"
import * as schema from '../../db/schema'
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  //1. Accedeixo als camps del formulari

  const { name, email, password } = await readBody(event)

  //2 Comprovar que estiguin tots els camps
  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: "Falten camps per introduir" })
  }

  const existingUser = await useDb().query.users.findFirst({
    where: eq(schema.users.email, email)
  })

  // genero el JWT
  const jwtSecret = process.env.JWT_SECRET;
  const token = jwt.sign(
    { id: existingUser?.id, email: existingUser?.email, login: existingUser?.login },
    jwtSecret || '',
    { expiresIn: '1h' }
  );

  // envio token a la cookie
  setCookie(event, 'token', token, { httpOnly: true, path: '/' });


  if (!existingUser) {
    throw createError({ statusCode: 400, statusMessage: "Usuari no existeix" })
  }

  if (!existingUser.password) {
    throw createError({ statusCode: 400, statusMessage: "Invalid password Github" })
  }

  const isValid = await verifyPassword(existingUser.password, password)

  if (!isValid) {
    throw createError({ statusCode: 400, statusMessage: "Incorrect password" })
  }

  const { password: repassword, ...userWhithoutPassword } = existingUser

  await setUserSession(event, {
    user: userWhithoutPassword
  })

  return userWhithoutPassword

});


