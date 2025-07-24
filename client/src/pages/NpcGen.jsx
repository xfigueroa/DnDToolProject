import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import NpcForm from "../components/NpcForm";


 const NPCGenerator = () => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };   

    return (
        <Box sx={{  
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width:'40%',
            margin: '1rem', 
            padding: '2rem', 
            border: 'solid 1px ' 
        }}>
            <h2>NPC Generator Page</h2>
            <p>This page will allow you to generate NPCs for your campaigns.</p>
            {/* Aquí puedes agregar más componentes o lógica para la generación de NPCs */}
            <Box sx={{ display: 'flex', padding: '2rem'}}>
                <NpcForm open={dialogOpen} onClose={handleDialogClose} />
            </Box>            

        </Box>
    );
 }

 export default NPCGenerator;