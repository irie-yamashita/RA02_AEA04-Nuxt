import jwt from 'jsonwebtoken';

// comprovo login de dues maneres: amb sessió de Nuxt o amb JWT
export default defineNuxtRouteMiddleware(() => {
    const { loggedIn } = useUserSession();

    // comprovo si hi ha secció activa de Nuxt
    if (loggedIn.value) return;


    // si no hi ha sessió, comprovo el JWT
    const token = useCookie('token').value;
    const jwtSecret = process.env.JWT_SECRET || 'secret_development';


    if (token) {
        try {
            jwt.verify(token, jwtSecret);
            return;
        } catch (e) {
            new Error('Token no vàlid')
        }
    }

    // si no hi ha sessió ni JWT vàlid, redirigeixo a login
    return navigateTo('/login');
})