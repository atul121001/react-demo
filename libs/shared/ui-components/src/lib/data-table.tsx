import React, { useState, useMemo } from 'react';

export interface DataTableColumn {
  key: string;
  title: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface DataTableProps {
  data: any[];
  columns: DataTableColumn[];
  pageSize?: number;
  searchable?: boolean;
}

export function DataTable({ data, columns, pageSize = 10, searchable = true }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  // Heavy data processing for search and sort
  const processedData = useMemo(() => {
    let filtered = data;
    
    // Search filtering
    if (searchTerm && searchable) {
      filtered = data.filter(row =>
        columns.some(col => {
          const value = row[col.key];
          return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }
    
    // Sorting
    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return filtered;
  }, [data, columns, searchTerm, sortField, sortDirection, searchable]);

  // Pagination
  const totalPages = Math.ceil(processedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = processedData.slice(startIndex, startIndex + pageSize);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {searchable && (
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              width: '300px'
            }}
          />
        </div>
      )}
      
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            {columns.map(col => (
              <th
                key={col.key}
                style={{
                  padding: '12px',
                  border: '1px solid #ddd',
                  textAlign: 'left',
                  cursor: col.sortable ? 'pointer' : 'default',
                  backgroundColor: sortField === col.key ? '#e0e0e0' : '#f5f5f5'
                }}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                {col.title}
                {col.sortable && sortField === col.key && (
                  <span style={{ marginLeft: '5px' }}>
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
              {columns.map(col => (
                <td key={col.key} style={{ padding: '12px', border: '1px solid #ddd' }}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {totalPages > 1 && (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            First
          </button>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            Previous
          </button>
          <span style={{ padding: '8px 12px' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            Next
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
}
