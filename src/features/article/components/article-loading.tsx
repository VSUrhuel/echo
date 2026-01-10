export default function ArticleLoading() {
    return (
        <div className="bg-background min-h-screen">
        {/* Back Navigation Skeleton */}
        <div className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse hidden sm:block"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Skeleton */}
            

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Main Content Skeleton */}
              <div className="lg:w-2/3 space-y-8">
                {/* Stats Bar Skeleton */}
                <div className="mb-10 lg:mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              </div>
              
              <div className="mb-8">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-4 w-3/4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4 w-1/2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/4"></div>
              </div>

              {/* Author Card Skeleton */}
              <div className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 mb-8 border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
                  </div>
                </div>
              </div>

              {/* Cover Image Skeleton */}
              <div className="relative aspect-video w-full rounded-2xl bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse"></div>
            </div>
                <div className="flex items-center gap-6 py-6 px-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                      <div className="space-y-1">
                        <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="w-10 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Content Skeleton */}
                <div className="bg-card rounded-2xl border border-border p-8 space-y-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
                    </div>
                  ))}
                </div>

                {/* Tags Skeleton */}
                <div className="bg-card rounded-2xl border border-border p-8">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/4 mb-4"></div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Skeleton */}
              <div className="lg:w-1/3 space-y-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-card rounded-2xl border border-border p-6">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2 mb-6"></div>
                    <div className="space-y-4">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
}