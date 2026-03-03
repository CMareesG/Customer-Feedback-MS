import { Feedback } from "@prisma/client";

export type feedExtension = {
    name: string;
}

export type extendedFeedback = Feedback & feedExtension;