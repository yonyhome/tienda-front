// Home.js
import { Box} from "@mui/material";
import FullScreenBanner from "../components/FullScreenBanner";
import CategoryCards from "../components/CategoryCards"; // Importa el componente de las categorías

const Home = () => {
  return (
    <Box>
      {/* Banner ocupando toda la pantalla */}
      <Box sx={{ height: "100vh", position: "relative" }}>
        <FullScreenBanner />
      </Box>
      {/* Contenedor de categorías */}
      <Box sx={{ marginTop: 2 }}>
        <CategoryCards /> {/* Componente con las tarjetas de categorías */}
      </Box>      
    </Box>
  );
};

export default Home;
