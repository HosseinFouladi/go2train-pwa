import type { FieldApi } from '@tanstack/vue-form'
import type { Component } from 'vue'

export type InputTextProps = {
		state: FieldApi<any, any, any, any>["state"];
		iconLeft?: Component;
		iconRight?: Component;
		fluid?: boolean;
		disabled?: boolean;
		value:string
	};
