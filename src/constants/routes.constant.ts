export const HOTLINE_BASE_API_URL = '/api-hotline/';
export const HOTLINE_API_URL = import.meta.env.VITE_PUBLIC_HOTLINE_API_URL;

export const ROUTES = {
	PLACEHOLDER: '#',

	HOME: '/',
	PLATE: '/plate',
	DECODE: '/decode',
	VARIABLES: '/variables',
	VARIABLE: (id: string) => `/variables/${id}`,

	ERROR: '*',

	API: {
		NHTSA: {
			DECODE: (vin: string) => `vehicles/decodevin/${vin}?format=json`,
			VARIABLE_LIST: '/vehicles/getvehiclevariablelist?format=json',
		},
		HOTLINE: {
			GET_INFO: (plate: string) => `${HOTLINE_BASE_API_URL}get-car-info?number=${plate}`,
		}
	},
} as const;