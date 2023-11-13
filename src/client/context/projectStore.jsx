import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useProjectStore = create(
  persist(
    (set) => ({
      expanded: false,
      newTitle: '',
      workingData: [],
      setWorkingData: (data) => set({ workingData: data }),
      setNewTitle: (title) => set({ newTitle: title }),
      setExpanded: (item) => set({ expanded: item }),
    }),
    {
      name: 'project-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export default useProjectStore;
