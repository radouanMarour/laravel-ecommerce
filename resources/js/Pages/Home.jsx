import { Link, Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProductCard from '@/Components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Modal from '@/Components/Modal';

export default function Home({ auth, bestSellingProducts, featuredProducts }) {
    const { categories } = usePage().props;

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Home" />

                {/* Hero Banner with SwiperJS */}
                <div className="relative bg-gray-800 h-[500px]">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={50}
                        slidesPerView={1}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        speed={1000}
                        pagination={{ clickable: true }}
                        className="h-full"
                    >
                        {bestSellingProducts.map((product) => (
                            <SwiperSlide key={product.id} className="flex items-center justify-center text-white">
                                <div className="h-full flex justify-evenly items-center space-x-8">
                                    <img
                                        src={`${product.main_image.startsWith("images") ? `/storage/${product.main_image}` : product.main_image}`}
                                        alt={product.name}
                                        className="order-1 w-80 object-contain mb-4 rounded-lg"
                                    />
                                    <div>
                                        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                                        <p className="mb-6">${product.price}</p>
                                        <Link href={`/products/${product.id}`} className="bg-white text-gray-900 px-6 py-3 rounded-md hover:bg-gray-200">
                                            View Product
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Featured Categories */}
                <div className="max-w-7xl mx-auto py-12 px-4">
                    <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <div key={category.id} className="relative bg-gray-200 p-6 rounded-lg text-center overflow-hidden group">
                                {category.image && (
                                    <img
                                        src={`/storage/${category.image}`}
                                        alt={category.name}
                                        className="w-full h-48 object-contain mb-4 rounded-lg transition-transform duration-300 group-hover:scale-105"
                                    />
                                )}
                                <h3 className="text-xl font-medium mb-2 text-gray-900">{category.name}</h3>
                                <Link
                                    href={`/products/${category.id}/${category.name}`}
                                    className="text-blue-600 hover:text-blue-800 uppercase"
                                >
                                    Browse {category.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Featured Products */}
                <div className="max-w-7xl mx-auto py-12 px-4">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900">Featured Products</h2>
                    <div className="">
                        <Swiper
                            modules={[Navigation]}
                            slidesPerView={1}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 4,
                                },
                            }}
                            navigation={true}
                            speed={800}
                            className="mx-0 px-0 relative group"
                        >
                            {featuredProducts.map((product) => (
                                <SwiperSlide key={product.id} className=''>
                                    <ProductCard key={product.id} product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
