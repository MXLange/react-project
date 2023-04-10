import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./footerStyle.css"
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';

const Footer = () => {
    return(
        <footer >
            <h1>Social Media</h1>
            <div className="footer-content">
                <div className="linkedin">
                    <a href="https://www.linkedin.com/in/murillo-sprengel-lange/" target="_blank"><FaLinkedin/> LinkedIn</a>
                </div>
                <div className="github">
                    <a href="https://github.com/MXLange" target="_blank"><FaGithub/> GitHub</a>
                </div>
                <div className="email">
                    <a href="mailto:lange_sp@hotmail.com" target="_blank"><AiOutlineMail/> Email</a>
                </div>
            </div>
            <div className="copyright">
                <p>&copy; 2023 MSL</p>
            </div>
        </footer>
    );
}

export default Footer;