import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts.$post>;
type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"];

export const useCreateAccount = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        //Xử lý thông tin gửi lên
        mutationFn: async (json) => {
            const response = await client.api.accounts.$post({ json });
            return await response.json();
        },
        // Xử lý thành công
        onSuccess: () => {
            toast.success("Account created!");
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
        },
        // Xử lý lỗi
        onError: () => {
            toast.error("Failed to create account.");
        },
    });

    return mutation;
};
