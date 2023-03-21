import { HDKey } from '@scure/bip32'
import { mnemonicToSeedSync } from '@scure/bip39'
import { hdKeyToAccount } from './hdKeyToAccount'

import type { HDAccount, HDOptions } from './types'

export function mnemonicToAccount(
  mnemonic: string,
  opts: HDOptions = {},
): HDAccount {
  const seed = mnemonicToSeedSync(mnemonic)
  return hdKeyToAccount(HDKey.fromMasterSeed(seed), opts)
}
