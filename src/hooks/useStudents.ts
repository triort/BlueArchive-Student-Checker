import { useState, useCallback } from 'react';
import studentsData from '../assets/students.json';
import { Student } from '../types';

const initialStudents = studentsData.map(student => ({
  ...student,
  rarity: Number(student.rarity),
  owned: false,
}));

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);

  const toggleOwnership = useCallback((id: string) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === id ? { ...student, owned: !student.owned } : student
      )
    );
  }, []);

  const toggleAllByRarity = useCallback((rarity: string, owned: boolean) => {
    const rarityMap: { [key: string]: number } = { '☆': 1, '☆☆': 2, '☆☆☆': 3 };
    const rarityNumber = rarityMap[rarity];
    if (rarityNumber) {
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.rarity === rarityNumber ? { ...student, owned } : student
        )
      );
    }
  }, []);

  const ownedCount = students.filter(student => student.owned).length;
  const totalCount = students.length;
  const ownershipPercentage = totalCount > 0 ? parseFloat((ownedCount / totalCount * 100).toFixed(1)) : 0;

  return {
    students,
    toggleOwnership,
    toggleAllByRarity,
    ownedCount,
    totalCount,
    ownershipPercentage,
  };
};
