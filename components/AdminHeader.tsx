import React from 'react'
import Image from 'next/image'
import { Search, AlarmClock, Mail, Bell, PlusCircle, UserCircle, ChevronDown, LogOut, AtSign, User, UserCog } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'nextjs-toploader/app'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { getStoredUser, logout } from '@/hooks/auth'

const LogoutMenuItem = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <DropdownMenuItem
      onClick={handleLogout}
      className="text-red-600 focus:text-red-600 cursor-pointer"
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </DropdownMenuItem>
  );
};

const AdminHeader = () => {
  const pathname = usePathname();

  const isActivePath = (path: string) => {
    const currentPath = pathname?.split('/')[2];
    return currentPath === path ? 'bg-primary text-white' : '';
  }

  return (
    <header className="bg-white border-b">
      <div className='border-b'>
        <div className='mx-auto max-w-[1350px]'>
          <div className="flex items-center justify-between h-[80px] px-6 py-3">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/logo.svg"
                alt="excel connect logo"
                width={250}
                height={32}
                priority
              />
            </div>
            <div className="flex items-center gap-2">             
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className='text-primary hover:text-primary' asChild variant="ghost" size="icon">
                    <Bell className="h-6 w-6 cursor-pointer" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-52'>
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    No new notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button asChild variant="ghost" size="icon">
                    <UserCircle className="h-6 w-6 cursor-pointer" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1.5 text-sm">
                    <div className="font-medium flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      {getStoredUser()?.username}
                    </div>
                    <div className="text-muted-foreground flex items-center">
                      <AtSign className="mr-2 h-4 w-4" />
                      {getStoredUser()?.email}
                    </div>
                    <div className="text-xs mt-1 text-muted-foreground flex items-center">
                      <UserCog className="mr-2 h-4 w-4" />
                      Role: {getStoredUser()?.role}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <Link href="/admin/profile">                    
                    <DropdownMenuItem className='cursor-pointer text-blue-600 focus:text-blue-600'>
                      <UserCircle className="mr-2 h-4 w-4" />Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />        
                  <LogoutMenuItem />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto max-w-[1350px]'>
        <div className='flex items-center justify-between px-6 py-3'>
          <div className="flex flex-wrap flex-row items-center gap-4">
            <Link href="/admin/dashboard">
              <Button className={`${isActivePath('dashboard')} font-semibold rounded-sm text-[14px] h-7 w-22`} variant="pill" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/appointments">
              <Button className={`${isActivePath('appointments')} font-semibold rounded-sm text-[14px] h-7 w-22`} variant="pill" size="sm">
                Appointments
              </Button>
            </Link>
            <Link href="/admin/clients">
              <Button className={`${isActivePath('clients')} font-semibold rounded-sm text-[14px] h-7 w-22`} variant="pill" size="sm">
                Clients
              </Button>
            </Link>
            <Link href="/admin/register-a-doc">
              <Button className={`${isActivePath('register-a-doc')} font-semibold rounded-sm text-[14px] h-7 w-22`} variant="pill" size="sm">
                Register A Doctor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
