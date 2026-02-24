import { eq } from "drizzle-orm";
import * as schema from "../../db/schema";


export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true
  },
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user: {
        login: user.login
      }
    });

    // comprovar si usuari github existeix a la meva base de dades
    if (!user.email) {
      throw createError({
        status: 500,
        statusMessage: "No s'ha proporcionat l'email del teu compte Github"
      })
    }

    const db = useDb();
    let existingUser = await db.query.users.findFirst({
      where: eq(schema.users.email, user.email)
    });

    // si no existeix, creem un registre (insert) a la nostra db
    if (!existingUser) {
      const result = db.insert(schema.users).values({
        email: user.email,
        login: user.login,
        name: user.name
      }).returning()
      //.returning --> ens retorna resultat (?)

      existingUser = (await result).at(0)
    }

    // si arribo fins aquí vol dir que ja és error de Github
    if (!existingUser) {
      throw createError({
        status: 500,
        statusMessage: "Error d'autentificació Github"
      })
    }

    // desestructuro usuari per si de cas em ve amb contrasenya
    const { password, ...userWithoutPswd } = existingUser
    await setUserSession(event, {
      user: {
        login: user.login
      }
    }) //api de Nuxt

    //db.insert(users).values({})
    return sendRedirect(event, '/');
  },

  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  },
})