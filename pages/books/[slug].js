import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import NotFound from '../404';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({ 
    content_type: "book" 
  })

  const paths = res.items.map(item => {
    return {
      params: { slug: item.fields.slug }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'book',
    'fields.slug': params.slug
  });

  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { book: items[0] },
  }

}

export default function RecipeDetails({ book }) {
  if (!book) return <NotFound />;

  const { featuredImage, title, author, description } = book.fields;

  return (
    <div>
      <div className="banner">
        <Image 
          src={'https:' + featuredImage.fields.file.url}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
        />
        <h2>{ title }</h2>
      </div>

      <div className="info">
        <h3>Author: { author }</h3>
        <div>{documentToReactComponents(description)}</div>
      </div>
    </div>
  )
}