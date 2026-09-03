export default function WalPencilDecoration({ className = '', variant = 'default' }: { className?: string; variant?: 'default' | 'ai-impact' }) {
  const suffix = variant === 'ai-impact' ? '-yellow-outline' : '';
  return (
    <div className={className}>
      <div className="wal-pencil">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/decorations/walpy${suffix}.svg`} className="wal-pencil-walpy" width={103} height={103} alt="" aria-hidden="true" style={{ transform: 'rotate(0.42deg)' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/decorations/pencil${suffix}.svg`} className="wal-pencil-pencil" width={93} height={93} alt="" aria-hidden="true" />
      </div>
    </div>
  );
}
