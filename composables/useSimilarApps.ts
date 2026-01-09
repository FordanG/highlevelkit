/**
 * Composable for finding similar/related apps based on multiple criteria
 * Uses a scoring algorithm to rank apps by similarity
 */

interface App {
  id: string
  name: string
  slug: string
  category: string[]
  userType: string[]
  useCase: string[]
  pricing: {
    model: string
    startingPrice?: number
    currency: string
  }
  rating: number
  reviewCount: number
  features?: string[]
}

interface ScoredApp extends App {
  similarityScore: number
}

export const useSimilarApps = () => {
  /**
   * Calculate similarity score between two apps
   * Higher score = more similar
   */
  const calculateSimilarityScore = (sourceApp: App, targetApp: App): number => {
    let score = 0

    // Category overlap (highest weight - 3 points per match)
    const categoryOverlap = targetApp.category.filter(c =>
      sourceApp.category.includes(c)
    ).length
    score += categoryOverlap * 3

    // User type overlap (2 points per match)
    if (sourceApp.userType && targetApp.userType) {
      const userTypeOverlap = targetApp.userType.filter(u =>
        sourceApp.userType.includes(u)
      ).length
      score += userTypeOverlap * 2
    }

    // Use case overlap (2 points per match)
    if (sourceApp.useCase && targetApp.useCase) {
      const useCaseOverlap = targetApp.useCase.filter(u =>
        sourceApp.useCase.includes(u)
      ).length
      score += useCaseOverlap * 2
    }

    // Same pricing model (1 point)
    if (sourceApp.pricing?.model === targetApp.pricing?.model) {
      score += 1
    }

    // Similar price range (1 point if within 50% of each other)
    if (sourceApp.pricing?.startingPrice && targetApp.pricing?.startingPrice) {
      const priceDiff = Math.abs(
        sourceApp.pricing.startingPrice - targetApp.pricing.startingPrice
      )
      const avgPrice = (sourceApp.pricing.startingPrice + targetApp.pricing.startingPrice) / 2
      if (priceDiff / avgPrice <= 0.5) {
        score += 1
      }
    }

    // Feature overlap (0.5 points per match, max 3 points)
    if (sourceApp.features && targetApp.features) {
      const featureOverlap = targetApp.features.filter(f =>
        sourceApp.features?.some(sf =>
          sf.toLowerCase().includes(f.toLowerCase()) ||
          f.toLowerCase().includes(sf.toLowerCase())
        )
      ).length
      score += Math.min(featureOverlap * 0.5, 3)
    }

    // Boost for highly rated apps
    if (targetApp.rating >= 4.5) {
      score += 0.5
    }

    return score
  }

  /**
   * Get similar apps based on multiple criteria
   * @param sourceApp - The app to find similar apps for
   * @param allApps - All available apps to search through
   * @param limit - Maximum number of similar apps to return
   * @returns Array of similar apps sorted by similarity score
   */
  const getSimilarApps = (
    sourceApp: App,
    allApps: App[],
    limit: number = 4
  ): ScoredApp[] => {
    const scoredApps = allApps
      // Exclude the source app itself
      .filter(app => app.id !== sourceApp.id)
      // Calculate similarity scores
      .map(app => ({
        ...app,
        similarityScore: calculateSimilarityScore(sourceApp, app)
      }))
      // Filter out apps with no similarity
      .filter(app => app.similarityScore > 0)
      // Sort by score (highest first)
      .sort((a, b) => {
        // Primary sort by similarity score
        if (b.similarityScore !== a.similarityScore) {
          return b.similarityScore - a.similarityScore
        }
        // Secondary sort by rating
        return b.rating - a.rating
      })
      // Limit results
      .slice(0, limit)

    return scoredApps
  }

  /**
   * Get apps in the same category
   * @param categoryId - Category ID to filter by
   * @param allApps - All available apps
   * @param excludeAppId - App ID to exclude from results
   * @param limit - Maximum number of apps to return
   */
  const getAppsByCategory = (
    categoryId: string,
    allApps: App[],
    excludeAppId?: string,
    limit: number = 8
  ): App[] => {
    return allApps
      .filter(app =>
        app.category.includes(categoryId) &&
        app.id !== excludeAppId
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
  }

  /**
   * Get alternative apps (competitors/substitutes)
   * Focuses on apps with highest category overlap and similar pricing
   */
  const getAlternatives = (
    sourceApp: App,
    allApps: App[],
    limit: number = 4
  ): App[] => {
    return allApps
      .filter(app => {
        // Must share at least one category
        const hasCommonCategory = app.category.some(c =>
          sourceApp.category.includes(c)
        )
        // Exclude source app
        return hasCommonCategory && app.id !== sourceApp.id
      })
      .sort((a, b) => {
        // Sort by category overlap first
        const aOverlap = a.category.filter(c => sourceApp.category.includes(c)).length
        const bOverlap = b.category.filter(c => sourceApp.category.includes(c)).length
        if (bOverlap !== aOverlap) {
          return bOverlap - aOverlap
        }
        // Then by rating
        return b.rating - a.rating
      })
      .slice(0, limit)
  }

  return {
    getSimilarApps,
    getAppsByCategory,
    getAlternatives,
    calculateSimilarityScore
  }
}
