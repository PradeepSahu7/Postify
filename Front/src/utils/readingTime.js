export const calculateReadingTime = (content) => {
  // Handle undefined or null content
  if (!content) return 0;

  const minWordRead = 200; // Average reading speed (words per minute)

  // Split by spaces to count words properly
  const words = content.split(/\s+/);

  // Calculate reading time in minutes
  const contentlen = words.length / minWordRead;

  // Return minimum 1 minute, or rounded up value
  const readTime = Math.max(1, Math.ceil(contentlen));
  return readTime;
};
