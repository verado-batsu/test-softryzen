import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-scroll';

import { findHeaderHeight } from 'helpers/findHeaderHeight';

import { BurgerMenu } from 'components/BurgerMenu/BurgerMenu';
import headerLogo from 'assets/images/header/logo.png';

import styles from './Header.module.scss';
const {
    header,
    scrolled,
    headerBody,
    headerLogoLink,
    logo,
    menuWrapper,
    getInTouch,
} = styles;

export function Header() {
    const [headerHeight, setHeaderHeight] = useState(() => findHeaderHeight());
    const [headerBackground, setHeaderBackground] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
    const isDesktop = useMediaQuery({ minWidth: 1440 });

    useEffect(() => {
        setHeaderHeight(findHeaderHeight());
    }, [headerHeight, isMobile, isTablet, isDesktop]);

    useEffect(() => {
        function changeBackground() {
            if (window.scrollY >= headerHeight) {
                setHeaderBackground(true);
            } else {
                setHeaderBackground(false);
            }
        }

        window.addEventListener('scroll', changeBackground);
        return () => {
            window.removeEventListener('scroll', changeBackground);
        };
    }, [headerHeight]);

    return (
        <header className={headerBackground ? `${header} ${scrolled}` : header}>
            <div className="container">
                <div className={headerBody}>
                    <a className={headerLogoLink} href="./">
                        <img className={logo} src={headerLogo} alt="logo" />
                    </a>
                    <div className={menuWrapper}>
                        <BurgerMenu />
                        <Link
                            to="Contact Us"
                            className={getInTouch}
                            smooth={true}
                            offset={Number(`-${headerHeight}`)}
                            duration={500}
                        >
                            <span>Get in touch</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
