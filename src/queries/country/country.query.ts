import { ApiClient } from "@/utils";
import { useQuery } from "@tanstack/vue-query";
import { ENDPOINTS, type ApiResponseType } from "@/api";
import type { CountryListResponseType } from "./country.types";

export const getCountriesList = () =>
	ApiClient.get<
		ApiResponseType<Array<CountryListResponseType>, { id: ""; content: string }>
	>(ENDPOINTS.Country.CountryList);

export const useGetCountriesList = () =>
	useQuery({
		queryKey: ["countries_list"],
		queryFn: getCountriesList,
		gcTime:0
	});
