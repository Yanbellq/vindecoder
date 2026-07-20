import type { IPlateDecode } from '@/types';
import { ROUTES } from "@/constants"
import { hotline } from "@/lib"

export const plateService = {
	async getDecode(plate: string): Promise<IPlateDecode> {
		const { data } = await hotline.get(ROUTES.API.HOTLINE.GET_INFO(plate))
		return data.data;
	}
}