
export const getListOfRooms = () => {
  return Promise.resolve(([
    {
      id: 1,
      name: 'general' 
    },
    {
      id: 2,
      name: 'design'
    },
    {
      id: 3,
      name: 'coding'
    },
    {
      id: 4,
      name: 'random'
    },
  ]));
} 