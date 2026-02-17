let hiddenAnalysisPromise: Promise<any> | null = null;

export const getHiddenSignalAnalysis = async (): Promise<any> => {
    if (!hiddenAnalysisPromise) {
        hiddenAnalysisPromise = import('./hidden-track-analysis')
            .then((mod) => mod.HIDDEN_SIGNAL_ANALYSIS)
            .catch((err) => {
                hiddenAnalysisPromise = null;
                throw err;
            });
    }

    return hiddenAnalysisPromise;
};
