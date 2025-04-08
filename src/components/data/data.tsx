'use client';

import React, { useState, useEffect } from 'react';
import { 
  getHealthcareRecords, 
  getUniqueStates
} from '@/api/sanity/queries';
import { HealthcareRecord, Pagination } from '@/types/sanity/sanity-types';

interface FiltersState {
  state: string;
  minRate: string;
  providerName: string;
}

export default function HealthcareDataTable(): React.ReactElement {
  const [data, setData] = useState<HealthcareRecord[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0
  });
  
  const [filters, setFilters] = useState<FiltersState>({
    state: '',
    minRate: '',
    providerName: ''
  });
  
  // Fetch data whenever page or filters change
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const result = await getHealthcareRecords({
          page: pagination.page,
          limit: pagination.limit,
          ...filters
        });
        
        setData(result.data);
        setPagination(result.pagination);
      } catch (error) {
        console.error('Error fetching healthcare data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [pagination.page, pagination.limit, filters]);
  
  // Fetch states for filtering
  useEffect(() => {
    async function fetchStates() {
      try {
        const uniqueStates = await getUniqueStates();
        setStates(uniqueStates);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    }
    
    fetchStates();
  }, []);
  
  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  };
  
  // Handle pagination
  const handlePrevPage = () => {
    if (pagination.page > 1) {
      setPagination(prev => ({ ...prev, page: prev.page - 1 }));
    }
  };
  
  const handleNextPage = () => {
    if (pagination.page < pagination.pages) {
      setPagination(prev => ({ ...prev, page: prev.page + 1 }));
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <select
            name="state"
            value={filters.state}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All States</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Rate ($)
          </label>
          <input
            type="number"
            name="minRate"
            value={filters.minRate}
            onChange={handleFilterChange}
            placeholder="Min rate"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Provider Name
          </label>
          <input
            type="text"
            name="providerName"
            value={filters.providerName}
            onChange={handleFilterChange}
            placeholder="Search providers"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
      
      {/* Data Table */}
      {!loading && data.length > 0 && (
        <>
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{item.provider_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.billing_code}</td>
                    <td className="px-6 py-4">{item.billing_code_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${parseFloat(item.negotiated_rate.toString()).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.provider_city}, {item.provider_state}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {data.length} of {pagination.total || 0} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={pagination.page <= 1}
                className="px-4 py-2 border rounded text-sm font-medium disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-500">
                Page {pagination.page} of {pagination.pages || 1}
              </span>
              <button
                onClick={handleNextPage}
                disabled={pagination.page >= pagination.pages}
                className="px-4 py-2 border rounded text-sm font-medium disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
      
      {/* No Results */}
      {!loading && data.length === 0 && (
        <div className="text-center py-10 bg-white rounded shadow">
          <p className="text-gray-500">No results found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}