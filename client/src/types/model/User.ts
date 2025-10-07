interface Contact {
    avatarUrl?: string;
    rememberName: string;
    chatroomId: number;
    status: "online" | "offline" | "busy" | "away";
}

interface friendRequests {
    from: {
        U_user_name: string;
        U_email: string;
        U_avatar?: string;
    };
    status: "pending" | "accepted" | "rejected";
}

interface User {
    U_user_name: string;
    U_email: string;
    U_avatar?: string;
    U_contacts: Contact[];
    U_friend_requests: friendRequests[];
    U_status: "online" | "offline" | "busy" | "away";
}

export type { User }