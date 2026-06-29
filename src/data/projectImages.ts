/** Pexels CDN URLs — one curated photo per project, matched to the case study theme. */
export function pexels(id: number, width = 800): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

export const PROJECT_IMAGE_IDS: Record<string, number> = {
  'executive-ai-dashboard': 5716052,
  'standup-ai': 3184298,
  'student-housing-copilot': 207691,
  'ai-analytics-paper': 6801643,
  'fmcg-commercial-ad': 1435904,
  pascal: 40568,
  'ankura-homes': 3288102,
  'pandemic-innovation': 263402,
  'powerbi-analytics': 6801643,
  'water-drought-analysis': 6438729,
  'fitness-tracker': 3822861,
  'konnect-ai': 3184292,
  'ai-voice-agent': 8867265,
  'ai-executive-dashboard': 5716052,
};

export function projectImage(id: string, detail = false): string {
  const photoId = PROJECT_IMAGE_IDS[id];
  return photoId ? pexels(photoId, detail ? 1200 : 800) : '';
}
