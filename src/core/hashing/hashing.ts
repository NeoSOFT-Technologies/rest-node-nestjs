import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hashedPassword: string) {
  console.log(password, hashedPassword);
  return await bcrypt.compare(password, hashedPassword);
}
