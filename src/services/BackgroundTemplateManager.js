/**
 * BackgroundTemplateManager
 * 
 * Manages the available photographic templates and handles pseudo-random
 * selection ensuring no immediate repetition, section stability, and smooth caching.
 */

export const BACKGROUND_TEMPLATES = [
  {
    id: 'tpl-1',
    name: 'Skyline Executive Overview',
    source: require('../../images/Empty_office_interior_shown_20260916092803.jpeg'),
    mood: 'Morning Daylight',
    tint: 'rgba(250, 252, 255, 0.92)',
    filter: 'contrast(102%) brightness(102%)',
  },
  {
    id: 'tpl-2',
    name: 'Modern Desk & Workspace',
    source: require('../../images/Camera_pans_across_office_desk_20260916092807.jpeg'),
    mood: 'Executive Focus',
    tint: 'rgba(245, 248, 255, 0.92)',
    filter: 'contrast(104%) brightness(100%)',
  },
  {
    id: 'tpl-3',
    name: 'Architectural City Skyline',
    source: require('../../images/Panning_office_background_20260916092814.jpeg'),
    mood: 'High-Tech Urban',
    tint: 'rgba(248, 250, 255, 0.91)',
    filter: 'contrast(105%) brightness(101%)',
  },
  {
    id: 'tpl-4',
    name: 'Corporate Headquarters Suite',
    source: require('../../images/Camera_panning_office_interior_20260916092818.jpeg'),
    mood: 'Corporate Boardroom',
    tint: 'rgba(250, 252, 255, 0.92)',
    filter: 'contrast(103%) brightness(103%)',
  },
  {
    id: 'tpl-5',
    name: 'Electric Blue Enterprise Suite',
    source: require('../../images/Empty_office_interior_shown_20260916092803.jpeg'),
    mood: 'Electric Sapphire',
    tint: 'rgba(240, 248, 255, 0.93)',
    filter: 'hue-rotate(5deg) contrast(106%)',
  },
  {
    id: 'tpl-6',
    name: 'Tech Innovation Room',
    source: require('../../images/Panning_office_background_20260916092814.jpeg'),
    mood: 'Deep Minimalist',
    tint: 'rgba(245, 250, 255, 0.92)',
    filter: 'brightness(98%) contrast(108%)',
  },
];

class BackgroundTemplateManager {
  constructor(templates = BACKGROUND_TEMPLATES) {
    this.templates = templates;
    this.sectionMap = new Map(); // sectionKey -> templateIndex
    this.currentTemplateIndex = 0;
    this.lastDirection = 'down';
  }

  /**
   * Get a template for a given section.
   * If section already has an assigned template, returns it for consistency.
   * Otherwise randomly selects one that is DIFFERENT from the previous one.
   */
  getTemplateForSection(sectionKey) {
    if (this.sectionMap.has(sectionKey)) {
      const idx = this.sectionMap.get(sectionKey);
      this.currentTemplateIndex = idx;
      return this.templates[idx];
    }

    const availableIndices = this.templates
      .map((_, i) => i)
      .filter((i) => i !== this.currentTemplateIndex);

    const nextIdx =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];

    this.sectionMap.set(sectionKey, nextIdx);
    this.currentTemplateIndex = nextIdx;
    return this.templates[nextIdx];
  }

  /**
   * Get template by direct index
   */
  getTemplateByIndex(index) {
    const safeIdx = Math.abs(index) % this.templates.length;
    this.currentTemplateIndex = safeIdx;
    return this.templates[safeIdx];
  }

  getAllTemplates() {
    return this.templates;
  }
}

export const templateManager = new BackgroundTemplateManager();
