import { prisma } from "./serverside/db/prisma";

async function cleanup() {
  console.log("Cleaning up database...");

  // 1. 却下された、または中途半端に残っている登録申請をすべて削除
  const deletedRegs = await prisma.registrationRequest.deleteMany({});
  console.log(`Deleted ${deletedRegs.count} registration requests.`);

  // 2. テスト用ユーザーを整理したい場合はここに追加（今回は安全のため申請データのみ）
  // const deletedUsers = await prisma.user.deleteMany({ where: { email: { contains: 'test' } } });
  
  console.log("Cleanup completed successfully.");
}

cleanup()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
