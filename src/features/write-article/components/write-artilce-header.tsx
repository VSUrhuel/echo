"use client"
export default function WriteArticleHeader({isEdit}: {isEdit: boolean}) {
    return (
        <div className="mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{isEdit ? 'Edit Article' : 'Write Article'}</h1>
            <p className="text-gray-600 mt-2 dark:text-gray-400">{isEdit ? 'Edit and publish your article' : 'Create and publish a new article'}</p>
        </div>
    );
}