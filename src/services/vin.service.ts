import { ROUTES } from "@/constants"
import { nhtsa } from "@/lib"
import type { IVinDecode, IVariable } from "@/types";

export interface IVariableListResponseProps<T> {
	count: number,
	results: T[]
}

export const vinService = {
	async getVariablesList(): Promise<IVariableListResponseProps<IVariable>> {
		const { data } = await nhtsa.get(ROUTES.API.NHTSA.VARIABLE_LIST);
		return { count: data.Count, results: data.Results };
	},

	async getDecode(vin: string): Promise<IVariableListResponseProps<IVinDecode>> {
		const { data } = await nhtsa.get(ROUTES.API.NHTSA.DECODE(vin));
		return { count: data.Count, results: data.Results };
	}
}