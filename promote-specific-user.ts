import { prisma } from "./serverside/db/prisma";

async function promote() {
  const email = "tatsunobu1111@gmail.com";
  console.log(`Promoting ${email} to System Admin...`);

  // 1. ユーザーの存在確認、なければ作成（パスワードなし=Google連携等想定）
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.log("User not found, creating new user...");
    user = await prisma.user.create({
      data: {
        email,
        name: "Admin User",
      },
    });
  }

  // 2. システム管理者ロールの取得
  const systemAdminRole = await prisma.role.findUnique({
    where: { name: "システム管理者" },
  });
  if (!systemAdminRole) throw new Error("System Admin role not found. Please run seed first.");

  // 3. 全サービスに対して権限を付与
  const services = await prisma.service.findMany();
  for (const service of services) {
    await prisma.userPermission.upsert({
      where: {
        userId_serviceId: {
          userId: user.id,
          serviceId: service.id,
        },
      },
      update: { roleId: systemAdminRole.id },
      create: {
        userId: user.id,
        serviceId: service.id,
        roleId: systemAdminRole.id,
      },
    });
  }

  console.log(`Successfully promoted ${email} to System Admin for all services.`);
}

promote()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
