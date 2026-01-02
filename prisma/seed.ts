import { prisma } from "@/serverside/db/prisma";

async function main() {
  // Roles
  const roles = [
    { name: "一般" },
    { name: "管理者" },
    { name: "システム管理者" },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }

  // Services
  const services = [
    { name: "在庫管理", description: "商品の在庫状況を管理するサービスです。" },
    { name: "社員人事情報", description: "社員の基本情報や配属先を管理するサービスです。" },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { name: service.name },
      update: {},
      create: service,
    });
  }

  console.log("Seed data created successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
