import Link from 'next/link';
import Image from 'next/image';

export default function Book({ book }) {

  const { title, slug, author, thumbnail, description} = book.fields;
  return (
    <div className="card ">
      <div className="featured">
        <Image 
          src={'https:' + thumbnail.fields.file.url}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
        />
      </div>
      <div className="content">
        <div className="info">
          <h4>{ title }</h4>
          <p>{ author }</p>
        </div>
        <div className="actions">
          <Link href={'/books/' + slug}><a>Read It</a></Link>
        </div>
      </div> 
    </div>
  )
} 
 