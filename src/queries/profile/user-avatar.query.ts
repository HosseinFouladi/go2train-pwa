import { ApiClient } from "@/utils";
import { useMutation } from "@tanstack/vue-query";
import { ENDPOINTS, type ApiResponseType } from "@/api";

export const removeUserAvatar = () => {
	return ApiClient.delete<ApiResponseType<[], { id: ""; content: string }>>(
		ENDPOINTS.Profile.RemoveAvatar,
	);
};

export const useRemoveUserAvatarMutation = () =>
	useMutation({
		mutationKey: ["user_profile", "delete_avatar"],
		mutationFn: removeUserAvatar,
	});

export const storeUserAvatar = (params: {
	avatar?: File;
	avatar_id: number;
}) => {
	return ApiClient.postForm(ENDPOINTS.Profile.StoreAvatar, { ...params });
};

export const useStoreUserAVatarMutation = () => {
	return useMutation({
		mutationKey: ["user_profile", "update_avatar"],
		mutationFn: (params: {
			avatar?: File;
			avatar_id: number;
		}) => storeUserAvatar(params),
	});
};
