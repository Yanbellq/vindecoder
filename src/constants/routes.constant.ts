export const ROUTES = {
	PLACEHOLDER: '#',

	HOME: '/',
	VARIABLES: '/variables',
	VARIABLE: (id: string) => `/variables/${id}`,

	ERROR: '*',

	API: {
		DECODE: (vin: string) => `vehicles/decodevin/${vin}?format=json`,
		VARIABLE_LIST: '/vehicles/getvehiclevariablelist?format=json',
	},
} as const;