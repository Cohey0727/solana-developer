## Solana CLI の挙動

### キーを作成

```sh
# 一回目
solana-keygen new

# 二回目以降上書きたい場合
solana-keygen new --force
```

### Public Key を確認する

```sh
solana-keygen pubkey
```

### Balance を確認する

```sh
# ~/.config/solana/id.json のアドレスを参照
solana balance --url devnet

# 指定した Address を参照
solana balance [public-address] --url mainnet-beta
```

### Airdrop させる

```sh
solana airdrop 2 [public-key]
```

### Token の作成

```sh
spl-token create-token --url devnet
```

### Token に紐づくアカウントを作成(1token につき 1account)

Token を Mint した場合はこのアカウントの Balance になる

```sh
spl-token create-account [spl-token] --url devnet
```

### Token アカウントの Balance を確認

```sh
spl-token balance [spl-token] --url devnet
```

### Token の総供給量を確認

```sh
spl-token supply [spl-token] --url devnet

# GSTの総供給量
spl-token supply AFbX8oGjGpmVFywbVouvhQSRmiW2aR1mohfahi4Y2AdB --url mainnet-beta
```

### Token を mint する

```sh
spl-token mint [spl-token] [amount] --url devnet

# GSTのMintは当然できない
spl-token mint AFbX8oGjGpmVFywbVouvhQSRmiW2aR1mohfahi4Y2AdB --url mainnet-beta
> Account could not be parsed as token account: pubkey=36cHEMUo53c1FgrYcWtxjB1hZcF3RzKNNcQf6x8DCQtY
```

### Token の mint を禁止する

```sh
spl-token authorize [spl-token] mint --disable --url devnet
```

### Token を 転送する

```sh
spl-token transfer --fund-recipient --allow-unfunded-recipient [spl-token] [amount] [destination-address]
```
