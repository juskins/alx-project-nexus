import { SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { jobs } from '@/constant';
import { useFilter } from '@/context/FilterContext';

const FilterBar = () => {
   const {
      category,
      setCategory,
      pay,
      setPay,
      duration,
      setDuration,
      time,
      setTime,
      location,
      setLocation,
      clearAll,
   } = useFilter();


   return (
      <div className="flex flex-wrap items-center gap-3 mb-8">
         {/* Category Dropdown */}
         <Select
            value={category}
            onValueChange={(value) => setCategory(value)}
         >
            <SelectTrigger className="w-full max-w-48 bg-white text-gray-700">
               <SelectValue placeholder="Select a category" />
            </SelectTrigger>

            <SelectContent>
               <SelectGroup>
                  <SelectLabel>Select Category</SelectLabel>
                  <SelectItem value="Event Planning">Event Planning</SelectItem>
                  <SelectItem value="Administrative">Administrative</SelectItem>
                  <SelectItem value="Research">Research</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Customer Service">Customer Service</SelectItem>
                  <SelectItem value="Food Service">Food Service</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
               </SelectGroup>
            </SelectContent>
         </Select>

         {/* Pay Dropdown */}
         <Select
            value={pay}
            onValueChange={(value) => setPay(value)}
         >
            <SelectTrigger className="w-full max-w-48 bg-white text-gray-700">
               <SelectValue placeholder="Select Pay" />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  <SelectLabel>Select Pay</SelectLabel>
                  <SelectItem value="0">Any Pay</SelectItem>
                  <SelectItem value="10-15">$10 - $15/hour</SelectItem>
                  <SelectItem value="15-20">$15 - $20/hour</SelectItem>
                  <SelectItem value="20-25">$20 - $25/hour</SelectItem>
                  <SelectItem value="25+">$25+/hour</SelectItem>
               </SelectGroup>
            </SelectContent>
         </Select>

         {/* Duration Dropdown */}
         <Select
            value={duration}
            onValueChange={(value) => setDuration(value)}
         >
            <SelectTrigger className="w-full max-w-48 bg-white text-gray-700">
               <SelectValue placeholder="Select Duration" />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  <SelectLabel>Select Duration</SelectLabel>
                  <SelectItem value="any">Any Duration</SelectItem>
                  <SelectItem value="1-2">1-2 hours</SelectItem>
                  <SelectItem value="2-4">2-4 hours</SelectItem>
                  <SelectItem value="4-8">4-8 hours</SelectItem>
                  <SelectItem value="full-day">Full Day</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
               </SelectGroup>
            </SelectContent>
         </Select>

         {/* Time Dropdown */}
         <Select
            value={time}
            onValueChange={(value) => setTime(value)}
         >
            <SelectTrigger className="w-full max-w-48 bg-white text-gray-700">
               <SelectValue placeholder="Select Time" />
            </SelectTrigger>
            <SelectContent className=''>
               <SelectGroup>
                  <SelectLabel>Select Time</SelectLabel>
                  <SelectItem value="any">Any Time</SelectItem>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="weekend">Weekend</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
               </SelectGroup>
            </SelectContent>
         </Select>

         {/* Location Dropdown */}  
         <Select
            value={location}
            onValueChange={(value) => setLocation(value)}>
            <SelectTrigger className="w-full max-w-48 bg-white text-gray-700">
               <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  <SelectLabel>Select Location</SelectLabel>
                  <SelectItem value="main-campus">Main Campus</SelectItem>
                  <SelectItem value="north-campus">North Campus</SelectItem>
                  <SelectItem value="south-campus">South Campus</SelectItem>
                  <SelectItem value="east-campus">East Campus</SelectItem>
                  <SelectItem value="west-campus">West Campus</SelectItem>
               </SelectGroup>
            </SelectContent>
         </Select>

         {/* Clear All Button */}
         <button
            onClick={clearAll}
            className="px-4 cursor-pointer py-2 text-red-600 hover:text-red-600 font-medium transition-colors"
         >
            Clear All
         </button>
      </div>
   );
};

export default FilterBar;
