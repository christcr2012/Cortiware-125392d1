import { PrismaClient as TenantClient } from '@prisma/client';
import { PrismaClient as ProviderClient } from '@prisma/client-provider';
import { hash } from 'bcryptjs';

// CI creates these two databases in its local disposable Postgres container.
// Never run the application's historical seed against a real account.
for (const key of ['DATABASE_URL', 'PROVIDER_DATABASE_URL']) {
  const url = new URL(process.env[key]);
  if (process.env.E2E_LOCAL !== 'true' || url.hostname !== '127.0.0.1' ||
      !['/tenant_test', '/provider_test'].includes(url.pathname))
    throw Error('Local disposable E2E databases only');
}
const clients = [new TenantClient(), new ProviderClient({
  datasources: { db: { url: process.env.PROVIDER_DATABASE_URL } }
})];
try {
  for (const [index, client] of clients.entries()) {
    const org = await client.org.create({ data: { name: 'Isolated CI organization' } });
    const email = index === 0 ? process.env.TEST_OWNER_EMAIL : process.env.TEST_PROVIDER_EMAIL;
    const password = index === 0 ? process.env.TEST_OWNER_PASSWORD : process.env.TEST_PROVIDER_PASSWORD;
    if (!email || !password) throw Error('CI fixture input missing');
    await client.user.create({ data: { orgId: org.id, email, role: 'OWNER',
      name: 'CI user', passwordHash: await hash(password, 10) } });
  }
} finally {
  await Promise.all(clients.map(client => client.$disconnect()));
}
