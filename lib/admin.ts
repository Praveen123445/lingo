import { auth } from "@clerk/nextjs/server";

const adminIds = [
    "user_2n0KJxRxJx0ZHX2JK567xSO1RtU"
];

export const isAdmin = () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }
    return adminIds.indexOf(userId) !== -1;
};