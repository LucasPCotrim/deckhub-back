import { SignupParams } from '@/protocols';
import { users } from '@prisma/client';
import bcrypt from 'bcrypt';
import { userRepository } from '@/repositories';
import { duplicateEmailError } from '@/errors';

const defaultProfilePic =
  'https://cards.scryfall.io/art_crop/front/4/9/496849a5-4b24-4eae-8bfb-d46f645d85ea.jpg?1664930445';

async function signUp({ name, email, password }: SignupParams): Promise<users> {
  await validateUniqueEmail(email);
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await userRepository.create({ name, email, password: hashedPassword, profilePic: defaultProfilePic });
  return user;
}

async function validateUniqueEmail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) throw duplicateEmailError();
}

const authenticationService = {
  signUp,
};

export { authenticationService };
