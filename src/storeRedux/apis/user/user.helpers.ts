import {
  deleteDeviceStorage,
  getDeviceStorage,
  setDeviceStorage,
} from "../../../helps/storage.help";
import { TOKEN_KEY_ASYNC_STORAGE } from "../../constants/apiProvider.constants";
import { userTokensSchema } from "./user.schemas";

export const saveTokens = async (tokens: {
  accessToken: string;
  refreshToken: string;
}): Promise<boolean> => {
  return await setDeviceStorage(
    TOKEN_KEY_ASYNC_STORAGE,
    JSON.stringify(tokens)
  );
};

export const getTokens = async (): Promise<{
  accessToken: string;
  refreshToken: string;
} | null> => {
  const tokenString = await getDeviceStorage(TOKEN_KEY_ASYNC_STORAGE);
  if (!tokenString) return null;

  try {
    const parsed = JSON.parse(tokenString);
    const result = userTokensSchema.safeParse(parsed);
    if (result.success) return result.data;

    return null;
  } catch {
    return null;
  }
};

export const deleteTokens = async (): Promise<boolean> => {
  return await deleteDeviceStorage(TOKEN_KEY_ASYNC_STORAGE);
};
