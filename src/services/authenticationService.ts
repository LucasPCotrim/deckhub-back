import { SignupParams, LoginParams } from '@/protocols';
import { sessions, users } from '@prisma/client';
import bcrypt from 'bcrypt';
import { userRepository, sessionRepository } from '@/repositories';
import { duplicateEmailError, userNotFoundError, invalidCredentialsError } from '@/errors';
import jwt from 'jsonwebtoken';

const defaultProfilePic =
  'https://cards.scryfall.io/art_crop/front/4/9/496849a5-4b24-4eae-8bfb-d46f645d85ea.jpg?1664930445';

async function signUp({ name, email, password }: SignupParams): Promise<users> {
  await validateUniqueEmail(email);
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await userRepository.create({ name, email, password: hashedPassword, profilePic: defaultProfilePic });
  return user;
}

type userSessionInfo = Omit<sessions, 'id' | 'userId' | 'createdAt'> & Omit<users, 'password' | 'createdAt'>;
async function login({ email, password }: LoginParams): Promise<userSessionInfo> {
  const user = await userRepository.findByEmail(email);

  if (!user) throw userNotFoundError();

  await validatePassword(password, user.password);

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  const session = await sessionRepository.upsert({ userId: user.id, token });
  return { id: user.id, token: session.token, name: user.name, email: user.email, profilePic: user.profilePic };
}

async function logout({ userId }: { userId: number }): Promise<void> {
  await sessionRepository.deleteByUserId(userId);
}

async function validateUniqueEmail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) throw duplicateEmailError();
}

async function validatePassword(givenPassword: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(givenPassword, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

const authenticationService = {
  signUp,
  login,
  logout,
};

export { authenticationService };
