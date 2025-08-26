'use client';

// import { useRouter } from 'nextjs-toploader/app';
import ActionCards from './Partials/ActionCards';
import BillingInformation from './Partials/BillingInformation';
import TodaysAppointments from './Partials/TodaysAppointments';
import DaysSinceClientsLastSeen from './Partials/DaysSinceClientsLastSeen';
import ClientsByPayer from './Partials/ClientsByPayer';
import LoggedByStaff from './Partials/LoggedInStaff';
import UpcomingComplience from './Partials/UpcomingComplience';
import ClientsBySite from './Partials/ClientsBySite';
import DocumentsPendingReview from './Partials/DocumentsPendingReview';
import ClientsByStatus from './Partials/ClientsByStatus';
import ClientsByStatusTable from './Partials/ClientsByStatusTable';
import ClientAuthorizations from './Partials/ClientAuthorizations';
import Training from './Partials/Training';
import StaffNotLoggedIn from './Partials/StaffNotLoggedIn';

export default function AdminDashboard() {
  // const router = useRouter();
  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='p-6 mx-auto max-w-[1350px]'>
        {/* Action Cards */}
        <ActionCards />

        {/* Dashboard Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Today's Appointments */}
          <TodaysAppointments />

          {/* Logged in Staff */}
          <LoggedByStaff />

          {/* Documents Pending Review */}
          <DocumentsPendingReview />

          {/* Billing Information */}
          <BillingInformation />
        </div>
      </main>
    </div>
  );
}
