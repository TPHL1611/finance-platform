import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.categories)[":id"]["$patch"]>;
type RequestType = InferRequestType<(typeof client.api.categories)[":id"]["$patch"]>["json"];

export const useEditCategory = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        //Xử lý thông tin gửi lên
        mutationFn: async (json) => {
            const response = await client.api.categories[":id"]["$patch"]({ json, param: { id } });
            return await response.json();
        },
        // Xử lý thành công
        onSuccess: () => {
            toast.success("Category updated!");
            queryClient.invalidateQueries({ queryKey: ["category", { id }] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        // Xử lý lỗi
        onError: () => {
            toast.error("Failed to edit category.");
        },
    });

    return mutation;
};
