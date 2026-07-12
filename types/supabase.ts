// هذا الملف يتم إنشاؤه تلقائياً عبر: npm run db:generate
// استخدم: npx supabase gen types typescript --project-id <PROJECT_ID> --schema public > types/supabase.ts

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          price: number;
          original_price: number | null;
          discount: number | null;
          image: string;
          images: string[] | null;
          category_id: string;
          brand: string;
          model: string;
          storage: string | null;
          ram: string | null;
          color: string | null;
          colors: string[] | null;
          screen_size: string | null;
          battery: string | null;
          processor: string | null;
          camera: string | null;
          os: string | null;
          sim: string | null;
          warranty: string | null;
          in_stock: boolean;
          stock_count: number;
          rating: number;
          review_count: number;
          sold_count: number;
          is_new: boolean;
          is_featured: boolean;
          is_best_seller: boolean;
          tags: string[] | null;
          specifications: Record<string, string> | null;
          created_at: string;
          updated_at: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image: string;
          icon: string | null;
          product_count: number;
          parent_id: string | null;
          is_active: boolean;
          sort_order: number;
          created_at: string;
        };
      };
      orders: {
        Row: {
          id: string;
          customer_name: string;
          customer_phone: string;
          customer_email: string | null;
          customer_address: string;
          city: string;
          notes: string | null;
          items: OrderItem[];
          subtotal: number;
          shipping_cost: number;
          total: number;
          status: string;
          payment_method: string;
          whatsapp_message: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          customer_name: string;
          rating: number;
          comment: string;
          created_at: string;
        };
      };
      banners: {
        Row: {
          id: string;
          title: string;
          subtitle: string | null;
          image: string;
          link: string | null;
          position: string;
          is_active: boolean;
          sort_order: number;
        };
      };
    };
  };
}

interface OrderItem {
  product_id: string;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
  selected_color: string | null;
  selected_storage: string | null;
}
