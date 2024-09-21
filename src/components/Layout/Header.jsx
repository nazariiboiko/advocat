import React from 'react';
import { Outlet } from 'react-router';
const Header = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <div style={{ flex: '1 0 auto', backgroundColor: '#c3c3c3' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default Header;