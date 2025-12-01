// Prioritize apps: SuperCloner first, then apps with affiliate links, then the rest
export const useAppSort = () => {
  const prioritizeApps = (apps: any[]) => {
    return [...apps].sort((a, b) => {
      // SuperCloner always first
      if (a.slug === 'supercloner') return -1
      if (b.slug === 'supercloner') return 1

      // Apps with affiliate links come before those without
      const aHasAffiliate = !!a.affiliateLink && a.affiliateLink !== a.website
      const bHasAffiliate = !!b.affiliateLink && b.affiliateLink !== b.website

      if (aHasAffiliate && !bHasAffiliate) return -1
      if (!aHasAffiliate && bHasAffiliate) return 1

      return 0
    })
  }

  const sortWithPriority = (apps: any[], sortBy: string) => {
    // First apply the requested sort
    let sorted = [...apps]

    switch (sortBy) {
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'reviews':
        sorted.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'price-low':
        sorted.sort((a, b) => (a.pricing?.startingPrice || 0) - (b.pricing?.startingPrice || 0))
        break
      case 'price-high':
        sorted.sort((a, b) => (b.pricing?.startingPrice || 0) - (a.pricing?.startingPrice || 0))
        break
    }

    // Then apply priority (SuperCloner first, affiliate links prioritized)
    return prioritizeApps(sorted)
  }

  return {
    prioritizeApps,
    sortWithPriority
  }
}
