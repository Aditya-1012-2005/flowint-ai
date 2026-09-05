import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-primary font-display text-5xl font-extrabold">404</p>
      <h1 className="text-foreground mt-3 text-2xl font-bold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground mt-2">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Button
        render={<Link href="/" />}
        nativeButton={false}
        className="mt-6 rounded-full px-6 font-semibold"
      >
        Back to home
      </Button>
    </div>
  );
}
