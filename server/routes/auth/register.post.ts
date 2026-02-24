import { throwIfUserExists } from "~~/server/utils/registerUtils";


export default defineEventHandler(async (event) => {
    //1) Accedeixo als camps del formularinew 
    const { name, email, password } = await readBody(event);

    //2) Comprovo que estiguin tots els camps
    if (!name || !email || !password) {
        // Si no estan tots --> error
        throw createError({ statusCode: 400, statusMessage: 'Falten camp per introduir :(' })

    }

    // 3) Estan totes les dades. Comprovo si usuari existeix --> faig consulta
    // (si existeix salta error )
    await throwIfUserExists(email);

    // 4) Creo un usuari
    const newUser = await registerUser(name, email, password);

    //5) Desestructurem i creem la sessió (?)
    const {password: repassword, ...userWithoutPassword} = newUser

    await setUserSession(event, {user: userWithoutPassword})

    return userWithoutPassword;
});
