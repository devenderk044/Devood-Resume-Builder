import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { defaultResume } from './defaultResume';

const DEFAULT_TEMPLATE_ID = 'modern';

export const useResumeStore = create(
  persist(
    (set) => ({
      resume: defaultResume,
      template: DEFAULT_TEMPLATE_ID,
      currentResumeId: null,
      isDirty: false,
      setResume: (resume) =>
        set((s) => ({
          resume: typeof resume === 'function' ? resume(s.resume) : resume,
          isDirty: true,
        })),
      patchResume: (partial) =>
        set((s) => ({ resume: { ...s.resume, ...partial }, isDirty: true })),
      setTemplate: (template) => set({ template }),
      setCurrentResumeId: (currentResumeId) => set({ currentResumeId }),
      resetResume: () => set({ resume: defaultResume, isDirty: false }),
      markClean: () => set({ isDirty: false }),
    }),
    { name: 'resume-store' },
  ),
);
