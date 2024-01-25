import { z } from "zod";

export const addFriendValidator = z.object({
	email: z.string().email(),
});

// Pulled out to shared/lib/validators