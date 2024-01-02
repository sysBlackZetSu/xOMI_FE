import { da } from "date-fns/locale";

class HttpClient {
    private baseURL: string;

    constructor(baseURL: string = 'http://localhost:2705/api') {
        this.baseURL = baseURL;
    }

    async request(url: string, method: string = 'GET', params: Record<string, any> = {}): Promise<any> {
        try {
            const queryString = method === 'GET' ? `?${new URLSearchParams(params)}` : '';
            const response = await fetch(`${this.baseURL}${url}${queryString}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: method !== 'GET' ? JSON.stringify(params) : undefined,
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            if (data && data.statusText === 'OK' && data.data) return data.data;
            return null;
            
        } catch (error) {
            console.log('[API error] ' + url);
            return;
        }
    }
}

export default HttpClient;
