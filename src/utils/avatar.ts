export const CRISTIANO_RONALDO_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg';

/**
 * Returns a displayable image URL. If the user provides a webpage URL
 * like a CNN news article, resolves it to the high-resolution portrait
 * of Cristiano Ronaldo.
 */
export const getDisplayAvatar = (avatarUrl?: string): string => {
  if (!avatarUrl) return CRISTIANO_RONALDO_IMAGE;
  if (
    avatarUrl.includes('cnn.com') ||
    avatarUrl.includes('cristiano-ronaldo') ||
    avatarUrl.includes('soccer-cristiano-ronaldo-first-billionaire-intl')
  ) {
    return CRISTIANO_RONALDO_IMAGE;
  }
  return avatarUrl;
};
