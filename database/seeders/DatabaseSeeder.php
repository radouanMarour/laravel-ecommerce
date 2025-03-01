<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        $now = Carbon::now();

        // Men products
        $menProducts = [
            [
                'name' => 'Classic Oxford Shirt',
                'slug' => 'classic-oxford-shirt',
                'description' => 'Crisp, versatile oxford shirt in 100% cotton.',
                'price' => 59.99,
                'stock' => 50,
                'category_id' => 2,
                'main_image' => 'https://placehold.co/400x400/09f/fff.png?text=Classic+Oxford+Shirt',
                'thumbnail_images' => json_encode([
                    'https://placehold.co/150x150/09f/fff.png?text=Oxford+Front',
                    'https://placehold.co/150x150/09f/fff.png?text=Oxford+Back',
                    'https://placehold.co/150x150/09f/fff.png?text=Oxford+Detail'
                ]),
                'is_featured' => (bool)(rand(1, 100) <= 20),
                'total_sold' => rand(0, 200),
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Slim Fit Chinos',
                'slug' => 'slim-fit-chinos',
                'description' => 'Comfortable and stylish chinos in a modern slim fit.',
                'price' => 79.99,
                'stock' => 30,
                'category_id' => 2,
                'main_image' => 'https://placehold.co/400x400/09f/fff.png?text=Slim+Fit+Chinos',
                'thumbnail_images' => json_encode([
                    'https://placehold.co/150x150/09f/fff.png?text=Chinos+Front',
                    'https://placehold.co/150x150/09f/fff.png?text=Chinos+Back',
                    'https://placehold.co/150x150/09f/fff.png?text=Chinos+Detail'
                ]),
                'is_featured' => (bool)(rand(1, 100) <= 20),
                'total_sold' => rand(0, 200),
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Leather Dress Shoes',
                'slug' => 'leather-dress-shoes',
                'description' => 'Handcrafted leather dress shoes for a sophisticated look.',
                'price' => 129.99,
                'stock' => 20,
                'category_id' => 2,
                'main_image' => 'https://placehold.co/400x400/09f/fff.png?text=Leather+Dress+Shoes',
                'thumbnail_images' => json_encode([
                    'https://placehold.co/150x150/09f/fff.png?text=Leather+Front',
                    'https://placehold.co/150x150/09f/fff.png?text=Leather+Back',
                    'https://placehold.co/150x150/09f/fff.png?text=Leather+Detail'
                ]),
                'is_featured' => (bool)(rand(1, 100) <= 20),
                'total_sold' => rand(0, 200),
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Cashmere Sweater',
                'slug' => 'cashmere-sweater',
                'description' => 'Luxuriously soft cashmere sweater for ultimate comfort.',
                'price' => 199.99,
                'stock' => 15,
                'category_id' => 2,
                'main_image' => 'https://placehold.co/400x400/09f/fff.png?text=Cashmere+Sweater',
                'thumbnail_images' => json_encode([
                    'https://placehold.co/150x150/09f/fff.png?text=Cashmere+Front',
                    'https://placehold.co/150x150/09f/fff.png?text=Cashmere+Back',
                    'https://placehold.co/150x150/09f/fff.png?text=Cashmere+Detail'
                ]),
                'is_featured' => (bool)(rand(1, 100) <= 20),
                'total_sold' => rand(0, 200),
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Wool Blazer',
                'slug' => 'wool-blazer',
                'description' => 'Classic wool blazer perfect for layering.',
                'price' => 249.99,
                'stock' => 25,
                'category_id' => 2,
                'main_image' => 'https://placehold.co/400x400/09f/fff.png?text=Wool+Blazer',
                'thumbnail_images' => json_encode([
                    'https://placehold.co/150x150/09f/fff.png?text=Wool+Front',
                    'https://placehold.co/150x150/09f/fff.png?text=Wool+Back',
                    'https://placehold.co/150x150/09f/fff.png?text=Wool+Detail'
                ]),
                'is_featured' => (bool)(rand(1, 100) <= 20),
                'total_sold' => rand(0, 200),
                'created_at' => $now,
                'updated_at' => $now
            ]
        ];

        // Women products
        $womenProducts = [
            [
                'name' => 'Floral Print Maxi Dress',
                'slug' => 'floral-print-maxi-dress',
                'description' => 'Flowing maxi dress with a vibrant floral print.',
                'price' => 69.99,
                'stock' => 40,
                'category_id' => 3,
                'main_image' => 'https://placehold.co/400x400/f09/fff.png?text=Floral+Print+Maxi+Dress',
                'thumbnail_images' => json_encode([
                    'https://placehold.co/150x150/f09/fff.png?text=Dress+Front',
                    'https://placehold.co/150x150/f09/fff.png?text=Dress+Back',
                    'https://placehold.co/150x150/f09/fff.png?text=Dress+Detail'
                ]),
                'is_featured' => (bool)(rand(1, 100) <= 20),
                'total_sold' => rand(0, 200),
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Cashmere Cardigan',
                'slug' => 'cashmere-cardigan',
                'description' => 'Luxuriously soft cashmere cardigan for ultimate comfort and style.',
                'price' => 149.99,
                'stock' => 35,
                'category_id' => 3,
                'main_image' => 'https://placehold.co/400x400/f09/fff.png?text=Cashmere+Cardigan',
                'thumbnail_images' => json_encode([
                    'https://placehold.co/150x150/f09/fff.png?text=Cardigan+Front',
                    'https://placehold.co/150x150/f09/fff.png?text=Cardigan+Back',
                    'https://placehold.co/150x150/f09/fff.png?text=Cardigan+Detail'
                ]),
                'is_featured' => (bool)(rand(1, 100) <= 20),
                'total_sold' => rand(0, 200),
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Leather Ankle Boots',
                'slug' => 'leather-ankle-boots',
                'description' => 'Stylish leather ankle boots with a comfortable block heel.',
                'price' => 99.99,
                'stock' => 45,
                'category_id' => 3,
                'main_image' => 'https://placehold.co/400x400/f09/fff.png?text=Leather+Ankle+Boots',
                'thumbnail_images' => json_encode([
                    'https://placehold.co/150x150/f09/fff.png?text=Boots+Front',
                    'https://placehold.co/150x150/f09/fff.png?text=Boots+Back',
                    'https://placehold.co/150x150/f09/fff.png?text=Boots+Detail'
                ]),
                'is_featured' => (bool)(rand(1, 100) <= 20),
                'total_sold' => rand(0, 200),
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Silk Scarf',
                'slug' => 'silk-scarf',
                'description' => 'Elegant silk scarf with a beautiful pattern.',
                'price' => 49.99,
                'stock' => 60,
                'category_id' => 3,
                'main_image' => 'https://placehold.co/400x400/f09/fff.png?text=Silk+Scarf',
                'thumbnail_images' => json_encode([
                    'https://placehold.co/150x150/f09/fff.png?text=Scarf+Front',
                    'https://placehold.co/150x150/f09/fff.png?text=Scarf+Back',
                    'https://placehold.co/150x150/f09/fff.png?text=Scarf+Detail'
                ]),
                'is_featured' => (bool)(rand(1, 100) <= 20),
                'total_sold' => rand(0, 200),
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Denim Jacket',
                'slug' => 'denim-jacket-women',
                'description' => 'Classic denim jacket perfect for layering.',
                'price' => 79.99,
                'stock' => 55,
                'category_id' => 3,
                'main_image' => 'https://placehold.co/400x400/f09/fff.png?text=Denim+Jacket+Women',
                'thumbnail_images' => json_encode([
                    'https://placehold.co/150x150/f09/fff.png?text=Jacket+Front',
                    'https://placehold.co/150x150/f09/fff.png?text=Jacket+Back',
                    'https://placehold.co/150x150/f09/fff.png?text=Jacket+Detail'
                ]),
                'is_featured' => (bool)(rand(1, 100) <= 20),
                'total_sold' => rand(0, 200),
                'created_at' => $now,
                'updated_at' => $now
            ]
        ];

        // Kids products
        $kidsProducts = [
            [
                'name' => 'Dinosaur T-Shirt',
                'slug' => 'dinosaur-t-shirt',
                'description' => 'Fun and colorful dinosaur t-shirt made from soft cotton.',
                'price' => 19.99,
                'stock' => 70,
                'category_id' => 5,
                'main_image' => 'https://placehold.co/400x400/0f9/fff.png?text=Dinosaur+T-Shirt',
                'thumbnail_images' => json_encode([
                    'https://placehold.co/150x150/0f9/fff.png?text=TShirt+Front',
                    'https://placehold.co/150x150/0f9/fff.png?text=TShirt+Back',
                    'https://placehold.co/150x150/0f9/fff.png?text=TShirt+Detail'
                ]),
                'is_featured' => (bool)(rand(1, 100) <= 20),
                'total_sold' => rand(0, 200),
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Denim Jacket',
                'slug' => 'denim-jacket-kids',
                'description' => 'Classic denim jacket perfect for layering.',
                'price' => 39.99,
                'stock' => 65,
                'category_id' => 5,
                'main_image' => 'https://placehold.co/400x400/0f9/fff.png?text=Denim+Jacket+Kids',
                'thumbnail_images' => json_encode([
                    'https://placehold.co/150x150/0f9/fff.png?text=Jacket+Front',
                    'https://placehold.co/150x150/0f9/fff.png?text=Jacket+Back',
                    'https://placehold.co/150x150/0f9/fff.png?text=Jacket+Detail'
                ]),
                'is_featured' => (bool)(rand(1, 100) <= 20),
                'total_sold' => rand(0, 200),
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Canvas Sneakers',
                'slug' => 'canvas-sneakers',
                'description' => 'Comfortable and durable canvas sneakers for active kids.',
                'price' => 49.99,
                'stock' => 80,
                'category_id' => 5,
                'main_image' => 'https://placehold.co/400x400/0f9/fff.png?text=Canvas+Sneakers',
                'thumbnail_images' => json_encode([
                    'https://placehold.co/150x150/0f9/fff.png?text=Sneakers+Front',
                    'https://placehold.co/150x150/0f9/fff.png?text=Sneakers+Back',
                    'https://placehold.co/150x150/0f9/fff.png?text=Sneakers+Detail'
                ]),
                'is_featured' => (bool)(rand(1, 100) <= 20),
                'total_sold' => rand(0, 200),
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Rainbow Dress',
                'slug' => 'rainbow-dress',
                'description' => 'Colorful rainbow dress for little girls.',
                'price' => 29.99,
                'stock' => 75,
                'category_id' => 5,
                'main_image' => 'https://placehold.co/400x400/0f9/fff.png?text=Rainbow+Dress',
                'thumbnail_images' => json_encode([
                    'https://placehold.co/150x150/0f9/fff.png?text=Rainbow+Front',
                    'https://placehold.co/150x150/0f9/fff.png?text=Rainbow+Back',
                    'https://placehold.co/150x150/0f9/fff.png?text=Rainbow+Detail'
                ]),
                'is_featured' => (bool)(rand(1, 100) <= 20),
                'total_sold' => rand(0, 200),
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Cargo Pants',
                'slug' => 'cargo-pants-kids',
                'description' => 'Durable and stylish cargo pants for active kids.',
                'price' => 34.99,
                'stock' => 65,
                'category_id' => 5,
                'main_image' => 'https://placehold.co/400x400/0f9/fff.png?text=Cargo+Pants',
                'thumbnail_images' => json_encode([
                    'https://placehold.co/150x150/0f9/fff.png?text=Cargo+Front',
                    'https://placehold.co/150x150/0f9/fff.png?text=Cargo+Back',
                    'https://placehold.co/150x150/0f9/fff.png?text=Cargo+Detail'
                ]),
                'is_featured' => (bool)(rand(1, 100) <= 20),
                'total_sold' => rand(0, 200),
                'created_at' => $now,
                'updated_at' => $now
            ]
        ];

        // Truncate the products table
        Product::truncate();

        // Insert data into the products table
        Product::insert(array_merge($menProducts, $womenProducts, $kidsProducts));
    }
}
