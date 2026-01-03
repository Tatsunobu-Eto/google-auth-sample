import "dotenv/config";
import { prisma } from "./serverside/db/prisma";

async function checkPermissions() {
  const email = "tatsunobu1111@gmail.com";
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      permissions: {
        include: {
          service: true,
          role: true
        }
      }
    }
  });

  if (!user) {
    console.log("User not found.");
    return;
  }

  console.log(`Permissions for ${email}:`);
  user.permissions.forEach(p => {
    console.log(`- Service: ${p.service.name}, Role: ${p.role.name}`);
  });
}

checkPermissions().catch(console.error).finally(() => prisma.$disconnect());
