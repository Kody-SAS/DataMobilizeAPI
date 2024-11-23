import { eq, sql } from "drizzle-orm";
import { users } from "../db/schema/user.schema";
import { db } from "../utils/db";
import { CreateUserInput } from "../dtos/user.dto";
import { verifications } from "../db/schema/verification.schema";
import { CreateVerificationInput, Verification } from "../dtos/verification.dto";

/**
 * Gets the first verification code that corresponds to the user's id provided
 * @param userId string - User id to be provided to fetch the verification code
 * @returns First matching verificaiton code
 */
const getOne = async (userId: string) => {
  const verification = await db
    .select()
    .from(verifications)
    .where(sql`${users.id} = ${userId}`);
  return verification.length > 0 ? verification[0] : null;
};


/**
 * Creates a verification object in database
 * @param verificationInput CreateVerificationInput - DTO to create verification
 * @returns verification code produced
 */
const create = async (verificationInput: CreateVerificationInput): Promise<Verification> => {
  // we previously delete any data code from the user
  await deleteAllFromUser(verificationInput.userId);
  
  return await db
                .insert(verifications)
                .values({userId: verificationInput.userId, code: verificationInput.code})
                .returning()[0];
}


/**
 * Deletes all the verification codes from a particular user
 * @param userId string - provided user'id to be used
 */
const deleteAllFromUser = async (userId: string) => {
    await db
            .delete(verifications)
            .where(eq(verifications.userId, userId));
}

export default { getOne, create, deleteAllFromUser };