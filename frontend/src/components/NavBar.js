import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import irecipe_logo from '../assets/irecipe_logo.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const {expanded, setExpanded, ref} = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
            await axios.post("/dj-rest-auth/logout/");
            setCurrentUser(null);
        }catch (err) {
            console.log(err);
        }
    };

    const addPostIcon = (
        <NavLink className={styles.NavLink} 
            activeClassName={styles.Active} 
            to="/recipe-posts/create" 
            >
                <i class="fas fa-plus"></i> Add a recipe post
            </NavLink>
    );

    const loggedInIcons = (
        <>
        <NavLink className={styles.NavLink} 
            activeClassName={styles.Active} 
            to="/feed" 
            >
                <i className='fas fa-stream'></i> Recipes feed
        </NavLink>

        <NavLink className={styles.NavLink} 
            activeClassName={styles.Active} 
            to="/likes" 
            >
                <i className='fas fa-heart'></i> Favorites
        </NavLink>

        <NavLink className={styles.NavLink} 
            to="/"
            onClick={handleSignOut}>
            <i className='fas fa-sign-out-alt'></i> Sign out
        </NavLink>

        <NavLink className={styles.NavLink} 
            to={`/profiles/${currentUser?.profile_id}`} 
            >
                <Avatar src={currentUser?.profile_image} text={currentUser?.username} height={40} />
            </NavLink>
        </>
    );

    const loggedOutIcons = (
        <>
        {/* Add a NavLink for the sign in page */}
        <NavLink className={styles.NavLink} 
            activeClassName={styles.Active} 
            to="/signin" 
            >
                <i className='fas fa-sign-in-alt'></i> Sign in
        </NavLink>

        {/* Add a NavLink for the sign up page */}
        <NavLink className={styles.NavLink} 
            activeClassName={styles.Active} 
            to="/signup" 
            >
                <i className='fas fa-user-plus'></i> Sign up
        </NavLink>
        </>
    );

    return (
        <Navbar expanded={expanded} bg="light" expand="md" fixed='top'>
            <Container>
                <NavLink to="/">
                    <Navbar.Brand><img src={irecipe_logo} alt='logo' height={45} /></Navbar.Brand>
                </NavLink>
                {currentUser && addPostIcon}

            <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/"><i className='fas fa-home'></i>Home
                    </NavLink>
                    {currentUser ? loggedInIcons : loggedOutIcons}
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;