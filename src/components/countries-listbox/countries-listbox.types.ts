import type { Component } from "vue";
import type { FieldApi } from "@tanstack/vue-form";

export type CountriesListboxProps = {
	state: FieldApi<any, any, any, any>["state"];
	iconLeft?: Component;
	iconRight?: Component;
	fluid?: boolean;
};