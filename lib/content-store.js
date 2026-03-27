import { defaultContent } from '@/data/defaultContent';

export const STORAGE_KEY = 'lojanias-admin-content';

export function mergeWithDefaults(content) {
  return {
    ...defaultContent,
    ...content,
    brand: { ...defaultContent.brand, ...(content?.brand || {}) },
    hero: { ...defaultContent.hero, ...(content?.hero || {}) },
    sensory: { ...defaultContent.sensory, ...(content?.sensory || {}) },
    story: { ...defaultContent.story, ...(content?.story || {}) },
    quiz: { ...defaultContent.quiz, ...(content?.quiz || {}) },
    finalCta: { ...defaultContent.finalCta, ...(content?.finalCta || {}) },
    footer: { ...defaultContent.footer, ...(content?.footer || {}) },
    valueProps: content?.valueProps || defaultContent.valueProps,
    featuredProducts: content?.featuredProducts || defaultContent.featuredProducts,
    testimonials: content?.testimonials || defaultContent.testimonials,
    brewTips: content?.brewTips || defaultContent.brewTips
  };
}

export function getDefaultContent() {
  return defaultContent;
}
