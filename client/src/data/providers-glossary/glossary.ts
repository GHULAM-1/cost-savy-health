import { GlossaryItem, SearchOption, StateOption } from "@/types/providers-glossary/glossary-types";

export function generateMockGlossaryData(type: string, count: number): GlossaryItem[] {
  const result: GlossaryItem[] = [];
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const states = ['California', 'Texas', 'Florida', 'New York', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'];
  
  for (let i = 1; i <= count; i++) {
    const letter = alphabet[Math.floor(Math.random() * alphabet.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    result.push({
      id: i,
      name: `${letter}${type} ${i}`,
      location: `City ${i % 20 + 1}, ${state}`,
      description: `This is a sample ${type.toLowerCase()} description.`,
      state: state
    });
  }
  
  return result.sort((a, b) => a.name.localeCompare(b.name));
}


export const mockStates: StateOption[] = [
  { id: 1, name: 'Alabama' },
  { id: 2, name: 'Alaska' },
  { id: 3, name: 'Arizona' },
  { id: 4, name: 'Arkansas' },
  { id: 5, name: 'California' },
  { id: 6, name: 'Colorado' },
  { id: 7, name: 'Connecticut' },
  { id: 8, name: 'Delaware' },
  { id: 9, name: 'Florida' },
  { id: 10, name: 'Georgia' },
  { id: 11, name: 'Hawaii' },
  { id: 12, name: 'Idaho' },
  { id: 13, name: 'Illinois' },
  { id: 14, name: 'Indiana' },
  { id: 15, name: 'Iowa' },
  { id: 16, name: 'Kansas' },
  { id: 17, name: 'Kentucky' },
  { id: 18, name: 'Louisiana' },
  { id: 19, name: 'Maine' },
  { id: 20, name: 'Maryland' },
];