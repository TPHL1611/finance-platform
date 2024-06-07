Knowledge

-   Hono RPC

    -   When define api route with Hono RPC, order will be: route -> Middleware -> zValidator -> async function

-   Shadcn form with react-query and zod

-   Library
    -   Clerk
    -   react-use
    -   shadcn
        -   sheet
        -   button
        -   form
        -   input
        -   sonner
        -   data table
        -   skeleton
    -   react-query
    -   @paralleldrive/cuid2 (Tạo UUID)
    -   zustand
-   Backend

    -   Hono
    -   Drizzle (ORM)
        -   orm
        -   zod
    -   Neon database

-   When bulk delete, which mean delete many ID at once, use POST request

Error

-   'React' refers to a UMD global, but the current file is a module. Consider adding an import instead
    -   Change compilerOptions.jsx to 'react'
