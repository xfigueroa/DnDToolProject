import { Box } from "@mui/material";
import ActionAreaCard from "../components/Cards";
import imgNpc from "../assets/images/NpcGen.png";
import imgCharcter from "../assets/images/CharacterGen.png";
import imgBG from "../assets/images/background.png";


const Home = () => {
    return (
        
            <Box sx={{ 
                backgroundImage: `url(${imgBG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat', 
                minHeight: '100vh',
                textAlign: 'center', 
            }}>
                <Box sx={{ width: '100%'}}>   
                    <h1 style={{ margin: 0, paddingTop: '10%' }}>Upgrade your Campain!</h1>
                    <p>Welcome to the D&D Assistant Tool! Here you can create unique NPCs and characters for your campaigns, manage your sessions, and much more. </p>       
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
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
            </Box>     
    );
}

export default Home;
