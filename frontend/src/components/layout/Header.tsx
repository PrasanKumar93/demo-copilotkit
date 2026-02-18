'use client';

import Link from 'next/link';
import styles from './Header.module.scss';

/**
 * Header Component
 *
 * App shell header with logo and navigation links.
 * Displays the app branding and primary navigation.
 */
const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>◈</span>
                    <span className={styles.logoText}>StudentHub</span>
                </Link>

                <nav className={styles.nav}>
                    <Link href="/students" className={styles.navLink}>
                        Dashboard
                    </Link>
                    <Link href="/examples" className={styles.navLink}>
                        Components
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;

