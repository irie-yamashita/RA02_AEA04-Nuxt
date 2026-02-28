# RA02_AEA04 - Nuxt Pokémons

Aplicació web per gestionar una col·lecció de Pokémons amb Nuxt 3, Drizzle ORM i autenticació.

## Instal·lació

1. Instal·la les dependències:

```bash
npm install
```

2. Crea un fitxer `.env` a l'arrel del projecte amb les següents variables d'entorn:

```env
NUXT_SESSION_PASSWORD=my_password_secret
NUXT_OAUTH_GITHUB_CLIENT_ID=my_client_id
NUXT_OAUTH_GITHUB_CLIENT_SECRET=my_client_secret
```

**Nota:** 
- `NUXT_SESSION_PASSWORD`: Pots obtenir aquesta informació del repositori de Nuxt
- `NUXT_OAUTH_GITHUB_CLIENT_ID` i `NUXT_OAUTH_GITHUB_CLIENT_SECRET`: Aquesta informació s'obté creant una OAuth app a GitHub

3. Crea la carpeta `.data` per a la base de dades:

```bash
mkdir .data
```

4. Aplica els canvis a la base de dades:

```bash
npx drizzle-kit push
```

Això crearà la base de dades SQLite a `.data/sqlite.db`.

## Desenvolupament

Inicia el servidor de desenvolupament:

```bash
npm run dev
```


## Base de dades

Per obrir Drizzle Studio i veure/editar les dades:

```bash
npx drizzle-kit studio
```

## Estructura

- `app/pages/` - Pàgines de l'aplicació
- `app/schemas/` - Esquemes de validació Zod
- `app/types/` - Tipus TypeScript compartits
- `server/api/` - Endpoints de l'API
- `server/db/` - Configuració de la base de dades


## Usuari
Per fer proves pots entrar amb les següents credencials:
```
email: test@itb.cat
password: 12345678
```