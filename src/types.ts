export interface Profile {
    id: string;
    name: string;
    properties?: Record<string, string>;
}

export interface YggrasilAuth {
    accessToken: string;
    clientToken: string;
    availableProfiles: Profile[];
    selectedProfile: Profile;
}

export interface AuthenticateProps {
    username: string;
    password: string;
    clientToken?: string;
    requestUser?: boolean;
}

export interface RefreshProps {
    accessToken: string;
    clientToken: string;
    requestUser?: boolean;
}
