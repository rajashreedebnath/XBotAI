import { Typography, Stack, useMediaQuery, IconButton,  } from "@mui/material";
import {Link, useOutletContext} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useContext } from "react";
import { ThemeContext } from '../../theme/ThemeContext';

export default function Navbar(){
    const {handleMobileMenu} = useOutletContext();
    const isMobileView = useMediaQuery('(max-width: 900px)');
    const {mode, setMode} = useContext(ThemeContext);

    return (
        <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            p={{xs: 2, md: 3}}
        >
            <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={2}
            >
                {isMobileView && (
                    <MenuIcon   
                        onClick={()=>{handleMobileMenu(prev => !prev)}}
                    />
                )}
                <Link to={'/'} style={{textDecoration : 'none'}}>
                    <Typography variant="h1" component={'h1'}>
                        Bot AI
                    </Typography>
                </Link>
            </Stack>
            <Stack 
                direction={'row'}
                alignItems={'center'}
                spacing={0.5}
            >
                <Typography
                    textTransform={'capitalize'}
                    fontSize={12}
                >{mode}</Typography>
                <IconButton
                    onClick={()=>{
                        setMode((prev)=>{
                            if(prev=='light'){
                                return 'dark'
                            }
                            else{
                                return 'light'
                            }
                        })
                    }}
                >
                    {(mode=='light')? 
                        (<Brightness4Icon/>)
                    : 
                        (<BrightnessHighIcon />)
                    }
                </IconButton>
            </Stack>
        </Stack>
    )
}