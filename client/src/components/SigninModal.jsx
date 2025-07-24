import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const SigninModal = ({ open, onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useAuth();
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const userData = await signIn(email, password);
        setUser(userData);
        showSnackbar("Signed in successfully", "success");
        onClose();
        navigate("/campaigns");
        } catch (error) {
        showSnackbar(error.message, "error");
        }
    };
    
    return (
        <Dialog open={open} onClose={onClose}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </form>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" form="signin-form">Sign In</Button>
        </DialogActions>
        </Dialog>
    );
}
export default SigninModal;