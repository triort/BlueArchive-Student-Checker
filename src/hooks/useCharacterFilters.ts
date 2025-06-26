import { useState, useMemo } from 'react';
import { Student } from '../types';

export const useCharacterFilters = (students: Student[]) => {
  const [sortBy, setSortBy] = useState('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterRarity, setFilterRarity] = useState('all');
  const [filterElement, setFilterElement] = useState('all');
  const [filterOwned, setFilterOwned] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAndSortedCharacters = useMemo(() => {
    return students
      .filter(char => {
        const matchesSearch = char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (char.fullname?.toLowerCase() ?? '').includes(searchTerm.toLowerCase());
        const matchesRarity = filterRarity === 'all' || char.rarity.toString() === filterRarity;
        const matchesElement = filterElement === 'all' || char.attackType === filterElement;
        const matchesOwned = filterOwned === 'all' ||
          (filterOwned === 'owned' && char.owned) ||
          (filterOwned === 'notOwned' && !char.owned);
        return matchesSearch && matchesRarity && matchesElement && matchesOwned;
      })
      .sort((a, b) => {
        let comparison = 0;
        switch (sortBy) {
          case 'name': {
            comparison = a.name.localeCompare(b.name);
            break;
          }
          case 'rarity': {
            comparison = b.rarity - a.rarity;
            break;
          }
          case 'releaseDate': {
            comparison = new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
            break;
          }
          case 'element': {
            comparison = (a.attackType || '').localeCompare(b.attackType || '');
            break;
          }
          default: {
            comparison = new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
          }
        }
        return sortDirection === 'asc' ? comparison : -comparison;
      });
  }, [students, searchTerm, filterRarity, filterElement, filterOwned, sortBy, sortDirection]);

  return {
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    filterRarity,
    setFilterRarity,
    filterElement,
    setFilterElement,
    filterOwned,
    setFilterOwned,
    searchTerm,
    setSearchTerm,
    filteredAndSortedCharacters,
  };
};
