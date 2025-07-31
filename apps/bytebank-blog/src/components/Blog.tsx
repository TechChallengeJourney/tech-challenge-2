
import React from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Chip,
    TextField,
} from '@mui/material';
import { useTheme } from '@repo/utils';
import { BytebankButton } from '@repo/ui';

export default function BlogPage() {
    const { colors } = useTheme();
    const featuredPost = {
        id: 1,
        title: "O futuro dos investimentos digitais no Brasil",
        excerpt:
            "Explore como a tecnologia está revolucionando o mercado financeiro brasileiro e as oportunidades que surgem para investidores modernos.",
        image:
            "https://readdy.ai/api/search-image?query=modern%20digital%20investment%20technology%20Brazil%20financial%20market%20with%20clean%20professional%20background%20showcasing%20digital%20banking%20interfaces%20and%20financial%20charts%20in%20a%20sophisticated%20office%20environment&width=800&height=400&seq=blog-featured&orientation=landscape",
        date: "15 de Janeiro, 2024",
        readTime: "5 min de leitura",
        category: "Investimentos",
    };

    const blogPosts = [
        {
            id: 2,
            title: "Como maximizar seus rendimentos com renda fixa",
            excerpt: "Descubra estratégias inteligentes para otimizar seus investimentos em renda fixa e construir um portfólio sólido.",
            image: "https://readdy.ai/api/search-image?query=financial%20growth%20charts%20fixed%20income%20investments%20with%20professional%20clean%20background%20showing%20upward%20trending%20graphs%20and%20calculator%20on%20desk&width=400&height=250&seq=blog-post-1&orientation=landscape",
            date: "12 de Janeiro, 2024",
            readTime: "4 min de leitura",
            category: "Renda Fixa"
        },
        {
            id: 3,
            title: "Bytebank: Nossa jornada de inovação financeira",
            excerpt: "Conheça a história por trás do Bytebank e como estamos transformando a experiência bancária digital no país.",
            image: "https://readdy.ai/api/search-image?query=modern%20banking%20innovation%20journey%20with%20clean%20professional%20background%20showing%20digital%20transformation%20office%20environment%20with%20team%20collaboration%20and%20technology&width=400&height=250&seq=blog-post-2&orientation=landscape",
            date: "10 de Janeiro, 2024",
            readTime: "6 min de leitura",
            category: "Empresa"
        },
        {
            id: 4,
            title: "Dicas essenciais para controle financeiro pessoal",
            excerpt: "Aprenda técnicas comprovadas para organizar suas finanças pessoais e alcançar seus objetivos financeiros.",
            image: "https://readdy.ai/api/search-image?query=personal%20finance%20planning%20with%20clean%20background%20showing%20organized%20budget%20sheets%20calculator%20and%20financial%20planning%20documents%20on%20modern%20desk&width=400&height=250&seq=blog-post-3&orientation=landscape",
            date: "8 de Janeiro, 2024",
            readTime: "7 min de leitura",
            category: "Planejamento"
        },
        {
            id: 5,
            title: "Criptomoedas: Guia completo para iniciantes",
            excerpt: "Tudo que você precisa saber antes de começar a investir em criptomoedas de forma segura e consciente.",
            image: "https://readdy.ai/api/search-image?query=cryptocurrency%20investment%20guide%20with%20clean%20professional%20background%20showing%20bitcoin%20ethereum%20charts%20and%20digital%20wallet%20interfaces%20on%20modern%20computer%20screen&width=400&height=250&seq=blog-post-4&orientation=landscape",
            date: "5 de Janeiro, 2024",
            readTime: "8 min de leitura",
            category: "Criptomoedas"
        },
        {
            id: 6,
            title: "Sustentabilidade e investimentos ESG",
            excerpt: "Entenda como investir de forma responsável e contribuir para um futuro mais sustentável através dos investimentos ESG.",
            image: "https://readdy.ai/api/search-image?query=sustainable%20ESG%20investments%20with%20clean%20background%20showing%20green%20energy%20renewable%20technology%20and%20environmental%20financial%20charts%20in%20professional%20setting&width=400&height=250&seq=blog-post-5&orientation=landscape",
            date: "3 de Janeiro, 2024",
            readTime: "5 min de leitura",
            category: "ESG"
        },
        {
            id: 7,
            title: "Análise de mercado: Tendências para 2024",
            excerpt: "Nossa equipe de analistas apresenta as principais tendências e oportunidades do mercado financeiro para este ano.",
            image: "https://readdy.ai/api/search-image?query=financial%20market%20analysis%202024%20trends%20with%20clean%20professional%20background%20showing%20market%20charts%20economic%20indicators%20and%20analyst%20workspace%20with%20multiple%20monitors&width=400&height=250&seq=blog-post-6&orientation=landscape",
            date: "1 de Janeiro, 2024",
            readTime: "10 min de leitura",
            category: "Análise"
        }
    ];

    return (
        <>
            <Box style={{ backgroundColor: 'white', width: '100%', minHeight: '100vh' }}>

               
                {/* Hero Section */}
                <Box p={5} minHeight={'10em'} display={'flex'} alignContent={'center'} flexWrap="wrap" justifyContent={"center"} sx={{ background: `${colors['background.gradient']}`, py: 8 }}>
                    <Typography variant="h3" gutterBottom fontWeight="bold" color="text.primary">
                        Blog Bytebank
                    </Typography>
                    <Typography variant="h5" color="text.primary">
                        Insights, análises e conhecimento sobre o mundo financeiro para impulsionar seus investimentos
                    </Typography>
                </Box>
                <Box py={4} sx={{ maxWidth: 1280, mx: 'auto', px: 2 }}>
                    <Typography variant="h4" fontWeight="bold" color="text.primary" mb={4}>
                        Post em Destaque
                    </Typography>
                    <Card sx={{ display: 'flex', borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
                        <Grid container gridTemplateAreas={'1fr 1fr'} flexWrap={'nowrap'}>
                            {/* Imagem */}
                            <Grid>
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image={featuredPost.image}
                                    alt={featuredPost.title}
                                    sx={{ width: '100%', height: { xs: 200, md: '100%' }, objectFit: 'cover', objectPosition: 'top' }}
                                />
                            </Grid>
                            {/* Conteúdo */}
                            <Grid>
                                <CardContent sx={{ p: 4 }}>
                                    {/* Categorias, Data, Tempo */}
                                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                                        <Chip
                                            label={featuredPost.category}
                                            size="small"
                                            sx={{ bgcolor: 'yellow.100', color: 'yellow.800', fontSize: 12, fontWeight: 'medium' }}
                                        />
                                        <Typography variant="body2" color="text.primary">
                                            {featuredPost.date}
                                        </Typography>
                                        <Typography variant="body2" color="text.primary">
                                            {featuredPost.readTime}
                                        </Typography>
                                    </Box>
                                    {/* Título */}
                                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                                        {featuredPost.title}
                                    </Typography>
                                    {/* Excerpt */}
                                    <Typography variant="body2" color="text.primary" mb={4} sx={{ lineHeight: 1.5 }}>
                                        {featuredPost.excerpt}
                                    </Typography>
                                    {/* Botão */}
                                    <BytebankButton
                                        variant="contained"
                                        color="secondary"
                                        label='Ler artigo completo'
                                        sx={{ borderRadius: 20, px: 4, py: 1.5, fontWeight: 'bold' }}
                                        href={`/blog/${featuredPost.id}`}
                                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f59e0b')}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fbbf24')}
                                    />
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                </Box>
                <Box component="section" display={'flex'} py={5} bgcolor="grey.50">
                    <Container maxWidth="lg">
                        <Typography variant="h5" fontWeight="bold" mb={4} color="text.primary">
                            Artigos Recentes
                        </Typography>
                        <Grid container spacing={4}>
                            {blogPosts.map((post) => (
                                <Grid size={{ xs: 6, md: 4 }} key={post.id}>
                                    <Card sx={{ borderRadius: 2, boxShadow: 3, '&:hover': { boxShadow: 6, transition: 'box-shadow 0.3s' } }}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={post.image}
                                            alt={post.title}
                                            sx={{ objectFit: 'cover', objectPosition: 'top' }}
                                        />
                                        <CardContent sx={{ p: 2 }}>
                                            {/* Categoria, tempo */}
                                            <Box display="flex" alignItems="center" gap={1} mb={2}>
                                                <Chip
                                                    label={post.category}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: 'lime.400',
                                                        color: 'grey.700',
                                                        fontSize: 12,
                                                        fontWeight: 'medium',
                                                    }}
                                                />
                                                <Typography variant="caption" color="text.primary">
                                                    {post.readTime}
                                                </Typography>
                                                <Typography variant="caption" color="text.primary">
                                                    {post.date}
                                                </Typography>
                                            </Box>
                                            {/* Título */}
                                            <Typography variant="h6" fontWeight="bold" mb={1} noWrap>
                                                {post.title}
                                            </Typography>
                                            {/* Resumo */}
                                            <Typography
                                                variant="body2"
                                                color="text.primary"
                                                mb={2}
                                                sx={{
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {post.excerpt}
                                            </Typography>
                                            {/* Ler mais */}
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <BytebankButton
                                                    variant="text"
                                                    label='Ler mais'
                                                    sx={{ textTransform: 'none', fontWeight: 'medium' }}
                                                    href={`/blog/${post.id}`} color={'tertiary'}                                               >
                                                    
                                                </BytebankButton>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                <Box component="section" p={5} sx={{ background: `linear-gradient(to right, ${colors['lime.700']}, ${colors['lime.500']})` }}>
                    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" mb={2} fontWeight="bold">
                            Receba insights financeiros semanais
                        </Typography>
                        <Typography variant="body1" mb={4} color="grey.900">
                            Inscreva-se em nossa newsletter e fique por dentro das principais tendências do mercado financeiro
                        </Typography>
                        <Box
                            display="flex"
                            flexDirection={{ xs: 'column', sm: 'row' }}
                            gap={2}
                            justifyContent="center"
                            maxWidth="sm"
                            flexWrap={"nowrap"}
                            mx="auto"
                        >
                            <TextField
                                variant={"outlined"}
                                type={'email'}
                                placeholder="Escreva o e-mail aqui"
                                fullWidth
                                sx={{
                                    // borderRadius: '2em',
                                    // backgroundColor: 'white',
                                    '& .MuiInputBase-input': { px: 2, py: 1.5, fontSize: '0.9rem' },
                                }}
                            />
                            <Box minWidth={'25%'}>
                                <BytebankButton variant="contained" label={'Inscrever-se'} color={'primary'} sx={{ height: '100%' }} />
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>
            </>
    );
}
function BlogPage1() {
    const featuredPost = {
        id: 1,
        title: "O futuro dos investimentos digitais no Brasil",
        excerpt: "Explore como a tecnologia está revolucionando o mercado financeiro brasileiro e as oportunidades que surgem para investidores modernos.",
        image: "https://readdy.ai/api/search-image?query=modern%20digital%20investment%20technology%20Brazil%20financial%20market%20with%20clean%20professional%20background%20showcasing%20digital%20banking%20interfaces%20and%20financial%20charts%20in%20a%20sophisticated%20office%20environment&width=800&height=400&seq=blog-featured&orientation=landscape",
        date: "15 de Janeiro, 2024",
        readTime: "5 min de leitura",
        category: "Investimentos"
    };

    const blogPosts = [
        {
            id: 2,
            title: "Como maximizar seus rendimentos com renda fixa",
            excerpt: "Descubra estratégias inteligentes para otimizar seus investimentos em renda fixa e construir um portfólio sólido.",
            image: "https://readdy.ai/api/search-image?query=financial%20growth%20charts%20fixed%20income%20investments%20with%20professional%20clean%20background%20showing%20upward%20trending%20graphs%20and%20calculator%20on%20desk&width=400&height=250&seq=blog-post-1&orientation=landscape",
            date: "12 de Janeiro, 2024",
            readTime: "4 min de leitura",
            category: "Renda Fixa"
        },
        {
            id: 3,
            title: "Bytebank: Nossa jornada de inovação financeira",
            excerpt: "Conheça a história por trás do Bytebank e como estamos transformando a experiência bancária digital no país.",
            image: "https://readdy.ai/api/search-image?query=modern%20banking%20innovation%20journey%20with%20clean%20professional%20background%20showing%20digital%20transformation%20office%20environment%20with%20team%20collaboration%20and%20technology&width=400&height=250&seq=blog-post-2&orientation=landscape",
            date: "10 de Janeiro, 2024",
            readTime: "6 min de leitura",
            category: "Empresa"
        },
        {
            id: 4,
            title: "Dicas essenciais para controle financeiro pessoal",
            excerpt: "Aprenda técnicas comprovadas para organizar suas finanças pessoais e alcançar seus objetivos financeiros.",
            image: "https://readdy.ai/api/search-image?query=personal%20finance%20planning%20with%20clean%20background%20showing%20organized%20budget%20sheets%20calculator%20and%20financial%20planning%20documents%20on%20modern%20desk&width=400&height=250&seq=blog-post-3&orientation=landscape",
            date: "8 de Janeiro, 2024",
            readTime: "7 min de leitura",
            category: "Planejamento"
        },
        {
            id: 5,
            title: "Criptomoedas: Guia completo para iniciantes",
            excerpt: "Tudo que você precisa saber antes de começar a investir em criptomoedas de forma segura e consciente.",
            image: "https://readdy.ai/api/search-image?query=cryptocurrency%20investment%20guide%20with%20clean%20professional%20background%20showing%20bitcoin%20ethereum%20charts%20and%20digital%20wallet%20interfaces%20on%20modern%20computer%20screen&width=400&height=250&seq=blog-post-4&orientation=landscape",
            date: "5 de Janeiro, 2024",
            readTime: "8 min de leitura",
            category: "Criptomoedas"
        },
        {
            id: 6,
            title: "Sustentabilidade e investimentos ESG",
            excerpt: "Entenda como investir de forma responsável e contribuir para um futuro mais sustentável através dos investimentos ESG.",
            image: "https://readdy.ai/api/search-image?query=sustainable%20ESG%20investments%20with%20clean%20background%20showing%20green%20energy%20renewable%20technology%20and%20environmental%20financial%20charts%20in%20professional%20setting&width=400&height=250&seq=blog-post-5&orientation=landscape",
            date: "3 de Janeiro, 2024",
            readTime: "5 min de leitura",
            category: "ESG"
        },
        {
            id: 7,
            title: "Análise de mercado: Tendências para 2024",
            excerpt: "Nossa equipe de analistas apresenta as principais tendências e oportunidades do mercado financeiro para este ano.",
            image: "https://readdy.ai/api/search-image?query=financial%20market%20analysis%202024%20trends%20with%20clean%20professional%20background%20showing%20market%20charts%20economic%20indicators%20and%20analyst%20workspace%20with%20multiple%20monitors&width=400&height=250&seq=blog-post-6&orientation=landscape",
            date: "1 de Janeiro, 2024",
            readTime: "10 min de leitura",
            category: "Análise"
        }
    ];

    const categories = ["Todos", "Investimentos", "Renda Fixa", "Empresa", "Planejamento", "Criptomoedas", "ESG", "Análise"];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
                                <i className="ri-bank-line text-lg text-gray-800"></i>
                            </div>
                            <span className="text-xl font-bold text-gray-800 font-pacifico">Bytebank</span>
                        </div>
                        <nav className="flex space-x-8">
                            <a href="/" className="text-gray-600 hover:text-gray-900 cursor-pointer">Início </a>
                            <a href="/blog" className="text-gray-900 font-medium cursor-pointer">Blog</a>
                            <a href="/investments" className="text-gray-600 hover:text-gray-900 cursor-pointer">Investimentos</a>
                            <a href="/services" className="text-gray-600 hover:text-gray-900 cursor-pointer">Outros serviços</a>
                            <a href="/transfers" className="text-gray-600 hover:text-gray-900 cursor-pointer">Transferências</a>
                        </nav>
                        <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer">
                            <i className="ri-moon-line text-gray-600"></i>
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Blog Bytebank
                        </h1>
                        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                            Insights, análises e conhecimento sobre o mundo financeiro para impulsionar seus investimentos
                        </p>
                    </div>
                </div>
            </section>

            {/* Categories Filter */}
            <section className="py-8 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${index === 0
                                    ? 'bg-yellow-400 text-gray-800'
                                    : 'bg-white text-gray-600 hover:bg-yellow-100 hover:text-gray-800'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Post em Destaque</h2>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="md:flex">
                            <div className="md:w-1/2">
                                <img
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    className="w-full h-64 md:h-full object-cover object-top"
                                />
                            </div>
                            <div className="md:w-1/2 p-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                                        {featuredPost.category}
                                    </span>
                                    <span className="text-gray-500 text-sm">{featuredPost.date}</span>
                                    <span className="text-gray-500 text-sm">{featuredPost.readTime}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                                <a href={`/blog/${featuredPost.id}`}>
                                    <button className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors cursor-pointer whitespace-nowrap">
                                        Ler artigo completo
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Artigos Recentes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover object-top"
                                />
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                            {post.category}
                                        </span>
                                        <span className="text-gray-500 text-sm">{post.readTime}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{post.excerpt}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500 text-sm">{post.date}</span>
                                        <a href={`/blog/${post.id}`}>
                                            <button className="text-yellow-600 hover:text-yellow-700 font-medium cursor-pointer whitespace-nowrap">
                                                Ler mais
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="text-center mt-12">
                        <button className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
                            Carregar mais artigos
                        </button>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-gradient-to-r from-gray-800 to-gray-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Receba insights financeiros semanais
                    </h2>
                    <p className="text-gray-300 mb-8 text-lg">
                        Inscreva-se em nossa newsletter e fique por dentro das principais tendências do mercado financeiro
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Seu melhor e-mail"
                            className="flex-1 px-4 py-3 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                        />
                        <button className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors cursor-pointer whitespace-nowrap">
                            Inscrever-se
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
