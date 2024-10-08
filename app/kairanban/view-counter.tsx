export default function ViewCounter({
  id,
  allViews,
}: {
  id: string;
  allViews: {
    id: string;
    count: number;
  }[];
  trackView?: boolean;
}) {
  const viewsForId = allViews && allViews.find((view) => view.id === id);
  const number = new Number(viewsForId?.count || 0);

  return (
    <p className="text-neutral-600 dark:text-neutral-400">
      {`${number.toLocaleString()} views`}
    </p>
  );
}
