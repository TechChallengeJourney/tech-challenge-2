
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

type BlogPageProps = {
    posts: Array<any>;
  };

export default function BlogPage({ posts }: BlogPageProps) {
    const { colors } = useTheme();
    const featuredPost = {
        id: 'futuro-dos-investimentos',
        title: "O futuro dos investimentos digitais no Brasil",
        excerpt:
            "Explore como a tecnologia está revolucionando o mercado financeiro brasileiro e as oportunidades que surgem para investidores modernos.",
        image:
            "https://readdy.ai/api/search-image?query=modern%20digital%20investment%20technology%20Brazil%20financial%20market%20with%20clean%20professional%20background%20showcasing%20digital%20banking%20interfaces%20and%20financial%20charts%20in%20a%20sophisticated%20office%20environment&width=800&height=400&seq=blog-featured&orientation=landscape",
        date: "15 de Janeiro, 2024",
        readTime: "5 min de leitura",
        category: "Investimentos",
    };

    return (
        <>
            <Box style={{ backgroundColor: 'white', width: '100%', minHeight: '100vh' }}>
                {/* Hero Section */}
                <Box p={5} minHeight={'18em'} display={'flex'} alignContent={'center'} flexWrap="wrap" justifyContent={"left"} sx={{ background: "url('./credit-card.jpg')", backgroundPosition: 'center', backgroundSize: 'cover', py: 8 }}>
                    <Box bgcolor={colors['white.main']} px={4} py={4} width={{ sm: '80%', md: '25%' }} textAlign={'left'} borderRadius={4}>
                        <Typography variant="h4" gutterBottom fontWeight="bold" color={colors['lime.800']}>
                            Blog Bytebank
                        </Typography>
                        <Typography variant="h6" color="text.primary">
                            Insights, análises e conhecimento sobre o mundo financeiro para impulsionar seus investimentos
                        </Typography>
                    </Box>
                </Box>
                <Box py={4} sx={{ maxWidth: 1280, mx: 'auto', px: 2 }}>
                    <Typography variant="h4" fontWeight="bold" color="text.primary" mb={4}>
                        Post em Destaque
                    </Typography>
                    <Card sx={{ display: 'flex', borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
                        <Grid container gridTemplateColumns={{ md: '1fr 1fr' }} flexWrap={{ xs: 'wrap', sm: 'wrap', md: 'nowrap' }}>
                            {/* Imagem */}
                            <Grid>
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image={featuredPost.image}
                                    alt={featuredPost.title}
                                    sx={{ width: '100%', height: { xs: 'auto', md: '100%' }, objectFit: 'cover', objectPosition: 'top' }}
                                />
                            </Grid>
                            {/* Conteúdo */}
                            <Grid>
                                <CardContent sx={{ p: 4 }}>
                                    {/* Categorias, Data, Tempo */}
                                    <Box display="flex" alignItems="center" gap={1} mb={2} flexWrap={'wrap'}>
                                        <Chip
                                            label={featuredPost.category}
                                            size="small"
                                            sx={{ bgcolor: colors['lime.200'], fontSize: 12, fontWeight: 'medium' }}
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
                                        href={`/${featuredPost.id}`}
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
                            {posts.map(({id, data: post }) => (
                                <Grid size={{ xs: 12, md: 4, sm: 6 }} key={post.id}>
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
                                            <Box display="flex" alignItems="center" gap={1} mb={2} flexWrap={'wrap'}>
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
                                                    {post.pubDate.toLocaleDateString('pt-BR')}
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
                                                {post.description}
                                            </Typography>
                                            {/* Ler mais */}
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <BytebankButton
                                                    variant="text"
                                                    label='Ler mais'
                                                    sx={{ textTransform: 'none', fontWeight: 'medium' }}
                                                    href={`/${id}`} color={'tertiary'}                                               >
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
                                    '& .MuiInputBase-root': { borderRadius: ' 2em', background: '#fff' },
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