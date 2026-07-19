export type TDataType = 'string' | 'lookup' | 'int' | 'decimal'

export interface IVariable {
	ID: number,
	Name: string,
	Description: string
	GroupName: string
	DataType: TDataType,
}