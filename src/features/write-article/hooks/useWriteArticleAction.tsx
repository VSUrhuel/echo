// hooks/useWriteArticleAction.ts
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { ArticleFormData } from '@/types';
import { toast } from 'sonner';

export const useWriteArticleAction = (articleFormData?: ArticleFormData, propsArticleId?: number) => {
  const supabase = createClient();
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);
  const [formData, setFormData] = useState<ArticleFormData>(articleFormData || {
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    category: '',
    tags: [],
    cover_image_url: '',
  });
  const [tagInput, setTagInput] = useState('');
  const [articleId, setArticleId] = useState<number | null>(null);

  useEffect(() => {
    if (articleFormData) {
      setFormData(articleFormData);
    }
    if (propsArticleId) {
      setArticleId(propsArticleId);
    }
  }, [articleFormData, propsArticleId]);

  const handlePublishArticle = async () => {
    await handleSaveArticle("published");
  }

  const handleDraftArticle = async () => {
    await handleSaveArticle("draft");
  }

  const handleSaveArticle = async (status: string) => {
    try {
        if(formData.title === '' || formData.content === '' || formData.category === '' || formData.tags.length === 0) {
            throw new Error('Please fill in all fields');
        }
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error('You must be logged in to publish an article');
        }

        const currentUser = user.id;
        const articlePayload = {
            title: formData.title,
            content: formData.content,
            excerpt: formData.excerpt,
            slug: formData.slug,
            category: formData.category,
            tags: formData.tags as string[],
            cover_image_url: formData.cover_image_url,
            author_id: currentUser,
            status: status,
            published_at: status === "draft" && articleId === null ? null : new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        let result;

        if (articleId) {
            result = await supabase
                .from('articles')
                .update(articlePayload)
                .eq('id', articleId)
                .select()
                .single();
        } else {
            result = await supabase
                .from('articles')
                .insert([
                    {
                        ...articlePayload,
                        views_count: 0,
                        created_at: new Date().toISOString(),
                    },
                ])
                .select()
                .single();
        }
    
      const { data, error } = result;

      if (error) {
        if (error?.code === '23505') {
        if (error.message?.includes('slug') || error.details?.includes('slug')) {
            toast.error('This URL Slug already exists. Please click "Generate" to get a new unique one. Or change the article title');
        } else {
            toast.error('A record with this unique ID already exists.');
        }
        } 
        else {
            toast.error(error.message || 'An unexpected error occurred. Please try again.');
        }
        throw error;
      }

      if (data && !articleId) {
          setArticleId(data.id);
      }

      toast.success(status === 'draft' ? 'Article saved as draft!' : 'Article published successfully!');
    } catch (error: any) {
      toast.error('Error publishing article: ' + (error.message || error));
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
    handleDraftArticle,
    articleId
  };
};