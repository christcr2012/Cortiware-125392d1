# @prisma/prisma-client-tenant

Workspace package holding the generated Prisma client for the tenant schema.
`prisma generate` writes into `src/` (gitignored); this package exists so imports of
`@prisma/prisma-client-tenant` resolve from the source tree instead of a generated folder inside
`node_modules` (the pre-salvage quirk that made clean-checkout image builds depend on
the committed node_modules layout).
