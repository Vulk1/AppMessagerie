const DEFAULT_AVATARS_COUNT = 10;

export function getRandomAvatar(): string {
  const index = Math.floor(Math.random() * DEFAULT_AVATARS_COUNT) + 1;
  return `avatars/default/avatar${index}.webp`;
}