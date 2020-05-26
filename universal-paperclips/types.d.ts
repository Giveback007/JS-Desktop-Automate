type Stats = {
    prevAvgRev: number,
    prev$made: number,
    $made: number,
    prevAction: 'lower' | 'raise',
    topWirePrice: number,
    startTime: number
    $spent: number,
    // avgSales: number,
}

type TargetPurchase = 'wire' | 'auto' | 'marketing'

type MetaData = {
    futureClips: number,
    targetCost: number,
    secondsTill0: number,
    targetPurchase: TargetPurchase,
}
