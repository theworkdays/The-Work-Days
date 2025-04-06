"use server";
import { AppwriteException, Models } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { handleError } from "@/utils/errorHandler";

export type UserData = Models.User<{
    nothing:string
}> &{
    avatar:string
};

export const meDef = async () => {
  try {
    const session = await createSession();

    if (session.error) {
      throw new AppwriteException(session.error);
    }

    const user = await session.data!.account.get<UserData>();

    // get avatr url
    const avatar = await session.data!.avatar.getInitials(user.name || "User");

    // generate data as svg data url
    // Convert ArrayBuffer to Buffer
    const buffer = Buffer.from(avatar);

    // Convert Buffer to SVG string (assuming it's valid SVG data)
    const svgString = buffer.toString("utf-8");

    

    return {
      data: {
          ...user,
          avatar: svgString,
      } as unknown as UserData,
      error: undefined,
    };
  } catch (e: unknown) {
    return handleError(e, "Unable to load user profile");
  }
};
