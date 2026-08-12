
const apiClient = {
    request: async (
        path: string,
        options: RequestInit = {}
    ) => {
        return fetch(`/api/backend${path}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        });
    },
};

export default apiClient;