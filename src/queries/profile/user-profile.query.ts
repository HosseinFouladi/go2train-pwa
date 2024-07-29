import _ from "lodash";
import { ApiClient } from "@/utils";
import { ENDPOINTS, type ApiResponseType } from "@/api";
import { useMutation, useQuery } from "@tanstack/vue-query";
import type {
	UpdateUserProfileParams,
	UserProfileApiResponseType,
} from "./user-profile.types";

export const getUserProfile = () =>
	ApiClient.get<
		ApiResponseType<
			Array<UserProfileApiResponseType>,
			{ id: ""; content: string }
		>
	>(ENDPOINTS.Profile.UserProfile).then((res) =>
		_.set(_.cloneDeep(res), "data.results", _.head(res.data.results)),
	) as Promise<
		ApiResponseType<UserProfileApiResponseType, { id: "all"; content: string }>
	>;

export const useGetUserProfileQuery = () =>
	useQuery({ queryKey: ["user_profile"], queryFn: getUserProfile });



export const updateUserProfile = (params: UpdateUserProfileParams) => {
	return ApiClient.postForm<
		ApiResponseType<
			Array<UserProfileApiResponseType>,
			{ id: ""; content: string }
		>
	>(ENDPOINTS.Profile.UpdateProfile, { ...params });
};

export const useUpdateProfileMutation = () => {
	useMutation({
		mutationKey: ["user_profile"],
		mutationFn: (params: UpdateUserProfileParams) => updateUserProfile(params),
	});
};
