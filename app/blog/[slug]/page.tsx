// import { Blog } from 'libs/microcms';
import { Suspense, cache } from 'react';
import { notFound } from 'next/navigation';
import { getDetail } from 'libs/microcms';
import parse from 'html-react-parser';

export default async function Blog({ params }) {
  const contentId = params.slug;
  let post = await getDetail(contentId);
  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            content: post.content,
          }),
        }}
      />
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {post.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {post.publishedAt || post.createdAt}
          </p>
        </Suspense>
      </div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        {parse(post.content)}
      </article>
    </section>
  );
}
