import React, { useState, useEffect } from 'react';
import { Grid, Container, Box, TextField, FormControl, InputLabel, Select, MenuItem, Slider, Typography, Button } from '@mui/material';
import ProductCard from "../components/ProductCard";

const CategoryPage = ({ products, onAddToCart }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categoryFilters, setCategoryFilters] = useState({
    colors: [], // Para almacenar colores disponibles
    categories: [], // Para almacenar categorías disponibles
    prices: [0, 100000], // Rango de precios inicial
  });

  // Extraer colores únicos, categorías y rangos de precios de los productos
  useEffect(() => {
    const colors = [...new Set(products.map((product) => product.color).filter(Boolean))];
    const categories = [
      ...new Set(products.flatMap((product) => product.categorias).filter(Boolean))
    ];
    const minPrice = Math.min(...products.map((product) => product.precio));
    const maxPrice = Math.max(...products.map((product) => product.precio));
    
    setCategoryFilters({
      colors,
      categories,  // Usamos el array de categorías extraídas dinámicamente
      prices: [minPrice, maxPrice],
    });
  }, [products]);

  // Filtrar productos en función de los filtros seleccionados
  useEffect(() => {
    let filtered = products;

    // Filtro por nombre (búsqueda)
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por color
    if (colorFilter) {
      filtered = filtered.filter((product) => product.color === colorFilter);
    }

    // Filtro por categoría
    if (categoryFilter) {
      filtered = filtered.filter((product) =>
        product.categorias.includes(categoryFilter) // Filtro por categoría dentro del array
      );
    }

    // Filtro por rango de precios
    filtered = filtered.filter((product) =>
      product.precio >= priceRange[0] && product.precio <= priceRange[1]
    );

    setFilteredProducts(filtered);
  }, [products, searchTerm, colorFilter, categoryFilter, priceRange]);

  return (
    <Container>
      <Box sx={{ padding: 2, marginTop: '100px', marginBottom: '30px', width: '100%' }}>
        <Grid container spacing={2}>
          {/* Filtros */}
          <Grid item xs={12} sm={3}>
            <Box sx={{ marginBottom: '20px' }}>
              <TextField
                label="Buscar"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Box>

            {/* Filtro por color */}
            {categoryFilters.colors.length > 0 && (
              <Box sx={{ marginBottom: '20px' }}>
                <FormControl fullWidth>
                  <InputLabel>Color</InputLabel>
                  <Select
                    value={colorFilter}
                    label="Color"
                    onChange={(e) => setColorFilter(e.target.value)}
                  >
                    <MenuItem value="">Todos</MenuItem>
                    {categoryFilters.colors.map((color) => (
                      <MenuItem key={color} value={color}>
                        {color}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}

            {/* Filtro por categoría */}
            {categoryFilters.categories.length > 0 && (
              <Box sx={{ marginBottom: '20px' }}>
                <FormControl fullWidth>
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    value={categoryFilter}
                    label="Categoría"
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <MenuItem value="">Todas</MenuItem>
                    {categoryFilters.categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}

            {/* Filtro por precio */}
            <Box sx={{ marginBottom: '20px' }}>
              <Typography variant="body1" gutterBottom>
                Precio
              </Typography>
              <Slider
                value={priceRange}
                min={categoryFilters.prices[0]}
                max={categoryFilters.prices[1]}
                onChange={(e, newValue) => setPriceRange(newValue)}
                valueLabelDisplay="auto"
                valueLabelFormatter={(value) => `$${value}`}
              />
            </Box>

            {/* Botón de reset */}
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => {
                setSearchTerm('');
                setColorFilter('');
                setCategoryFilter('');
                setPriceRange([categoryFilters.prices[0], categoryFilters.prices[1]]);
              }}
            >
              Limpiar Filtros
            </Button>
          </Grid>

          {/* Productos filtrados */}
          <Grid item xs={12} sm={9}>
            <Grid container spacing={2}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard product={product} onAddToCart={onAddToCart} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CategoryPage;

