export interface TokenListResult {
    name: string
    timestamp: string
    version: Version
    keywords: string[]
    tags: Tags
    tags_order: string[]
    tokens: Token[]
    logoURI: string
}

export interface Version {
    major: number
    minor: number
    patch: number
}

export interface Tags {
    tokens: Tokens
    savings: Savings
    pools: Pools
    collectibles: Collectibles
    staking: Staking
    native: Native
}

export interface Tokens {
    name: string
    description: string
}

export interface Savings {
    name: string
    description: string
}

export interface Pools {
    name: string
    description: string
}

export interface Collectibles {
    name: string
    description: string
}

export interface Staking {
    name: string
    description: string
}

export interface Native {
    name: string
    description: string
}

export interface Token {
    chainId: number
    address: string
    name: string
    decimals: number
    symbol: string
    logoURI: string
    tags: string[]
    extensions?: Extensions
}

export interface Extensions {
    eip2612: boolean
}


export type TokenSearchResult = TokenExtended[]

export interface TokenExtended {
    symbol: string
    name: string
    address: string
    decimals: number
    logoURI?: string
    rating: number
    eip2612: boolean
    tags: Tag[]
    providers: string[]
}

export interface Tag {
    value: string
    provider: string
}
