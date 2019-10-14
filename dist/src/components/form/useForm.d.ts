export default function useForm({ api }: {
    api: string;
}): {
    data?: undefined;
    isLoading?: undefined;
    isError?: undefined;
    handleSubmit?: undefined;
} | {
    data: any;
    isLoading: boolean;
    isError: boolean;
    handleSubmit: (e: any, customData: any) => void;
};
