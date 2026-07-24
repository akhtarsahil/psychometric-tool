export function calculateZScore(rawScore, key, normativeData) {
    const norm = normativeData.aspects[key] || normativeData.domains[key];
    if (!norm || !norm.sd) return 0;
    return (rawScore - norm.mean) / norm.sd;
}

export function calculateTScore(zScore) {
    return Math.round((50 + (zScore * 10)) * 10) / 10;
}

export function calculatePercentile(zScore) {
    if (zScore === 0) return 50;
    const sign = zScore < 0 ? -1 : 1;
    const absZ = Math.abs(zScore) / Math.sqrt(2);

    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const t = 1.0 / (1.0 + p * absZ);
    const erf = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absZ * absZ);
    const cdf = 0.5 * (1.0 + sign * erf);

    const percentile = Math.round(cdf * 100);
    return Math.min(Math.max(percentile, 1), 99);
}

export function calculateSEMAndCI(rawScore, key, normativeData) {
    const norm = normativeData.aspects[key] || normativeData.domains[key];
    if (!norm) return { sem: 0, ciRawLow: rawScore, ciRawHigh: rawScore, ciPctLow: 50, ciPctHigh: 50 };

    const reliability = norm.reliability || 0.84;
    const sem = norm.sd * Math.sqrt(1 - reliability);
    
    const marginRaw = 1.96 * sem;
    const ciRawLow = Math.max(0, Math.round((rawScore - marginRaw) * 10) / 10);
    const ciRawHigh = Math.round((rawScore + marginRaw) * 10) / 10;

    const zLow = (ciRawLow - norm.mean) / norm.sd;
    const zHigh = (ciRawHigh - norm.mean) / norm.sd;
    const ciPctLow = calculatePercentile(zLow);
    const ciPctHigh = calculatePercentile(zHigh);

    return {
        sem: Math.round(sem * 10) / 10,
        ciRawLow,
        ciRawHigh,
        ciPctLow,
        ciPctHigh
    };
}
