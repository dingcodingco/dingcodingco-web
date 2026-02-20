/**
 * Helper functions for accessing track and course data
 */

import { tracks } from '@/data/tracks';
import { courses } from '@/data/courses';
import { Track, Course } from '@/types';

/**
 * Get a track by its ID
 * @param id - Track ID (e.g., 'ai-beginner')
 * @returns Track object or undefined if not found
 */
export function getTrackById(id: string): Track | undefined {
  return tracks.find((track) => track.id === id);
}

/**
 * Get all courses for a specific track
 * @param trackId - Track ID (e.g., 'ai-beginner')
 * @returns Array of courses belonging to the track, sorted by sortOrder
 */
export function getCoursesByTrack(trackId: string): Course[] {
  return courses
    .filter((course) => course.trackId === trackId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * Get all published courses across all tracks
 * @returns Array of published courses
 */
export function getPublishedCourses(): Course[] {
  return courses.filter((course) => course.status === 'published');
}

/**
 * Get all coming soon courses across all tracks
 * @returns Array of coming soon courses
 */
export function getComingSoonCourses(): Course[] {
  return courses.filter((course) => course.status === 'coming_soon');
}

/**
 * Get a course by its ID
 * @param id - Course ID (e.g., 'python-core')
 * @returns Course object or undefined if not found
 */
export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

/**
 * Get all tracks
 * @returns Array of all tracks
 */
export function getAllTracks(): Track[] {
  return tracks;
}

/**
 * Get all courses
 * @returns Array of all courses
 */
export function getAllCourses(): Course[] {
  return courses;
}
