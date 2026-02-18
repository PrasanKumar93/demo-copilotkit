'use client';

import styles from './Footer.module.scss';

/**
 * Footer Component
 *
 * Simple app footer with company name and copyright.
 */
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p className={styles.copyright}>
                    © {currentYear} StudentHub. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

