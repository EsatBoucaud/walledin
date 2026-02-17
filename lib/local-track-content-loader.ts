type LocalTrackContentMap = Record<string, { lyrics?: unknown; analysis?: unknown }>;

let localTrackContentPromise: Promise<LocalTrackContentMap> | null = null;

const loadLocalTrackContent = async (): Promise<LocalTrackContentMap> => {
    if (!localTrackContentPromise) {
        localTrackContentPromise = import('./local-track-content')
            .then((mod) => mod.LOCAL_TRACK_CONTENT as LocalTrackContentMap)
            .catch((err) => {
                localTrackContentPromise = null;
                throw err;
            });
    }

    return localTrackContentPromise;
};

export const getLocalTrackContentForTrack = async (trackId: string): Promise<{ lyrics?: unknown; analysis?: unknown } | undefined> => {
    const all = await loadLocalTrackContent();
    return all[trackId];
};
