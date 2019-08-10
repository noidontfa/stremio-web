const React = require('react');
const PropTypes = require('prop-types');
const classnames = require('classnames');
const Icon = require('stremio-icons/dom');
const Button = require('../../Button');
const Popup = require('../../Popup');
const useBinaryState = require('../../useBinaryState');
const styles = require('./styles');

const NavMenu = ({ className, email = '', avatar = '', logout }) => {
    const [menuOpen, openMenu, closeMenu, toggleMenu] = useBinaryState(false);
    const [fullscreen, setFullscreen] = React.useState(document.fullscreenElement instanceof HTMLElement);
    const toggleFullscreen = React.useCallback(() => {
        if (fullscreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }, [fullscreen]);
    const onFullscreenChange = React.useCallback(() => {
        setFullscreen(document.fullscreenElement instanceof HTMLElement);
    }, []);
    React.useEffect(() => {
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', onFullscreenChange);
        };
    }, []);
    return (
        <Popup
            open={menuOpen}
            onCloseRequest={closeMenu}
            renderLabel={({ ref, onClick }) => (
                <Button ref={ref}
                    className={classnames(className, styles['nav-menu-button'], { 'active': menuOpen })}
                    tabIndex={-1}
                    onClick={(event) => {
                        onClick(event);
                        toggleMenu();
                    }}>
                    <Icon className={styles['icon']} icon={'ic_more'} />
                </Button>
            )}
            renderMenu={({ ref, className, onClick }) => (
                <div ref={ref} className={classnames(className, styles['nav-menu'])} onClick={onClick}>
                    <div className={styles['user-info']}>
                        <div
                            className={styles['avatar']}
                            style={{
                                backgroundImage: email.length === 0 ?
                                    `url('/images/anonymous.png')`
                                    :
                                    `url('${avatar}'), url('/images/default_avatar.png')`
                            }}
                        />
                        <div className={styles['email-container']}>
                            <div className={styles['user-info-label']}>{email.length === 0 ? 'Anonymous user' : email}</div>
                        </div>
                        <Button className={styles['login-logout-button']} tabIndex={-1} href={'#/intro'} onClick={email.length === 0 ? null : logout}>
                            <div className={styles['user-info-label']}>{email.length === 0 ? 'Log in / Sign up' : 'Log out'}</div>
                        </Button>
                    </div>
                    <div className={styles['nav-menu-section']}>
                        <Button className={classnames(styles['option'], 'focusable-with-border')} onClick={toggleFullscreen}>
                            <Icon className={styles['option-icon']} icon={'ic_fullscreen'} />
                            <div className={styles['option-label']}>{fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}</div>
                        </Button>
                    </div>
                    <div className={styles['nav-menu-section']}>
                        <Button className={classnames(styles['option'], 'focusable-with-border')} href={'#/settings'}>
                            <Icon className={styles['option-icon']} icon={'ic_settings'} />
                            <div className={styles['option-label']}>Settings</div>
                        </Button>
                        <Button className={classnames(styles['option'], 'focusable-with-border')} href={'#/addons'}>
                            <Icon className={styles['option-icon']} icon={'ic_addons'} />
                            <div className={styles['option-label']}>Addons</div>
                        </Button>
                        <Button className={classnames(styles['option'], 'focusable-with-border')}>
                            <Icon className={styles['option-icon']} icon={'ic_remote'} />
                            <div className={styles['option-label']}>Remote Control</div>
                        </Button>
                        <Button className={classnames(styles['option'], 'focusable-with-border')}>
                            <Icon className={styles['option-icon']} icon={'ic_magnet'} />
                            <div className={styles['option-label']}>Play Magnet Link</div>
                        </Button>
                        <Button className={classnames(styles['option'], 'focusable-with-border')} href={'https://stremio.zendesk.com/'} target={'_blank'}>
                            <Icon className={styles['option-icon']} icon={'ic_help'} />
                            <div className={styles['option-label']}>Help & Feedback</div>
                        </Button>
                    </div>
                    <div className={styles['nav-menu-section']}>
                        <Button className={classnames(styles['option'], 'focusable-with-border')} href={'https://www.stremio.com/tos'} target={'_blank'}>
                            <div className={styles['option-label']}>Terms of Service</div>
                        </Button>
                        <Button className={classnames(styles['option'], 'focusable-with-border')} href={'https://www.stremio.com/'} target={'_blank'}>
                            <div className={styles['option-label']}>About Stremio</div>
                        </Button>
                    </div>
                </div>
            )}
        />
    );
};

NavMenu.propTypes = {
    className: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
    logout: PropTypes.func
};

module.exports = NavMenu;
