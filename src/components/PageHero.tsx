interface PageHeroProps {
  title: string;
  imageUrl: string;
}

export default function PageHero({ title, imageUrl }: PageHeroProps) {
  return (
    <div
      className="relative w-full flex items-end"
      style={{
        height: '340px',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }} />
      {/* Title bottom-left */}
      <div className="relative z-10 px-10 pb-8">
        <h1
          className="text-white font-bold"
          style={{ fontSize: '2.5rem', lineHeight: 1.1, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
