import type { Abi, Narrow } from 'abitype'
import {
  AbiFunctionNotFoundError,
  AbiFunctionOutputsNotFoundError,
} from '../../errors'
import type {
  ExtractArgsFromAbi,
  ExtractFunctionNameFromAbi,
  ExtractResultFromAbi,
  Hex,
} from '../../types'
import { decodeAbiParameters } from './decodeAbiParameters'
import { getAbiItem, GetAbiItemParameters } from './getAbiItem'

const docsPath = '/docs/contract/decodeFunctionResult'

export type DecodeFunctionResultParameters<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = {
  abi: Narrow<TAbi>
  functionName: ExtractFunctionNameFromAbi<TAbi, TFunctionName>
  data: Hex
} & Partial<ExtractArgsFromAbi<TAbi, TFunctionName>>

export type DecodeFunctionResultReturnType<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = ExtractResultFromAbi<TAbi, TFunctionName>

export function decodeFunctionResult<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>({
  abi,
  args,
  functionName,
  data,
}: DecodeFunctionResultParameters<
  TAbi,
  TFunctionName
>): DecodeFunctionResultReturnType<TAbi, TFunctionName> {
  const description = getAbiItem({
    abi,
    args,
    name: functionName,
  } as GetAbiItemParameters)
  if (!description)
    throw new AbiFunctionNotFoundError(functionName, { docsPath })
  if (!('outputs' in description))
    throw new AbiFunctionOutputsNotFoundError(functionName, { docsPath })

  const values = decodeAbiParameters(description.outputs, data)
  if (values && values.length > 1) return values as any
  if (values && values.length === 1) return values[0] as any
  return undefined as any
}
