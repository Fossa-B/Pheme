export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);

  if (diffDays >= 2) return `Hace ${diffDays} días`;
  if (diffDays === 1) return `Ayer`;
  if (diffHr >= 1) return `Hace ${diffHr} ${diffHr === 1 ? 'hora' : 'horas'}`;
  if (diffMin >= 1) return `Hace ${diffMin} ${diffMin === 1 ? 'minuto' : 'minutos'}`;
  return 'Hace segundos';
}