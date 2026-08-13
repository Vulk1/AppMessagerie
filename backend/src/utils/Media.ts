const DEFAULT_AVATARS_COUNT = 10;

/*export function getRandomAvatar(): string {
  const index = Math.floor(Math.random() * DEFAULT_AVATARS_COUNT) + 1;
  return `avatars/default/avatar${index}.webp`;
}*/

// Vérifier que l'accessibilité à cloudflare R2!
export function getRandomAvatar() : string {
  return `${process.env.R2_PUBLIC_BASE_URL}/avatars/default/avatar1.png`;
}