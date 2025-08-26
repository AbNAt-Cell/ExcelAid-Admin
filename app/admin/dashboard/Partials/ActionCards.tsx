'use client';
import { useRouter } from 'nextjs-toploader/app';
import { Building2, ChevronRight, Users2, User } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function ActionCards() {
  const router = useRouter();

  const cards = [
    {
      icon: <Building2 className='h-6 w-6' />,
      title: 'Site',
      count: '1',
      description: 'Auspicious Commynity Service',
      onClick: () => {},
    },
    {
      icon: <Users2 className='h-6 w-6' />,
      title: 'Doctors',
      count: '10',
      description: '1 online now',
      onClick: () => {},
    },
    {
      icon: <User className='h-6 w-6' />,
      title: 'Client Onboarded',
      count: '15',
      description: '2 upcoming appointments',
      onClick: () => router.push('/admin/clients'),
    },
    // {
    //   icon: <Building2 className='h-6 w-6' />,
    //   title: 'Total Billing',
    //   count: '$0.00',
    //   description: '0 Submissions today',
    //   onClick: () => {},
    // },
  ];

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6'>
      {cards.map((card, index) => (
        <Card
          key={index}
          className='bg-[#121212] text-white p-6 rounded-md cursor-pointer hover:bg-slate-800 transition-colors'
          onClick={card.onClick}
        >
          <div className='flex justify-between items-start'>
            <div className='flex-1'>
              <div className='flex items-center mb-4'>
                <div className='flex justify-center items-center rounded-full bg-[#E7EAF017] h-12 w-12 mr-2'>
                  {card.icon}
                </div>
              </div>
              <h3 className='text-xl font-semibold mb-1'>{card.title}</h3>
              <p className='text-2xl font-bold mb-1'>{card.count}</p>
              <p className='text-sm text-gray-300'>{card.description}</p>
            </div>
            <ChevronRight className='h-5 w-5 text-gray-400' />
          </div>
        </Card>
      ))}
    </div>
  );
}
