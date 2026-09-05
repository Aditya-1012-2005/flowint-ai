'use client';

import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '@/app/actions/auth';

export function LogoutButton() {
  return (
    <form action={logout}>
      <Button type="submit" variant="outline" size="sm">
        <LogOut className="size-4" />
        Sign out
      </Button>
    </form>
  );
}
