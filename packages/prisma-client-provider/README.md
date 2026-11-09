# @prisma/prisma-client-provider

Workspace package holding the generated Prisma client for the provider schema.
`prisma generate` writes into `src/` (gitignored); this package exists so imports of
`@prisma/prisma-client-provider` resolve from the source tree instead of a generated folder inside
`node_modules` (the pre-salvage quirk that made clean-checkout image builds depend on
the committed node_modules layout).
