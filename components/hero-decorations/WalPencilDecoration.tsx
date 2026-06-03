export default function WalPencilDecoration({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <div className="wal-pencil">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decorations/walpy.svg"  className="wal-pencil-walpy"  width={103} height={103} alt="" aria-hidden="true" style={{ transform: 'rotate(0.42deg)' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decorations/pencil.svg" className="wal-pencil-pencil" width={93}  height={93}  alt="" aria-hidden="true" />
      </div>
    </div>
  );
}
