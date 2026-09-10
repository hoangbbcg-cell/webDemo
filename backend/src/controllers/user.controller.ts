import type { NextFunction, Request, Response } from "express";

import {
  loginUser,
  registerUser,
  refreshAccessToken,
  logoutUser,
} from "../services/user.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({
      message: "Đăng nhập thành công",
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser(name, email, password);

    return res.status(201).json({
      message: "Đăng ký thành công",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await logoutUser(refreshToken);
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    })

    return res.status(200).json({
      message: "Đăng xuất thành công",
    });
  } catch (error) {
    next(error);
  }
};

export const refreshController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const result = await refreshAccessToken(refreshToken);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({
      accessToken: result.accessToken,
    });
  } catch (error) {
    next(error);
  }
};
