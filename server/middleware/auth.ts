import jwt from 'jsonwebtoken';

// middleware per protegir rutes de la API

export default defineEventHandler(async (event) => {
  const jwtSecret = process.env.JWT_SECRET || 'secret_development';
  let user = null;

  // 1. INTENT PER SESSIÓ (Nuxt Auth Utils / Cookies)
  try {
    const session = await getUserSession(event);
    if (session && session.user) {
      user = session.user;
    }
  } catch (e) {
    // La sessió no existeix o ha caducat, no fem res i provarem amb JWT
    console.warn("Avís: No s'ha trobat una sessió de Nuxt activa.");
  }

  // 2. INTENT PER JWT (Quasar o altres clients API)
  // Si encara no tenim usuari per sessió, mirem si ve un Token al Header
  if (!user) {
    const authHeader = getHeader(event, 'authorization');
    console.log('Header rebut:', authHeader);
    
    const token = authHeader?.startsWith('Bearer ') 
      ? authHeader.split(' ')[1] 
      : getCookie(event, 'pokemon-token');

    if (token) {
      try {
        // Verifiquem el token amb la nostra clau secreta
        const decoded = jwt.verify(token, jwtSecret);
        user = decoded;
      } catch (e: any) {
        // Gestionem els errors específics de JWT en català
        if (e.name === "TokenExpiredError") {
          console.error("Error: El token de seguretat ha caducat.");
        } else if (e.name === "JsonWebTokenError") {
          console.error("Error: El token és invàlid o ha estat manipulat.");
        } else {
          console.error("Error d'autenticació JWT:", e.message);
        }
        
        // Si el token és dolent, ens assegurem que lusuari sigui nul
        user = null;
      }
    }
  }

  // 3. INJECTEM L'USUARI AL CONTEXT (ho recupero si és necessari al endpoint que vulgui)
  event.context.user = user;
});