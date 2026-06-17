/** Pexels CDN URLs — one curated photo per project, matched to the case study theme. */
export function pexels(id: number, width = 800): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

export const PROJECT_IMAGE_IDS: Record<string, number> = {
  pascal: 40568, // smartphone wellness / mobile health
  'ankura-homes': 3288102, // modern home exterior — real estate
  'pandemic-innovation': 263402, // hospital corridor — queue management
  'powerbi-analytics': 6801643, // laptop with business charts
  'water-drought-analysis': 6438729, // cracked arid earth — drought
  'fitness-tracker': 3822861, // smartwatch during workout
  'konnect-ai': 3184292, // professional team meeting — networking
  'volund-ai': 1181354, // data-center servers — MLOps
  'ai-voice-agent': 8867265, // call-center agents with headsets
  'ai-executive-dashboard': 5716052, // stock analytics on laptop screen
};

export function projectImage(id: string, detail = false): string {
  const photoId = PROJECT_IMAGE_IDS[id];
  return photoId ? pexels(photoId, detail ? 1200 : 800) : '';
}
