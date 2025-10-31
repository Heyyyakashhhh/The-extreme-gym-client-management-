import React from 'react';
import { Client } from '../types';
import { ClientList } from './ClientList';
import { SearchIcon } from './Icons';

interface DashboardProps {
  activeClients: Client[];
  expiredClients: Client[];
  onRenewClient: (client: Client) => void;
  onEditClient: (client: Client) => void;
  onDeleteClient: (client: Client) => void;
  expiringSoonCount: number;
  totalRevenue: number;
  activeClientsCount: number;
  expiredClientsCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const StatCard: React.FC<{title: string, value: string | number, color: string, isCurrency?: boolean}> = ({ title, value, color, isCurrency = false }) => (
    <div className={`bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 ${color}`}>
        <p className="text-sm text-gray-400 font-medium">{title}</p>
        <p className="text-3xl font-bold text-white mt-1">
          {isCurrency ? `₹${Number(value).toLocaleString('en-IN')}` : value}
        </p>
    </div>
)

export const Dashboard: React.FC<DashboardProps> = ({ 
    activeClients,
    expiredClients,
    onRenewClient, 
    onEditClient, 
    onDeleteClient, 
    expiringSoonCount,
    totalRevenue,
    activeClientsCount,
    expiredClientsCount,
    searchQuery,
    onSearchChange
}) => {

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-extrabold text-white">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Memberships" value={activeClientsCount} color="border-green-500" />
        <StatCard title="Expired Memberships" value={expiredClientsCount} color="border-red-500" />
        <StatCard title="Total Revenue (Active)" value={totalRevenue} color="border-purple-500" isCurrency />
        <StatCard title="Expiring Soon (Next 7d)" value={expiringSoonCount} color="border-yellow-500" />
      </div>
      
       <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <h3 className="text-2xl font-bold text-cyan-400">Client Roster</h3>
          <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchIcon className="w-5 h-5 text-gray-400" />
              </span>
              <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full md:w-72 bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 pl-10 pr-4 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  aria-label="Search clients by name"
              />
          </div>
        </div>
        <ClientList clients={activeClients} onRenew={onRenewClient} onEdit={onEditClient} onDelete={onDeleteClient} />
      </div>
      
      {expiredClients.length > 0 && (
         <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                <h3 className="text-2xl font-bold text-red-400">Expired Memberships</h3>
            </div>
            <ClientList clients={expiredClients} onRenew={onRenewClient} onEdit={onEditClient} onDelete={onDeleteClient} />
        </div>
      )}

    </div>
  );
};