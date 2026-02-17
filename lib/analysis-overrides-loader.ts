import type { DeepAnalysis } from '../types';

type ApplyFn = (trackId: string, base?: DeepAnalysis) => DeepAnalysis | undefined;

let applyFnPromise: Promise<ApplyFn> | null = null;

const loadApplyFn = async (): Promise<ApplyFn> => {
    if (!applyFnPromise) {
        applyFnPromise = import('./analysis-overrides')
            .then((mod) => mod.applyAnalysisOverrides as ApplyFn)
            .catch((err) => {
                applyFnPromise = null;
                throw err;
            });
    }

    return applyFnPromise;
};

export const applyAnalysisOverridesForTrack = async (
    trackId: string,
    base?: DeepAnalysis
): Promise<DeepAnalysis | undefined> => {
    const apply = await loadApplyFn();
    return apply(trackId, base);
};
