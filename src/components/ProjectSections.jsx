import RichText from './RichText.jsx';

export default function ProjectSection({ section }) {
  switch (section.type) {
    case 'video':
      return (
        <>
          {section.heading && <h2 className="section-heading">{section.heading}</h2>}
          <div className="video-wrap">
            <iframe
              src={`https://www-ccv.adobe.io/v1/player/ccv/${section.videoId}/embed?bgcolor=%23111111&lazyLoading=true&api_key=BehancePro2View`}
              allowFullScreen
              title={section.heading || 'Project video'}
            />
          </div>
        </>
      );

    case 'youtube':
      return (
        <>
          {section.heading && <h2 className="section-heading">{section.heading}</h2>}
          <div className="video-wrap">
            <iframe
              src={`https://www.youtube.com/embed/${section.videoId}`}
              allowFullScreen
              title={section.heading || 'Project video'}
            />
          </div>
        </>
      );

    case 'vimeo':
      return (
        <>
          {section.heading && <h2 className="section-heading">{section.heading}</h2>}
          <div className="video-wrap">
            <iframe
              src={`https://player.vimeo.com/video/${section.videoId}${section.hash ? `?h=${section.hash}` : ''}`}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              title={section.heading || 'Project video'}
            />
          </div>
        </>
      );

    case 'linkButton':
      return (
        <div className="link-btn-wrap">
          <a className="link-btn" href={section.href} target="_blank" rel="noreferrer">{section.label}</a>
        </div>
      );

    case 'phoneShots':
      return (
        <>
          {section.heading && <h2 className="section-heading">{section.heading}</h2>}
          <div className="phone-row">
            {section.shots.map((shot) => (
              <figure className="phone-shot" key={shot.src}>
                <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" />
                {shot.caption && (
                  <figcaption>
                    {shot.label && <span className="phone-shot-label">{shot.label}</span>}
                    {shot.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </>
      );

    case 'localVideo':
      return (
        <>
          {section.heading && <h2 className="section-heading">{section.heading}</h2>}
          <figure className={`phone-video${section.wide ? ' wide' : ''}`}>
            {/* preload="metadata": the file itself only downloads when played */}
            <video src={section.src} poster={section.poster} controls playsInline preload="metadata" />
            {section.caption && <figcaption>{section.caption}</figcaption>}
          </figure>
        </>
      );

    case 'imageGrid':
      return (
        <>
          {section.heading && <h2 className="section-heading">{section.heading}</h2>}
          {section.rows.map((row, i) => (
            <div className={`image-grid cols-${row.cols}`} key={i}>
              {row.images.map((img) => (
                <img key={img.src} src={img.src} alt={img.alt} loading="lazy" decoding="async" className={img.wide ? 'wide' : undefined} />
              ))}
            </div>
          ))}
        </>
      );

    case 'textBlock':
      return (
        <>
          {section.heading && <h2 className="section-heading">{section.heading}</h2>}
          <div className="text-block">
            {section.paragraphs.map((p, i) => (
              <p key={i}><RichText content={p} /></p>
            ))}
          </div>
        </>
      );

    case 'scriptCards':
      return (
        <>
          {section.heading && <h2 className="section-heading">{section.heading}</h2>}
          {section.cards.map((card) => (
            <div className="script-card" key={card.client}>
              <p className="script-client">Client: {card.client}</p>
              <div className="script-body">
                {card.paragraphs.map((spans, i) => (
                  <p key={i}><RichText content={spans} /></p>
                ))}
              </div>
            </div>
          ))}
        </>
      );

    case 'statGrid':
      return (
        <div className="stat-grid">
          {section.stats.map((stat) => (
            <div className="stat-card" key={stat.number}>
              <div className="stat-number">{stat.number}</div>
              <p>{stat.text}</p>
            </div>
          ))}
        </div>
      );

    case 'quotes':
      return (
        <>
          {section.quotes.map((q, i) => (
            <div className="quote-block" key={i}>
              &ldquo;{q.text}&rdquo;
              <p className="quote-note">{q.note}</p>
            </div>
          ))}
        </>
      );

    case 'persona':
      return (
        <>
          {section.heading && <h2 className="section-heading">{section.heading}</h2>}
          <div className="persona-card">
            <div className="persona-avatar">{section.initials}</div>
            <div>
              <p className="persona-name">{section.name}</p>
              <p className="persona-subtitle">{section.subtitle}</p>
              <div className="persona-body">
                {section.paragraphs.map((p, i) => (
                  <p key={i}><RichText content={p} /></p>
                ))}
              </div>
            </div>
          </div>
        </>
      );

    case 'priceCompare':
      return (
        <div className="price-compare">
          {section.cards.map((card) => (
            <div className={`price-card ${card.variant}`} key={card.airline}>
              <p className="price-airline">{card.airline}</p>
              {card.lines.map((line) => (
                <div className={`price-line${line.total ? ' price-total' : ''}`} key={line.label}>
                  <span>{line.label}</span><span>{line.value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      );

    case 'callout':
      return (
        <div className="callout">
          <RichText content={section.content} />
        </div>
      );

    default:
      return null;
  }
}
