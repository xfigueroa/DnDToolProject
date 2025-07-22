import { Box } from "@mui/material";
import ActionAreaCard from "../components/Cards";
import imgNpc from "../assets/images/NpcGen.png";
import imgCharcter from "../assets/images/CharacterGen.png";
const Home = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ width: '100%', maxWidth: 600, textAlign: 'center' }}>
                <Box sx={{ width: '100%', maxWidth: 600, marginTop: 1 }}>   
                    <h1>Welcome to the DnD Assistant Tool!</h1>
                    <p>Use the navigation bar to explore different features.</p> 
                </Box>
            <ActionAreaCard
                title="NPC Generator"
                description="Create unique NPCs for your campaigns with our generator."
                image={imgNpc}
                onClick={() => window.location.href = '/npc-generator' /* Adjust the path as needed */} // Redirect to NPC Generator page
            />
            <ActionAreaCard
                title="Caracter Generator"
                description="Create unique characters for your campaigns with our generator."
                image={imgCharcter}
                onClick={() => window.location.href = '/npc-generator' /* Adjust the path as needed */} // Redirect to NPC Generator page
            />            
            </Box>
           
        </div>
    );
}

export default Home;
