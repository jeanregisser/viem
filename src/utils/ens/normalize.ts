import { toUnicode } from 'idna-uts46-hx'

/**
 * @description Normalizes ENS name
 *
 * @example
 * normalize('wagmi-dev.eth')
 * 'wagmi-dev.eth'
 *
 * @see https://docs.ens.domains/contract-api-reference/name-processing#normalising-names
 */
export function normalize(name: string) {
  return toUnicode(name, { useStd3ASCII: true })
}
