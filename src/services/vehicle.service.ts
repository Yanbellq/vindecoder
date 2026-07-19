import { ROUTES } from "@/constants"
import { api } from "@/lib"
import type { IDecode, IVariable } from "@/types";

export interface IVariableListResponseProps<T> {
	count: number,
	results: T[]
}

export const vehicleService = {
	async getVariablesList(): Promise<IVariableListResponseProps<IVariable>> {
		const { data } = await api.get(ROUTES.API.VARIABLE_LIST);
		return { count: data.Count, results: data.Results };
	},

	async getDecode(vin: string): Promise<IVariableListResponseProps<IDecode>> {
		const { data } = await api.get(ROUTES.API.DECODE(vin));
		return { count: data.Count, results: data.Results };
	}
}