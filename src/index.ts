import { AuthenticateProps, Profile, RefreshProps, YggrasilAuth } from '@/types';
import axios from 'axios';

class YggdrasilError extends Error {
    constructor(
        readonly status: number,
        message: string,
        readonly details: {
            error: string;
            cause?: string;
            errorMessage: string;
        },
    ) {
        super(message);
    }
}

class Yggdrasil {
    constructor(public api: string) {}

    private async post(endpoint: 'authenticate' | 'refresh', data: AuthenticateProps | RefreshProps) {
        axios.defaults.validateStatus = () => true;
        const response = await axios.post(`${this.api}/${endpoint}`, data);

        if (response.status >= 400)
            throw new YggdrasilError(response.status, `${response.status}: ${response.data}`, response.data);

        return response.data as YggrasilAuth;
    }

    authenticate = async ({ username, password, clientToken, requestUser = false }: AuthenticateProps) => {
        const data = await this.post('authenticate', {
            username,
            password,
            clientToken,
            requestUser,
        } as AuthenticateProps);

        return {
            access_token: data.accessToken,
            client_token: data.clientToken,
            uuid: data.selectedProfile.id,
            name: data.selectedProfile.name,
        };
    };

    refresh = async ({ accessToken, clientToken, requestUser = false }: RefreshProps) => {
        const data = await this.post('refresh', {
            accessToken,
            clientToken,
            requestUser,
        } as RefreshProps);

        return {
            access_token: data.accessToken,
            client_token: data.clientToken,
            uuid: data.selectedProfile.id,
            name: data.selectedProfile.name,
        };
    };

    validate = async (accessToken: string, clientToken?: string) => {
        axios.defaults.validateStatus = () => true;
        const response = await axios.post(`${this.api}/validate`, { accessToken, clientToken });

        return response.status === 204;
    };

    signout = async (username: string, password: string) => {
        axios.defaults.validateStatus = () => true;
        const response = await axios.post(`${this.api}/signout`, { username, password });

        return response.status === 204;
    };

    invalidate = async (accessToken: string, clientToken: string) => {
        axios.defaults.validateStatus = () => true;
        const response = await axios.post(`${this.api}/invalidate`, { accessToken, clientToken });

        return response.status === 204;
    };
}

export { Yggdrasil as default, type Profile, type YggrasilAuth, type AuthenticateProps, type RefreshProps };
