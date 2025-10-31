import React from 'react';
import { Client } from '../types';
import { ClientList } from './ClientList';

interface DashboardProps {
  clients: Client[];
  onRenewClient: (client: Client) => void;
  onEditClient: (client: Client) => void;
  onDeleteClient: (client: Client) => void;
  expiringSoonCount: number;
}

const StatCard: React.FC<{title: string, value: string | number, color: string}> = ({ title, value, color }) => (
    <div className={`bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 ${color}`}>
        <p className="text-sm text-gray-400 font-medium">{title}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
    </div>
)

export const Dashboard: React.FC<DashboardProps> = ({ clients, onRenewClient, onEditClient, onDeleteClient, expiringSoonCount }) => {
    const now = new Date();
    const todayUTCStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const activeClients = clients.filter(c => new Date(c.end_date) >= todayUTCStart).length;

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-extrabold text-white">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Clients" value={clients.length} color="border-cyan-500" />
        <StatCard title="Active Memberships" value={activeClients} color="border-green-500" />
        <StatCard title="Expiring Tomorrow" value={expiringSoonCount} color="border-yellow-500" />
      </div>
      
      <ClientList clients={clients} onRenew={onRenewClient} onEdit={onEditClient} onDelete={onDeleteClient} />
    </div>
  );
};