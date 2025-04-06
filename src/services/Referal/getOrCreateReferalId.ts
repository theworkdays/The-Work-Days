"use server";

import { handleError } from "@/utils/errorHandler";

import { createreferaliddef } from "./createreferalid";
import { getreferaliddef } from "./getreferalid";

export const getOrCreateReferalIdDef = async () => {
  try {
    // try getting the referal id
    const referalId = await getreferaliddef();
    if (referalId.error) {
      // if referal id does not exist create one

      // create referal id
      const newReferalId = await createreferaliddef();

      if (newReferalId.error) {
        throw new Error(newReferalId.error);
      }

      return {
        data: newReferalId.data!,
        error: undefined,
      };
    }

    return {
      data: referalId.data!,
      error: undefined,
    };
  } catch (e) {
    return handleError(e, "Unable to get or create referal id");
  }
};
