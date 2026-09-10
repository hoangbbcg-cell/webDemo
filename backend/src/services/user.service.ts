import bcrypt from "bcrypt";

import * as UserRepository from "../repositories/user.repository";
import * as RefreshTokenRepository from "../repositories/refreshToken.repository";

import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../utils/authTokens";

import { AppError } from "../errors/AppError";

export const loginUser = async (email: string, password: string) => {
  const user = await UserRepository.findUserByEmail(email);

  if (!user) {
    throw new AppError(
      401,
      "INVALID_CREDENTIALS",
      "Email hoặc mật khẩu không đúng",
    );
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError(
      401,
      "INVALID_CREDENTIALS",
      "Email hoặc mật khẩu không đúng",
    );
  }

  const accessToken = createAccessToken(user.id, user.role);
  const refreshToken = createRefreshToken(user.id);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await RefreshTokenRepository.createRefreshTokenRecord(
    user.id,
    refreshToken,
    expiresAt,
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await UserRepository.findUserByEmail(email);

  if (existingUser) {
    throw new AppError(409, "EMAIL_ALREADY_EXISTS", "Email đã tồn tại");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserRepository.createUser(name, email, hashedPassword);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const logoutUser = async (refreshToken: string) => {
  return RefreshTokenRepository.deleteRefreshToken(refreshToken);
};

export const refreshAccessToken = async (refreshToken: string) => {
  const payload = verifyRefreshToken(refreshToken);

  const savedToken =
    await RefreshTokenRepository.findRefreshToken(refreshToken);

  if (!savedToken) {
    throw new AppError(401, "UNAUTHORIZED", "Refresh token không hợp lệ");
  }

  if (savedToken.expiresAt < new Date()) {
    throw new AppError(401, "UNAUTHORIZED", "Refresh token đã hết hạn");
  }

  const user = await UserRepository.findUserById(payload.userId);

  if (!user) {
    throw new AppError(401, "USER_NOT_FOUND", "Người dùng không tồn tại");
  }

  await RefreshTokenRepository.deleteRefreshToken(refreshToken);

  const newRefreshToken = createRefreshToken(user.id);

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await RefreshTokenRepository.createRefreshTokenRecord(
    user.id,
    newRefreshToken,
    expiresAt,
  );

  const accessToken = createAccessToken(payload.userId, user.role);

  return {
    accessToken,
    refreshToken:newRefreshToken
  };
};
