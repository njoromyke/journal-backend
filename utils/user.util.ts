const bcrypt = require("bcryptjs");
const { prisma } = require("../config/db/database");

async function comparePassword(email: string, password: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return false;
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return false;
  }
  return true;
}

export { comparePassword };
