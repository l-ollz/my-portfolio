import Link from 'next/link';
import { getList } from 'libs/microcms';
export default async function KairanbanPage() {
  const { contents } = await getList();

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        read my kairanban
      </h1>
      {contents
        .sort((a, b) => {
          if (new Date(a.createdAt) > new Date(b.createdAt)) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.id}
            className="flex flex-col space-y-1 mb-4"
            href={`/kairanban/${post.id}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
    </section>
  );
}
