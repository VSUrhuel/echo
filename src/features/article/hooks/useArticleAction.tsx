import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner";

export default function useArticleAction() {
    const supabase = createClient()
    const handleHardDeleteArticle = async (articleId: number) => {
        try {
            const { data, error } = await supabase
            .from('articles')
            .delete()
            .eq('id', articleId)
            .select()
            .single();

            if (error) {
                throw error;
            }

            toast.success('Article deleted successfully');
        } catch (error) {
            console.error('Error deleting article:', error);
            toast.error('Error deleting article');
        }
    }   
    return {
        handleHardDeleteArticle
    }
}