'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, CheckIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { getReportingEntities } from '@/api/search/api';
import { useRouter } from 'next/navigation';

const HealthSystemSearch = () => {
  const router = useRouter();

  const [openCare, setOpenCare] = useState(false);
  const [localCareQuery, setLocalCareQuery] = useState('');
  const [careOptions, setCareOptions] = useState<string[]>([]);
  const [loadingCare, setLoadingCare] = useState(false);
  const [careLoaded, setCareLoaded] = useState(false);

  const careFieldRef = useRef<HTMLDivElement>(null);
  const [careMenuWidth, setCareMenuWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (careFieldRef.current)
      setCareMenuWidth(careFieldRef.current.offsetWidth);
  }, [careFieldRef.current]);

  useEffect(() => {
    if (!openCare && localCareQuery.length < 2) { // Only fetch when open or query is at least 2 chars
       setCareOptions([]);
       setCareLoaded(false);
       return;
    }
    
    let active = true;
    setLoadingCare(true);
    // Use localCareQuery for fetching
    getReportingEntities(localCareQuery)
      .then((res) => active && setCareOptions(res.data))
      .catch(() => active && setCareOptions([]))
      .finally(() => {
        if (active) {
          setLoadingCare(false);
          setCareLoaded(true);
        }
      });
    return () => {
      active = false;
    };
  }, [openCare, localCareQuery]); // Depend on openCare and localCareQuery

  const handleCareSelect = (value: string) => {
    setLocalCareQuery(value);
    setOpenCare(false);
    router.push('/'); // Redirect to homepage after selecting an option
  };

  // Redirection logic on Enter key press or click on the input when empty/not selecting
  const handleButtonClick = () => {
    if (!openCare) {
      // Redirect to homepage on click if dropdown is not already open
       router.push('/');
    }
  };

  return (
    <div className="mb-6" ref={careFieldRef}>
      <div className="relative">
        <DropdownMenu open={openCare} onOpenChange={setOpenCare}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full no-focus-outline hover:cursor-pointer justify-between text-lg font-normal px-0 border-none shadow-none hover:bg-transparent truncate focus:outline-none focus:ring-0 text-[#03363d]"
              onClick={handleButtonClick}
            >
              <span className="flex items-center gap-2">
                {loadingCare ? (
                  <Loader2
                    size={24}
                    className="animate-spin !w-6 !h-6 ml-2 mr-2 flex-shrink-0"
                  />
                ) : (
                  <Search
                    className="ml-2 mr-2 !w-6 !h-6 text-[#03363d] flex-shrink-0"
                  />
                )}
                {localCareQuery ? localCareQuery : "Search care..."}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-full p-0"
            style={careMenuWidth ? { width: careMenuWidth } : {}}
            onCloseAutoFocus={(e) => e.preventDefault()} // Corrected prop
          >
            <div className="px-2 py-2">
              <Input
                placeholder="Search care..."
                value={localCareQuery}
                onChange={(e) => setLocalCareQuery(e.target.value)}
                onKeyDown={(e) => {
                   if (e.key === 'Enter') {
                      // Prevent form submission if it's part of a form
                      e.preventDefault();
                      // Optionally: perform a search based on the query on Enter
                      // For now, we'll just close the dropdown and potentially redirect
                       if (localCareQuery) { // If there's a query, might want to search
                          // Implement search logic or redirect with query
                          router.push('/'); // Redirect to homepage
                       } else {
                           setOpenCare(false); // Just close if no query
                       }
                   }
                }}
                className="mb-2"
                autoFocus
              />
              <div className="max-h-48 w-full overflow-y-auto">
                {loadingCare ? (
                  <div className="text-center py-4 text-gray-500">
                    Loading...
                  </div>
                ) : careLoaded && careOptions.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    No care found.
                  </div>
                ) : (
                  !loadingCare &&
                  careOptions.map((name) => (
                    <DropdownMenuItem
                      key={name}
                      onSelect={() => handleCareSelect(name)}
                      // Prevent the dropdown from closing immediately after selecting
                      onPointerMove={e => e.preventDefault()}
                    >
                      {name}
                      {localCareQuery === name && (
                        <CheckIcon className="ml-auto h-4 w-4 opacity-100" />
                      )}
                    </DropdownMenuItem>
                  ))
                )}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default HealthSystemSearch; 