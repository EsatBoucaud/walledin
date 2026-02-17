
import { TrackData, VisualStyle, LightingEffect, WordData, TrackLore, MediaItem, DeepAnalysis } from '../types';
import { getIcon, WORLD_IN_A_JAR_FALLBACK, Explanation } from './explanations';
import { parseLyricJson, parseExplanationJson } from './parsers';
import { getLyricOverride } from './lyric-overrides';

// --- ASSET CONFIGURATION ---
export const ASSET_BASE = "https://yfvjva8h23yczien.public.blob.vercel-storage.com";

// Helper to define initial track metadata (lyrics loaded dynamically or hardcoded)
function createTrackDef(
    id: string, 
    meta: { title: string, bpm: number, key: string, color: string },
    audioSrc: string, 
    coverArt: string, 
    visualStyle: VisualStyle, 
    lightingEffect: LightingEffect, 
    lore: TrackLore,
    jsonSrc?: string, // Lyrics
    explanationSrc?: string, // Explanations
    hardcodedData?: any, // Fallback lyrics
    hardcodedExplanations?: any, // Fallback explanations (World in a Jar)
    videoSrc?: string,
    mediaItems?: MediaItem[],
    hidden: boolean = false
): TrackData {
    
    let initialStanzas: string[][] = [];
    let initialWordMap: WordData[] = [];

    // If hardcoded data is provided, parse it immediately (Legacy/Fallback)
    if (hardcodedData) {
        const parsed = parseLyricJson(hardcodedData);
        initialStanzas = parsed.stanzas;
        initialWordMap = parsed.wordMap;
    }

    let initialAnalysis: DeepAnalysis | undefined = undefined;
    if (hardcodedExplanations) {
        initialAnalysis = parseExplanationJson(hardcodedExplanations);
    }

    const lyricOverride = getLyricOverride(id);
    if (lyricOverride) {
        const parsedOverrideLyrics = parseLyricJson(lyricOverride);
        initialStanzas = parsedOverrideLyrics.stanzas;
        initialWordMap = parsedOverrideLyrics.wordMap;
        jsonSrc = undefined;
    }

    return {
        id,
        title: meta.title,
        artist: "Carey Yuan",
        bpm: meta.bpm,
        key: meta.key,
        color: meta.color,
        audioSrc,
        jsonSrc,
        explanationSrc,
        coverArt,
        videoSrc,
        visualStyle,
        lightingEffect,
        stanzas: initialStanzas,
        wordMap: initialWordMap,
        analysis: initialAnalysis,
        lore,
        media: mediaItems,
        hidden
    };
}

// --- TRACK DEFINITIONS ---

export const TRACKS: TrackData[] = [
    // 1. VICTOR
    createTrackDef(
        'track-victor-ep',
        { title: "VICTOR", bpm: 88, key: "C Minor", color: "#739472" },
        `${ASSET_BASE}/VICTOR%201.mp3`, 
        `${ASSET_BASE}/Posters/1.webp`,
        'type-brutal',
        'retro-grid',
        {
            mood: 'analytical',
            productionNotes: ["It’s not music, it’s architecture.", "I wanted the drums to sound like they were kicking down a door."],
            lyricFocus: ["'Chrome-plated planner' is basically me trying to edit my life in post-production.", "The 'iron lung' line is about how hard it is to breathe when you're faking confidence."],
            backstory: "Victor isn't a person. He's a suit of armor I built. He's the Director because I couldn't handle being the actor anymore. He cuts the scene before I get hurt."
        },
        `${ASSET_BASE}/.json%20lyrics/Victor%27s_Script_sync.json`,
        `${ASSET_BASE}/.json%20lyrics/json_explanations/Victor_Explained.json`,
        null, null,
        'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        [
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/Missing_draft_one/Victor_Video.webm`, filename: "Victor_Video.webm" },
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/walled_garden_decon_monochrome_ink_wash_digital_scanline_weave_diffuse_mist_haze_charcoal_residue_synthetic_fiber_overlay.webm`, filename: "walled_garden_decon_monochrome_ink_wash_digital_scanline_weave_diffuse_mist_haze_charcoal_residue_synthetic_fiber_overlay.webm" },
            { type: "image", url: `${ASSET_BASE}/Posters/1.webp`, filename: "1.webp" }
        ]
    ),

    // 2. BROADRIPPLE (Fixed Audio)
    createTrackDef(
        'track-broadripple',
        { title: "Broadripple", bpm: 95, key: "A Minor", color: "#F43F5E" },
        `${ASSET_BASE}/Broadripple%201.mp3`, 
        `${ASSET_BASE}/Posters/3.webp`,
        'nuclear-haze',
        'retro-grid',
        {
            mood: 'aggressive',
            productionNotes: ["The 'accelerant' track. It's meant to feel like a panic attack at 95 BPM."],
            lyricFocus: ["'Get rich off your Ed' is a pun on Richard Edwards. It's about stealing from your idols."],
            backstory: "I wrote this running late to class at Luddy. That panic? That 'scrambling in cars'? That's real."
        },
        `${ASSET_BASE}/.json%20lyrics/Broadripple_sync%20%281%29.json`,
        `${ASSET_BASE}/.json%20lyrics/json_explanations/broadripple_explained.json`,
        null, null, undefined,
        [
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/Missing_draft_one/Broadripple_Video.webm`, filename: "Broadripple_Video.webm" },
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/walled_garden_decon_charcoal_splatter_distorted_mesh_floral_weave_dilated_pupil.webm`, filename: "walled_garden_decon_charcoal_splatter_distorted_mesh_floral_weave_dilated_pupil.webm" },
            { type: "image", url: `${ASSET_BASE}/Posters/3.webp`, filename: "3.webp" }
        ]
    ),

    // 3. COG SCI
    createTrackDef(
        'track-cogsci',
        { title: "Cog-sci", bpm: 88, key: "C Minor", color: "#FBBF24" },
        `${ASSET_BASE}/Cogs%20Eye%201.mp3`,
        `${ASSET_BASE}/Posters/4.webp`,
        'neural-spark',
        'constellation-net',
        {
            mood: 'analytical',
            productionNotes: ["Loops. Everything loops. The beat is stuck, just like me."],
            lyricFocus: ["'Cog-Sci' isn't just the major, it's the prison."],
            backstory: "This is the core dump. The kernel panic. It's realizing that smarts don't save you from obsession."
        },
        `${ASSET_BASE}/.json%20lyrics/Cog-sci_sync.json`,
        `${ASSET_BASE}/.json%20lyrics/json_explanations/Cog_Sci_Explained.json`,
        null, null,
        'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        [
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/walled_garden_decon_granulated_obsidian_slab_translucent_cranial_shell_viscous_ink_splatter_stellar_nebula_haze_weathered_indigo_stucco_digitized_phalange_outline.webm`, filename: "walled_garden_decon_granulated_obsidian_slab_translucent_cranial_shell_viscous_ink_splatter_stellar_nebula_haze_weathered_indigo_stucco_digitized_phalange_outline.webm" },
            { type: "image", url: `${ASSET_BASE}/Posters/4.webp`, filename: "4.webp" }
        ]
    ),

    // 4. THE RUM DRUM
    createTrackDef(
        'track-rumdrum',
        { title: "The Rum Drum", bpm: 88, key: "D Minor", color: "#A5E6EA" },
        `${ASSET_BASE}/The%20Rum%20Drum%201.mp3`,
        `${ASSET_BASE}/Posters/6.webp`,
        'snare-impact',
        'spotlight-sway',
        {
            mood: 'tired',
            productionNotes: ["This is about addiction as a rhythm.", "The drum pattern literally mimics a heart murmur."],
            lyricFocus: ["'Rum Drum' is a double entendre for a heartbeat and a drink."],
            backstory: "Written during a period of unemployment where days blurred together."
        },
        `${ASSET_BASE}/.json%20lyrics/The_Rum_Drum_sync.json`,
        `${ASSET_BASE}/.json%20lyrics/json_explanations/The_Rum_Drum_Explained.txt`,
        null, null,
        'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        [
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/Missing_draft_one/The_Rum_Drum_Video.webm`, filename: "The_Rum_Drum_Video.webm" },
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/walled_garden_decon_crimson_nylon_sheen_fibrous_dreadlock_strands_cathode_ray_tube_array_cyan_red_dichroic_lighting_embroidered_textile_patches_melanated_epidermis.webm`, filename: "walled_garden_decon_crimson_nylon_sheen_fibrous_dreadlock_strands_cathode_ray_tube_array_cyan_red_dichroic_lighting_embroidered_textile_patches_melanated_epidermis.webm" },
            { type: "image", url: `${ASSET_BASE}/Posters/6.webp`, filename: "6.webp" }
        ]
    ),

    // 5. MONUMENTAL
    createTrackDef(
        'track-monumental',
        { title: "Monumental", bpm: 95, key: "F Minor", color: "#A8A29E" },
        `${ASSET_BASE}/Monumental%201.mp3`,
        `${ASSET_BASE}/Posters/11.webp`,
        'pillars',
        'vertical-flow',
        {
            mood: 'aggressive',
            productionNotes: ['Heavy distortion', 'Industrial drums'],
            lyricFocus: ['Systemic failure', 'Debt'],
            backstory: 'Written while dealing with student loans and bureaucracy.'
        },
        `${ASSET_BASE}/.json%20lyrics/Monumental_sync.json`,
        `${ASSET_BASE}/.json%20lyrics/json_explanations/Monumental_Explained.json`,
        null, null,
        'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        [
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/walled_garden_decon_cyan_vapor_haze_oxidized_copper_patina_luminescent_facial_contours_heavy_cotton_weave_prismatic_light_leak_weathered_slate_strata.webm`, filename: "walled_garden_decon_cyan_vapor_haze_oxidized_copper_patina_luminescent_facial_contours_heavy_cotton_weave_prismatic_light_leak_weathered_slate_strata.webm" },
            { type: "image", url: `${ASSET_BASE}/Posters/11.webp`, filename: "11.webp" }
        ]
    ),

    // 6. LENDER
    createTrackDef(
        'track-lender',
        { title: "Lender", bpm: 82, key: "A Minor", color: "#4ADE80" },
        `${ASSET_BASE}/Lender%201.mp3`,
        `${ASSET_BASE}/Posters/9.webp`,
        'scanline-crt',
        'vertical-flow',
        {
            mood: 'tired',
            productionNotes: ["Sounds like a transaction."],
            lyricFocus: ["'Can you lend me an ear?'"],
            backstory: "The emotional cost of dependency."
        },
        `${ASSET_BASE}/.json%20lyrics/Lender_sync.json`,
        `${ASSET_BASE}/.json%20lyrics/json_explanations/Lender_Explained.json`,
        null, null,
        'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        [
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/walled_garden_decon_luminescent_epidermis_radiant_silk_bodice_nebula_dust_sediment_musical_frequency_particles_chromatic_aberration_haze.webm`, filename: "walled_garden_decon_luminescent_epidermis_radiant_silk_bodice_nebula_dust_sediment_musical_frequency_particles_chromatic_aberration_haze.webm" },
            { type: "image", url: `${ASSET_BASE}/Posters/9.webp`, filename: "9.webp" }
        ]
    ),

    // 7. GLOOM
    createTrackDef(
        'track-gloom',
        { title: "GLOOM", bpm: 94, key: "C Minor", color: "#C084FC" },
        `${ASSET_BASE}/GLOOM%201.mp3`, 
        `${ASSET_BASE}/Posters/10.webp`,
        'vhs-tracking',
        'constellation-net',
        {
            mood: 'depressed',
            productionNotes: ["The 'wooden room' refers to an acoustic guitar's body."],
            lyricFocus: ["'Mind full of gloom' is meant to sound like 'mine full of gold' but twisted."],
            backstory: "Written in a basement during winter. It's about feeling trapped in your own potential."
        },
        `${ASSET_BASE}/.json%20lyrics/GLOOM_sync.json`,
        `${ASSET_BASE}/.json%20lyrics/json_explanations/GLOOM_Explained.txt`,
        null, null,
        'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        [
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/walled_garden_shattered_obsidian_visage_oxidized_gold_relief.webm`, filename: "walled_garden_shattered_obsidian_visage_oxidized_gold_relief.webm" },
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/walled_garden_decon_teal_watercolor_wash_dragonfly_wing_venation_gold_leaf_musical_notation_chromatic_aberration_typography_ethereal_white_void.webm`, filename: "walled_garden_decon_teal_watercolor_wash_dragonfly_wing_venation_gold_leaf_musical_notation_chromatic_aberration_typography_ethereal_white_void.webm" },
            { type: "image", url: `${ASSET_BASE}/Posters/10.webp`, filename: "10.webp" }
        ]
    ),

    // 8. EARNEST READER
    createTrackDef(
        'track-earnest',
        { title: "Earnest Reader", bpm: 80, key: "G Major", color: "#C4B5FD" },
        `${ASSET_BASE}/Earnest%20Reader%201.mp3`,
        `${ASSET_BASE}/Posters/13.webp`,
        'kinetic-float',
        'focus-depth',
        {
            mood: 'tired',
            productionNotes: ["Acoustic texture with digital interference."],
            lyricFocus: ["The duality of 'Earner' and 'Learner'."],
            backstory: "A portrait of quiet, persistent growth."
        },
        `${ASSET_BASE}/.json%20lyrics/Earnest_Reader_sync.json`,
        `${ASSET_BASE}/.json%20lyrics/json_explanations/Earnest_Reader_Explained.json`,
        null, null,
        'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        [
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/striped_shirt_dark_portrait_stylized_cobra_sweater.webm`, filename: "striped_shirt_dark_portrait_stylized_cobra_sweater.webm" },
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/walled_garden_decon_monochrome_ribbed_knit_melanated_visage_halftone_dither_haze_chromatic_aberration_fringe_circular_tinted_lenses.webm`, filename: "walled_garden_decon_monochrome_ribbed_knit_melanated_visage_halftone_dither_haze_chromatic_aberration_fringe_circular_tinted_lenses.webm" },
            { type: "image", url: `${ASSET_BASE}/Posters/13.webp`, filename: "13.webp" }
        ]
    ),

    // 9. THE BETTER (Placeholder / The Gamble)
    createTrackDef(
        'track-better',
        { title: "The Better", bpm: 90, key: "C Major", color: "#FCA5A5" },
        `${ASSET_BASE}/Earnest%20Reader%201.mp3`, // Placeholder Audio
        `${ASSET_BASE}/Posters/13.webp`, // Placeholder Art
        'prism-split',
        'spotlight-sway',
        {
            mood: 'nostalgic',
            productionNotes: ["The track that got away.", "Visuals over audio."],
            lyricFocus: ["Getting lost in your eyes", "Watching the day turn to night"],
            backstory: "A conceptual piece representing the gamble of romance."
        },
        undefined, undefined, 
        { "title": "The Better", "sections": [{ "type": "Chorus", "lines": [{ "text": "Getting lost in your eyes, watching the day turn to night." }] }] },
        undefined, undefined, [], false
    ),

    // 10. MOMENTUM 
    createTrackDef(
        'track-momentum',
        { title: "Momentum", bpm: 110, key: "F Major", color: "#A8A29E" },
        `${ASSET_BASE}/Momentum%201.mp3`,
        `${ASSET_BASE}/Posters/12.webp`,
        'kinetic-float',
        'spotlight-sway',
        {
            mood: 'manic',
            productionNotes: ["Fast, driving rhythm."],
            lyricFocus: ["'Body full of cortisol'."],
            backstory: "Trying to outrun the burnout."
        },
        undefined, // No JSON Src for lyrics
        undefined, // REMOVED BROKEN EXPLANATION JSON TO FIX PARSE ERROR
        {
            "title": "Momentum",
            "sections": [
                { "type": "Chorus", "lines": [ { "text": "Oh Momentum, Momentum of the moment, hmm?", "words": [{ "text": "Oh", "start": 5.0 }, { "text": "Momentum,", "start": 6.0 }] } ]}
            ]
        },
        null,
        'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        [
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/walled_garden_luminescent_core_vessel_cyan_skeletal_hands_gold_wire_geometry_solar_flare_bloom_indigo_vapor_diffusion.webm`, filename: "walled_garden_luminescent_core_vessel_cyan_skeletal_hands_gold_wire_geometry_solar_flare_bloom_indigo_vapor_diffusion.webm" },
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/walled_garden_decon_corvid_silhouette_gold_wire_geometry_chromatic_aberration_haze_diffuse_nebula_glow_weathered_limestone_texture_spectral_distortion.webm`, filename: "walled_garden_decon_corvid_silhouette_gold_wire_geometry_chromatic_aberration_haze_diffuse_nebula_glow_weathered_limestone_texture_spectral_distortion.webm" },
            { type: "image", url: `${ASSET_BASE}/Posters/12.webp`, filename: "12.webp" }
        ]
    ),

    // 11. KNEE SOCKS
    createTrackDef(
        'track-kneesocks',
        { title: "Knee Socks", bpm: 100, key: "E Minor", color: "#FDA4AF" },
        `${ASSET_BASE}/Kneesocks%201.mp3`,
        `${ASSET_BASE}/Posters/16.webp`,
        'vhs-tracking',
        'retro-grid',
        {
            mood: 'depressed',
            productionNotes: ["Interpolating Arctic Monkeys but making it freezing cold."],
            lyricFocus: ["'My loft is gloom I think'."],
            backstory: "Isolation in a small apartment."
        },
        `${ASSET_BASE}/.json%20lyrics/Kneesocks_%28deluxe%29_sync.json`,
        `${ASSET_BASE}/.json%20lyrics/json_explanations/Kneesocks_explained.json`,
        null, null,
        'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        [
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/walled_garden_decon_interstellar_dust_clouds_pressurized_nylon_suit_chromatic_aberration_haze_crystalline_nebula_core_reflective_polycarbonate_visor_subsurface_scattering_light.webm`, filename: "walled_garden_decon_interstellar_dust_clouds_pressurized_nylon_suit_chromatic_aberration_haze_crystalline_nebula_core_reflective_polycarbonate_visor_subsurface_scattering_light.webm" },
            { type: "image", url: `${ASSET_BASE}/Posters/16.webp`, filename: "16.webp" }
        ]
    ),

    // 12. WORLD IN A JAR
    createTrackDef(
        'track-world-jar',
        { title: "World in a Jar", bpm: 92, key: "A Major", color: "#99F6E4" },
        `${ASSET_BASE}/World%20in%20a%20Jar%201.mp3`,
        `${ASSET_BASE}/Posters/15.webp`,
        'containment-box',
        'focus-depth',
        {
            mood: 'manic',
            productionNotes: ["Compressed audio to simulate the jar."],
            lyricFocus: ["'No stars in the world worth the space'."],
            backstory: "A toxic relationship metaphor."
        },
        `${ASSET_BASE}/.json%20lyrics/World_in_a_Jar_sync.json`,
        undefined, // No provided explanation JSON for this track
        null,
        WORLD_IN_A_JAR_FALLBACK, 
        'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        [
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/walled_garden_globe_magnifying_glass.webm`, filename: "walled_garden_globe_magnifying_glass.webm" },
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/walled_garden_decon_urban_glass_facade_cherry_blossom_petals_digital_topography_chromatic_aberration_haze_prismatic_light_refraction_subsurface_glow.webm`, filename: "walled_garden_decon_urban_glass_facade_cherry_blossom_petals_digital_topography_chromatic_aberration_haze_prismatic_light_refraction_subsurface_glow.webm" },
            { type: "image", url: `${ASSET_BASE}/Posters/15.webp`, filename: "15.webp" }
        ]
    ),

    // 13. THE LIQ TICK
    createTrackDef(
        'track-liq-tick',
        { title: "The Liq Tick", bpm: 96, key: "F# Minor", color: "#D9F99D" },
        `${ASSET_BASE}/The%20Liq%20Tick%201.mp3`,
        `${ASSET_BASE}/Posters/7.webp`,
        'chrome-liquid',
        'vertical-flow',
        {
            mood: 'analytical',
            productionNotes: ["Viscous, slippery sound design."],
            lyricFocus: ["'Epoxy slick'."],
            backstory: "The temporary solutions we use to survive."
        },
        `${ASSET_BASE}/.json%20lyrics/The_Lick_Tick_sync.json`,
        `${ASSET_BASE}/.json%20lyrics/json_explanations/The_Liq_Tick_Explained.json`,
        null, null,
        'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        [
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/walled_garden_decon_heavy_silk_brocade_cyan_vapor_diffusion_void_silhouette_visage_oxidized_slate_strata_iridescent_thread_weave_ink_splatter_nebula.webm`, filename: "walled_garden_decon_heavy_silk_brocade_cyan_vapor_diffusion_void_silhouette_visage_oxidized_slate_strata_iridescent_thread_weave_ink_splatter_nebula.webm" },
            { type: "image", url: `${ASSET_BASE}/Posters/7.webp`, filename: "7.webp" }
        ]
    ),

    // 14. THE MACHINE
    createTrackDef(
        'track-machine',
        { title: "Morning Comes (Try My Best)", bpm: 87, key: "G# Minor", color: "#FBBF24" },
        `${ASSET_BASE}/The%20Machine.mp3`,
        `${ASSET_BASE}/Posters/2.webp`,
        'construct',
        'retro-grid',
        {
            mood: 'tired',
            productionNotes: ["Mechanical, repetitive.", "Designed to feel like a loop you can't exit."],
            lyricFocus: ["'You know I try my best' repeated until it loses meaning."],
            backstory: "The automated defense mechanism of the daily grind."
        },
        `${ASSET_BASE}/.json%20lyrics/The%20Machine.json`,
        `${ASSET_BASE}/.json%20lyrics/json_explanations/The_Machine_Explained.json`,
        null, null,
        'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        [
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/walled_garden_decon_luminescent_ocular_implant_chrome_prosthetic_appendage_heavy_wool_overcoat_ionized_plasma_discharge_obsidian_vapor_mist_fractured_concrete_substrate.webm`, filename: "walled_garden_decon_luminescent_ocular_implant_chrome_prosthetic_appendage_heavy_wool_overcoat_ionized_plasma_discharge_obsidian_vapor_mist_fractured_concrete_substrate.webm" },
            { type: "image", url: `${ASSET_BASE}/Posters/2.webp`, filename: "2.webp" }
        ]
    ),

    // 15. SINCERE WRITER
    createTrackDef(
        'track-sincere-writer',
        { title: "Sincere Writer", bpm: 94, key: "C Minor", color: "#C4B5FD" },
        `${ASSET_BASE}/Sincere%20Writer%201.mp3`,
        `${ASSET_BASE}/Posters/14.webp`,
        'loom-weave',
        'constellation-net',
        {
            mood: 'nostalgic',
            productionNotes: ["The most 'musical' track. Less glitch, more harmony.", "Created to be the 'healing' counterpart to the destruction of Broadripple."],
            lyricFocus: ["'It's hard to be sincere when they paint a veneer' is the central thesis of the album."],
            backstory: "Written after walking away from a corporate tech job to focus on writing."
        },
        `${ASSET_BASE}/.json%20lyrics/Sincere_Writer_sync.json`,
        `${ASSET_BASE}/.json%20lyrics/json_explanations/Sincere_Writer_Explained.json`,
        null, null,
        'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        [
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/walled_garden_teal_silk_shroud_fragmented_visage_chromatic_light_streaks_luminescent_particle_drift_prismatic_haze.webm`, filename: "walled_garden_teal_silk_shroud_fragmented_visage_chromatic_light_streaks_luminescent_particle_drift_prismatic_haze.webm" },
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/walled_garden_decon_heavy_silk_brocade_melanated_epidermis_prismatic_light_refraction_stiff_cerulean_drape_ink_wash_haze_weathered_pagoda_timber.mp4`, filename: "walled_garden_decon_heavy_silk_brocade_melanated_epidermis_prismatic_light_refraction_stiff_cerulean_drape_ink_wash_haze_weathered_pagoda_timber.mp4" },
            { type: "image", url: `${ASSET_BASE}/Posters/14.webp`, filename: "14.webp" }
        ]
    ),

    // 16. THE STRANGER (Final Track)
    createTrackDef(
        'track-stranger',
        { title: "The Stranger", bpm: 66, key: "B Minor", color: "#EF4444" },
        `${ASSET_BASE}/the-stranger.mp3`,
        `${ASSET_BASE}/Posters/8.webp`,
        'nuclear-haze',
        'constellation-net',
        {
            mood: 'aggressive',
            productionNotes: ["Slow, heavy, inevitable."],
            lyricFocus: ["'The Stranger comes knocking'"],
            backstory: "The final confrontation with the self."
        },
        `${ASSET_BASE}/.json%20lyrics/The-Stranger_sync.json`,
        `${ASSET_BASE}/.json%20lyrics/json_explanations/The_Stranger_Explained.json`,
        null, null,
        'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        [
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/Missing_draft_one/The_Stranger_Video.webm`, filename: "The_Stranger_Video.webm" },
            { type: "video", url: `${ASSET_BASE}/Posters/Videos/walled_garden_decon_glazed_ceramic_roof_tiles_void_silhouette_heavy_polyester_academic_regalia_chromatic_aberration_haze_ornate_stone_gargoyle_ink_blot_extremities.webm`, filename: "walled_garden_decon_glazed_ceramic_roof_tiles_void_silhouette_heavy_polyester_academic_regalia_chromatic_aberration_haze_ornate_stone_gargoyle_ink_blot_extremities.webm" },
            { type: "image", url: `${ASSET_BASE}/Posters/8.webp`, filename: "8.webp" }
        ]
    ),

    // 17. CARRY YUAN (Hidden Track - audio pending)
    createTrackDef(
        'track-mantra',
        { title: "Carry Yuan (Hidden Signal)", bpm: 92, key: "D Minor", color: "#7DD3FC" },
        `${ASSET_BASE}/Momentum%201.mp3`, // Placeholder until hidden-track audio is provided
        `${ASSET_BASE}/Posters/12.webp`,
        'neural-spark',
        'focus-depth',
        {
            mood: 'analytical',
            productionNotes: [
                "Hidden capstone track with dense references and research-process framing.",
                "Audio placeholder active until final master is delivered."
            ],
            lyricFocus: [
                "'To understand, you choose one question.'",
                "'Carey can't choose, what's an Is from an ought?'",
                "'Neurons in my brain, I Carry Yuan.'"
            ],
            backstory: "A concealed end-note tying technical training, philosophy, and identity pressure into one method statement."
        },
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        [],
        true
    )
];
