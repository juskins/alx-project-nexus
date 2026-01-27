import { SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';

const FilterBar = () => {
  const [category, setCategory] = useState('');
  const [pay, setPay] = useState('');
  const [duration, setDuration] = useState('');
  const [time, setTime] = useState('');

  const handleClearAll = () => {
    setCategory('');
    setPay('');
    setDuration('');
    setTime('');
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      {/* Category Dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
      >
        <option value="">Select Category</option>
        <option value="event-planning">Event Planning</option>
        <option value="administrative">Administrative</option>
        <option value="research">Research</option>
        <option value="technology">Technology</option>
        <option value="customer-service">Customer Service</option>
        <option value="food-service">Food Service</option>
        <option value="marketing">Marketing</option>
        <option value="community-support">Community Support</option>
      </select>

      {/* Pay Dropdown */}
      <select
        value={pay}
        onChange={(e) => setPay(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
      >
        <option value="">Any Pay</option>
        <option value="10-15">$10 - $15/hour</option>
        <option value="15-20">$15 - $20/hour</option>
        <option value="20-25">$20 - $25/hour</option>
        <option value="25+">$25+/hour</option>
      </select>

      {/* Duration Dropdown */}
      <select
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
      >
        <option value="">Any Duration</option>
        <option value="1-2">1-2 hours</option>
        <option value="2-4">2-4 hours</option>
        <option value="4-8">4-8 hours</option>
        <option value="full-day">Full Day</option>
        <option value="ongoing">Ongoing</option>
      </select>

      {/* Time Dropdown */}
      <select
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
      >
        <option value="">Any Time</option>
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
        <option value="weekend">Weekend</option>
        <option value="flexible">Flexible</option>
      </select>

      {/* More Filters Button */}
      <button className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4" />
        More Filters
      </button>

      {/* Clear All Button */}
      <button
        onClick={handleClearAll}
        className="ml-auto px-4 py-2 text-orange-500 hover:text-orange-600 font-medium transition-colors"
      >
        Clear All
      </button>
    </div>
  );
};

export default FilterBar;
