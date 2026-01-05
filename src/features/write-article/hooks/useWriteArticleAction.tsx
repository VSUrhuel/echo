// hooks/useWriteArticleAction.ts
import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';
import { ArticleFormData } from '@/types';
import { toast } from 'sonner';

export const useWriteArticleAction = () => {
  const supabase = createClient();
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    content: '',
    slug: '',
    category: '',
    tags: [],
    cover_image_url: '',
  });
  const [tagInput, setTagInput] = useState('');

  const handlePublishArticle = async () => {
    await handleSaveArticle("published");
  }

  const handleDraftArticle = async () => {
    await handleSaveArticle("draft");
  }

  const handleSaveArticle = async (status: string) => {
    try {
        console.log(formData);
        if(formData.title === '' || formData.content === '' || formData.category === '' || formData.tags.length === 0) {
            throw new Error('Please fill in all fields');
        }
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error('You must be logged in to publish an article');
        }

        const currentUser = user.id;
        const article = {
            title: formData.title,
            content: formData.content,
            slug: formData.slug,
            category: formData.category,
            tags: formData.tags as string[],
            cover_image_url: formData.cover_image_url,
        } as ArticleFormData;
        let publishedAt = null;
        if(status === "draft") {
            publishedAt = null;
        } else {
            publishedAt = new Date().toISOString();
        }
      const { data, error } = await supabase
        .from('articles')
        .insert([
          {
            ...article,
            author_id: currentUser,
            status: status,
            published_at: publishedAt,
            views_count: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) {
        if (error?.code === '23505') {
        // Optional: Check if the error message mentions "slug" to be sure
        if (error.message?.includes('slug') || error.details?.includes('slug')) {
            toast.error('This URL Slug already exists. Please click "Generate" to get a new unique one. Or change the article title');
        } else {
            toast.error('A record with this unique ID already exists.');
        }
        } 
        // Handle other generic errors
        else {
            toast.error(error.message || 'An unexpected error occurred. Please try again.');
        }
        throw error;
      }

      toast.success('Article published successfully!');
    } catch (error) {
      toast.error('Error publishing article: ' + error);
    }
  };

  const generateSlug = () => {
    if (!formData.title.trim()) return;
    
    setIsGeneratingSlug(true);
    setTimeout(() => {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
      setIsGeneratingSlug(false);
    toast.success('Slug generated successfully');
    }, 500);
  };

  // Handle tag management
  const handleAddTag = (e?: React.KeyboardEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleInputChange = (field: keyof ArticleFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);

    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        const { data, error: uploadError } = await supabase.storage
        .from('article-images') 
        .upload(fileName, file);

        if (uploadError) {
        throw uploadError; 
        }

        const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(fileName);

        setFormData(prev => ({ ...prev, cover_image_url: publicUrl }));

        toast.success('Image uploaded successfully');
        return publicUrl;



    } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Error uploading image');
        throw error;
    } finally {
        setIsUploading(false);
    }
    };
  

  return {
    // State
    isUploading,
    formData,
    isGeneratingSlug,
    tagInput,
    
    // Setters
    setFormData,
    setIsGeneratingSlug,
    setTagInput,
    
    // Actions
    generateSlug,
    handleAddTag,
    handleRemoveTag,
    handleInputChange,
    handleImageUpload,
    handlePublishArticle,
    handleDraftArticle
  };
};